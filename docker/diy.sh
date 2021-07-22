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


