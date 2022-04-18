const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const root = path.resolve(__dirname, '../');
// const root = path.join(__dirname);
let notRunFileList = []
let autoRunFileList = []
try {
  notRunFileList =require('./notRunFileList.js').notRunFileList
} catch (error) {
  console.log(error)
}
try {
  autoRunFileList =require('./autoRunFileList.js').autoRunFileList
} catch (error) {
  console.log(error)
}
//不执行的js文件

 var noRunList = notRunFileList.concat(autoRunFileList)

let date = new Date()
let loggerDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`

fs.unlink(`logs/2logger.txt`, function (err) {})
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
var filelist = fs.readdirSync(root)
logger('读取目录文件。。。')
for (let i = 0; i < filelist.length; i++) {
  const file = filelist[i];
  if (file && notInFiles(file) && /\.(js)$/.test(file)) {
    runFileList.push(file)
  }
}

// runFileList=[

// ]


runTask();

function notInFiles(file) {
  if(file.indexOf('main.')==0){
    return false
  }
  if(file.indexOf('jd_opencard')==0){
    return false
  }
  if(file.indexOf('gua_opencard')==0){
    return false
  }
  return !noRunList.includes(file)
}

function runTask() {
  logger('要执行的脚本数量：' + runFileList.length)
  let doJsLog = ''
  let startTime = getNowTime();
  for (let i = 0; i < runFileList.length; i++) {
    const thisFile = runFileList[i];
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
    doWriteFile(file, stdout,startTime)
    console.log(`stdout: ${stdout}`);
    if (error) {
      loggerAll(`error: ${file}:${error}`);
    }else if (stderr) {
      loggerAll(`stderr: ${file}:${stderr}`);
    }
  });
}

function doWriteFile(file, stdout, startTime) {
  // 写入文件内容（如果文件不存在会创建一个文件）
  let endTime = getNowTime();
  let useTime = parseInt((new Date(endTime).getTime()-new Date(startTime).getTime())/1000)+'秒'
  stdout = '-------------------------------->'+file
          +'\n用时('+useTime+')  '+startTime+' --> '+endTime
          +'\n'+stdout
          +'\n<--------------------------------'+file
          +'\n\n\n\n';
  loggerAll(stdout);
}

function getFileTime(){
  let d = new Date()
  return `${d.getFullYear()}-${formatTwo(d.getMonth()+1)}-${formatTwo(d.getDate())}.${formatTwo(d.getHours())}_${formatTwo(d.getMinutes())}_${formatTwo(d.getSeconds())}`
}
function getNowTime(){
  let d = new Date()
  return `${d.getFullYear()}-${formatTwo(d.getMonth()+1)}-${formatTwo(d.getDate())} ${formatTwo(d.getHours())}:${formatTwo(d.getMinutes())}:${formatTwo(d.getSeconds())}`
}
function getNowDate(){
  let d = new Date()
  return `${d.getFullYear()}-${formatTwo(d.getMonth()+1)}-${formatTwo(d.getDate())}`
}
function formatTwo(num){
  return num<10?'0'+num:num
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

function loggerAll(info) {
  console.log(info);
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

