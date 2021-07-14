//nodejs专用,手机用boxjs填写
//cookie只要里面的deviceid_pdj_jd=xxx-xxx-xxx;o2o_m_h5_sid=xxx-xxx-xxx关键信息
//TG群:https://t.me/joinchat/wH4Ks3mT6mxiMDg1

let cookies = [
  '',//账号一ck,例:deviceid_pdj_jd=xxx-xxx-xxx;o2o_m_h5_sid=xxx-xxx-xxx;
  '',//账号二ck,例:deviceid_pdj_jd=xxx-xxx-xxx2;o2o_m_h5_sid=xxx-xxx-xxx2;如有更多,依次类推
]
// 判断环境变量里面是否有京东ck
if (process.env.JDDJ_COOKIE) {
  if (process.env.JDDJ_COOKIE.indexOf(',') > -1) {
    cookies = process.env.JDDJ_COOKIE.split(',')
  } else if (process.env.JDDJ_COOKIE.indexOf('&') > -1) {
    cookies = process.env.JDDJ_COOKIE.split('&')
  } else if (process.env.JDDJ_COOKIE.indexOf('\n') > -1) {
    cookies = process.env.JDDJ_COOKIE.split('\n')
  } else {
    cookies = [process.env.JDDJ_COOKIE]
  }
}
if (JSON.stringify(process.env).indexOf('GITHUB')>-1) {
  console.log(`请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`)
  !(async () => {
    await require('./sendNotify').sendNotify('提醒', `请勿使用github action、滥用github资源会封我仓库以及账号`)
    await process.exit(0)
  })()
}
cookies = [...new Set(cookies.filter(item => !!item))]
console.log(`\n====================共${cookies.length}个京东账号Cookie=========\n`)

module.exports = cookies
