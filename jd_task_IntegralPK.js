let common = require("./utils/common")
let $ = new common.env("京东京享值PK");
let min = 3,
    help = process.env[$.filename(__filename)] || Math.min(min, process.env.JdMain) || min;
$.setOptions({
    headers: {
        'content-type': 'application/json',
        'user-agent': 'jdapp;iPhone;9.4.6;14.2;965af808880443e4c1306a54afdd5d5ae771de46;network/wifi;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone8,4;addressid/;supportBestPay/0;appBuild/167618;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'referer': 'https://happy.m.jd.com',
    }
});
eval(common.eval.mainEval($));
async function prepare() {
    $.actId = 9
    for (let i of cookies['all']) {
        $.setCookie(i);
        console.log(`正在获取${decodeURIComponent(i.match(/pt_pin=([^;]+)/)[1])}账户PK数据`)
        try {
            let params = {
                'url': 'https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=dafbe42d5bff9d82298e5230eb8c3f79',
                'form': ' '
            }
            await $.curl(params)
            let data = $.source.data;
            let n = cookies['all'].length > 2 ? 3 : 5;
            for (let i = 1; i < n; i++) {
                let fUrl = `https://pengyougou.m.jd.com/like/jxz/getUserFriendsPage?actId=9&pageNo=${i}&pageSize=10&appId=dafbe42d5bff9d82298e5230eb8c3f79&lkEPin=${data.lkEPin}`
                await $.curl(fUrl)
                for (let k of $.source.datas) {
                    let fScore = await getScore(k.friendPin);
                    $.code.push({
                        'score': fScore,
                        'friendPin': k.friendPin
                    })
                }
            }
        } catch (e) {}
    }
    $.code.sort($.compare("score"))
    console.log("当前获取助力人数", $.code.length)
}
async function main(id) {
    let code = [...$.code]
    let params = {
        'url': 'https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=dafbe42d5bff9d82298e5230eb8c3f79',
        'form': ' '
    }
    try {
        await $.curl(params)
        let data = $.source.data;
        $.lkEPin = data.lkEPin;
        $.lkToken = data.lkToken;
        let myScore = await getScore($.lkEPin);
        console.log("账户京享值:", myScore)
        let n = 0;
        let l = 0;
        for (let i in code) {
            if (myScore < code[i].score) {
                l = i;
                break;
            }
        }
        console.log("当前可战胜人数:", l)
        for (let k of code.slice(0, l).sort(function() {
                return 0.5 - Math.random();
            })) {
            if (n == 60) {
                break
            }
            console.log("互助京享值:", k.score);
            console.log("ε==(づ′▽`)づ")
            let lData = await launchBattle(k.friendPin)
            if (lData.msg == '今日次数已耗尽') {
                break
            }
            n++;
        }
        await getBoxRewardInfo();
    } catch (e) {
        console.log(e.message)
    }
}
async function getScore(lkEPin) {
    let myUrl = `https://jd.moxigame.cn/likejxz/getScore?actId=8&appId=dafbe42d5bff9d82298e5230eb8c3f79&lkEPin=${lkEPin}`
    await $.curl(myUrl)
    return $.source.data;
}
async function launchBattle(fpin) {
    // https://game-cdn.moxigame.cn/ClickEliminate/IntegralPK_jd/thirdapp/assets/main/index.31206.js
    // this._isNew ? (_ = u.StaticData.APPID, y = u.StaticData.md5Key, v = (new Date).getTime(), console.log(f), m = _ + "_" + y + "_" + JSON.stringify(o) + "_" + v, g = this._md5(m), e = e + "?appId=" + _ + "&lkEPin=" + (s.lkEPin ? s.lkEPin : c.userModel.getLkePin()) + "&lkToken=" + c.default.inst.getToken() + "&sign=" + g + "&t=" + v, i = a.HttpRequest.post(e, o, s, l, p)) : i = a.HttpRequest.post(e, o, s, l, p);
    // https://pengyougou.m.jd.com/open/api/like/jxz/launchBattle?appId=dafbe42d5bff9d82298e5230eb8c3f79&lkEPin=&lkToken=&sign=&t=1624788067191
    // {"actId":9,"recipient":"","relation":2}
    // let signtemp = "dafbe42d5bff9d82298e5230eb8c3f79_34e1e81ae8122ca039ec5738d33b4eee_" + `{"actId":${$.actId},"recipient":"${fpin}","relation":2}` + "_" + $.timestamp
    // let sign = $.md5(signtemp)
    let m = `dafbe42d5bff9d82298e5230eb8c3f79_34e1e81ae8122ca039ec5738d33b4eee_{"actId":${$.actId},"recipient":"${fpin}","relation":2}_${$.timestamp}`
    let sign = $.md5(m)
    let params = {
        'url': `https://pengyougou.m.jd.com/open/api/like/jxz/launchBattle?appId=dafbe42d5bff9d82298e5230eb8c3f79&lkEPin=${$.lkEPin}&lkToken=${$.lkToken}&sign=${sign}&t=${$.timestamp}`,
        'body': `{"actId":${$.actId},"recipient":"${fpin}","relation":2}`,
    }
    let h = await $.curl(params)
    console.log($.source.data)
    return $.source.data
}
async function getBoxRewardInfo() {
    let url = `https://pengyougou.m.jd.com/like/jxz/getBoxRewardInfo?actId=${$.actId}&appId=dafbe42d5bff9d82298e5230eb8c3f79&lkEPin=${$.lkEPin}`
    await $.curl(url);
    try {
        console.log("胜局:", $.source.data.totalWins)
        $.notice("胜局:" + $.source.data.totalWins)
        // console.log($.source.data.awards)
        for (let i of $.source.data.awards) {
            if (i.received == 0) {
                if ($.source.data.totalWins > i.wins) {
                    let reUrl = `https://pengyougou.m.jd.com/like/jxz/sendBoxReward?rewardConfigId=${i.id}&actId=${$.actId}&appId=dafbe42d5bff9d82298e5230eb8c3f79&lkEPin=${$.lkEPin}`
                    await $.curl(reUrl)
                    console.log($.source.datas)
                }
            }
        }
    } catch (e) {}
}
