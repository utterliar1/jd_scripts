
/**
 * 照着 @curtinlv 大佬的python开卡脚本改了一份根据shopid开查询并开卡的脚本
 * @lof
 * 需要两个环境变量，如果提供两个ID最好，不行提供一个OPEN_CARD_SHOP_ID也行
 * OPEN_CARD_SHOP_ID
 * OPEN_CARD_VENDER_ID
 * BEAN_GE_CNT 这环境变量设置大于等于多少豆子才去开卡
 */
const $ = new Env("会员开卡");
const notify = $.isNode() ? require("./sendNotify") : "";
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const channel = 208
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = "", message = "";
//店铺ID VenderID
let shopId="",venderId="",giftInfo="";
//店铺会员礼包信息
let venderCardName="",openCardStatus="",giftBean="",activityId="";
//入会豆子条件大于等于该值才去入会
let beanGECnt=20
//入会信息是否打印过
let giftPrinted=""

if (process.env.OPEN_CARD_SHOP_ID && process.env.OPEN_CARD_SHOP_ID != "") {
  shopId = process.env.OPEN_CARD_SHOP_ID;
}
if (process.env.OPEN_CARD_VENDER_ID && process.env.OPEN_CARD_VENDER_ID != "") {
  venderId = process.env.OPEN_CARD_VENDER_ID;
}
if (process.env.BEAN_GE_CNT && process.env.BEAN_GE_CNT != "") {
  beanGECnt = process.env.BEAN_GE_CNT;
}

var args = process.argv.splice(2);
if (args.length > 0) {
  for (let i = 0; i < args.length; i++) {
    if (i == 0) {
      shopId = args[0];
      console.log(`店铺ID：${shopId}`);
    }
    if (i == 1) {
      venderId = args[1];
      console.log(`VenderId：${venderId}`);
    }
  }
}

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

!(async () => {
  if (!cookiesArr[0]) {
    $.msg(
      $.name,
      '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
      'https://bean.m.jd.com/',
      {
        'open-url': 'https://bean.m.jd.com/',
      }
    );
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      $.cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(
        $.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]
      );
      $.index = i + 1;
      $.isLogin = false;
      $.nickName = '';
      await setNickName();
      //if (!$.isLogin) {
      //  $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
      //
      //  if ($.isNode()) {
      //    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
      //  }
      //  continue
      //}
      // console.log(`\n***********开始【账号${$.index}】${$.nickName || $.UserName}********\n`);

      if (!shopId){
        console.log(`店铺ID都没有你让我跑个啥子嘛。`)
        break;
      }
      if (!venderId){
        await getVenderId()
      }
      if (venderId === 0){
        console.log(`弄啥嘞，整个假的店铺ID你让我跑个啥子嘛。`)
        break;
      }
      await getOpenCardGift()
      if (openCardStatus==1){
        console.log(`【账号${$.index}:${$.nickName || $.UserName}】已经是【${venderCardName}】家会员了。`)
        continue;
      }else{
        if (giftBean<1){
          console.log(`【账号${$.index}:${$.nickName || $.UserName}】👀看不见【${venderCardName}】店里有豆子。`)
          continue
        }
        if(!giftPrinted){
          console.log(`【${venderCardName}】入会送（${giftBean}京豆）；activityId：${activityId}`)
          giftPrinted="yes"
        }
        if (giftBean<Number(beanGECnt)){
          console.log(`豆子也忒少了，少于${beanGECnt}豆的情报不要发给我😡。`)
          return;
        } 
      }
      if (activityId >10){
        await openCard()
      }
    }   
  }
})()
  .catch((e) => {
    console.log(`❗️ ${$.name} 运行错误！\n${e}`);
  })
  .finally(() => $.done());

async function openCard(){
  return new Promise(resolve => {

    jsonpName=`jsonp_${Date.now()}_${getRandomInt(10000,99999)}`
    v_email=`${getRandomInt(1000000,9999999)}@qq.com`

    body=`{"venderId":"${venderId}","shopId":"${shopId}","bindByVerifyCodeFlag":1,"registerExtend":{"v_sex":"未知","v_name":"${randomString(6)}","v_birthday":"1990-03-18","v_email":"${v_email}"},"writeChildFlag":0,"activityId":${activityId},"channel":${channel}}`
    
    opt={
      url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=${body}&client=H5&clientVersion=9.2.0&uuid=&jsonp=${jsonpName}`,
      headers: {
        'Cookie': $.cookie,
        'Accept': "*/*",
        'Connection': "close",
        'Referer': "https://shopmember.m.jd.com/shopcard/?",
        'Accept-Encoding': "gzip, deflate, br",
        'Host': "api.m.jd.com",
        'User-Agent': "jdapp;iPhone;9.4.8;14.3;809409cbd5bb8a0fa8fff41378c1afe91b8075ad;network/wifi;ADID/201EDE7F-5111-49E8-9F0D-CCF9677CD6FE;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone13,4;addressid/;supportBestPay/0;appBuild/167629;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        'Accept-Language': "zh-cn"
      }
    }
    //console.log(opt)
    $.get(opt, async (err, resp, data) => {
      try{
        if (err) {
          console.log(`${err},${jsonParse(resp.body)['message']}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data){
            data=data.substring(data.indexOf(`(`) + 1, data.lastIndexOf(")"));
            // console.log(data)
            data = JSON.parse(data);
            if (data.busiCode == "0"){
              console.log(`【账号${$.index}:${$.nickName || $.UserName}】开卡成功。`)
            }
            //console.log(data)
          }else{
            console.log(`服务器返回空数据`)
          }
        }
      } catch(e) {
        $.logErr(e, resp)
      } finally {
        resolve(data)
      }

    });
  });

}

async function getOpenCardGift() {
    return new Promise(resolve => {
      jsonpName=`jsonp_${Date.now()}_${getRandomInt(10000,99999)}`
      // console.log(jsonpName)
      opt={
        url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22${venderId}%22%2C%22channel%22%3A406%7D&client=H5&clientVersion=9.2.0&uuid=&jsonp=${jsonpName}`,
        headers : {
          'Cookie': $.cookie,
          'Accept': "*/*",
          'Connection': "close",
          'Referer': "https://shopmember.m.jd.com/shopcard/?",
          'Accept-Encoding': "gzip, deflate, br",
          'Host': "api.m.jd.com",
          'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
          'Accept-Language': "zh-cn"
        }
      }
      $.get(opt, async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${err},${jsonParse(resp.body)['message']}`)
            console.log(`${$.name} API请求失败，请检查网路重试`)
          } else {
            if (data){
              data=data.substring(data.indexOf(`(`) + 1, data.lastIndexOf(")"));
              // console.log(data)
              data = JSON.parse(data);
              giftInfo=data

              venderCardName=data.result.shopMemberCardInfo.venderCardName
              openCardStatus = data.result.userInfo.openCardStatus
              interestsRuleList = data.result.interestsRuleList

              // console.log(giftInfo)
              // console.log(interestsRuleList)
              if (interestsRuleList == null || interestsRuleList == "undefined"){
                interestsRuleList = 0
              }else{
                // console.log(interestsRuleList)
                for (idx in interestsRuleList){
                  rule=interestsRuleList[idx]
                  if (rule.prizeName && rule.prizeName == "京豆"){
                    giftBean = rule.discountString
                    activityId = rule.interestsInfo.activityId
                    return;
                  }
                }
              }
            }else{
              console.log(`${$.name} 服务器返回空数据`)
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


async function getVenderId() {
  return new Promise((resolve) => {
    opt = {
      url: `https://mall.jd.com/index-${shopId}.html`,
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        Host: "mall.jd.com",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "close",
      },
    };
    $.get(opt, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${err},${jsonParse(resp.body)["message"]}`);
          console.log(`${$.name} API请求失败，请检查网路重试`);
        } else {
          // console.log(data)
          var matchReg = /shopId=\d+&id=(\d+)"/;
          if (data.match(matchReg)){
            venderId = data.match(matchReg)[1];
          }else{
            venderId = 0
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomString(e) {
  e = e || 32;
  let t = "abcdefhijkmnprstwxyz2345678", a = t.length, n = "";
  for (i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
}

function setNickName() {
  return new Promise((resolve) => {
    const options = {
      url: `https://wq.jd.com/user_new/info/GetJDUserInfoUnion?orgFlag=JD_PinGou_New&callSource=mainorder&channel=4&isHomewhite=0&sceneval=2&sceneval=2&g_login_type=1g_ty=ls`,
      headers: {
        Accept: "*/*",
        Connection: "keep-alive",
        Host: "wq.jd.com",
        "Accept-Language": "zh-cn",
        Cookie: $.cookie,
        "Accept-Encoding": "gzip, deflate, br",
        Referer: "https://home.m.jd.com/myJd/home.action",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1",
      },
    };
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`);
          console.log(`${$.name} API请求失败，请检查网路重试`);
        } else {
          if (data) {
            data = JSON.parse(data);
            userInfo = data.data.userInfo;
            if (data["retcode"] === 13) {
              return;
            }
            $.isLogin = true;
            if (data["retcode"] === 0) {
              $.nickName = userInfo.baseInfo.nickname || $.UserName;
            } else {
              $.nickName = $.UserName;
            }
          } else {
            console.log(`京东服务器返回空数据`);
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}