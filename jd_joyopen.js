/*
JOY通用开卡活动

变量：export JD_JOYOPEN="ID"  多个ID用 @ 连接

如遇火爆请重跑一次即可
奖励未到账请再次运行本脚本
日志显示已入会，才代表奖励已经领取

cron:2 1 * * *
============Quantumultx===============
[task_local]
2 1 * * * jd_joyopen.js, tag=JOY通用开卡活动, enabled=true

*/
const $ = new Env('JOY通用开卡活动');
const Faker=require('./utils/sign_graphics_validate.js') 
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let joyopen = '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = '';
if (process.env.JD_JOYOPEN && process.env.JD_JOYOPEN != "") {
    joyopen = process.env.JD_JOYOPEN.split('@');
}
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
message = ""
!(async () => {
  console.log('\n【如遇火爆请重跑一次即可】\n【奖励未到账请再次运行本脚本】\n【日志显示已入会，才代表奖励已经领取】')
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
	if (!joyopen) {
	console.log("\n衰仔你好，衰仔你好！！！\n你不填写变量 JD_JOYOPEN，\n是不是玩我呢！\n我很生气，拒接执行o(╥﹏╥)o");
	return;
	} 
  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.bean = 0
      await getUA()
      $.nickName = '';
      console.log(`\n\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
			for (let j = 0; j < joyopen.length; j++) {
			$.configCode = joyopen[j]
			console.log(`开卡ID就位: ${$.configCode}，准备开始薅豆`);
			await getUA()
			await run();
			}
      //if($.bean > 0) message += `【京东账号${$.index}】获得${$.bean}京豆\n`
    }
  }
  //if(message){
    //$.msg($.name, ``, `${message}\n获得到的京豆不一定到账`);
    //if ($.isNode()){
      //await notify.sendNotify(`${$.name}`, `${message}\n获得到的京豆不一定到账`);
    //}
  //}
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


async function run() {
  try {
    await getHtml();
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10))
    if(!$.fp || !$.eid){
      $.log("获取活动信息失败！")
      return
    }
    let config = [
		{configCode:`${$.configCode}`,configName:'JOY通用开卡'},
    ]
    for(let i in config){
      $.hotFlag = false
      let item = config[i]
      $.task = ''
      $.taskList = []
      $.taskInfo = ''
      let q = 5
      for(m=1;q--;m++){
        if($.task == '') await getActivity(item.configCode,item.configName,0)
        if($.task || $.hotFlag) break
      }
      if($.hotFlag) continue;
      if($.task.showOrder){
        console.log(`\n[${item.configName}] ${$.task.showOrder == 0 && '日常任务' || $.task.showOrder == 1 && '开卡' || '未知活动类型'} ${($.taskInfo.rewardStatus == 2) && '全部完成' || ''}`)
        if($.taskInfo.rewardStatus == 2) continue;
        $.taskList = $.task.memberList || $.task.taskList || []
        $.oneTask = ''
        for (let i = 0; i < $.taskList.length; i++) {
          $.oneTask = $.taskList[i];
          if($.task.showOrder == 1){
					$.errorJoinShop = '';	
					if($.oneTask.cardName.indexOf('马克华') > -1) continue
								console.log(`${$.oneTask.cardName} ${0 == $.oneTask.result ? "开卡得" + $.oneTask.rewardQuantity + "京豆" : 1 == $.oneTask.result ? "领取" + $.oneTask.rewardQuantity + "京豆" : 3 == $.oneTask.result ? "其他渠道入会" : "已入会"}`)
								if($.oneTask.result == 0) await statistic(`{"activityType":"module_task","groupType":7,"configCode":"${item.configCode}","itemId":${$.oneTask.cardId}}`)
								if($.oneTask.result == 0) await join($.oneTask.venderId)
					if($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1){
								console.log('第1次 重新开卡')
								await $.wait(parseInt(Math.random() * 2000 + 3000, 10))
								await join($.oneTask.venderId)
					}
					if($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1){
								console.log('第2次 重新开卡')
								await $.wait(parseInt(Math.random() * 2000 + 4000, 10))
								await join($.oneTask.venderId)
					}
            await $.wait(parseInt(Math.random() * 1000 + 500, 10))
            if($.oneTask.result == 1 || $.oneTask.result == 0) await getReward(`{"configCode":"${item.configCode}","groupType":7,"itemId":${$.oneTask.cardId},"eid":"${$.eid}","fp":"${$.fp}"}`)
          }else if($.task.showOrder == 0){
            $.cacheNum = 0
            $.doTask = false
            $.outActivity = false
            let name = `${1 == $.oneTask.groupType ? "关注并浏览店铺" : 2 == $.oneTask.groupType ? "加购并浏览商品" : 3 == $.oneTask.groupType ? "关注并浏览频道" : 6 == $.oneTask.groupType ? "浏览会场" : "未知"}`
            let msg = `(${$.oneTask.finishCount}/${$.oneTask.taskCount})`
            let status = `${$.oneTask.finishCount >= $.oneTask.taskCount && '已完成' || "去" + (1 == $.oneTask.groupType ? "关注" : 2 == $.oneTask.groupType ? "加购" : 3 == $.oneTask.groupType ? "关注" : 6 == $.oneTask.groupType ? "浏览" : "做任务")}`
            console.log(`${name}${msg} ${status}`)
            if($.oneTask.finishCount < $.oneTask.taskCount){
              await doTask(`{"configCode":"${item.configCode}","groupType":${$.oneTask.groupType},"itemId":"${$.oneTask.item.itemId}","eid":"${$.eid}","fp":"${$.fp}"}`)
              let c = $.oneTask.taskCount - $.oneTask.finishCount - 1
              for(n=2;c-- && !$.outActivity;n++){
                if($.outActivity) break
                console.log(`第${n}次`)
                await getActivity(item.configCode,item.configName,$.oneTask.groupType)
                $.oneTasks = ''
                let q = 3
                for(m=1;q--;m++){
                  if($.oneTasks == '') await getActivity(item.configCode,item.configName,$.oneTask.groupType)
                  if($.oneTasks) break
                }
                if($.oneTasks){
                  c = $.oneTasks.taskCount - $.oneTasks.finishCount
                  if($.oneTasks.item.itemId == $.oneTask.item.itemId){
                    n--;
                    console.log(`数据缓存中`)
                    $.cacheNum++;
                    if($.cacheNum > 3) console.log('请重新执行脚本，数据缓存问题');
                    if($.cacheNum > 3) break;
                    await getUA()
                    await $.wait(parseInt(Math.random() * 1000 + 3000, 10))
                    await getHtml();
                  }else{
                    $.cacheNum = 0
                  }
                  if($.oneTasks.item.itemId != $.oneTask.item.itemId && $.oneTasks.finishCount < $.oneTasks.taskCount) await doTask(`{"configCode":"${item.configCode}","groupType":${$.oneTasks.groupType},"itemId":"${$.oneTasks.item.itemId}","eid":"${$.eid}","fp":"${$.fp}"}`)
                  await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
                }else{
                  n--;
                }
              }
            }
          }else{
            console.log('未知活动类型')
          }
        }
        if($.task.showOrder == 0){
          if($.doTask){
            $.taskInfo = ''
            let q = 5
            for(m=1;q--;m++){
              if($.taskInfo == '') await getActivity(item.configCode,item.configName,-1)
              if($.taskInfo) break
            }
          }
          if($.taskInfo.rewardStatus == 1) await getReward(`{"configCode":"${item.configCode}","groupType":5,"itemId":1,"eid":"${$.eid}","fp":"${$.fp}"}`,1)
        }
      }
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
    }
    
  } catch (e) {
    console.log(e)
  }
}
function getActivity(code,name,flag) {
  return new Promise(async resolve => {
    $.get({
      url: `https://jdjoy.jd.com/module/task/v2/getActivity?configCode=${code}&eid=${$.eid}&fp=${$.fp}`,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type':'application/json;charset=utf-8',
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        'Cookie': cookie,
        'User-Agent': $.UA,
      }
    }, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          // console.log(data)
          res = $.toObj(data)
          if(typeof res == 'object'){
            if(res.success == true && res.data.pass == true){
              if(flag == 0){
                $.task = res.data.memberTask || res.data.dailyTask || []
                $.taskInfo = res.data.moduleBaseInfo || res.data.moduleBaseInfo || []
              }else if(flag == -1){
                $.taskInfo = res.data.moduleBaseInfo || res.data.moduleBaseInfo || {}
              }else if(flag == 1 || flag == 2){
                for(let i of res.data.dailyTask.taskList){
                  if(i.groupType == flag){
                    $.oneTasks = i
                    break
                  }
                }
              }else{
                console.log('活动-未知类型')
              }
            }else if(res.data.pass == false){
              console.log(`活动[${name}]活动太火爆了，请稍后再试~`)
              $.hotFlag = true
            }else{
              console.log(`活动[${name}]获取失败\n${data}`)
              if(flag > 0) await getHtml();
              await $.wait(parseInt(Math.random() * 1000 + 2000, 10))
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

function doTask(body) {
  return new Promise(async resolve => {
    $.post({
      url: `https://jdjoy.jd.com/module/task/v2/doTask`,
      body,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Accept-Encoding": "gzip, deflate, br",
        'Content-Type':'application/json;charset=UTF-8',
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        'Cookie': cookie,
        'User-Agent': $.UA,
      }
    }, async (err, resp, data) => {
      $.doTask = true
      try {
        if (err) {
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          await $.wait(parseInt(Math.random() * 1000 + 500, 10))
          // console.log(data)
          res = $.toObj(data)
          if(typeof res == 'object'){
            if(res.success == true){
              console.log(`领奖成功:${$.oneTask.rewardQuantity}京豆`)
              $.bean += Number($.oneTask.rewardQuantity)
            }else if(res.errorMessage){
              if(res.errorMessage.indexOf('活动已结束') > -1) $.outActivity = true
              console.log(`${res.errorMessage}`)
            }else{
              console.log(data)
            }
          }
          
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function getReward(body, flag = 0) {
  return new Promise(async resolve => {
    $.post({
      url: `https://jdjoy.jd.com/module/task/v2/getReward`,
      body,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Accept-Encoding": "gzip, deflate, br",
        'Content-Type':'application/json;charset=UTF-8',
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        'Cookie': cookie,
        'User-Agent': $.UA,
      }
    }, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          // console.log(data)
          res = $.toObj(data)
          if(typeof res == 'object'){
            if(res.success == true){
              console.log(`领奖成功:${flag == 1 && $.taskInfo.rewardFinish || $.oneTask.rewardQuantity}京豆`)
              $.bean += Number($.oneTask.rewardQuantity)
            }else{
              console.log(`${res.errorMessage}`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function statistic(body) {
  return new Promise(async resolve => {
    $.post({
      url: `https://jdjoy.jd.com/module/task/data/statistic`,
      body,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Accept-Encoding": "gzip, deflate, br",
        'Content-Type':'application/json;charset=UTF-8',
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        'Cookie': cookie,
        'User-Agent': $.UA,
      }
    }, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          // console.log(data)
          
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function join(venderId) {
  return new Promise(async resolve => {
    $.shopactivityId = ''
    $.errorJoinShop = ''
		await $.wait(1000)
    await getshopactivityId()
    let activityId = ``
    if($.shopactivityId) activityId = `,"activityId":${$.shopactivityId}`
    let body = `{"venderId":"${venderId}","shopId":"${venderId}","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0${activityId},"channel":401}`
    let h5st = '20220412164634306%3Bf5299392a200d6d9ffced997e5790dcc%3B169f1%3Btk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E%2FgujGAB50kyO7hwByWK%3B77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7%3B3.0%3B1649753194306'
    const options = {
      url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=${body}&clientVersion=9.2.0&client=H5&uuid=88888&h5st=${h5st}`,
      headers: {
        'Content-Type': 'text/plain; Charset=UTF-8',
        'Origin': 'https://api.m.jd.com',
        'Host': 'api.m.jd.com',
        'accept': '*/*',
        'User-Agent': $.UA,
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': cookie
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        // console.log(data)
        let res = $.toObj(data,data);
        if(typeof res == 'object'){
          if(res.success === true){
            console.log(res.message)
            $.errorJoinShop = res.message
            if(res.result && res.result.giftInfo){
              for(let i of res.result.giftInfo.giftList){
                console.log(`入会获得:${i.discountString}${i.prizeName}${i.secondLineDesc}`)
              }
            }
          }else if(typeof res == 'object' && res.message){
            $.errorJoinShop = res.message
            console.log(`${res.message || ''}`)
          }else{
            console.log(data)
          }
        }else{
          console.log(data)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function getshopactivityId() {
  return new Promise(resolve => {
    const options = {
      url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22${$.joinVenderId}%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888`,
      headers: {
        'Content-Type': 'text/plain; Charset=UTF-8',
        'Origin': 'https://api.m.jd.com',
        'Host': 'api.m.jd.com',
        'accept': '*/*',
        'User-Agent': $.UA,
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': cookie
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        let res = $.toObj(data);
        if(res.success == true){
          // console.log($.toStr(res.result))
          console.log(`入会:${res.result.shopMemberCardInfo.venderCardName || ''}`)
          $.shopactivityId = res.result.interestsRuleList && res.result.interestsRuleList[0] && res.result.interestsRuleList[0].interestsInfo && res.result.interestsRuleList[0].interestsInfo.activityId || ''
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function shopactivityId(functionId) {
  return {
    url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22${functionId}%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888`,
    headers: {
      'Content-Type': 'text/plain; Charset=UTF-8',
      'Origin': 'https://api.m.jd.com',
      'Host': 'api.m.jd.com',
      'accept': '*/*',
      'User-Agent': $.UA,
      'content-type': 'application/x-www-form-urlencoded',
      'Referer': `https://shopmember.m.jd.com/shopcard/?venderId=${functionId}&shopId=${functionId}&venderType=5&channel=401&returnUrl=https://lzdz1-isv.isvjcloud.com/dingzhi/dz/openCard/activity/832865?activityId=c225ad5922cf4ac8b4a68fd37f486088&shareUuid=${$.shareUuid}`,
      'Cookie': cookie
    }
  }
}
function getHtml() {
  return new Promise(resolve => {
    $.get({
      url: `https://prodev.m.jd.com/mall/active/3q7yrbh3qCJvHsu3LhojdgxNuWQT/index.html`,
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        'Cookie': cookie,
        'User-Agent': $.UA,
  }
    }, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function getEid(arr) {
  return new Promise(resolve => {
    const options = {
      url: `https://gia.jd.com/fcf.html?a=${arr.a}`,
      body: `d=${arr.d}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": $.UA
      }
    }
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${turnTableId[i].name} 登录: API查询请求失败 ‼️‼️`)
          throw new Error(err);
        } else {
          if (data.indexOf("*_*") > 0) {
            data = data.split("*_*", 2);
            data = JSON.parse(data[1]);
            $.eid = data.eid
          } else {
            console.log(`京豆api返回数据为空，请检查自身原因`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

async function getUA(){
  $.UA = `jdapp;iPhone;10.0.10;14.3;${randomString(40)};network/wifi;model/iPhone12,1;addressid/4199175193;appBuild/167741;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`
  let arr = await Faker.getBody($.UA,'https://prodev.m.jd.com/mall/active/3q7yrbh3qCJvHsu3LhojdgxNuWQT/index.html')
  $.fp = arr.fp
  await getEid(arr)
}
function randomString(e) {
  e = e || 32;
  let t = "abcdef0123456789", a = t.length, n = "";
  for (i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
}

function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}


// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
