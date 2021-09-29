# 半点京豆雨（龙珠）
#30,31 16-23 * * * node /scripts/jd_half_redrain.js >> /scripts/logs/jd_half_redrain.log 2>&1
&1
# 整点京豆雨（龙珠）
#0,1 16-23 * * * node /scripts/jd_super_redrain.js >> /scripts/logs/jd_super_redrain.log 2>&1
# 京东保价（ak）
#48 */8 * * * node /scripts/jd_work_price.js >> /scripts/logs/jd_work_price.log 2>&1
# 京东金融养猪猪（ak）
#12 0-23/6 * * * node /scripts/jd_work_pigPet.js >> /scripts/logs/jd_work_pigPet.log 2>&1
# 京喜财富岛提现（小小）
#59 11,12,23 * * * node /scripts/jd_cfdtx.js >> /scripts/logs/jd_cfdtx.log 2>&1
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
