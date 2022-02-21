const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const root = path.resolve(__dirname, '../');
// const root = path.join(__dirname);

let taskLog = {}
const cronMap = {
  'jd_delCoupon.js':'X * * * *',//删除优惠券🎟（未设定自动运行，删券慎用）
  'jd_unsubscribe.js':'X * * * *',// 取关京东店铺商品 5 23 * * *
  'jd_moneyTree_2.js':'X * * * *',
  'jd_all_bean_change.js':'X * * * *',
  'jd_guacleancart.js':'X * * * *',//清空购物车
  'jd_track.js':'X * * * *',// 
  'jd_cfd_shell.js':'X * * * *',
  'jd_jxScore.js':'X * * * *',
  'jd_guawealth_island_help.js':'18 0,1,9,14,18 * * *',// 
  'jd_babel_sign.js':'1 2,6 * * *',// 
  'jd_bean_box.js':'1 9,12,18 * * *',// 
  'jd_jxgc.js':'30 * * * *',// 
  'jd_jxmc_getCoin.js':'0,30 * * * *',// 
  'jd_yili_cow.js':'0 12 * * *',// 
  'jd_wish.js':'11 1,9 * * *',// 
  'jd_vivo.js':'10 2,9,17 * * *',// 
  'jd_ttpt.js':'0 15 * * *',// 
  'jd_try.js':'0 6 * * *',// 
  'jx_box.js':'5 6,12 * * *',// 
  'jd_tewu.js':'15 1,15,22 * * *',// 
  'jd_sign_graphics.js':'10 6,15 * * *',// 
  'jd_validate_Worker.js':'2 23 * * *',// 
  'jd_shop_sign.js':'45 23 * * *',// 
  'jd_sendBeans.js':'6 1,14 * * *',// 
  'jd_reward.js':'3 13,22 * * *',// 
  'jd_productZ4Brand.js':'3 6,22 * * *',// 
  'jd_ccSign.js':'17 0 * * *',// 
  'jd_mf.js':'13 1,6 * * *',// 
  'jd_guaUnknownTask7.js':'27 8,18 * * *',// 
  'jd_ifanli.js':'17 0 * * *',// 
  'jd_IndustryLottery.js':'17 0 * * *',// 
  'jd_jdzz.js':'10 0,4 * * *',// 微信小程序京东赚赚
  'jd_guawealth_island_help.js':'18 0,1,9,14,18 * * *',// 财富大陆互助
  'jd_guawealth_island.js':'18 6-23/2 * * *',// 财富大陆
  'jd_guaMMdou.js':'9 9 * * *',// 升级赚京豆
  'jd_getUp.js':'30 6 * * *',// 
  'jd_guaddworld.js':'17 1,15 * * *',// 东东世界
  'JD_DailyBonus.js':'17 7 * * *',// 
  'jd_fruit_moreTask.js':'2 9 * * *',// 
  'jd_dwapp.js':'33 7,19 * * *',// 
  'jd_foodRunning.js':'33 5,15 * * *',// 
  'jd_ddworld.js':'17 1,15 * * *',// 东东世界
  'jd_bean_change.js':'0 6,12,16 * * *',// 京豆变动通知
  'jd_get_share_code.js':'47 7 * * *',// 导到所有互助码
  'jd_rankingList.js':'11 9 * * *',// 京东排行榜
  'jd_dragonboat.js': '15 5,23 1-19 6 *',//龙舟🐉
  'jd_xgyl.js':'34 9 * * *',// 小鸽有礼2(活动时间：2021年1月28日～2021年2月28日)
  'jd_nzmh.js':'35 1,23 * * *',//女装盲盒 活动时间：2021-2-19至2021-2-25
  'jd_bean_sign.js':'3 0,18 * * * ',// 签到
  'jd_blueCoin.js':'59 23 * * *',// 东东超市兑换奖品
  'jd_club_lottery.js':'6 0,23 * * *',// 摇京豆
  'jd_connoisseur.js':'11 1,5 * * *',// 内容鉴赏官
  'jd_fruit.js':'5 */3 * * *',// 东东农场
  'jd_joy.js':'15 */3 * * *',// 宠汪汪
  'jd_joy_feedPets.js':'15 * * * *',// 宠汪汪喂食
  'jd_joy_steal.js':'13 0-21/3 * * *',// 宠汪汪偷好友积分与狗粮 10 0-21/3 * * *  
  'jd_moneyTree.js':'3 */2 * * *',// 摇钱树
  'jd_pet.js':'5 6-18/6 * * *',// 东东萌宠
  'jd_plantBean.js':'1 7-22/2 * * *',// 京东种豆得豆
  'jd_redPacket.js':'0 0,12,22 * * *',// 京东全民开红包
  'jd_shop.js':'30 0 * * * ',// 进店领豆
  // 'jd_speed_redpocke.js':'20 0,22 * * *',//京东极速版天天领红包 活动时间：2021-1-18至2021-3-3
  'jd_speed.js':'0 */3 * * * ',// 京东天天加速
  'jd_speed_sign.js':'1 1,6 * * *',//京东极速版签到+赚现金任务
  'jd_superMarket.js':'11 */5 * * *',// 东东超市
  'jd_lotteryMachine.js':'11 1 * * *',// 京东抽奖机
  'jd_daily_egg.js':'18 * * * *',// 天天提鹅
  'jd_pigPet.js':'12 */6 * * *',// 金融养猪
  'jd_necklace.js':'20 0,20 * * *',// 点点券
  'jd_dreamFactory.js':'20 * * * *',// 京喜工厂
  'jd_small_home.js':'16 6,23 * * *',// 东东小窝
  'jd_jdfactory.js':'10 * * * *',// 东东工厂
  'jd_price.js':'1 23 * * *',//京东保价
  'jd_beauty.js':'1 6,12,19 * * *',//美丽研究院
  'jd_ms.js':'10 6,21 * * *',// 京东秒秒币
  'jd_sgmh.js':'20 8,22 * * *',//闪购盲盒
  'jd_family.js':'1 12,23 * * *',// 京东家庭号(暂不知最佳cron*/20 * * * *) '1 12,23 * * *'
  'jx_sign.js':'39 7 * * *',// 京喜app签到
  'jd_cash.js':'2 */4 * * *',// 签到领现金
  'jd_jxnc.js':'0 9,12,18 * * *',// 京喜农场 0 9,12,18 * * *
  'jd_bookshop.js':'1 8,12,18 * * *',// 口袋书店
  'jd_car_exchange.js':'0 0 * * *',// 京东汽车旅程赛点兑换金豆
  'jd_crazy_joy.js':'10 7 * * *',// crazyJoy自动每日任务
  'jd_joy_run.js':'10 9-20/2 * * *',// 宠汪汪邀请助力
  'jd_bean_home.js':'33 4 * * *',// 领京豆额外奖励(每日可获得3京豆)
  'jd_car.js':'59 23 * * *',// 京东汽车(签到满500赛点可兑换500京豆)
  'jd_kd.js':'10 0 * * *',// 京东快递签到
  'jd_syj.js':'36 8,18 * * *',// 十元街 10 0,7,23 * * *
  'jd_big_winner.js':'20 * * * *',//省钱大赢家之翻翻乐
  'jd_cfd.js':'5 * * * *' ,//京喜财富岛
  'jd_cfd_loop.js':'5 */4 * * *' ,//
  'jd_cfd_mooncake.js':'5 * * * *' ,//
  'jd_cfd_stock.js':'5 */6 * * *' ,//
  'jd_crazy_joy_bonus.js':'10 12 * * *' ,//监控crazyJoy分红
  'jd_crazy_joy_coin.js':'10 1,12 * * *' ,//crazyJoy挂机
  'jd_daily_lottery.js':'13 1,22,23 * * *' , //每日抽奖
  'jd_gold_creator.js':'13 1,22 * * *' , //金榜创造营
  'jd_health_collect.js':'5-45/20 * * * *' , //东东健康社区收集能量
  'jd_health.js':'13 1,6,7,21,22 * * *' , //东东健康社区
  'jd_health2.js':'13 1,6,7,21,22 * * *' , //东东健康社区
  'jd_jin_tie.js':'10 0 * * *' ,//领金贴
  'jd_joy_reward.js':'0 0-16/8 * * *' ,//宠汪汪积分兑换奖品
  'jd_jump.js':'1 0,11,21 * * *' , //跳跳乐瓜分京豆
  'jd_jxlhb.js':'0 2,12,21 * * *' ,//京喜领88元红包
  'jd_jxmc.js':'10 12,18 * * *' ,//惊喜牧场
  'jd_jxmc3.js':'0 */4 * * *' ,//惊喜牧场
  'jd_live.js':'10-50/5 12,13,23 * * *' ,//京东直播
  'jd_live_redrain.js':'0,30 * * * *' ,//超级直播间红包雨
  'jd_market_lottery.js':'4 10 * * *' ,//幸运大转盘
  'jd_mcxhd.js':'4 10 * * *' ,//新潮品牌狂欢
  'jd_mohe.js':'0 */3 * * *' ,//5G超级盲盒
  'jd_xtg.js':'0 0 0 * * *' ,//家电星推官
  'jd_xtg_help.js':'0 0 0 * * *' ,//家电星推官好友互助
  'xmSports.js':'15 17 * * *' , //小米运动 ./backUp/
  'jd_brandcarnivalcity.js': '0 * * * *',//品牌狂欢城
  'jd_cash_exchange.js': '0 0 * * *',//领现金兑换红包
  'jd_carnivalcity.js': '0 3,8,11,22 * * *',//手机狂欢城
  'jd_daily_bounds.js': '15 8 * * *',//京东每日签到
  'jd_flipcards.js': '1 */2 * * *',//翻翻乐
  'jd_half_redrain.js': '30 16-23 * * *',//半点京豆雨
  'jd_hby_lottery.js': '0 12 * * *',//主会场红包雨
  'jd_limitBox.js': '30 7,19 1-18 6 *',//限时盲盒
  'jd_mcxhd_brandcity.js': '0 */1 * * *',//新潮品牌狂欢
  'jd_petPig.js': '23 8 * * *',//京东金融养猪猪🐖
  'jd_priceProtect.js': '1 1 */3 * *',//京东价格保护
  'jd_shake.js': '10 23,21,9 * * *',//超级摇一摇
  'jd_super_redrain.js': '0 16-23 * * *',//整点京豆雨
  'jd_shoplottery.js': '3 15 * * *',//
  'jd_ShopSign.js': '10 17,4 * * *',//
  'jd_small_home.js': '55 16 * * *',//东东小窝
  'jd_star_shop.js':'0 1,21 * * *' ,//明星小店
  'jd_zc.js': '30 4,23 * * *',//总裁送好礼
  'jd_zoo.js': '3 */2 * * *',//动物连萌
  'jd_zooCollect.js': '1 */2 * * *',//动物联盟收集金币
  // 'jd_zsign.js':'0 3,9 * * *',// 
}
//不执行的js文件
var notList = [
// "jd_bean_sign.js",//
// "jd_jxnc.js",//
// "jd_try.js",//
// "jd_bean_box.js",//
// "jd_babel_sign.js",//
/********暂时失效********** */
"jd_speed_redpocke.js",//风控
"jd_shop.js",//
"jd_jxmc.js",//
"jd_beauty.js",//
"jx_nnfls.js",//
"jd_family.js",
"jd_yili_cow.js",//
"jd_guaopencard107.js",//
/********暂时失效2********** */
"jd_track.js",//
"jd_city.js",//
"jd_bookshop.js",//
"jd_half_redrain.js",//
"jd_newCron.js",//
"jd_productZ4Brand.js",//
"jd_jump.js",//
"jd_reward.js",//
"jd_ConvertSuperLink.js",//
"jd_shop_sign.js",//
"jd_split.js",//
"jd_super_redrain.js",//
"jd_unsubscriLive.js",//
"jd_year_bill.js",//
"jd_xiaolong.js",//
"jd_wxFans.js",//
"jd_order_cashback.js",//
"jd_Last_Week_income.js",//
"jd_carnivalcity.js",
/********不需要运行********** */
"jd_guacleancart.js",//
"jd_all_bean_change.js",//
"sign_graphics_validate.js",
"jd_api_test.js",//
"jd_checkCookie.js",//
"jd_qq_pasture.js",//
"jd_Last_Week_income.js",
"cleancart_activity.js",
"jd_cfd_stock.js",
"jd_jxmc_stock.js",
"jd_jxgc_stock.js",
"jd_guacleancart.js",//清空购物车
"jd_unsubscribe.js",//# 取关京东店铺商品
"JS_USER_AGENTS.js",
"tencentscf.js",
"USER_AGENTS.js",
"Env.min.js",
"getJDCookie.js",
"index.js",
"jdCookie.js",
"jd_get_share_code.js",
"JD_extra_cookie.js",
"jdDreamFactoryShareCodes.js",//null
"jdFactoryShareCodes.js",//null
"jdFruitShareCodes.js",//null
"jdJxncShareCodes.js",//null
"jdJxncTokens.js",//null  
"jdPetShareCodes.js",//null
"jdPlantBeanShareCodes.js",//null
"jdSuperMarketShareCodes.js",
"main.js",//
"TS_USER_AGENTS.js",//
"MovementFaker.js",//
"onlyOneExecute.js",//
"sendNotify.js",//
"JDJRValidator_Pure.js",//
"jd_api_test.js",//
"smartReplace.js",//
"ZooFaker_Necklace.js",//
"jd_getShareCodes.js",
"jd_checkCookie.js",
"jd_env_copy.js",
"jd_forceUpdateCron.js",
"jd_updateCron.js",
/*********不能跑********* */
"jd_dj_bean.js",
"jd_dj_getPoints.js",
"jd_dj_getck.js",
"jd_dj_fruit_collectWater.js",
"jd_dj_fruit.js",
"jd_dj_plantBeans.js",
"jd_help_cashback.js",
"jd_help_fortune.js",
"jd_help_factory.js",
"jd_help_grapbean.js.js",
"jd_task_cookie.js",
"jd_task_fortune.js",
"jd_task_invokeKey.js",
"jd_task_invokeKey.js",
"jd_important_notify.js",
"jd_delCoupon.js",//删除优惠券🎟（未设定自动运行，删券慎用）
"jd_ql_repo.js",
]

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
var runOneTimeList = []
var filelist = fs.readdirSync(root)
logger('读取目录文件。。。')
for (let i = 0; i < filelist.length; i++) {
  const file = filelist[i];
  if (file && not(file) && /\.(js)$/.test(file)) {
    if(cronMap[file]==='X * * * *'){
      runOneTimeList.push(file)
    }else{
      runFileList.push(file)
    }
  }
}


runTask();
setTimeout(function () {
  runOneTimeTask();
}, 3*60*1000);
setInterval(function () {
  runAutoTask();
}, 30*60*1000);

function not(a) {
  if(a.indexOf('main.')==0){
    return false
  }
  return !notList.includes(a)
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

function runAutoTask() {
  setInterval(function () {
    let date = new Date();
    let s = date.getSeconds();//(0 ~ 59)
    let m = date.getMinutes();//(0 ~ 59)
    let h = date.getHours();//(0 ~ 23)  
    let key = h + '_' + m
    if (!taskLog[key]) {
      taskLog[key] = true
      console.log(`时间${h}:${m}:${s} 查找需要执行的任务...`)
      let cronLog = ''
      let doJsLog = ''
      let startTime = getNowTime();
      for (let i = 0; i < runFileList.length; i++) {
        const thisFile = runFileList[i];
        if (isTheTime(thisFile, date)) {
          let code = 'node ' + thisFile
          runScript(code, thisFile, startTime)
          let cronStr = cronMap[thisFile] || '*****未定义定时任务';
          cronLog +=`\n${cronStr}@时间${h}:${m}:${s} 定时执行${thisFile}`
          doJsLog += `\n${startTime} 执行脚本: ${code}`
        }
      }
      logger(doJsLog);
      loggerCron(cronLog);
    }
  }, 1000);
}

function runScript(code, file, startTime) {
  exec(code, (error, stdout, stderr) => {
    error = error || ''
    stderr = stderr || ''
    stdout = stdout || ''
    doWriteFile(file, stdout,startTime)
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
  let useTime = parseInt((new Date(endTime).getTime()-new Date(startTime).getTime())/1000)+'秒'
  let dirName = file.substr(0,file.length-3)

  let path = './logs/' + dirName+'/'+ getFileTime() + '.txt'
  stdout = '用时('+useTime+')  '+startTime+' --> '+endTime+'\n'+stdout
  fs.exists('logs/'+dirName, (exists) => {
    if (!exists) {
      fs.mkdir('logs/'+dirName, (exists) => {
        console.log('创建目录 logs/'+dirName)
        //  { 'flag': 'a' } 文件末尾追加内容
        fs.writeFile(path, stdout, { 'flag': '' }, function (err) {
          logger(`${endTime} 写入日志文件 ${path} 耗时：${useTime}`)
        });
      })
    }else{
      //  { 'flag': 'a' } 文件末尾追加内容
      fs.writeFile(path, stdout, { 'flag': '' }, function (err) {
        logger(`${endTime} 写入日志文件 ${path} 耗时：${useTime}`)
      });
    }
  })


}

function getFileTime(){
  let d = new Date()
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}.${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}`
}
function getNowTime(){
  let d = new Date()
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}
function getNowDate(){
  let d = new Date()
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
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

  fs.writeFile(`logs/3logger.error.${loggerDate}.txt`,getNowTime()+ '\n' + info, { 'flag': 'a' }, function (err) {

  });
}

function isTheTime(thisFile, date) {
  date = date || new Date();
  // let s  = date.getSeconds();//(0 ~ 59)
  let m = date.getMinutes();//(0 ~ 59)
  let h = date.getHours();//(0 ~ 23)
  let d = date.getDate()
  let cronStr = cronMap[thisFile]
  if(cronStr==='X * * * *'){
    return false;
  }
  if(h==0&&m==0){
    return true
  }
  cronStr = cronStr || '0 */3 * * *';
  let cronArr = cronStr.split(' ');
  cronArr.length = 5;
  // let mReg = cronArr[0] || '0';//分钟表达式
  // let hReg = cronArr[1] || '*';//小时表达式
  // let dReg = cronArr[2] || '*';//小时表达式
  return testTime(cronArr[0],m) 
          && testTime(cronArr[1],h)
          && testTime(cronArr[2],d)
}


function testTime(regStr, now) {
  if (regStr == '*') {
    return true
  } else if (isNum(regStr)) {
    return parseInt(regStr) == now
  } else if (regStr.indexOf(',') > 0) {
    let arr = regStr.split(',')
    for (let i = 0; i < arr.length; i++) {
      const ele = arr[i];
      if(ele&&testTime(ele,now)){
        return true
      }
    }
  } else if (regStr.indexOf('/') > 0) {
    let everyStr = regStr.split('/')[0]||''
    let everySplit = regStr.split('/')[1]||''
    if(testTime(everyStr,now)){
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
