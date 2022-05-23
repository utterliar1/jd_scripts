/**
汪汪乐园-跑步+组队
默认翻倍到0.04红包结束,修改请设置变量
export JD_JOY_PARK_RUN_ASSETS="0.04"
cron:20 * * * *
20 * * * * jd_joy_park_run.ts
new Env('极速版汪汪赛跑');

**/

// import {get, post, o2s, requireConfig, wait} from './function/TS_USER_AGENTS'
// import {H5ST} from "./function/h5st"
// import {existsSync, readFileSync} from "fs";
// import {getDate} from "date-fns";
const {get, post, o2s, requireConfig, wait} = require("./TS_USER_AGENTS");
const {existsSync, readFileSync} = require("fs");
const {H5ST} = require("./utils/h5st");
const {getDate} = require("date-fns");

let cookie = '', res = '', UserName = '', fp_448de = '' || process.env.FP_448DE, fp_b6ac3 = '' || process.env.FP_B6AC3
let assets = 0, captainId = '', h5stTool = null

!(async () => {
  let cookiesArr = await requireConfig()
  let account = []


  for (let [index, value] of cookiesArr.entries()) {
    cookie = value
    UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1])
    console.log(`\n开始【京东账号${index + 1}】${UserName}\n`)

  

    assets = parseFloat(process.env.JD_JOY_PARK_RUN_ASSETS || '0.04')
    let rewardAmount = 0
    try {
      h5stTool = new H5ST('448de', 'jdltapp;', fp_448de)
      await h5stTool.__genAlgo()
      res = await team('runningMyPrize', {"linkId": "L-sOanK_5RJCz7I314FpnQ", "pageSize": 20, "time": null, "ids": null})
      let sum = 0, success = 0
      rewardAmount = res.data.rewardAmount
      if (res.data.runningCashStatus.currentEndTime && res.data.runningCashStatus.status === 0) {
        console.log('可提现', rewardAmount)
        res = await api('runningPrizeDraw', {"linkId": "L-sOanK_5RJCz7I314FpnQ", "type": 2})
        await wait(2000)
        if (res.success){
               console.log(res.data.message)
           } else {
                console.log('提现失败：', res.errMsg)
             }
      }

      for (let t of res?.data?.detailVos || []) {
        if (t.amount > 0 && getDate(new Date(t.createTime)) === new Date().getDate()) {
          sum = add(sum, t.amount)
          success++
        } else {
          break
        }
      }
      console.log('今日成功', success, '次')
      console.log('今日收益', sum, '元')

      res = await team('runningTeamInfo', {"linkId": "L-sOanK_5RJCz7I314FpnQ"})
      if (!captainId) {
        if (res.data.members.length === 0) {
          console.log('成为队长')
          captainId = res.data.captainId
        } else if (res.data.members.length !== 6) {
          console.log('队伍未满', res.data.members.length, '人')
          console.log('战队收益', res.data.teamSumPrize, '元')
          captainId = res.data.captainId
        } else {
          console.log('队伍已满', res.data.members.length, '人')
          console.log('战队收益', res.data.teamSumPrize, '元')
        }
      } else if (captainId && res.data.members.length === 0) {
        console.log('已有组队ID，未加入队伍')
        res = await team('runningJoinTeam', {"linkId": "L-sOanK_5RJCz7I314FpnQ", "captainId": captainId})
        if (res.code === 0) {
          console.log('组队成功')
          for (let member of res.data.members) {
            if (member.captain) {
              console.log('队长', member.nickName)
              break
            }
          }
          if (res.data.members.length === 6) {
            console.log('队伍已满')
            captainId = ''
          }
        } else {
          o2s(res, '组队失败')
        }
      } else {
        console.log('已组队', res.data.members.length, '人')
        console.log('战队收益', res.data.teamSumPrize, '元')
      }


      h5stTool = new H5ST('b6ac3', 'jdltapp;', fp_b6ac3)
      await h5stTool.__genAlgo()
      res = await runningPageHome()
      console.log('🧧总金额', res.data.runningHomeInfo.prizeValue, '元')
      
      let energy = res.data.runningHomeInfo.energy
      console.log('💊 X', res.data.runningHomeInfo.energy, '个能量棒') 
      await wait(2000)
      if (res.data.runningHomeInfo.nextRunningTime){
      console.log('⏳体力恢复中，还有', secondsToMinutes(res.data.runningHomeInfo.nextRunningTime / 1000))
        if (res.data.runningHomeInfo.nextRunningTime / 1000 < 300) {
          await wait(res.data.runningHomeInfo.nextRunningTime)
          res = await runningPageHome()
          console.log('体力恢复完成，开始跑步....')
          await wait(1000)
        } else {
            console.log('⏳等体力恢复在跑吧！');
            continue;
               }
      } else {
          console.log('体力已恢复，开始跑步....')
      }

      await startRunning(res, assets)
      for (let i = 0; i < energy; i++) {
        console.log('💉消耗能量棒跑步....')
        res = await api('runningUseEnergyBar', {"linkId": "L-sOanK_5RJCz7I314FpnQ"})
        //console.log(res.errMsg)
        res = await runningPageHome()
        await startRunning(res, assets)
        await wait(1000)
      }
      res = await runningPageHome()
      console.log('🧧总金额', res.data.runningHomeInfo.prizeValue, '元')
      await wait(2000)
    } catch (e) {
      console.log('Error', e)
      await wait(3000)
    }
  }
})()

async function startRunning(res, assets) {
  if (!res.data.runningHomeInfo.nextRunningTime) {
    console.log('终点目标', assets)
    for (let i = 0; i < 5; i++) {
      res = await api('runningOpenBox', {"linkId": "L-sOanK_5RJCz7I314FpnQ"})
      if (parseFloat(res.data.assets) >= assets) {
        let assets = parseFloat(res.data.assets)
        res = await api('runningPreserveAssets', {"linkId": "L-sOanK_5RJCz7I314FpnQ"})
        console.log('领取成功', assets)
        break
      } else {
        if (res.data.doubleSuccess) {
          console.log('翻倍成功', parseFloat(res.data.assets))
          await wait(10000)
        } else if (!res.data.doubleSuccess && !res.data.runningHomeInfo.runningFinish) {
          console.log('开始跑步', parseFloat(res.data.assets))
          await wait(10000)
        } else {
          console.log('翻倍失败')
          break
        }
      }
    }
  }
  await wait(3000)
}

async function api(fn, body) {
  let timestamp = Date.now(), h5st = ''
  if (fn === 'runningOpenBox') {
    h5st = h5stTool.__genH5st({
      appid: "activities_platform",
      body: JSON.stringify(body),
      client: "ios",
      clientVersion: "3.1.0",
      functionId: "runningOpenBox",
      t: timestamp.toString()
    })
  }
  let params = `functionId=${fn}&body=${JSON.stringify(body)}&t=${timestamp}&appid=activities_platform&client=ios&clientVersion=3.1.0&cthr=1`
  h5st && (params += `&h5st=${h5st}`)
  return await post('https://api.m.jd.com/', params, {
    'authority': 'api.m.jd.com',
    'content-type': 'application/x-www-form-urlencoded',
    'cookie': cookie,
    'origin': 'https://h5platform.jd.com',
    'referer': 'https://h5platform.jd.com/',
    'user-agent': 'jdltapp;'
  })
}

async function runningPageHome() {
  return get(`https://api.m.jd.com/?functionId=runningPageHome&body=%7B%22linkId%22:%22L-sOanK_5RJCz7I314FpnQ%22,%22isFromJoyPark%22:true,%22joyLinkId%22:%22LsQNxL7iWDlXUs6cFl-AAg%22%7D&t=${Date.now()}&appid=activities_platform&client=ios&clientVersion=3.1.0`, {
    'Host': 'api.m.jd.com',
    'Origin': 'https://h5platform.jd.com',
    'User-Agent': 'jdltapp;',
    'Referer': 'https://h5platform.jd.com/',
    'Cookie': cookie
  })
}

async function team(fn, body) {
  let timestamp = Date.now(), h5st
  h5st = h5stTool.__genH5st({
    appid: "activities_platform",
    body: JSON.stringify(body),
    client: "ios",
    clientVersion: "3.1.0",
    functionId: fn,
    t: timestamp.toString()
  })
  return await get(`https://api.m.jd.com/?functionId=${fn}&body=${encodeURIComponent(JSON.stringify(body))}&t=${timestamp}&appid=activities_platform&client=ios&clientVersion=3.1.0&cthr=1&h5st=${h5st}`, {
    'Host': 'api.m.jd.com',
    'User-Agent': 'jdltapp;',
    'Origin': 'https://h5platform.jd.com',
    'X-Requested-With': 'com.jd.jdlite',
    'Referer': 'https://h5platform.jd.com/',
    'Cookie': cookie
  })
}

// 秒转时分秒
function secondsToMinutes(seconds) {
  let minutes = Math.floor(seconds / 60)
  let second = Math.floor(seconds % 60)
  return `${minutes}分${second}秒`
}

// 小数加法
function add(num1, num2) {
  let r1, r2
  try {
    r1 = num1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  let m = Math.pow(10, Math.max(r1, r2))
  return (num1 * m + num2 * m) / m
}