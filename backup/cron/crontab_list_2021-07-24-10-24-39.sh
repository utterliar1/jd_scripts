##############短期活动##############
#全民摸冰
6 9,12 * * * node /scripts/jd_mb.js  >> /scripts/logs/jd_mb.log 2>&1
#财富岛提现
0 12,0 * * * node /scripts/jd_cfd_cashOut.js  >> /scripts/logs/jd_cfd_cashOut.log 2>&1
#7月粉丝互动
1 8 * * * node /scripts/jd_wxFans.js >> /scripts/logs/jd_wxFans.log 2>&1
#星系牧场
1 0-23/2 * * * node /scripts/jd_qqxing.js >> /scripts/logs/jd_qqxing.log 2>&1
#发财大赢家
#东东乐园
30 7 * * * node /scripts/jd_ddnc_farmpark.js >> /scripts/logs/jd_ddnc_farmpark.log 2>&1
#天降红包
30 7 * * * node /scripts/jd_SplitRedPacket.js >> /scripts/logs/jd_SplitRedPacket.log 2>&1
#翻翻乐
#1 6-21/1 * * * node /scripts/jd_618redpacket.js  >> /scripts/logs/jd_618redpacket.log 2>&1
#口袋书店
1 8,12,18 * * * node /scripts/jd_bookshopWenmoux.js >> /scripts/logs/jd_bookshopWenmoux.log 2>&1
#送豆得豆
45 4 * * * node /scripts/jd_sendBeans.js >> /scripts/logs/jd_sendBeans.log 2>&1
#早起赢现金
30 7 * * * node /scripts/jd_morningSc.js >> /scripts/logs/jd_morningSc.log 2>&1
#汪汪乐园每日助力
30 23 * * * node /scripts/jd_joy_park_help.js >> /scripts/logs/jd_joy_park_help.log 2>&1
#早起福利
30 6 * * * node /scripts/jd_goodMorning.js >> /scripts/logs/jd_goodMorning.log 2>&1
#愤怒的现金
0 0 * * * node /scripts/jd_angryCash.js >> /scripts/logs/jd_angryCash.log 2>&1
#愤怒的锦鲤
0 0 * * * node /scripts/jd_angryKoi.js >> /scripts/logs/jd_angryKoi.log 2>&1
#签到领现金兑换
#0 0 * * * node /scripts/jd_cash_exchange.js >> /scripts/logs/jd_cash_exchange.log 2>&1
#发财大赢家助力
0 0 * * * node /scripts/jd_dyj_help.js >> /scripts/logs/jd_dyj_help.log 2>&1
#预存validate
59 7,15,23 * * * node /scripts/jd_validate_Worker.js >> /scripts/logs/jd_validate_Worker.log 2>&1
#宠汪汪兑换京豆
0 8,16,0 * * * node /scripts/jd_joy_reward.js >> /scripts/logs/jd_joy_reward.log 2>&1
#省钱大赢家之翻翻乐
20 * * * * node /scripts/jd_big_winner.js >> /scripts/logs/jd_big_winner.log 2>&1
##############长期活动##############
# 签到
7 0,17 * * * cd /scripts && node jd_bean_sign.js >> /scripts/logs/jd_bean_sign.log 2>&1
#京东资产变动通知
2 9 * * * node /scripts/jd_bean_change.js >> /scripts/logs/jd_bean_change.log 2>&1
#领京豆额外奖励
2 9 * * * node /scripts/jd_bean_home.js >> /scripts/logs/jd_bean_home.log 2>&1
#美丽研究院
1 7,12,19 * * * node /scripts/jd_beauty.js >> /scripts/logs/jd_beauty.log 2>&1
# 东东超市兑换奖品
0 0 * * * node /scripts/jd_blueCoin.js >> /scripts/logs/jd_blueCoin.log 2>&1
# 京东汽车(签到满500赛点可兑换500京豆)
10 7 * * * node /scripts/jd_car.js >> /scripts/logs/jd_car.log 2>&1
# 京东汽车旅程赛点兑换金豆
0 0 * * * node /scripts/jd_car_exchange.js >> /scripts/logs/jd_car_exchange.log 2>&1
# 签到领现金
2 0-23/4 * * * node /scripts/jd_cash.js >> /scripts/logs/jd_cash.log 2>&1
#京喜财富岛
5 */1 * * * node /scripts/jd_cfd.js >> /scripts/logs/jd_cfd.log 2>&1
#摇京豆
5 0,23 * * * node /scripts/jd_club_lottery.js >> /scripts/logs/jd_club_lottery.log 2>&1
#天天提鹅
10 * * * * node /scripts/jd_daily_egg.js >> /scripts/logs/jd_daily_egg.log 2>&1
# 删除优惠券(默认注释，如需要自己开启，如有误删，已删除的券可以在回收站中还原，慎用)
#京喜工厂
10 * * * * node /scripts/jd_dreamFactory.js >> /scripts/logs/jd_dreamFactory.log 2>&1
#京东家庭号
1 12,23 * * * node /scripts/jd_family.js >> /scripts/logs/jd_family.log 2>&1
#东东农场
5 6-18/6 * * * node /scripts/jd_fruit.js >> /scripts/logs/jd_fruit.log 2>&1
#金榜创造营
13 1,22 * * * node /scripts/jd_gold_creator.js >> /scripts/logs/jd_gold_creator.log 2>&1
#东东健康社区
13 1,6,22 * * * node /scripts/jd_health.js >> /scripts/logs/jd_health.log 2>&1
#东东健康社区收集能量
5-45/20 * * * * node /scripts/jd_health_collect.js >> /scripts/logs/jd_health_collect.log 2>&1
#东东工厂
10 * * * * node /scripts/jd_jdfactory.js >> /scripts/logs/jd_jdfactory.log 2>&1
# 京东赚赚
10 0 * * * node /scripts/jd_jdzz.js >> /scripts/logs/jd_jdzz.log 2>&1
#领金贴
10 0 * * * node /scripts/jd_jin_tie.js >> /scripts/logs/jd_jin_tie.log 2>&1
#京喜农场
0 9,12,18 * * * node /scripts/jd_jxnc.js >> /scripts/logs/jd_jxnc.log 2>&1
#京东快递签到
10 0 * * * node /scripts/jd_kd.js >> /scripts/logs/jd_kd.log 2>&1
#京东直播
10-20/5 12 * * * node /scripts/jd_live.js >> /scripts/logs/jd_live.log 2>&1
#超级直播间红包雨
#幸运大转盘
4 10 * * * node /scripts/jd_market_lottery.js >> /scripts/logs/jd_market_lottery.log 2>&1
#5G超级盲盒
0 0,1-23/3 * * * node /scripts/jd_mohe.js >> /scripts/logs/jd_mohe.log 2>&1
#京东摇钱树
3 0-23/2 * * * node /scripts/jd_moneyTree.js >> /scripts/logs/jd_moneyTree.log 2>&1
#京东秒秒币
10 7 * * * node /scripts/jd_ms.js >> /scripts/logs/jd_ms.log 2>&1
#东东萌宠
15 6-18/6 * * * node /scripts/jd_pet.js >> /scripts/logs/jd_pet.log 2>&1
#京东金融养猪猪
#京东种豆得豆
1 7-21/2 * * * node /scripts/jd_plantBean.js >> /scripts/logs/jd_plantBean.log 2>&1
#京东保价
#京东全民开红包
1 1,2,23 * * * node /scripts/jd_redPacket.js >> /scripts/logs/jd_redPacket.log 2>&1
#闪购盲盒
20 8 * * * node /scripts/jd_sgmh.js >> /scripts/logs/jd_sgmh.log 2>&1
#进店领豆
10 0 * * * node /scripts/jd_shop.js >> /scripts/logs/jd_shop.log 2>&1
#东东小窝
#天天加速
#京东极速版红包
8,9,10 1 * * * node /scripts/jd_speed_redpocke.js >> /scripts/logs/jd_speed_redpocke.log 2>&1
#京东极速版
0 7 * * * node /scripts/jd_speed_sign.js >> /scripts/logs/jd_speed_sign.log 2>&1
#东东超市
11 * * * * node /scripts/jd_superMarket.js >> /scripts/logs/jd_superMarket.log 2>&1
#赚京豆
10 0,7,23 * * * node /scripts/jd_syj.js >> /scripts/logs/jd_syj.log 2>&1
#取关京东店铺商品
55 23 * * * node /scripts/jd_unsubscribe.js >> /scripts/logs/jd_unsubscribe.log 2>&1
# 京东抽奖机
0 0,12,23 * * * node /scripts/jd_lotteryMachine.js >> /scripts/logs/jd_lotteryMachine.log 2>&1
# 京东排行榜
21 9 * * * node /scripts/jd_rankingList.js >> /scripts/logs/jd_rankingList.log 2>&1
#东东电竞经理
#环境测试
0 12 * * * node /scripts/jd_api_test.js >> /scripts/logs/jd_api_test.log 2>&1
#京喜牧场
20 0-23/3 * * *  node /scripts/jd_jxmc.js >> /scripts/logs/jd_jxmc.log 2>&1
# 京东到家果园（passby）
10 0,3,8,11,17 * * * node /scripts/jd_dj_fruit.js >> /scripts/logs/jddj_fruit.log 2>&1
# 京东到家鲜豆任务（passby）
10 0 * * * node /scripts/jd_dj_bean.js >> /scripts/logs/jddj_bean.log 2>&1
# 京东到家果园水车收水滴（passby）
*/5 * * * * node /scripts/jd_dj_fruit_collectWater.js >> /scripts/logs/jddj_fruit_collectWater.log 2>&1
# 京东到家鲜豆庄园（passby）
10 0 * * * node /scripts/jd_dj_plantBeans.js >> /scripts/logs/jddj_plantBeans.log 2>&1
# 京东到家鲜豆庄园收水滴（passby）
*/5 * * * * node /scripts/jd_dj_getPoints.js >> /scripts/logs/jddj_getPoints.log 2>&1
# 滴滴果园（passby）
10 0,8,12,18 * * * node /scripts/jd_dd_fruit.js >> /scripts/logs/jd_dd_fruit.log 2>&1
# 快手果园（passby）
15 0,8,12,18 * * * node /scripts/jd_ks_fruit.js >> /scripts/logs/jd_ks_fruit.log 2>&1
# 半点京豆雨（龙珠）
30,31 16-23 * * * node /scripts/jd_half_redrain.js >> /scripts/logs/jd_half_redrain.log 2>&1
&1
# 整点京豆雨（龙珠）
#0,1 16-23 * * * node /scripts/jd_super_redrain.js >> /scripts/logs/jd_super_redrain.log 2>&1
# 京东金融养猪猪（ak）
12 0-23/6 * * * node /scripts/jd_task_pigPet.js >> /scripts/logs/jd_task_pigPet.log 2>&1
# 店铺签到（jiulan）
#10 1,9 * * * node /scripts/jd_shop_sign.js >> /scripts/logs/jd_shop_sign.log 2>&1
# 燃动夏季（smiek）
#12 9,11,13,15,17 * * * node /scripts/jd_summer_movement.js >> /scripts/logs/jd_summer_movement.log 2>&1
# 燃动夏季_SH助力（smiek）
#12 7-14 * * * node /scripts/jd_summer_movement_help.js >> /scripts/logs/jd_summer_movement_help.log 2>&1
# 京喜签到（zero205）
5 0 * * * node /scripts/jd_jxqd.js >> /scripts/logs/jd_jxqd.log 2>&1
# 京喜财富岛提现（小小）
#59 11,12,23 * * * node /scripts/jd_cfdtx_Aaron.js >> /scripts/logs/jd_cfdtx_Aaron.log 2>&1
# 超市兑换（小小）
59 23 * * * node /scripts/jd_blueCoin_Aaron.js >> /scripts/logs/jd_blueCoin_Aaron.log 2>&1
# 宠汪汪兑换（小小）
59 7,16,23 * * * node /scripts/jd_joy_reward_Aaron.js >> /scripts/logs/jd_joy_reward_Aaron.log 2>&1
# 伊利养牛（HW）
0 12 * * * node /scripts/jd_yili_cow.js >> /scripts/logs/jd_yili_cow.log 2>&1
# 跳跳乐瓜分京豆（lxk）
1 0,11,21 * * * node /scripts/jd_jump.js >> /scripts/logs/jd_jump.log 2>&1
#京喜财富岛
#5 */1 * * * node /scripts/jd_cfd_Aaron.js >> /scripts/logs/jd_cfd_Aaron.log 2>&1
#升级赚京豆（smiek）
21 9 * * * node /scripts/jd_MMdou.js >> /scripts/logs/jd_MMdou.log 2>&1
#京豆盒子（HW）
23 9 * * * node /scripts/jd_bean_box.js >> /scripts/logs/jd_bean_box.log 2>&1


