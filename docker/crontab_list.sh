# 每3天的23:50分清理一次日志(互助码不清理，proc_file.sh对该文件进行了去重)
50 23 */3 * * find /scripts/logs -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
# 收集助力码
30 * * * * sh +x /scripts/docker/auto_help.sh collect >> /scripts/logs/auto_help_collect.log 2>&1

##############短期活动##############

# 萌虎摇摇乐
0 1,10,20 * * * node /scripts/jd_mhyyl.js >> /scripts/logs/jd_mhyyl.log 2>&1

# 通天塔签到共建
0 0,2 * * * node /scripts/jd_babel_sign.js >> /scripts/logs/jd_babel_sign.log 2>&1

# 京东超级盒子
17 2,15 9-25 1 * node /scripts/jd_cjhz.js >> /scripts/logs/jd_cjhz.log 2>&1

# 头文字J 助力
11 3,13 * * * node /scripts/jd_mpdzcar_help.js >> /scripts/logs/jd_mpdzcar_help.log 2>&1

# 头文字J 游戏
3 1,10,16 * * * node /scripts/jd_mpdzcar_game.js >> /scripts/logs/jd_mpdzcar_game.log 2>&1

# 头文子J
7 0,9 * * * node /scripts/jd_mpdzcar.js >> /scripts/logs/jd_mpdzcar.log 2>&1

# 城城领现金
3 0,5,9,13,17,22 9-21 1 * node /scripts/jd_city.js >> /scripts/logs/jd_city.log 2>&1

# 年货签到
6 1,13,23 * * * node /scripts/jd_nh_sign.js >> /scripts/logs/jd_nh_sign.log 2>&1

# 京东特价 翻翻乐
32 0,6-23 * * * node /scripts/jd_jdtj_winner.js >> /scripts/logs/jd_jdtj_winner.log 2>&1

# 京东通天塔--签到
6 0,15 * * * node /scripts/jd_m_sign.js >> /scripts/logs/jd_m_sign.log 2>&1

# 饭粒
5 0,5,15 * * * node /scripts/jd_fanli.js >> /scripts/logs/jd_fanli.log 2>&1

# 跳跳乐瓜分京豆 (什么时候结束)
# 1 0,9,15,21 * * * node /scripts/jd_jump.js >> /scripts/logs/jd_jump.log 2>&1

# 金榜年终奖
3 1,5 * * * node /scripts/jd_split.js >> /scripts/logs/jd_split.log 2>&1

# 发财大赢家之翻翻乐 (没看什么时候结束)
20,40 * * * * node /scripts/jd_big_winner.js >> /scripts/logs/jd_big_winner.log 2>&1

# 京喜领88元红包(9.30结束)
0 0,12,21 * * * node /scripts/jd_jxlhb.js >> /scripts/logs/jd_jxlhb.log 2>&1

# 内容鉴赏官 (9.30 结束，10月继续开启)
11 1,5 * * * node /scripts/jd_connoisseur.js >> /scripts/logs/jd_connoisseur.log 2>&1

# 送豆得豆
6 1,14 * * * node /scripts/jd_sendBeans.js >> /scripts/logs/jd_sendBeans.log 2>&1

# 粉丝互动 
#21 6,18 * * * node /scripts/jd_wxFans.js >> /scripts/logs/jd_wxFans.log 2>&1

# 众筹许愿池 活动时间：2021-08-01到2021-12-31
11 1,9 * * * node /scripts/jd_wish.js >> /scripts/logs/jd_wish.log 2>&1

# 特物Z 活动时间：###
3 13,22 * * * node /scripts/jd_productZ4Brand.js >> /scripts/logs/jd_productZ4Brand.log 2>&1

# 女装盲盒 活动时间：2021-05-24到2021-06-22
35 1,22 * * * node /scripts/jd_nzmh.js >> /scripts/logs/jd_nzmh.log 2>&1

# 京东极速版红包(活动时间：2021-5-5至2021-5-31)
11 0,17 * * * node /scripts/jd_speed_redpocke.js >> /scripts/logs/jd_speed_redpocke.log 2>&1

# 每日抽奖(活动时间：2021-05-01至2021-05-31)
13 1,22,23 * * * node /scripts/jd_daily_lottery.js >> /scripts/logs/jd_daily_lottery.log 2>&1

# 金榜创造营 活动时间：2021-05-21至2021-12-31
0 1,22 * * * node /scripts/jd_gold_creator.js >> /scripts/logs/jd_gold_creator.log 2>&1

# 5G超级盲盒(活动时间：2021-06-2到2021-07-31)
0 0-23/4 * * * node /scripts/jd_mohe.js >> /scripts/logs/jd_mohe.log 2>&1

# 京东零食街 活动时间：年底

# 京东金融-天天拼图
11 0,15 * * * node /scripts/jd_ttpt.js >> /scripts/logs/jd_ttpt.log 2>&1

##############长期活动##############

# 签到
5 0,9 * * * cd /scripts && node jd_bean_sign.js >> /scripts/logs/jd_bean_sign.log 2>&1
# 领券中心签到
17 0 * * * node /scripts/jd_ccSign.js >> /scripts/logs/jd_ccSign.log 2>&1
# 翻牌签到
3 1,20 * * * node /scripts/jd_fanpai_sign.js >> /scripts/logs/jd_fanpai_sign.log 2>&1
# 愤怒的锦鲤
1 0,10 * * * node /scripts/jd_angryKoi.js >> /scripts/logs/jd_angryKoi.log 2>&1
# 过期京豆兑换喜豆
22 9 * * * node /scripts/jd_exchangejxbeans.js >> /scripts/logs/jd_exchangejxbeans.log 2>&1
# 京喜签到-喜豆
6 3,11 * * * node /scripts/jx_sign_xd.js >> /scripts/logs/jx_sign_xd.log 2>&1
# 东东世界兑换
# 京喜购物返红包助力
# 宠汪汪跑验证码
# 宠汪汪兑换
# 积分换话费
13 6,18 * * * node /scripts/jd_dwapp.js >> /scripts/logs/jd_dwapp.log 2>&1
# 取关主播
# 升级赚京豆
9 9 * * * node /scripts/jd_sjzjd.js >> /scripts/logs/jd_sjzjd.log 2>&1
# 点点券
# 京喜签到
6 1,9 * * * node /scripts/jd_jxsign.js >> /scripts/logs/jd_jxsign.log 2>&1
# 早起福利
30 6 * * * node /scripts/jd_getUp.js >> /scripts/logs/jd_getUp.log 2>&1
# 店铺签到
45 0,23 * * * node /scripts/jd_shop_sign.js >> /scripts/logs/jd_shop_sign.log 2>&1
# 汪汪乐园养joy
6 */3 * * * node /scripts/jd_joy_park.js >> /scripts/logs/jd_joy_park.log 2>&1
# 汪汪乐园每日任务
# 京东签到图形验证
10 0,15 * * * node /scripts/jd_sign_graphics.js >> /scripts/logs/jd_sign_graphics.log 2>&1
# 天天加速
# 东东乐园
# 东东电竞经理
# 京东日资产变动通知
5 9,19 * * * node /scripts/jd_bean_change.js >> /scripts/logs/jd_bean_change.log 2>&1
# 京东月资产变动通知
# 京东试用
# 东东超市兑换奖品
59 23 * * * node /scripts/jd_blueCoin.js >> /scripts/logs/jd_blueCoin.log 2>&1
# 摇京豆
6 0,23 * * * node /scripts/jd_club_lottery.js >> /scripts/logs/jd_club_lottery.log 2>&1
# 东东农场
10 7,11,15,19 * * * node /scripts/jd_fruit.js >> /scripts/logs/jd_fruit.log 2>&1
# 宠汪汪
7 */2,23 * * * node /scripts/jd_joy_new.js >> /scripts/logs/jd_joy.log 2>&1
# 宠汪汪积分兑换京豆.
59 7,15,23 * * * node /scripts/jd_joy_reward.js >> /scripts/logs/jd_joy_reward.log 2>&1
# 宠汪汪赛跑与邀请助力
# 宠汪汪喂食
# 宠汪汪偷好友积分与狗粮
# 摇钱树
21 */4 * * * node /scripts/jd_moneyTree.js >> /scripts/logs/jd_moneyTree.log 2>&1
# 东东萌宠
10 7,12,18 * * * node /scripts/jd_pet.js >> /scripts/logs/jd_pet.log 2>&1
# 京东种豆得豆
10 6-23/1 * * * node /scripts/jd_plantBean.js >> /scripts/logs/jd_plantBean.log 2>&1
# 京东全民开红包
# 1 1,2,13,23 * * * node /scripts/jd_redPacket.js >> /scripts/logs/jd_redPacket.log 2>&1
# 进店领豆
0 0 * * * node /scripts/jd_shop.js >> /scripts/logs/jd_shop.log 2>&1
# 东东超市
31 0,1-23/2 * * * node /scripts/jd_superMarket.js >> /scripts/logs/jd_superMarket.log 2>&1
# 取关京东店铺商品
2 23 * * * node /scripts/jd_unsubscribe.js >> /scripts/logs/jd_unsubscribe.log 2>&1
# 京东抽奖机
0 0,12,23 * * * node /scripts/jd_lotteryMachine.js >> /scripts/logs/jd_lotteryMachine.log 2>&1
# 京东排行榜
11 0 * * * node /scripts/jd_rankingList.js >> /scripts/logs/jd_rankingList.log 2>&1
# 天天提鹅
# 金融养猪
12 */6 * * * node /scripts/jd_pigPet.js >> /scripts/logs/jd_pigPet.log 2>&1
# 京喜工厂
20 * * * * node /scripts/jd_dreamFactory.js >> /scripts/logs/jd_dreamFactory.log 2>&1
# 东东工厂
26 * * * * node /scripts/jd_jdfactory.js >> /scripts/logs/jd_jdfactory.log 2>&1
# 赚京豆(微信小程序)
25 1,9,18,23 * * * node /scripts/jd_syj.js >> /scripts/logs/jd_syj.log 2>&1
# 京东快递签到
32 7 * * * node /scripts/jd_kd.js >> /scripts/logs/jd_kd.log 2>&1
# 京东汽车(签到满500赛点可兑换500京豆)
41 7 * * * node /scripts/jd_car.js >> /scripts/logs/jd_car.log 2>&1
# 领京豆额外奖励(每日可获得3京豆)
23 1,12,22 * * * node /scripts/jd_bean_home.js >> /scripts/logs/jd_bean_home.log 2>&1
# 微信小程序京东赚赚
6 0-5/1,11 * * * node /scripts/jd_jdzz.js >> /scripts/logs/jd_jdzz.log 2>&1
# 京东汽车旅程赛点兑换金豆
0 0 * * * node /scripts/jd_car_exchange.js >> /scripts/logs/jd_car_exchange.log 2>&1
# 导到所有互助码
23 7,13 * * * node /scripts/jd_get_share_code.js >> /scripts/logs/jd_get_share_code.log 2>&1
# 口袋书店
38 8,12,18 * * * node /scripts/jd_bookshop.js >> /scripts/logs/jd_bookshop.log 2>&1
# 京喜农场
0 9,12,18 * * * node /scripts/jd_jxnc.js >> /scripts/logs/jd_jxnc.log 2>&1
# 签到领现金
5 */4 * * * node /scripts/jd_cash.js >> /scripts/logs/jd_cash.log 2>&1
# 闪购盲盒
47 8,22 * * * node /scripts/jd_sgmh.js >> /scripts/logs/jd_sgmh.log 2>&1
# 京东秒秒币
10 6,21 * * * node /scripts/jd_ms.js >> /scripts/logs/jd_ms.log 2>&1
#美丽研究院
6 5,11,17 * * * node /scripts/jd_beauty.js >> /scripts/logs/jd_beauty.log 2>&1
#京东保价
#京东极速版签到+赚现金任务
13 1,15 * * * node /scripts/jd_speed_sign.js >> /scripts/logs/jd_speed_sign.log 2>&1
# 删除优惠券(默认注释，如需要自己开启，如有误删，已删除的券可以在回收站中还原，慎用)
#20 9 * * 6 node /scripts/jd_delCoupon.js >> /scripts/logs/jd_delCoupon.log 2>&1
#家庭号(易黑号，默认注释)
#10 6,7 * * * node /scripts/jd_family.js >> /scripts/logs/jd_family.log 2>&1
#京东直播（又回来了）
10-50/5 12,13,23 * * * node /scripts/jd_live.js >> /scripts/logs/jd_live.log 2>&1
#京东健康社区
13 1,6,22 * * * node /scripts/jd_health.js >> /scripts/logs/jd_health.log 2>&1
#京东健康社区收集健康能量
5-45/20 * * * * node /scripts/jd_health_collect.js >> /scripts/logs/jd_health_collect.log 2>&1
# 幸运大转盘
10 10,23 * * * node /scripts/jd_market_lottery.js >> /scripts/logs/jd_market_lottery.log 2>&1
# 领金贴
5 0 * * * node /scripts/jd_jin_tie.js >> /scripts/logs/jd_jin_tie.log 2>&1
# 京喜牧场
13 0-23/3 * * * node /scripts/jd_jxmc.js >> /scripts/logs/jd_jxmc.log 2>&1
# 京东到家果园
10 0,3,8,11,17 * * * node /scripts/jd_dj_fruit.js >> /scripts/logs/jd_dj_fruit.log 2>&1
# 京东到家鲜豆任务
10 0 * * * node /scripts/jd_dj_bean.js >> /scripts/logs/jd_dj_bean.log 2>&1
# 京东到家果园水车收水滴
0 */1 * * * node /scripts/jd_dj_fruit_collectWater.js >> /scripts/logs/jd_dj_fruit_collectWater.log 2>&1
# 京东到家鲜豆庄园
10 0 * * * node /scripts/jd_dj_plantBeans.js >> /scripts/logs/jd_dj_plantBeans.log 2>&1
# 京东到家鲜豆庄园收水滴
0 */1 * * * node /scripts/jd_dj_getPoints.js >> /scripts/logs/jd_dj_getPoints.log 2>&1
# 京喜财富岛
20 0,6-23/2 * * * node /scripts/jd_cfd.js >> /scripts/logs/jd_cfd.log 2>&1
# 京喜财富岛互助
11 0,1,9,14,18 * * * node /scripts/jd_cfd_help.js >> /scripts/logs/jd_cfd_help.log 2>&1
# 超级直播间红包雨(活动时间不定期，出现异常提示请忽略。红包雨期间会正常)
# 半点京豆雨（龙珠）
#30,31 16-23 * * * node /scripts/jd_half_redrain.js >> /scripts/logs/jd_half_redrain.log 2>&1
&1
# 整点京豆雨（龙珠）
#0,1 16-23 * * * node /scripts/jd_super_redrain.js >> /scripts/logs/jd_super_redrain.log 2>&1
# 京东保价（ak）
# 京东金融养猪猪（ak）
# 京喜财富岛提现（小小）
# 伊利养牛（HW）
0 12 * * * node /scripts/jd_yili_cow.js >> /scripts/logs/jd_yili_cow.log 2>&1
# 京喜牧场兑换新品通知(HW)
1 * * * * node /scripts/jd_jxmc_stock.js >> /scripts/logs/jd_jxmc_stock.log 2>&1
# 京喜财富岛库存监控(HW)
#2 * * * * node /scripts/jd_cfd_stock.js >> /scripts/logs/jd_cfd_stock.log 2>&1
# 极速版-发财大赢家(HW)
#2 1 * * * node /scripts/jd_speed_redEnvelope.js >> /scripts/logs/jd_speed_redEnvelope.log 2>&1
# 农场额外任务(HW)
2 9 * * * node /scripts/jd_fruit_moreTask.js >> /scripts/logs/jd_fruit_moreTask.log 2>&1
# 助力池连通性测试(HW)
2 9 * * * node /scripts/jd_api_test.js >> /scripts/logs/jd_api_test.log 2>&1
# ck检测(HW)
2 */2 * * * node /scripts/jd_checkCookie.js >> /scripts/logs/jd_checkCookie.log 2>&1
