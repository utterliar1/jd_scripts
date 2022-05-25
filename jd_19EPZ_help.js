/*
TY自己写的获取指定用户膨胀码助力
QQ1659670408
33 20 * * * jd_19E_PZhelp.js

*/
const $ = new Env('热爱奇旅-膨胀助力');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';


let cookiesArr = [],
    cookie = '',
    message;
let secretp = '',
    inviteId = ''

let TYUserName=[];
if( process.env.TYUserName ){
  TYUserName=process.env.TYUserName.split("@");
}else{
  console.log(`请设置变量 TYUserName 来指定用户，多个用@分隔`)
  return false
}
 


if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';
let inviteCodes = []

!(async() => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    await getUA()
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            if( !$.UserName || TYUserName.indexOf($.UserName)===-1 ) continue;
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            await get_secretp()
            await promote_pk_getAmountForecast();
            await $.wait(1000)
        }
    }
    console.log(`\n\n为以下膨胀码膨胀：${JSON.stringify(inviteCodes)}\n`)
    let code,inviteCode;
    for (let i = 0; i < cookiesArr.length && inviteCodes .length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            //if( !$.UserName || TYUserName.indexOf($.UserName)===-1 ) continue;
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            await get_secretp()
            for (let j = 0; j < inviteCodes .length; j++) {
                inviteId=inviteCodes[j];
                console.log(`给 ${inviteId} 进行助力`)
                try {
                    code = await promote_pk_collectPkExpandScore(inviteId);
                }catch(e){
                    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
                }
                if(code==2){
                    inviteCodes .splice(j, 1)
                    j--
                    continue
                }else if(code==3){
                    break;
                }
                await $.wait(2000)
            }
            await $.wait(1000)
        }
    }

})()
.catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

function get_secretp() {
    let body = {};
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_getHomeData", body), async(err, resp, data) => {
            //console.log(data)
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code == 0) {
                            if (data.data && data.data.bizCode === 0) {
                                secretp = data.data.result.homeMainInfo.secretp
                                //console.log(secretp)
                          }
                        } else if (data.code != 0) {
                            console.log(`\n\nsecretp失败:${JSON.stringify(data)}\n`)
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

//升级到膨胀红包
function promote_pk_getAmountForecast() {
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_pk_getAmountForecast", {}), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if ( data?.code === 0 && data?.data ) {
                            //console.log(`${JSON.stringify(data)}\n`)
                            //{"bizCode":-3,"bizMsg":"活动太火爆，请稍后再试哦~","success":false}
                            switch(data['data']['bizCode']){
                                case 0:
                                    let result=data['data']['result'];
                                    if( result?.securityCode ) {
                                        //console.log(`OK:\n${JSON.stringify(result)}`)
                                        console.log(`升级膨胀红包成功`);
                                        await travel_gethelp();
                                        resolve(1)
                                    }else{
                                        console.log(`已膨胀成功或者取消膨胀`);
                                        resolve(1)
                                    }
                                    break;
                                case -3:
                                    console.log(`${data['data']['bizMsg']}`);
                                    resolve(2)
                                    break;
                                default:
                                    console.log(`${data['data']['bizCode']+data['data']['bizMsg']}`);
                                    resolve(false)
                            }
                           
                        } else {
                            console.log(`升级失败:${JSON.stringify(data)}\n`)
                            resolve(false)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                //resolve(data);
            }
        })
    })
}

function travel_gethelp(){
//let body={"taskId":taskId,"taskToken":taskToken,"actionType":1,"ss":{"extraData":{"log":"","sceneid":"ZNSZLh5"},"secretp":secretp,"random":randomString(6)}};
  let body={"ss":JSON.stringify({"extraData":{"log":"","sceneid":"RAZXh5"},"secretp":secretp,"random":randomString(8)})};
	return new Promise((resolve) => {
		$.post(taskPostUrl("promote_pk_getExpandDetail",body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {
              console.log(`成功获取膨胀码：`+data.data.result.inviteId)
              //console.log(`${JSON.stringify(data.data.result)}\n`)
              inviteCodes.push(data.data.result.inviteId);
            } else {
              console.log(`\n\n 失败:${JSON.stringify(data)}\n`)
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
//膨胀助力
function promote_pk_collectPkExpandScore(inviteId) {
    let log ="1653395003308~1H64tHezYtEMDJtb1NJeDAxMQ%3D%3D.XFlmektUW2pwTV9cZjcfD1sSJEBfVgsiBlxDZGU5QV0tewZcETEmFwYAPzkrWBxgOE0ZKgEgMxgWHzM5Ew%3D%3D.d40a6914~A%2C2~422BCA4E8A327802A57E6824FA23C512854A683093CE1F1E630914B25B211FD4~1jx98ap~C~GBcRDhtfajkfE0NdD0EPPkFdUBxTch1xck5WZjFPCEsBVAMdQxFOQVFSTg4kHSJyHQJmU08ES1MJVR0QER0VV1NOAiRPfyQdUWZlG0ZOFxc4TxsCQwoRCwYfQBBGR1kbVAdRAAIOB1taAVRVClQGUAYTGxEVBlFHWRsRRRBHRVFGBEEZRxRcBBNeEVdRRxYXQRACG0kTFFdfFQk5WhlRUBVXHVcfABsGP08XDwkbXwBIEVJEEVhBDQFTWFcBV1BQVVZSVQdTAA5SCAELBgQCW1cGA1dbA1dGHxNZQ0BZFykKVxBJRFJQRVAKVQFHTxsRE14CBwIAUVoAVVMKVgFcHxNdWEBZF0hOCQAGVFAGAQdbAFcGVVtUUklQBgZWUlYAAAEAXQZcUQhUCwQBUV1UAVcAAVECUwFWU1FSUFsDE0gRV0dRQFkXBwxWDl4IQ2ICQFESABEmawx6EUp9TXJATxcLFRtfEyNcXlBfB0N8CwAXRx1GXVBBEVhBDFJWD1ATSBFCVEFAWW5dVApJAl0AbBsREAwXXzgbKANUAwd9AlIgF0lBWAtVFlxYUxFOQQRXQRVHAFUdARkBQE8XXFQMUwRGHxMHAFdVAlZTClYHUwAHBAdRTgxWUA9XB1cFBwQBVFIGVlUbSRNVEWwbEQsMVEdZGwNXAlVXUUcWQRlHAlNHC0ZGExsRAQoXX0FOVh9RHQUVH0AAUzoVG18TVAITGxEABxdfQUsEXwBcXApqVA9YElMOKxNIEVxdEVg4BElTFVVsSBFTW1wFQQ9HUg9QAlcKBQ4LW1UGVB0ILlYGUEdkVShRfSgnf1VSV0NjVFkjG3gCXgRLYzFlYW5YJC1nVS1VNFoudmBeCxU3YDQsYyBkPWBZB3ImIn8DInFUaDN2eHJpFRtzITJwCngDYXd%2BSVoIbR8QYzxwFHF3XXJNLUJVBmgPSSh%2FdV9jIRpWKi1BPGsjAwFAewgQADdTbFRwHHZVcmEJUnYfKnszZTVBe2Z2FzlwNCJ0JwkmcnN5dCAiCFhNXwZUUwNXBVIcGRlUHUcbcxpndHl7JxQNMzVVXGsjAkJ%2BYiQQbzIUDARnJmV4cQI3O3Y3NX0iYypkd2YLMTVnBgJoVGsxUnRhdyYxeC01awZoIgNSYWQaAHwkFGggdAxUaW9LLzt2JzZ6MWA9Z3YHaTsxdwYpfzN0IXJgZmUlMX89O3s3UyICdHJ7NC5vJBtsP09UBEECBBQaF0lBVBZWRgkTFU4%3D~1lr7njh";
    let body={"ss":"{\"extraData\":{\"log\":\"\",\"sceneid\":\"RAhomePageh5\"},\"secretp\":\""+secretp+"\",\"random\":\""+randomString(8)+"\"}","actionType":"0","inviteId":inviteId};
    return new Promise((resolve) => {
        $.post(taskPostUrl("promote_pk_collectPkExpandScore", body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if ( data?.code === 0 && data?.data ) {
                            /*
                            {"bizCode":-1001,"bizMsg":"活动太火爆了~还是去买买买吧","success":false},
                            {"bizCode":-13,"bizMsg":"不能为本队队员助力哦|快去瓜分19亿红包吧~","success":false}
                            */
                            switch(data['data']['bizCode']){
                                case 0:
                                    console.log(`助力成功:${data['data']['bizMsg']}`);
                                    resolve(1)
                                    break;
                                case -19://TA已经获得足够的助力了|不需要助力啦~
                                    console.log(`助力:${data['data']['bizMsg']}`)
                                    resolve(2)
                                    break;
                                case -9://您今天的助力次数已用完|今天不能再助力啦~
                                    console.log(`助力:${data['data']['bizMsg']}`)
                                    resolve(3)
                                    break;
                                default:
                                    console.log(`助力:${data['data']['bizCode']+data['data']['bizMsg']}`)
                                    resolve(false)
                            }
                            //console.log(`助力失败:${JSON.stringify(data)}\n`)
                        } else {
                            console.log(`助力失败:${JSON.stringify(data)}\n`)
                            resolve(false)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                //resolve(data);
            }
        })
    })
}

function taskPostUrl(functionId, body) {
    return {
        url: `${JD_API_HOST}?functionId=${functionId}`,
        body: `functionId=${functionId}&body=${escape(JSON.stringify(body))}&client=m&clientVersion=-1&appid=signed_wh5`,
        headers: {
            'Cookie': cookie,
            'Host': 'api.m.jd.com',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.UA,
            'Origin': 'https://wbbny.m.jd.com',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    }
}


function taskPost(functionId, body) {
    return new Promise((resolve) => {
        $.post(taskPostUrl(functionId, body), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${functionId} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
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

function getUA() {
    $.UA = `jdapp;android;10.0.6;11;9363537336739353-2636733333439346;network/wifi;model/KB2000;addressid/138121554;aid/9657c795bc73349d;oaid/;osVer/30;appBuild/88852;partner/oppo;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; KB2000 Build/RP1A.201005.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36`
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