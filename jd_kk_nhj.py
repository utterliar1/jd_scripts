#!/usr/bin/env python3
# -*- coding: utf-8 -*
'''
项目名称: JD-Script / 测试
Author: Curtin
功能：自动完成所有任务，如没完成，多跑几次，账号一助力Curtinlv，其余助力账号一
Date: 2022/1/15 05:30
TG交流 https://t.me/topstyle996
TG频道 https://t.me/TopStyle2021
cron: 20 11,20 14-21 1 *
new Env('超级年货节 惊喜不打烊1.14-1.21')
活动入口：20:/#239s57fgLQaxO@，嚯！囤大牌年货，赢惊喜大奖
https://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity/5719961?activityId=dzlhkkkbblnt20220114&shareUuid=33df44d05fd54de391a30f8e6df273bf&adsource=null&shareuserid4minipg=wqdHuFdMJj0bcG7ysk0r8mwklxRrP5C78lmKjh9Mn4avAmNuF4i+OHS9NlRdtagP&shopid=1000001195&

'''
import requests
import os
import json
import random, string
import re
import sys
from time import sleep
import datetime
import time
from urllib.parse import quote, unquote, quote_plus
try:
    from jd_cookie import getJDCookie
    getCk = getJDCookie()
except:
    print("请先下载依赖脚本后执行一次，\n下载链接：https://ghproxy.com/https://raw.githubusercontent.com/curtinlv/JD-Script/main/jd_tool_dl.py")
    sys.exit(3)

g_name = '超级年货节 惊喜不打烊1.14-1.21'
get_url = 'https://gitee.com/curtinlv/Public/raw/master/kk/nhj.json'

# 是否发送通知, 关闭通知：export kk_vip_isNotice="false"
isNotice = "true"
# 设置休眠最大时长 ，如60秒，export kk_vip_sleep="60"
kk_vip_sleep = 30

allUserBean = {}

if "isNotice" in os.environ:
    if len(os.environ["kk_vip_isNotice"]) > 1:
        isNotice = os.environ["kk_vip_isNotice"]

if "kk_vip_sleep" in os.environ:
    if len(os.environ["kk_vip_sleep"]) > 0:
        kk_vip_sleep = float(os.environ["kk_vip_sleep"])


# 如果您有UA可填
UserAgent = ''
activityId='dzlhkkkbblnt20220114'
activityshopid='1000001195'
jdActivityId='10713953'
random_num = '3293765'

master_shareUuid = '33df44d05fd54de391a30f8e6df273bf'
master_shareuserid4minipg = 'wqdHuFdMJj0bcG7ysk0r8mwklxRrP5C78lmKjh9Mn4avAmNuF4i+OHS9NlRdtagP'

# url
main_host='https://lzdz1-isv.isvjcloud.com'

#1 getpin
getMyPing_url = 'https://lzdz1-isv.isvjcloud.com/customer/getMyPing'
#2 getUserInfo
getUserInfo_url = 'https://lzdz1-isv.isvjcloud.com/wxActionCommon/getUserInfo'
#3
accessLogWithAD_url = 'https://lzdz1-isv.isvjcloud.com/common/accessLogWithAD'
pageUrl = 'https://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity/'
#4 活动活动详情
activityContent_url = 'https://lzdz1-isv.isvjcloud.com/dingzhi/linkgame/activity/content'
#5 关注
followshop_url = 'https://lzdz1-isv.isvjcloud.com/dingzhi/opencard/follow/shop'
#6 加购
addCart_url = 'https://lzdz1-isv.isvjcloud.com/dingzhi/opencard/addCart'
#7 开卡
checkOpenCard_url = 'https://lzdz1-isv.isvjcloud.com/dingzhi/linkgame/checkOpenCard' # 检测开卡状态
#8 领券获取金币
sendAllCoupon_url = 'https://lzdz1-isv.isvjcloud.com/dingzhi/linkgame/sendAllCoupon'
#9 获取金牌信息
list_url = 'https://lzdz1-isv.isvjcloud.com/dingzhi/linkgame/rank/list'
#10 浏览
browseShops_url = 'https://lzdz1-isv.isvjcloud.com/dingzhi/opencard/browseShops'
#11 访问记录
insertCrmPageVisit_url = 'https://lzdz1-isv.isvjcloud.com/crm/pageVisit/insertCrmPageVisit'
writePersonInfo_url = 'https://lzdz1-isv.isvjcloud.com/interaction/write/writePersonInfo'
#12 抽奖
draw_url = 'https://lzdz1-isv.isvjcloud.com/dingzhi/opencard/draw'
#13 奖品
record_url = 'https://lzdz1-isv.isvjcloud.com/dingzhi/linkgame/draw/record'
#14
assist_status_url ='https://lzdz1-isv.isvjcloud.com/dingzhi/linkgame/assist/status'
assist_url ='https://lzdz1-isv.isvjcloud.com/dingzhi/linkgame/assist'

# token
isvObfuscator_body = f'body=%7B%22url%22:%22https:%5C/%5C/lzdz1-isv.isvjcloud.com%22,%22id%22:%22%22%7D&build=167870&client=apple&clientVersion=10.2.4&d_brand=apple&d_model=iPhone10,3&ef=1&ep=%7B%22ciphertype%22:5,%22cipher%22:%7B%22screen%22:%22CJOyDIeyDNC2%22,%22wifiBssid%22:%22{random_num}=%22,%22osVersion%22:%22CJGkCm==%22,%22area%22:%22CJvpCJYmCV8zDtCzXzYzCtGz%22,%22openudid%22:%22ENK5DNK5Y2TuDWTsEQOmZwO4ZwZwDNOzDzrtCWPwZJunYtqmDzVrZK==%22,%22uuid%22:%22%22%7D,%22ts%22:1642168167,%22hdid%22:%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=%22,%22version%22:%221.0.3%22,%22appname%22:%22com.360buy.jdmobile%22,%22ridx%22:-1%7D&ext=%7B%22prstate%22:%220%22%7D&isBackground=N&partner=TF&rfs=0000&scope=01&sign=6d8df3d5ca7c31c71f759394f4a9b385&st=1642168175902&sv=120'
# 获取请求头
buildheaders_url = f'https://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activityhttps://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity/{random_num}?activityId={activityId}&'


def printf(*args):
    text = ''
    for i in args:
        text += str(i)
    print(text)
    sys.stdout.flush()

def wait_time(a, b, msg=None):
    s1 = random.randint(a,b)
    s2 = random.randint(3,9)
    time_s = float(f'{s1}.{s2}')
    if msg:
        printf(f"{msg}\t等待时间：{time_s}s")
    time.sleep(time_s)


## 获取通知服务
class msg(object):
    def __init__(self, m):
        self.str_msg = m
        self.message()
    def message(self):
        global msg_info
        print(self.str_msg)
        try:
            msg_info = "{}\n{}".format(msg_info, self.str_msg)
        except:
            msg_info = "{}".format(self.str_msg)
        sys.stdout.flush()
    def getsendNotify(self, a=0):
        if a == 0:
            a += 1
        try:
            url = 'https://gitee.com/curtinlv/Public/raw/master/sendNotify.py'
            response = requests.get(url)
            if 'curtinlv' in response.text:
                with open('sendNotify.py', "w+", encoding="utf-8") as f:
                    f.write(response.text)
            else:
                if a < 5:
                    a += 1
                    return self.getsendNotify(a)
                else:
                    pass
        except:
            if a < 5:
                a += 1
                return self.getsendNotify(a)
            else:
                pass
    def main(self):
        global send
        cur_path = os.path.abspath(os.path.dirname(__file__))
        sys.path.append(cur_path)
        if os.path.exists(cur_path + "/sendNotify.py"):
            try:
                from sendNotify import send
            except:
                self.getsendNotify()
                try:
                    from sendNotify import send
                except:
                    print("加载通知服务失败~")
        else:
            self.getsendNotify()
            try:
                from sendNotify import send
            except:
                print("加载通知服务失败~")
        ###################
msg("").main()
def userAgent():
    """
    随机生成一个UA
    :return:
    """
    if not UserAgent:
        uuid = ''.join(random.sample('123456789abcdef123456789abcdef123456789abcdef123456789abcdef', 40))
        iosVer = ''.join(random.sample(["14.5.1", "msg14.4", "14.3", "14.2", "14.1", "14.0.1", "13.7", "13.1.2", "13.1.1"], 1))
        iPhone = ''.join(random.sample(["8", "9", "10", "11", "12", "13"], 1))
        return f'jdapp;iPhone;10.0.4;{iosVer};{uuid};network/wifi;ADID/8679C062-A41A-4A25-88F1-50A7A3EEF34A;model/iPhone{iPhone},1;addressid/3723896896;appBuild/167707;jdSupportDarkMode/0'
    else:
        return UserAgent


def isvObfuscator(ck):
    headers = {
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'JD4iPhone/167870%20(iPhone;%20iOS;%20Scale/3.00)',
        'Cookie': ck,
        'Host': 'api.m.jd.com',
        'Referer': '',
        'Accept-Language': 'zh-Hans-CN;q=1',
        'Accept': '*/*'
    }
    url = 'https://api.m.jd.com/client.action?functionId=isvObfuscator'

    resp = requests.post(url=url, headers=headers, timeout=30, data=isvObfuscator_body).json()
    if resp['code'] == '0':
        return resp['token']
    else:
        return ''


def buildheaders(ck, shareUuid, shareuserid4minipg):
    sid = ''.join(random.sample('123456789abcdef123456789abcdef123456789abcdef123456789abcdef', 32))
    # url = buildheaders_url + f'shareUuid={shareUuid}&adsource=null&shareuserid4minipg={shareuserid4minipg}&shopid={activityshopid}&sid={sid}&un_area='
    url = f'https://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity/{random_num}?activityId={activityId}&shareUuid={shareUuid}&adsource=null&shareuserid4minipg={shareuserid4minipg}&shopid=undefined'
    headers = {
        'Accept-Encoding': 'gzip, deflate, br',
        'Cookie': ck,
        'Connection': 'keep-alive',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Host': 'lzdz1-isv.isvjcloud.com',
        'User-Agent': userAgent(),
        'Accept-Language': 'zh-cn'
    }
    resp = requests.get(url, headers)
    LZ_TOKEN = re.findall(r'(LZ_TOKEN_KEY=.*?;).*?(LZ_TOKEN_VALUE=.*?;)', resp.headers['Set-Cookie'])
    return LZ_TOKEN[0][0]+LZ_TOKEN[0][1]

def getMyPing(cookie, token):
    sid = ''.join(random.sample('123456789abcdef123456789abcdef123456789abcdef123456789abcdef', 32))
    url = getMyPing_url
    headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': main_host,
        'User-Agent': userAgent(),
        'Cookie': cookie,
        'Host': 'lzdz1-isv.isvjcloud.com',
        'Referer': buildheaders_url,
        'Accept-Language': 'zh-cn',
        'Accept': 'application/json'
    }
    body = f'userId={activityshopid}&token={token}&fromType=APP'
    resp = requests.post(url=url, headers=headers, timeout=30, data=body)
    try:
        nickname = resp.json()['data']['nickname']
        secretPin = resp.json()['data']['secretPin']
        headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://lzdz1-isv.isvjcloud.com',
            'User-Agent': userAgent(),
            'Cookie': cookie,
            'Host': 'lzdz1-isv.isvjcloud.com',
            'Referer': buildheaders_url,
            'Accept-Language': 'zh-cn',
            'Accept': 'application/json'
        }
        return headers, nickname, secretPin
    except Exception as e:
        # printf("建议请稍等再试~", e)
        return False, False, False

def accessLog(headers,pin, shareUuid, shareuserid4minipg):
    try:
        sid = ''.join(random.sample('123456789abcdef123456789abcdef123456789abcdef123456789abcdef', 32))
        # accbody = f'venderId={activityshopid}&code=99&pin={quote(pin)}&activityId={activityId}&pageUrl={pageUrl}{random_num}?activityId={activityId}&shareUuid={shareUuid}&adsource=null&shareuserid4minipg={quote(shareuserid4minipg)}&shopid={activityshopid}&sid=&un_area=&subType=app&adSource=null'
        accbody = f'venderId={activityshopid}&code=99&pin={quote(pin)}&activityId={activityId}&pageUrl=https%3A%2F%2Flzdz1-isv.isvjcloud.com%2Fdingzhi%2Fcustomized%2Fcommon%2Factivity%3FactivityId={activityId}&sid={sid}&un_area=&subType=app&adSource='
        url = accessLogWithAD_url
        resp = requests.post(url=url, headers=headers, timeout=30, data=accbody)
        if resp.status_code == 200:
            LZ_TOKEN = re.findall(r'(LZ_TOKEN_KEY=.*?;).*?(LZ_TOKEN_VALUE=.*?;)', resp.headers['Set-Cookie'])
            headers = {
                'X-Requested-With': 'XMLHttpRequest',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://lzdz1-isv.isvjcloud.com',
                'User-Agent': userAgent(),
                'Cookie': LZ_TOKEN[0][0] + LZ_TOKEN[0][1],
                'Host': 'lzdz1-isv.isvjcloud.com',
                'Referer': buildheaders_url,
                'Accept-Language': 'zh-cn',
                'Accept': 'application/json'
            }
            return headers
        else:
            return headers
    except Exception as e:
        printf(e)
        return headers

def writePersonInfo(header, pin):
    try:
        url = writePersonInfo_url
        body = f'jdActivityId={jdActivityId}&pin={quote(pin)}&actionType=4&venderId={activityshopid}&activityId={activityId}'
        resp = requests.post(url=url, headers=header, timeout=30, data=body)
        if resp.status_code == 200:
            pass
    except Exception as e:
        print("writePersonInfo",e)


# 访问记录
def insertCrmPageVisit(header, pin,shop_value):
    url = insertCrmPageVisit_url
    body = f'venderId={activityshopid}&elementId={shop_value}&pageId={activityId}&pin={quote(pin)}'
    resp = requests.post(url=url, headers=header, timeout=30, data=body)
    if resp.status_code == 200:
        resp = resp.json()
        if resp['result']:
            printf(f"insertCrmPageVisit ok")
    else:
        pass

# 助力
def assist(header, pin,shareUuid):
    url = assist_url
    body = f'activityId={activityId}&pin={quote(pin)}&shareUuid={shareUuid}'
    resp = requests.post(url=url, headers=header, timeout=30, data=body)
    if resp.status_code == 200:
        pass
    else:
        pass
    wait_time(2, 3)
    url = assist_status_url
    body = f'activityId={activityId}&pin={quote(pin)}&shareUuid={shareUuid}'
    resp = requests.post(url=url, headers=header, timeout=30, data=body)

    if resp.status_code == 200:
        pass
    else:
        pass

def activityContent(header, pin, shareUuid, pinImg, nick, shareuserid4minipg, agin=1):
    url = activityContent_url
    try:
        pinImg = quote_plus(pinImg)
    except:
        pinImg = ''
    body = f'activityId={activityId}&pin={quote(pin)}&pinImg={pinImg}&nick={quote(nick)}&cjyxPin=&cjhyPin=&shareUuid='
    header['Cookie'] += f'AUTH_C_USER={quote(pin)};'
    # header['Content-Length'] = 329
    header['Referer'] = f'https://lzdz1-isv.isvjcloud.com/dingzhi/customized/common/activity/{random_num}?activityId={activityId}&shareUuid={shareUuid}&adsource=null&shareuserid4minipg={quote(shareuserid4minipg)}&shopid={activityshopid}&'
    try:
        resp = requests.post(url=url, headers=header, data=body)
        if resp.status_code == 200:
            resp = resp.json()
            actorUuid = resp['data']['actor']['actorUuid']
            shareTitle = resp['data']['activity']['shareTitle']
            score = resp['data']['actor']['score']
            return actorUuid, shareTitle, score
        else:
            printf(f"activityContent req [{resp.text}]")
            return 0, '', 0
    except Exception as e:
        if agin > 6:
            return 0, '', 0
        else:
            wait_time(30, 60, f"获取助力码失败，尝试重新获取{agin}")
            agin += 1
            return activityContent(header, pin, shareUuid, pinImg, nick, shareuserid4minipg, agin=agin)
        # printf(f"activityContent {e}")



def getUserInfo(header, pin):
    url = getUserInfo_url
    body = 'pin=' + quote(pin)
    resp = requests.post(url=url, headers=header, data=body).json()
    yunMidImageUrl = resp['data']['yunMidImageUrl']
    nickname = resp['data']['nickname']
    secretPin = resp['data']['secretPin']
    return yunMidImageUrl, secretPin, nickname

def checkOpenCard(header, pin):
    url = checkOpenCard_url
    body = f'pin={quote(pin)}&activityId={activityId}'
    allShopID = []
    try:
        resp = requests.post(url=url, headers=header, data=body).json()
        # printf(json.dumps(resp, indent=4, ensure_ascii=False))
        if resp['result']:
            # 检测是否完成开卡任务
            allShopID
            openCardList = resp['data']['openCardList']
            for i in openCardList:
                allShopID.append(i['venderId'])
            if resp['data']['allOpenCard']:
                printf("\t😆已完成开卡任务")
                return [], [], allShopID
            else:
                venderIdList = []
                channelList = []
                for i in openCardList:
                    if i['status'] == 0:
                        toUrl = i['toUrl']
                        venderId = re.findall(r'venderId=(\d+)', toUrl)[0]
                        channel = re.findall(r'channel=(\d+)', toUrl)[0]
                        venderIdList.append(venderId)
                        channelList.append(channel)
                return venderIdList, channelList, allShopID
        else:
            printf(resp['errorMessage'])
            return [], [], allShopID
    except Exception as e:
        printf(f"checkOpenCard[{e}]")
        return [], [], allShopID


# 抽奖
def draw(header, pin, actorUuid, user):
    url = draw_url
    # body = f'activityId={activityId}&pin={quote(pin)}&{actorUuid}'
    body = f'activityId={activityId}&actorUuid={actorUuid}&pin={quote(pin)}'
    try:
    # printf("去抽奖！")
        resp = requests.post(url=url, headers=header, data=body)
        # printf(resp.status_code)
        if resp.status_code == 200:
            resp = resp.json()
            if resp['data']['drawOk']:
                printf(f"\t☺️[{user}]抽奖获得: {resp['data']['name']}️")
            else:
                printf(f"\t😭 没中奖~ [{resp['data']['name']}] {resp['data']['errorMessage']}")
        else:
            printf(f"{resp.text}")
    except Exception as e:
        printf(f"draw [{e}]")

# 奖品统计
def record(header, pin, actorUuid,user):
    global allUserBean
    url = record_url
    body = f'activityId={activityId}&pin={quote(pin)}&{actorUuid}'
    try:
        resp = requests.post(url=url, headers=header, data=body)
        if resp.status_code == 200:
            resp = resp.json()
            if resp['result']:
                recordList = resp['data']['recordList']
                if recordList:
                    for i in recordList:
                        if '京豆' in i['infoName']:
                            beanNum = re.findall(r'(\d+)', i['infoName'])[0]
                            try:
                                allUserBean[f"{user}"] += int(beanNum)
                            except:
                                allUserBean[f"{user}"] = int(beanNum)
                        else:
                            try:
                                allUserBean[f'{user}_yes'] += '+' + i['infoName']
                            except:
                                allUserBean[f'{user}_yes'] = i['infoName']
            else:
                printf(resp.text)
    except Exception as e:
        printf(f"record [{e}]")

# 关注
def followShop(header, pin, user):
    url = followshop_url
    body = f'activityId={activityId}&pin={quote(pin)}'
    printf("#去完成关注任务~")
    resp = requests.post(url=url, headers=header, data=body).json()
    if resp['result']:
        printf(f"已完成关注任务")
        addScore = resp['data']['addScore']
        addBeanNum = resp['data']['addBeanNum']
        if addScore > 0:
            printf(f"\t☺️关注获得: {resp['data']['addScore']} 金币️")
        if addBeanNum > 0:
            printf(f"\t☺️关注获得: {resp['data']['addScore']} 京豆️")
    else:
        printf(f"\t😆{resp['errorMessage']}")
# 浏览
def browseShops(header, pin, shop_value):
    try:
        printf(f"#去做浏览任务 {shop_value}")
        insertCrmPageVisit(header, pin, f'%E5%BA%97%E9%93%BA{shop_value}')
        wait_time(1, 2)
        writePersonInfo(header, pin)
        wait_time(2, 3, "模拟浏览任务")
        url = browseShops_url
        body = f'activityId={activityId}&pin={quote(pin)}&value={shop_value}'
        resp = requests.post(url=url, headers=header, data=body)
        if resp.status_code == 200:
            resp = resp.json()
            if resp['result']:
                printf(f"已完成浏览任务 {shop_value}")
                addScore = resp['data']['addScore']
                addBeanNum = resp['data']['addBeanNum']
                if addScore > 0:
                    printf(f"\t☺️浏览获得: {resp['data']['addScore']} 金币️")
                if addBeanNum > 0:
                    printf(f"\t☺️浏览获得: {resp['data']['addScore']} 京豆️")
            else:
                printf(f"\t😆{resp['errorMessage']}")
        else:
            printf(f"\t😆browseShops[{resp.text}]")
    except Exception as e:
        printf(f"browseShops, {e}")

# 加购
def addCart(header, pin, user):
    url = addCart_url
    body = f'activityId={activityId}&pin={quote(pin)}'
    printf("#去完成加购任务~")
    resp = requests.post(url=url, headers=header, data=body).json()
    if resp['result']:
        printf(f"已完成加购任务")
        addScore = resp['data']['addScore']
        addBeanNum = resp['data']['addBeanNum']
        if addScore > 0:
            printf(f"\t☺️加购获得: {resp['data']['addScore']} 金币️")
        if addBeanNum > 0:
            printf(f"\t☺️加购获得: {resp['data']['addScore']} 京豆️")
    else:
        printf(f"\t😆{resp['errorMessage']}")

# 领券获取金币
def sendAllCoupon(header, pin, user):
    url = sendAllCoupon_url
    body = f'activityId={activityId}&pin={quote(pin)}'
    printf("#去完成领券任务~")
    resp = requests.post(url=url, headers=header, data=body).json()
    if resp['result']:
        printf(f"已完成领券任务")
        addScore = resp['data']['addScore']
        # addBeanNum = resp['data']['addBeanNum']
        if addScore > 0:
            printf(f"\t☺️加购获得: {resp['data']['addScore']} 金币️")
    else:
        printf(f"\t😆{resp['errorMessage']}")

# 获取金牌信息
def getlist(header, pin, user):
    url = list_url
    scoreTotal, myRank = 0, 0
    body = f'activityId={activityId}&pin={quote(pin)}'
    resp = requests.post(url=url, headers=header, data=body)
    if resp.status_code == 200:
        resp = resp.json()
        if resp['result']:
            scoreTotal = resp['data']['scoreTotal']
            myRank = resp['data']['myRank']
            return scoreTotal, myRank
        else:
            printf(f"\t😆{resp['errorMessage']}")
            return scoreTotal, myRank
    else:
        printf("getlist Error")
        return scoreTotal, myRank


def getShopOpenCardInfo(ck, venderId, channe, headers):
    url = f'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22{venderId}%22%2C%22payUpShop%22%3Atrue%2C%22channel%22%3A{channe}%7D&client=H5&clientVersion=9.2.0&uuid=88888'
    sleep(0.5)
    # resp = requests.get(url=url, headers=headers).json()
    aginNum = 0
    while True:
        resp = requests.get(url=url, headers=headers)
        if resp.status_code == 200:
            break
        aginNum += 1
        if aginNum > 20:
            printf("开卡异常，请稍后再试~")
            break
        wait_time(3, 10, "店铺信息获取失败")
    resp = resp.json()
    venderCardName = resp['result']['shopMemberCardInfo']['venderCardName']  # 店铺名称
    printf(f'\t去开卡：{venderCardName}')
    if resp['result']['interestsRuleList']:
        activityId = resp['result']['interestsRuleList'][0]['interestsInfo']['activityId']
        return activityId
    else:
        return None

def bindWithVender(ck, venderIdList, channelList,pin,header):
    headers = {
        'Cookie': ck,
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Referer': 'https://shopmember.m.jd.com/',
        'Accept-Encoding': 'gzip, deflate, br',
        'Host': 'api.m.jd.com',
        'User-Agent': userAgent(),
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9'
    }
    for v, c in zip(venderIdList, channelList):
        insertCrmPageVisit(header, pin, "%E5%85%A5%E4%BC%9A%E8%B7%B3%E8%BD%AC")
        wait_time(0,1)
        act = getShopOpenCardInfo(ck, v, c, headers)
        if act:
            bindWithVender_url = f'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=%7B%22venderId%22%3A%22{v}%22%2C%22shopId%22%3A%22{v}%22%2C%22bindByVerifyCodeFlag%22%3A1%2C%22registerExtend%22%3A%7B%7D%2C%22writeChildFlag%22%3A0%2C%22activityId%22%3A{act}%2C%22channel%22%3A{c}%7D&client=H5&clientVersion=9.2.0&uuid=88888&'
        else:
            bindWithVender_url = f'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=%7B%22venderId%22%3A%22{v}%22%2C%22bindByVerifyCodeFlag%22%3A1%2C%22registerExtend%22%3A%7B%7D%2C%22writeChildFlag%22%3A0%2C%22channel%22%3A{c}%7D&client=H5&clientVersion=9.2.0&uuid=88888'
        resp = requests.get(url=bindWithVender_url, headers=headers).json()
        if resp['success']:
            printf(f"\t\t└{resp['message']}, [{resp}]")
        else:
            pass


def gettext(url):
    try:
        resp = requests.get(url, timeout=60).text
        if '该内容无法显示' in resp:
            return gettext(url)
        return resp
    except Exception as e:
        printf(e)

def isUpdate():
    global hdtitle, isEnable, readme, code, footer

    try:
        result = gettext(get_url)
        result = json.loads(result)
        hdtitle = result['title']
        isEnable = result['isEnable']
        readme = result['readme']
        code = result['code']
        footer = result['footer']
        if isEnable == 0:
            code = code.split('#')
            s = random.randint(0, len(code) - 1)
            return True, hdtitle, readme, code[s], footer
        else:
            return False, hdtitle, readme, code, footer
    except:
        return False, f'{g_name}', '', f'{master_shareUuid}&{master_shareuserid4minipg}', 'TG频道 https://t.me/TopStyle2021\n活动入口：20:/#239s57fgLQaxO@，嚯！囤大牌年货，赢惊喜大奖'




def start():
    global shareuserid4minipg, Masternickname, one_shareUuid, one_shareuserid4minipg, one_name
    if datetime.datetime.now() > datetime.datetime.strptime('2022-1-22', "%Y-%m-%d"):
        printf("活动结束\n请删掉脚本")
        exit(3)
    isok, hdtitle, readme, code, footer = isUpdate()
    if not isok and readme:
        printf(readme)
        exit(0)
    printf(f"开始：【{hdtitle}】")
    one_name = '仅账号一作者 Curtin，其他全部助力账号一'
    one_shareUuid = code.split("&")[0]
    one_shareuserid4minipg = code.split("&")[1]
    cookieList, nameList = getCk.iscookie()
    a = 1
    for ck, user in zip(cookieList, nameList):
        try:
            printf(f"##☺️账号{a}[{user}]，您好!")
            printf(f"\t└助力：[{one_name}] 助力码：{one_shareUuid}")
            try:
                cookie = buildheaders(ck, one_shareUuid, one_shareuserid4minipg)
                wait_time(1, 1)
                token = isvObfuscator(ck)
            except:
                printf(f"️##😭账号{a}【{user}】获取token异常, ip有可能给限制了~")
                a += 1
                continue
            wait_time(1, 2)
            try:
                header, nickname, pin = getMyPing(cookie, token)
            except:
                printf(f"️##😭账号{a}【{user}】暂无法参加活动~")
                a += 1
                continue
            wait_time(1, 3)
            # try:
            yunMidImageUrl, pin, nickname = getUserInfo(header, pin)
            wait_time(1, 3)
            header = accessLog(header, pin, one_shareUuid, one_shareuserid4minipg)
            wait_time(1, 2)
            # 关注
            followShop(header, pin, user)
            wait_time(1, 2)
            # 加购
            addCart(header, pin, user)
            wait_time(2, 4)
            #领券获取金币
            wait_time(2, 4)
            sendAllCoupon(header, pin, user)
            # 开卡
            printf("#去完成开卡任务~")
            venderIdList, channelList, allShopID = checkOpenCard(header, pin)
            wait_time(1, 3)
            bindWithVender(ck, venderIdList, channelList, pin, header)
            # 浏览任务
            browseShops(header, pin, allShopID[random.randint(0, 9)])
            # for i in allShopID:
                # wait_time(10, 11, "浏览任务")
                # browseShops(header, pin, i)
            wait_time(2, 3)
            # 抽奖
            # header = accessLog(header, pin, one_shareUuid, one_shareuserid4minipg)
            wait_time(1, 2)
            actorUuid, shareTitle, score = activityContent(header, pin, one_shareUuid, yunMidImageUrl, nickname, one_shareuserid4minipg)
            # printf(score)
            if score > 100:
                wait_time(2, 4, "点击抽奖")
                draw(header, pin, actorUuid, user)
            if a == 1:
                if actorUuid == 0:
                    printf("账号一获取助力码失败~，请重新尝试运行。")
                    exit(1)
                one_shareUuid = actorUuid
                one_shareuserid4minipg = pin
                one_name = user
            wait_time(1, 2)
            printf(f"## {user} 的助力码 {actorUuid}")
            assist(header, pin, one_shareUuid)
            if not a == len(cookieList):
                a += 1
                wait_time(kk_vip_sleep, kk_vip_sleep, "###休息一会")
        except Exception as e:
            printf(f"ERROR MAIN {e}")
            if a == 1:
                exit(0)
            a += 1
            continue

    a = 1
    printf("\n【收获统计】")
    scoreTotalList, myRankList, userList, scoreList = [],[],[],[]
    one_shareUuid = master_shareUuid
    one_shareuserid4minipg = master_shareuserid4minipg
    for ck, user in zip(cookieList, nameList):
        try:
            try:
                cookie = buildheaders(ck, one_shareUuid, one_shareuserid4minipg)
                wait_time(0, 1)
                token = isvObfuscator(ck)
            except:
                printf(f"️##😭账号{a}【{user}】获取token异常, ip有可能给限制了~")
                a += 1
                continue
            wait_time(0, 1)
            try:
                header, nickname, pin = getMyPing(cookie, token)
            except:
                printf(f"️##😭账号{a}【{user}】暂无法参加活动~")
                a += 1
                continue
            wait_time(0, 1)
            # try:
            # yunMidImageUrl, pin, nickname = getUserInfo(header, pin)
            wait_time(0, 1)
            actorUuid, shareTitle, score = activityContent(header, pin, one_shareUuid, '', nickname, one_shareuserid4minipg)
            # 获取金牌信息、排行榜
            scoreTotal, myRank = getlist(header, pin, user)
            scoreTotalList.append(scoreTotal)
            scoreList.append(score)
            myRankList.append(myRank)
            userList.append(user)
            # 奖品
            record(header, pin, actorUuid, user)
            if a == 1:
                one_shareUuid = actorUuid
                one_shareuserid4minipg = pin
                one_name = user
            a += 1
        except Exception as e:
            printf(f"抽奖统计 {e}")
            a += 1
            continue

    msg("*" * 40)
    allBean = 0
    allJiangpin = ""
    n = 0
    a = 1
    for u in userList:
        try:
            msg(f"账号{a}[{u}] \n\t└当前金币{scoreList[n]} 累计金币{scoreTotalList[n]} 排名{myRankList[n]}")
            for m in allUserBean:
                if m == u:
                    msg(f"\t\t└获得京豆: {allUserBean[u]}")
                    allBean += allUserBean[u]
                if m == f'{u}_yes':
                    msg(f"\t\t└获得奖品: {allUserBean[f'{u}_yes']}")
                    allJiangpin += "+" + allUserBean[f'{u}_yes']
            a += 1
            n += 1
        except:
            a += 1
            n += 1
            continue
    if allBean > 0:
        msg(f"总获得京豆: {allBean} ")
    if allJiangpin:
        msg(f"总获得奖品: {allJiangpin}")
    msg("*" * 40)
    msg(footer)
    if isNotice == "true":
        send(shareTitle, msg_info)

if __name__ == '__main__':
    start()