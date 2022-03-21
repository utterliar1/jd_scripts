const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const root = path.resolve(__dirname, '../');
// const root = path.join(__dirname);

//不执行的js文件
var noRunList = [
  /********失效********** */
  // "jd_shop.js",//
  "jd_ddworld_exchange.js",//失效
  // "jd_order_cashback.js",//下单返红包助力
/********失效2********** */
  /********不执行********** */
  "jd_speed_redpocke.js",//不执行
  "jd_jxScore.js",//不执行
  "jd_jxmc3.js",//
  "jd_track.js",//
  "jd_productZ4Brand.js",//已完成
  "jd_unsubscriLive.js",//取关主播
  /********不执行********** */
  /********不需要运行********** */
  "jd_deleteCart.js",//删除购物车 不执行
  "jd_guacleancart.js",//清空购物车 不执行
  "jd_delCoupon.js",//删除优惠券🎟（未设定自动运行，删券慎用）
  "jd_unsubscribe.js",//# 取关京东店铺商品
  "jd_all_bean_change.js",//
  "jd_checkCookie.js",//
  "cleancart_activity.js",
  "jd_cfd_stock.js",
  "jd_jxmc_stock.js",
  "jd_jxgc_stock.js",
  "JS_USER_AGENTS.js",
  "tencentscf.js",
  "USER_AGENTS.js",
  "Env.min.js",
  "getJDCookie.js",
  "index.js",
  "jdCookie.js",
  "jd_get_share_code.js",
  "JD_extra_cookie.js",
  "jdDreamFactoryShareCodes.js",//
  "jdFactoryShareCodes.js",//
  "jdFruitShareCodes.js",//
  "jdJxncShareCodes.js",//
  "jdJxncTokens.js",//  
  "jdPetShareCodes.js",//
  "jdPlantBeanShareCodes.js",//
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
/*********不跑********* */
'gua_wealth_island.js',     
'gua_wealth_island_help.js',
'jd_cfd.js',
'jd_cfd_game.js',
'jd_cfd_help.js',
'jd_cfd_shell.js',
'jd_dreamFactory_help.js',
'jd_dreamFactory_tuan.js',
'jd_joy.js',
'jd_joy_feedPets.js',
'jd_joy_park.js',
'jd_joy_run.js',
'jd_joy_steal.js',
'jd_superBrand.js',
'jd_superMarket.js',
'jx_box.js',
'jx_sign.js',
// 'gua_MMdou.js',
// 'jd_bean_box.js',
// 'jd_bean_change.js',
// 'jd_bean_home.js',
// 'jd_bean_sign.js',
// 'jd_blueCoin.js',
// 'jd_car.js',
// 'jd_cash.js',
// 'jd_ccSign.js',
// 'jd_club_lottery.js',
// 'jd_connoisseur.js',
// 'jd_daily_lottery.js',
// 'jd_ddnc_farmpark.js',
// 'jd_dreamFactory.js',
// 'jd_dreamFactory2.js',
// 'jd_dwapp.js',
// 'jd_exchangejxbeans.js',
// 'jd_exchange_joy.js',
// 'jd_foodRunning.js',
// 'jd_fruit.js',
// 'jd_fruit_moreTask.js',
// 'jd_gold_creator.js',
// 'jd_health.js',
// 'jd_health_collect.js',
// 'jd_ifanli.js',
// 'jd_jdfactory.js',
// 'jd_jin_tie.js',
// 'jd_joy_park_task.js',
// 'jd_jxbox.js',
// 'jd_jxg.js',
// 'jd_jxlhb.js',
// 'jd_jxmc.js',
// 'jd_jxmc_getCoin.js',
// 'jd_jxnc.js',
// 'jd_jxqd.js',
// 'jd_kd.js',
// 'jd_live.js',
// 'jd_lotteryMachine.js',
// 'jd_market_lottery.js',
// 'jd_mofang.js',
// 'jd_mohe.js',
// 'jd_moneyTree.js',
// 'jd_mpdzcar.js',
// 'jd_mpdzcar_game.js',
// 'jd_ms.js',
// 'jd_necklace.js',
// 'jd_nzmh.js',
// 'jd_order_cashback.js',
// 'jd_pet.js',
// 'jd_pigPet.js',
// 'jd_plantBean.js',
// 'jd_redPacket.js',
// 'jd_sendBeans.js',
// 'jd_sgmh.js',
// 'jd_shop.js',
// 'jd_sign_graphics.js',
// 'jd_sjzjd.js',
// 'jd_speed.js',
// 'jd_speed_sign.js',
// 'jd_try.js',
// 'jd_ttpt.js',
// 'jd_wish.js',
// 'jd_wxFansli.js',
// 'jd_wxFanspai_sign.js',
// 'jd_wyw.js',
]

var noRunList2 = [
  'gua_MMdou.js',          'jd_19_6.js',           'jd_88hb.js',
  'jd_bean_box.js',        'jd_bean_change.js',    'jd_bean_home.js',
  'jd_bean_sign.js',       'jd_beauty_ex.js',      'jd_blueCoin.js',
  'jd_car.js',             'jd_cash.js',           'jd_ccSign.js',
  'jd_club_lottery.js',    'jd_connoisseur.js',    'jd_daily_lottery.js',
  'jd_ddnc_farmpark.js',   'jd_dreamFactory.js',   'jd_dwapp.js',
  'jd_exchangejxbeans.js', 'jd_exchange_joy.js',   'jd_fan.js',
  'jd_fanli.js',           'jd_fcwb.js',           'jd_foodRunning.js',
  'jd_fruit.js',           'jd_fruit_moreTask.js', 'jd_gold_creator.js',
  'jd_health.js',          'jd_health_collect.js', 'jd_ifanli.js',
  'jd_jddj_bean.js',       'jd_jddj_fruit.js',     'jd_jddj_plantBeans.js',
  'jd_jdfactory.js',       'jd_jdjrjf.js',         'jd_jdzz.js',
  'jd_jintie_wx.js',       'jd_jin_tie.js',        'jd_jmf.js',
  'jd_joy_park_task.js',   'jd_js_sign.js',        'jd_jxbox.js',
  'jd_jxg.js',             'jd_jxlhb.js',          'jd_jxmc.js',
  'jd_jxmc_getCoin.js',    'jd_jxnc.js',           'jd_jxqd.js',
  'jd_kd.js',              'jd_live.js',           'jd_lotteryMachine.js',
  'jd_market_lottery.js',  'jd_mofang.js',         'jd_mofang_ex.js',
  'jd_mofang_j.js',        'jd_mohe.js',           'jd_moneyTree.js',
  'jd_mpdzcar.js',         'jd_mpdzcar_game.js',   'jd_mpdzcar_help.js',
  'jd_ms.js',              'jd_necklace.js',       'jd_nnfls.js',
  'jd_nzmh.js',            'jd_order_cashback.js', 'jd_pet.js',
  'jd_pigPet.js',          'jd_plantBean.js',      'jd_redPacket.js',
  'jd_sendBeans.js',       'jd_sgmh.js',           'jd_shop.js',
  'jd_sign.js',            'jd_sign_graphics.js',  'jd_sjzjd.js',
  'jd_speed.js',           'jd_speed_sign.js',     'jd_try.js',
  'jd_ttpt.js',            'jd_tyt.js',            'jd_week.js',
  'jd_wish.js',            'jd_wsdlb.js',          'jd_wxFansli.js',
  'jd_wxj.js',             'jd_wyw.js',            'jd_zjd.js'
]

noRunList = noRunList.concat(noRunList2)

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

