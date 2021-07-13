# 京东到家果园
10 0,3,8,11,17 * * * node /scripts/jd_dj_fruit.js >> /scripts/logs/jd_dj_fruit.log 2>&1
# 京东到家鲜豆任务
10 0 * * * node /scripts/jd_dj_bean.js >> /scripts/logs/jd_dj_bean.log 2>&1
# 京东到家果园水车收水滴
*/5 * * * * node /scripts/jd_dj_fruit_collectWater.js >> /scripts/logs/jd_dj_fruit_collectWater.log 2>&1
# 京东到家鲜豆庄园
10 0 * * * node /scripts/jd_dj_plantBeans.js >> /scripts/logs/jd_dj_plantBeans.log 2>&1
# 京东到家鲜豆庄园收水滴
*/5 * * * * node /scripts/jd_dj_getPoints.js >> /scripts/logs/jd_dj_getPoints.log 2>&1