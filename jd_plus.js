/**
京东PLUS任务
cron 0 12 * * * https://raw.githubusercontent.com/atyvcn/jd_scripts/jd_plus.js
*/
const $ = new Env('京东PLUS任务');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = []
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [
        $.getdata("CookieJD"),
        $.getdata("CookieJD2"),
        ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}

const JD_API_HOST = 'https://api.m.jd.com/client.action';
let uuid, UA,cookie,res,result

!(async () => {

    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }

    for (let i = 0; i < cookiesArr.length; i++) {
        $.index = i + 1;
        cookie = cookiesArr[i];
        $.isLogin = true;
        $.nickName = '';
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        getUA()
        await TotalBean();
        console.log(`\n*****开始【京东账号${$.index}】${$.nickName || $.UserName}*****\n`);
        if (!$.isLogin) {
            $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
            if( $.isNode()) await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
            continue
        }

        if ($.isPlusVip == 1){
            if ($.levelName) {
                if ($.levelName.length > 2) $.levelName = $.levelName.substring(0, 2);
                if ($.levelName == "注册") $.levelName = `😊普通`;
                else if ($.levelName == "钻石") $.levelName = `💎钻石`;
                else if ($.levelName == "金牌") $.levelName = `🥇金牌`;
                else if ($.levelName == "银牌") $.levelName = `🥈银牌`;
                else if ($.levelName == "铜牌") $.levelName = `🥉铜牌`;
            }
            console.log(`${$.levelName}Plus`);
            let body = {"params":JSON.stringify( {"enActK":"","isFloatLayer":false,"ruleSrv":"01055242_64678895_t1","signId":"zw0dGv6/OBAaZs/n4coLNw=="} ),
            "riskParam":{"platform":"3","orgType":"2","openId":"-1","pageClickKey":"Babel_Sign","eid":"","fp":"-1","shshshfp":"ce73d5d24ed7b4a599c43dc2650de9d6","shshshfpa":"6e44a707-13c3-7d17-1b54-afe19f45c6e3-1636027834","shshshfpb":"wp vScTBQs0Smdw7jeBd1DA==","childActivityUrl":"https%3A%2F%2Fpro.m.jd.com%2Fmall%2Factive%2F3joSPpr7RgdHMbcuqoRQ8HbcPo9U%2Findex.html%3FbabelChannel%3Dttt1%26un_area%3D22_2005_36315_36332","userArea":"-1","client":"","clientVersion":"","uuid":"","osVersion":"","brand":"","model":"","networkType":"","jda":"-1"},"siteClient":"android","mitemAddrId":"","geo":{"lng":"","lat":""},"addressId":"3210928933","posLng":"105.241173","posLat":"28.29883","focus":"","innerAnchor":"","cv":"2.0","_mkjdcn":"f2c4b530c60cf2ca48edfce32cc1e270"}
            res = await taskPost(taskPostUrl('userSign', body))
            //{"msg":"SUCCESS","returnMsg":"SUCCESS","code":"0","btnText":"连续签到2天","signText":"签到成功","subCode":"0","subCodeMsg":"SUCCESS","transParam":"","channelPoint":{"babelChannel":"","greytp":"1","rec_broker":"","loginCellularNetwork":0,"pageId":""},"list":[{"text":"连续1天","state":6},{"text":"连续2天","state":7},{"text":"连续3天","state":5},{"text":"连续4天","state":5},{"text":"连续5天","state":5}],"statistics":"连续签到2天","awardList":[{"text":"3京豆","type":2}]}
            console.log(`签到${JSON.stringify(res)}`);
            res = await taskPost(taskPostUrl2('healthyDay_getHomeData',{"appId":"1E1xZy6s","taskToken":"","channelId":1}))
            if( res && res.code==0 && res?.data?.bizCode==0 ){
                result = res?.data?.result;
                let taskVos = result.taskVos,
                userInfo = result.userInfo;
                for (let task of taskVos || []) {
                    const t = Date.now();
                    if (task.status === 1 && t >= task.taskBeginTime && t < task.taskEndTime) {
                        const id = task.taskId, max = task.maxTimes;
                        const waitDuration = task.waitDuration || 0;
                        let time = task?.times || 0;
                        //console.log(`去做任务：${task.taskName}`);
                        for (let ltask of task?.shoppingActivityVos || [] ) {
                            if (ltask.status === 1) {
                                console.log(`去做任务：${ltask.title}`);
                                if (waitDuration) {
                                    await $.wait(1500);
                                    await taskPost(taskPostUrl2('harmony_collectScore',{"appId":"1E1xZy6s","taskToken":ltask.taskToken,"taskId":id,"actionType":1}))
                                    console.log(`等待${waitDuration}秒`);
                                    await $.wait(waitDuration * 1000);
                                }
                                console.log(`领取任务奖励：${ltask.title}`);
                                await taskPost(taskPostUrl2('harmony_collectScore',{"appId":"1E1xZy6s","taskToken":ltask.taskToken,"taskId":id,"actionType":0,"safeStr": ""}))
                                time++;
                                if (time >= max) break;
                            }else if (ltask.status === 2) {
                                console.log(`已完成任务：${ltask.title}`);
                            }
                        }
                        await $.wait(2500);
                    }else if( task.status==2 ){
                        console.log(`已完成任务：${task.taskName}`);
                    }
                }
                //抽奖
                res = await taskPost(taskPostUrl2('healthyDay_getHomeData',{"appId":"1E1xZy6s","taskToken":"","channelId":1}))
                if( res && res.code==0 && res?.data?.bizCode==0 ){
                    result = res?.data?.result;
                    userInfo = result.userInfo;
                    let userScore = parseInt(userInfo?.userScore) || 0;
                    if(userInfo && userScore){
                        let max=Math.floor(userScore/userInfo?.scorePerLottery); 
                        console.log(`上次抽奖统计：${JSON.stringify(userInfo?.wholeTaskStatus)}`);
                        for(let c=0;c<max;c++){
                            res = await taskPost(taskPostUrl2('interact_template_getLotteryResult',{"appId":"1E1xZy6s"}))
                            if( res && res.code==0 && res?.data?.bizCode==0 ){
                                result = res?.data?.result;
                                let type = result?.userAwardsCacheDto?.type;
                                if( type===0 ){//"result":{"haveLotteryNum":"2","lotteryReturnCode":"J5","pin":"胡*宇","userAwardsCacheDto":{"type":0},"userScore":"1600.0"}
                                    console.log(`抽到：啥也没有！剩余${JSON.stringify(result?.userScore)}`);
                                }else console.log(`抽到：${JSON.stringify(result)}剩余${JSON.stringify(result?.userScore)}`);
                            }
                            await $.wait(2000);
                        }
                    }
                }           
            }else console.log( `healthyDay_getHomeData错误：`+JSON.stringify(res) );
            await $.wait(2000);
        }else console.log(`不是Plus跳过`);
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

function taskPost(option) {
    return new Promise((resolve) => {
        $.post(option, async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${functionId} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) resolve(JSON.parse(data));
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve({});
            }
        })
    })
}

function taskPostUrl(functionId, body) {
    return {
      url: `${JD_API_HOST}?functionId=${functionId}`,
      body: `functionId=${functionId}&body=${JSON.stringify(body)}&screen=750*1334&client=wh5&clientVersion=1.0.0&sid=&uuid=${uuid}&area=22_2005_2010_36462`,
      headers: {
        "Host": "api.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent":UA,
        "Origin": "https://pro.m.jd.com/",
        "Referer": "https://pro.m.jd.com/",
        "Cookie": cookie
      }
    }
}

function taskPostUrl2(functionId, body) {
    return {
      url: `${JD_API_HOST}`,
      body: `functionId=${functionId}&body=${JSON.stringify(body)}&client=wh5&clientVersion=1.0.0`,
      headers: {
        "Host": "api.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent":UA,
        "Origin": "https://h5.m.jd.com",
        "Referer": "https://h5.m.jd.com",
        "Cookie": cookie
      }
    }
}

function TotalBean() {
	return new Promise(async resolve => {
		const options = {
			url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
			headers: {
				Cookie: cookie,
				"User-Agent": UA,
			}
		}
		$.get(options, (err, resp, data) => {
			try {
				if (err) {
					$.logErr(err)
				} else {
					if (data) {
						data = JSON.parse(data);
						if (data['retcode'] === "1001") {
							$.isLogin = false; //cookie过期
							return;
						}
						if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
							$.nickName = data.data.userInfo.baseInfo.nickname;
							$.levelName = data.data.userInfo.baseInfo.levelName;
							$.isPlusVip = data.data.userInfo.isPlusVip;
						}
						if (data['retcode'] === '0' && data.data && data.data['assetInfo']) {
							$.beanCount = data.data && data.data['assetInfo']['beanNum'];
						}
					} else {
						$.log('京东服务器返回空数据,将无法获取等级及VIP信息');
					}
				}
			} catch (e) {
				$.logErr(e)
			}
			finally {
				resolve();
			}
		})
	})
}


function getUA() {
    //UA = `jdapp;android;10.1.6;11;${randomNum(16)}-${randomNum(16)};network/5g;model/M2006J10C;addressid/6454887160;aid/5ad8f9cf767e89a5;oaid/540e6a2cffe0dbb0;osVer/30;appBuild/90532;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; M2006J10C Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045713 Mobile Safari/537.36`
    UA = `jdapp;iPhone;10.2.0;13.1.2;${randomString(40)};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    uuid = UA.split(';')[4]
}

function randomString(e) {
    e = e || 32;
    let t = "abcdef0123456789",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function randomNum(e) {
    e = e || 32;
    let t = "0123456789",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}
function safeGet(data) {
    try {
      if (typeof JSON.parse(data) == "object") {
        return true;
      }
    } catch (e) {
      console.log(e);
      console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
      return false;
    }
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}