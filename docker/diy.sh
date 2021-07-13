# 京东到家果园
10 0,3,8,11,17 * * * node /scripts/jddj_fruit.js >> /scripts/logs/jd_dj_fruit.log 2>&1
# 京东到家鲜豆任务
10 0 * * * node /scripts/jddj_bean.js >> /scripts/logs/jd_dj_bean.log 2>&1
# 京东到家果园水车收水滴
*/5 * * * * node /scripts/jddj_fruit_collectWater.js >> /scripts/logs/jd_dj_fruit_collectWater.log 2>&1
# 京东到家鲜豆庄园
10 0 * * * node /scripts/jddj_plantBeans.js >> /scripts/logs/jd_dj_plantBeans.log 2>&1
# 京东到家鲜豆庄园收水滴
*/5 * * * * node /scripts/jddj_getPoints.js >> /scripts/logs/jd_dj_getPoints.log 2>&1
# 多合一签到
5 0 * * * node /scripts/JD_DailyBonus.js >> /scripts/logs/JD_DailyBonus.log 2>&1
# 抽奖机
11 1 * * * node /scripts/jd_lotteryMachine.js >> /scripts/logs/jd_lotteryMachine.log 2>&1
# 滴滴果园
10 0,8,12,18 * * * node /scripts/dd_fruit.js >> /scripts/logs/dd_fruit.log 2>&1
# 半点京豆雨
30,31 16-23 * * * node /scripts/long_half_redrain.js >> /scripts/logs/long_half_redrain.log 2>&1
&1
# 整点京豆雨
0,1 16-23 * * * node /scripts/long_super_redrain.js >> /scripts/logs/long_super_redrain.log 2>&1
