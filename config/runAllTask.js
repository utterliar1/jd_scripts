const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const root = path.resolve(__dirname, '../');
// const root = path.join(__dirname);
// 所有脚本不跑的文件列表
let notRunFileList = []
try {
  notRunFileList = require('./notRunFileList.js').notRunFileList
} catch (error) {
  console.log(error)
}
// 每个文件的定时
let cronMap = {}
try {
  cronMap = require('./cronMap.js').cronMap
} catch (error) {
  console.log(error)
}

//本脚本不跑的文件
var notList = [
  /********失效********** */
  "jd_ddworld_exchange.js",//失效
  /********失效2********** */
]
notList = notList.concat(notRunFileList)

let date = new Date()
let loggerDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`

fs.unlink(`logs/2logger.txt`, function (err) { })
fs.exists('logs', (exists) => {
  if (!exists) {
    fs.mkdir('logs', (exists) => {
      console.log('创建目录 logs')
    })
  } else {
    console.log('logs目录已经存在')
  }
})
logger('当前运行目录：' + root)
logger(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)

var runFileList = []
var runOneTimeList = []
var filelist = fs.readdirSync(root)
logger('读取目录文件。。。')
for (let i = 0; i < filelist.length; i++) {
  const file = filelist[i];
  if (file && not(file) && /\.(js)$/.test(file)) {
    runFileList.push(file)
  }
}

var fileRunLog = {}//任务执行记录
// console.log(runFileList)
runTask();
writeAutoRunFileList(runFileList)


function writeAutoRunFileList(runFileList) {
  let fileStr = 'const autoRunFileList = ' + JSON.stringify(runFileList) + ';'
  fileStr += '\nmodule.exports.autoRunFileList = autoRunFileList;'
  fileStr = fileStr.replace(/,/g, ',\n')
  // console.log(fileStr)
  fs.writeFile('config/autoRunFileList.js', fileStr, { 'flag': '' }, function (err) {
    console.log(`生成文件： config/autoRunFileList.js`)
  });
}

function not(a) {
  if (a.indexOf('main.') == 0) {
    return false
  }
  return !notList.includes(a)
}

function runTask() {
  setTimeout(function () {
    runAutoTask();
  }, 30 * 60 * 1000);
  logger('要执行的脚本数量：' + runFileList.length)
  let doJsLog = ''
  let startTime = getNowTime();
  let date = new Date();
  let month = formatTwo(date.getMonth() + 1);
  let day = formatTwo(date.getDate());
  let h = formatTwo(date.getHours());//(0 ~ 23) 
  let dayKey = month + '_' + day;
  fileRunLog[dayKey] = {}
  fileRunLog[dayKey][h] = {}
  for (let i = 0; i < runFileList.length; i++) {
    const thisFile = runFileList[i];
    if (cronMap[thisFile] === 'X * * * *') {
      continue
    }
    fileRunLog[dayKey][h][thisFile] = startTime//记录当前小时文件执行的时间
    let code = 'node ' + thisFile
    runScript(code, thisFile, startTime)
    doJsLog += `\n${startTime} 执行脚本: ${code}`
  }
  logger(doJsLog);
}


function runAutoTask() {
  setInterval(function () {
    let date = new Date();
    let month = formatTwo(date.getMonth() + 1);
    let day = formatTwo(date.getDate());
    let h = formatTwo(date.getHours());//(0 ~ 23)  
    let m = formatTwo(date.getMinutes());//(0 ~ 59)
    let s = formatTwo(date.getSeconds());//(0 ~ 59)
    let dayKey = month + '_' + day;
    if (h == '00' && m === '50' && s == '00') {
      removeBeforeDateMap(dayKey);
    }
    if (!fileRunLog[dayKey]) {
      fileRunLog[dayKey] = {}
    }
    if (!fileRunLog[dayKey][h]) {
      fileRunLog[dayKey][h] = {}
    }
    if (!fileRunLog[dayKey][h][m]) {
      fileRunLog[dayKey][h][m] = true//记录这一分钟有没有执行过
      console.log(`时间${h}:${m}:${s} 查找需要执行的任务...`)
      let cronLog = ''
      let doJsLog = ''
      let startTime = getNowTime();
      for (let i = 0; i < runFileList.length; i++) {
        const thisFile = runFileList[i];
        if (fileRunLog[dayKey][h][thisFile]) {
          continue;
        }
        if (isTheTime(thisFile, date)) {
          let code = 'node ' + thisFile
          fileRunLog[dayKey][h][thisFile] = startTime//记录当前小时文件执行的时间
          runScript(code, thisFile, startTime)
          let cronStr = cronMap[thisFile] || '*****未定义定时任务';
          cronLog += `\n${cronStr}@时间${h}:${m}:${s} 定时执行${thisFile}`
          doJsLog += `\n${startTime} 执行脚本: ${code}`
        }
      }
      logger(doJsLog);
      loggerCron(cronLog);
    }
  }, 1000);
}



function removeBeforeDateMap(dayKey) {
  for (const key in fileRunLog) {
    if (Object.hasOwnProperty.call(object, key)) {
      if (key < dayKey) {
        fileRunLog[key] = undefined
      }
    }
  }
}
function runOneTimeTask() {
  logger('只执行一次的脚本数量：' + runOneTimeList.length)
  let doJsLog = ''
  let startTime = getNowTime();
  for (let i = 0; i < runOneTimeList.length; i++) {
    const thisFile = runOneTimeList[i];
    let code = 'node ' + thisFile
    runScript(code, thisFile, startTime)
    doJsLog += `\n${startTime} 执行脚本: ${code}`
  }
  logger(doJsLog);
}

function runScript(code, file, startTime) {
  exec(code, (error, stdout, stderr) => {
    error = error || ''
    stderr = stderr || ''
    stdout = stdout || ''
    doWriteFile(file, stdout, startTime)
   
    // 写入文件内容（如果文件不存在会创建一个文件）
    let endTime = getNowTime();
    let useTime = parseInt((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000) + '秒';
    allStr = '-------------------------------->' + file
      + '\n用时(' + useTime + ')  ' + startTime + ' --> ' + endTime
      + '\n' + stdout
      + '\n<--------------------------------' + file
      + '\n\n\n\n';
    loggerAll(allStr);
    if (error) {
      loggerError(`error: ${file}:${error}`);
      return;
    }
    if (stderr) {
      loggerError(`stderr: ${file}:${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  });
}

function doWriteFile(file, stdout, startTime) {
  // 写入文件内容（如果文件不存在会创建一个文件）

  let endTime = getNowTime();
  let useTime = parseInt((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000) + '秒'
  let dirName = file.substr(0, file.length - 3)

  let path = './logs/' + dirName + '/' + getFileTime() + '.txt'
  stdout = '用时(' + useTime + ')  ' + startTime + ' --> ' + endTime + '\n' + stdout
  fs.exists('logs/' + dirName, (exists) => {
    if (!exists) {
      fs.mkdir('logs/' + dirName, (exists) => {
        console.log('创建目录 logs/' + dirName)
        //  { 'flag': 'a' } 文件末尾追加内容
        fs.writeFile(path, stdout, { 'flag': '' }, function (err) {
          logger(`${endTime} 写入日志文件 ${path} 耗时：${useTime}`)
        });
      })
    } else {
      //  { 'flag': 'a' } 文件末尾追加内容
      fs.writeFile(path, stdout, { 'flag': '' }, function (err) {
        logger(`${endTime} 写入日志文件 ${path} 耗时：${useTime}`)
      });
    }
  })


}

function getFileTime() {
  let d = new Date()
  return `${d.getFullYear()}-${formatTwo(d.getMonth() + 1)}-${formatTwo(d.getDate())}.${formatTwo(d.getHours())}_${formatTwo(d.getMinutes())}_${formatTwo(d.getSeconds())}`
}
function getNowTime() {
  let d = new Date()
  return `${d.getFullYear()}-${formatTwo(d.getMonth() + 1)}-${formatTwo(d.getDate())} ${formatTwo(d.getHours())}:${formatTwo(d.getMinutes())}:${formatTwo(d.getSeconds())}`
}
function getNowDate() {
  let d = new Date()
  return `${d.getFullYear()}-${formatTwo(d.getMonth() + 1)}-${formatTwo(d.getDate())}`
}
function formatTwo(num) {
  return num < 10 ? '0' + num : num
}

function logger(info) {
  console.log(info);
  if (!info) {
    return;
  }
  if (typeof info !== 'string') {
    info = JSON.stringify(info)
  }
  let loggerDate = getNowDate()
  fs.writeFile(`logs/3logger${loggerDate}.txt`, '\n' + info, { 'flag': 'a' }, function (err) {
  });
}
function loggerCron(info) {
  console.log(info);
  if (!info) {
    return;
  }
  if (typeof info !== 'string') {
    info = JSON.stringify(info)
  }
  let loggerDate = getNowDate()
  fs.writeFile(`logs/3loggerCron${loggerDate}.txt`, '\n' + info, { 'flag': 'a' }, function (err) {
  });
}

function loggerError(info) {
  console.log(info);
  if (!info) {
    return;
  }
  if (typeof info !== 'string') {
    info = JSON.stringify(info)
  }
  let loggerDate = getNowDate()

  fs.writeFile(`logs/3logger.error.${loggerDate}.txt`, getNowTime() + '\n' + info, { 'flag': 'a' }, function (err) {

  });
}

function isTheTime(thisFile, date) {
  date = date || new Date();
  // let s  = date.getSeconds();//(0 ~ 59)
  let m = date.getMinutes();//(0 ~ 59)
  let h = date.getHours();//(0 ~ 23)
  let d = date.getDate()
  let weekday = date.getDay()//周几0-6 周日-周六
  let cronStr = cronMap[thisFile]
  if (h == 0 && m == 0) {
    return true;
  }
  // if(cronStr==='X * * * *'){
  //   return h==0&&m==0;
  // }
  if (thisFile.indexOf('gua_') == 0) {
    cronStr = '0 6,18 * * *'
  }
  cronStr = cronStr || '0 */6 * * *';
  let cronArr = cronStr.split(' ');
  cronArr.length = 5;
  cronArr[4] = cronArr[4] || ''
  cronArr[4] = cronArr[4].trim()
  // 周几
  if (cronArr[4] != '*' && cronArr[4] != weekday) {
    return false;
  }
  // let mReg = cronArr[0] || '0';//分钟表达式
  // let hReg = cronArr[1] || '*';//小时表达式
  // let dReg = cronArr[2] || '*';//小时表达式
  return testTime(cronArr[0], m)
    && testTime(cronArr[1], h)
    && testTime(cronArr[2], d)
}

function loggerAll(info) {
  // console.log(info);
  if (!info) {
    return;
  }
  if (typeof info !== 'string') {
    info = JSON.stringify(info)
  }
  let loggerDate = getNowDate()
  fs.writeFile(`logs/3loggerAll${loggerDate}.txt`, '\n' + info, { 'flag': 'a' }, function (err) {
  });
}


function testTime(regStr, now) {
  if (!regStr) {
    return true
  }
  if (regStr == '*') {
    return true
  } else if (isNum(regStr)) {
    return parseInt(regStr) == now
  } else if (regStr.indexOf(',') > 0) {
    let arr = regStr.split(',')
    for (let i = 0; i < arr.length; i++) {
      const ele = arr[i];
      if (ele && testTime(ele, now)) {
        return true
      }
    }
  } else if (regStr.indexOf('/') > 0) {
    let everyStr = regStr.split('/')[0] || ''
    let everySplit = regStr.split('/')[1] || ''
    if (testTime(everyStr, now)) {
      return now % parseInt(everySplit) == 0
    }
    // return (',' + regStr + ',').indexOf(',' + now + ',') >= 0
  } else if (regStr.indexOf('-') > 0) {
    let hParams = regStr.split('-')
    hParams.length = 2
    let startTime = hParams[0] || 0
    let endTime = hParams[1] || 20
    if (now >= startTime && now <= endTime) {
      return true
    }
  }
  return false
}


function isNum(str) {
  return /^\d+$/.test(str)
}
