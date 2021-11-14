#!/usr/bin/env python3
# -*- coding: utf-8 -*
'''
项目名称: JD-Script / jd_zjd 
Author: Curtin
功能：微信小程序-赚京豆-瓜分10亿京豆自动助力，默认给账号1助力，多账号才能玩~
Date: 2021/6/25 下午9:16
TG交流 https://t.me/topstyle996
TG频道 https://t.me/TopStyle2021
updateTime: 2021.7.24 14:22
'''
# print("赚京豆-瓜分10亿京豆自动助力--活动已结束\nTG交流 https://t.me/topstyle996\nTG频道 https://t.me/TopStyle2021")
# exit(0)
#####
#ck 优先读取【JDCookies.txt】 文件内的ck  再到 ENV的 变量 JD_COOKIE='ck1&ck2' 最后才到脚本内 cookies=ck
cookies=''
#助力账号，填写pt_pin或用户名的值，如 zlzh = ['aaaa','xxxx','yyyy'] ,支持ENV export zlzh=['CurtinLV','xxxx','yyyy']
zlzh = ['Curtinlv', '买买买', '东哥']
#####



import os,sys
try:
    import requests
except Exception as e:
    print(e, "\n缺少requests 模块，请执行命令安装：python3 -m pip install requests")
    exit(3)
try:
    from jd_cookie import getJDCookie
    getCk = getJDCookie()
except:
    print("请先下载依赖脚本，\n下载链接：https://ghproxy.com/https://raw.githubusercontent.com/curtinlv/JD-Script/main/jd_tool_dl.py")
    sys.exit(3)
import time

requests.packages.urllib3.disable_warnings()
pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep
t = time.time()
aNum = 0
beanCount = 0

if "zlzh" in os.environ:
    if len(os.environ["zlzh"]) > 1:
        zlzh = os.environ["zlzh"]
        zlzh = zlzh.replace('[', '').replace(']', '').replace('\'', '').replace(' ', '').split(',')
        print("已获取并使用Env环境 zlzh:", zlzh)


# 开启助力任务
def starAssist(sid, headers):
    global aNum
    try:
        timestamp = int(round(t * 1000))
        url = 'https://api.m.jd.com/api?functionId=vvipclub_distributeBean_startAssist&body={%22activityIdEncrypted%22:%22' + sid + '%22,%22channel%22:%22FISSION_BEAN%22}&appid=swat_miniprogram&client=tjj_m&screen=1920*1080&osVersion=5.0.0&networkType=wifi&sdkName=orderDetail&sdkVersion=1.0.0&clientVersion=3.1.3&area=11&fromType=wxapp&timestamp=' + str(timestamp)
        requests.get(url=url, headers=headers, verify=False, timeout=30).json()
        aNum = 0
    except Exception as e:
        if aNum < 5:
            aNum += 1
            return starAssist(sid, headers)
        else:
            print("starAssist Error", e)
            exit(1)


#获取助力码
def getShareCode(headers):
    global assistStartRecordId, encPin, sid, aNum
    try:
        url = f'https://api.m.jd.com/api?functionId=distributeBeanActivityInfo&fromType=wxapp&timestamp={int(round(t * 1000))}'
        body = 'body=%7B%22paramData%22%3A%7B%22channel%22%3A%22FISSION_BEAN%22%7D%7D&appid=swat_miniprogram&client=tjj_m&screen=1920*1080&osVersion=5.0.0&networkType=wifi&sdkName=orderDetail&sdkVersion=1.0.0&clientVersion=3.1.3&area=11'
        responses = requests.post(url, headers=headers, data=body, verify=False, timeout=30).json()
        if responses['success']:
            data = responses['data']
            sid = data['id']
            encPin = data['encPin']
            try:
                assistStartRecordId = data['assistStartRecordId']
            except:
                starAssist(sid, header)
                return getShareCode(headers)
            aNum = 0
            return assistStartRecordId, encPin, sid
    except Exception as e:
        if aNum < 5:
            aNum += 1
            return getShareCode(headers)
        else:
            print("getShareCode Error", e)
            exit(2)

#设置请求头
def setHeaders(cookie):
    headers = {
        'Cookie': cookie,
        'content-type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip,compress,br,deflate',
        'Referer': 'https://servicewechat.com/wxa5bf5ee667d91626/148/page-frame.html',
        'Host': 'api.m.jd.com',
        'User-Agent': 'Mozilla/5.0 (iPhone CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.7(0x1800072d) NetType/WIFI Language/zh_CN'
    }

    return headers

def assist(ck, sid, eid, aid, user, name, a):
    global beanCount
    timestamp = int(round(t * 1000))
    headers = {
        'Cookie': ck + 'wxclient=gxhwx;ie_ai=1;',
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Referer': 'https://servicewechat.com/wxa5bf5ee667d91626/148/page-frame.html',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'api.m.jd.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.1(0x1800012a) NetType/WIFI Language/zh_CN',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-cn'
    }
    url = 'https://api.m.jd.com/api?functionId=vvipclub_distributeBean_assist&body=%7B%22activityIdEncrypted%22:%22' + sid + '%5Cn%22,%22assistStartRecordId%22:%22' + str(aid) + '%22,%22assistedPinEncrypted%22:%22' + eid + '%5Cn%22,%22channel%22:%22FISSION_BEAN%22%7D&appid=swat_miniprogram&client=tjj_m&screen=1920*1080&osVersion=5.0.0&networkType=wifi&sdkName=orderDetail&sdkVersion=1.0.0&clientVersion=3.1.3&area=1_72_4137_0&fromType=wxapp&timestamp=' + str(timestamp)
    resp = requests.get(url, headers=headers, verify=False, timeout=30).json()
    if resp['success']:
        print(f"用户{a}【{user}】助力【{name}】成功~")
        if resp['data']['assistedNum'] == 4:
            beanCount += 80
            print(f"{name}, 恭喜获得8毛京豆，以到账为准。")
            print("## 开启下一轮助力")
            starAssist(sid, header)
            getShareCode(header)
    else:
        print(f"用户{a}【{userNameList[a-1]}】没有助力次数了。")




#开始互助
def start():
    global header,cookiesList, userNameList
    print("微信小程序-赚京豆-瓜分助力")
    cookiesList, userNameList = getCk.iscookie()
    for ckname in zlzh:
        try:
            ckNum = userNameList.index(ckname)
        except Exception as e:
            try:
                ckNum = userNameList.index(ckname)
            except:
                print("请检查助力账号名称是否正确？提示：助力名字可填pt_pin的值、也可以填用户名。")
                exit(9)

        print(f"### 开始助力账号【{userNameList[int(ckNum)]}】###")

        header = setHeaders(cookiesList[int(ckNum)])
        getShareCode(header)
        starAssist(sid, header)
        getShareCode(header)
        a = 1
        for i, name in zip(cookiesList, userNameList):
            if a == ckNum+1:
                a += 1
            else:
                assist(i, sid, encPin, assistStartRecordId, name, userNameList[int(ckNum)], a)
                a += 1
        if beanCount > 0:
            print(f'\n### 本次累计获得{beanCount}京豆')

if __name__ == '__main__':
    start()