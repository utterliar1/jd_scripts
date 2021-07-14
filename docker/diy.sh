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
# 多合一签到（NobyDa）
5 0 * * * node /scripts/jd_DailyBonus.js >> /scripts/logs/jd_DailyBonus.log 2>&1
# 抽奖机（yangtingxiao）
11 1 * * * node /scripts/jd_lotteryMachine.js >> /scripts/logs/jd_lotteryMachine.log 2>&1
# 滴滴果园（passby）
10 0,8,12,18 * * * node /scripts/jd_dd_fruit.js >> /scripts/logs/jd_dd_fruit.log 2>&1
# 半点京豆雨（龙珠）
30,31 16-23 * * * node /scripts/jd_half_redrain.js >> /scripts/logs/jd_half_redrain.log 2>&1
&1
# 整点京豆雨（龙珠）
0,1 16-23 * * * node /scripts/jd_super_redrain.js >> /scripts/logs/jd_super_redrain.log 2>&1
# 京东金融养猪猪（ak）
12 0-23/6 * * * node /scripts/jd_task_pigPet.js >> /scripts/logs/jd_task_pigPet.log 2>&1
# 财富大陆（smiek）
#18 0-23/2 * * * node /scripts/jd_gua_wealth_island.js >> /scripts/logs/jd_gua_wealth_island.log 2>&1
# 店铺签到（jiulan）
#10 1,9 * * * node /scripts/jd_shop_sign.js >> /scripts/logs/jd_shop_sign.log 2>&1
# 女装盲盒（jiulan）
35 1,23 * * * node /scripts/jd_nzmh.js >> /scripts/logs/jd_nzmh.log 2>&1
