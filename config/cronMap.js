const cronMap = {
  'jd_delCoupon.js': 'X * * * *',//删除优惠券🎟（未设定自动运行，删券慎用）
  'jd_unsubscribe.js': 'X * * * *',// 取关京东店铺商品 5 23 * * *
  'jd_productZ4Brand.js': 'X * * * *',// 
  'jd_unsubscriLive.js': 'X * * * *',// 取关主播
  'jd_order_cashback.js': 'X * * * *',// 下单返红包助力
  'jd_exchangejxbeans.js': 'X * * * *',
  'jd_exchange_joy.js': 'X * * * *',
  'jd_all_bean_change.js': 'X * * * *',
  'jd_guacleancart.js': 'X * * * *',//清空购物车
  'jd_track.js': 'X * * * *',// 
  'jd_cfd_shell.js': 'X * * * *',
  'jd_jxScore.js': 'X * * * *',//
  // '.js':'',//
  'jd_fruit_help.js':'20 4 * * *',//京东APP我的-更多工具-东东农场
  'jd_desire.js':'2 11 * * *',//京东集魔方
  'jd_speed_wabao.js':' 2 0,1,6 * * *',//极速版-挖宝
  'jd_joypark_run.js':'20 * * * *',//汪汪乐园-跑步+组队
  'jd_618cj.js':'10 7 * * *',//618个护抽奖机
  'jd_qqxing.js':'22 4-22/3 * * *',//活动入口：QQ星儿童牛奶京东自营旗舰店->品牌会员->星系牧场
  'jd_wechat_zz.js':'30 9 * * *',//赚赚
  'jd_joymanor_task.js':'11 1,15 * * *',//APP首页下拉-JOY庄园
  'jd_bean_info.js':'12 12 * * *',//
  'jd_sign_graphics.js': '10 6,10 * * *',// 
  'jd_sign_graphics1.js':'10 8 * * *',//
  'jd_mnyyn.js':'33 5 1-30 5 *',//
  'jd_xgyl_wx.js':'3 7 * * *',//小鸽有礼-活动入口：微信小程序-京小哥助手
  'jd_qmqjd.js':'10 7 * * *',//领京豆额外奖励&抢京豆
  'jd_ddly.js':'40 7 * * *',//东东农场->东东乐园(点大风车
  'jd_speed_happy_dig.js':'2 0,1,18 * * *',//极速版-挖宝 助力，挖宝，任务，提现
  'jd_fc_winner.js':'40 0-20/4 * * *',//发财大赢家之翻翻乐
  'jd_speed_redpocket.js':'0 0,6 * * *',//极速版-领红包
  'jd_ljd.js':'21 6,9 * * *',//APP首页-领京豆-升级赚京豆-发财大赢家之翻翻乐
  'jd_speed_coin.js':'0 2,10,19 * * *',//京东极速版签到+赚现金任务
  'jd_zjb.js':'0 7 * * *',//##入口为极速版 百元生活费 赚金币 邀请好友
  'jd_wyw.js':'0 8 * * *',//玩一玩成就
  'jd_wsdlb.js':'5 */6 * * *',//入口 极速版 赚金币 种水果
  'jd_wq_wxsign.js':'3 0,11 * * *',//微信签到领
  'jd_jx_sign.js': '23 6,20 * * *',//京东-京喜双签
  'jd_jfcz.js': '15 10 * * *',//京东极速版-百元生活费-玩游戏现金可提现
  'jd_genz.js': '37 0,11 * * *',//微信-芥么小程序-赚豪礼
  'jd_ddnc_farmpark.js': '30 7 * * *',//东东农场->东东乐园(点大风车
  'jd_anjia.js': '49 6,20 * * *',//#组队分豆-安佳
  'jd_19_6.js': '59 6,9,14,17,20 * * *',//抢极速版全品卷19-6
  'jd_5_2.js': '58 59 6,9,14,17,20 * * *',//抢极速版全品卷5-2
  'gua_MMdou.js': '21 9 * * *',//APP首页-领京豆-升级赚京豆
  'jd_dpqd.js': '15 2,14 * * *',//店铺签到
  'jd_cash_wx.js': '16 0,5 * * *',//微信签到领现金
  'jd_xs_zzl.js': '2 6 * * 5',//京东APP --京享会员-京享周周乐
  'jd_joypark.js': '20 */3 * * *',//汪汪乐园养joy
  'jd_tyt1.js': '0 6 * * *',//入口-极速版-推推赚大钱  5元无门槛卷 大概需要50人助力
  'jd_tyt.js': '0 1 * * *',// 极速版-推推赚大钱
  'jd_plus.js': '0 12 * * *',//京东PLUS任务
  'jd_m_sign.js': '3 1,11 * * *',//京东通天塔--签到
  'jd_fan.js': '40 0 * * *',//粉丝互动
  'jd_fcwb_help.js': '40 6,17 * * *',//发财挖宝助力
  'jd_js_sign.js': '15 3 * * *',//京东极速版签到提现
  'jd_88hb.js': '5 0,6,16 * * *',//京喜->领88元红包
  'jd_mofang_ex.js': '31 8 * * *',//魔方兑换
  'jd_mofang_j.js': '13 6,10 * * *',// 京东集魔方
  'jd_jmf.js': '31 2,8 * * *',//🔔京东小魔方, 开始!
  'jd_zjd_v0.2.js': '15,30,45 0 * * *',//优先助力HW.ts
  'jd_zjd.js': '10 0,9,12 * * *',//活动入口：赚京豆-瓜分京豆(微信小程序)-赚京豆-瓜分京豆-瓜分京豆
  'jd_19_6.js': '59 6,9,14,17,20 * * *',//#极速版抢卷
  'jd_wsdlb.js': '5 */6 * * *',//🔔柠檬我是大老板农场, 开始! 您忘了种植新的水果，快打开极速版种植吧
  'jd_fanli.js': '40 0,9,17 * * *',//京东饭粒
  'jd_fcwb.js': '40 12,16 * * *',//🔔发财挖宝, 开始!
  'jd_wxj.js': '0 10 * * *',//入口 京东 我的 全民挖现金
  'jd_jddj_fruit.js': '10 0,3,8,11,17 * * *',// 【收玻璃瓶水滴】
  'jd_week.js': '26 22 * * 2',// 生活特权～免费领京豆
  'jd_jintie_wx.js': '10 0,12,22 * * *',// 金贴小程序
  'jd_sign.js': '48 9,22 * * *',// 京东签到
  'jd_jddj_bean.js': '35 0,6,12 * * *',//领取鲜豆
  'jd_mpdzcar_help.js': '10 3 * * *',// 头文字J  京东汽车 - 下方 - 一键签到领京豆
  'jd_jddj_plantBeans.js': '20 */6 * * *',// 【庄园签到】
  'jd_jdzz.js': '10 0 * * * ',// 🔔京东赚赚
  'jd_nnfls.js': '1 0,9,19,23 * * *',// 🔔牛牛福利
  'jd_jdjrjf.js': '50 8 * * *',//🔔京东金融赚积分, 开始!
  'jd_babel_sign.js': '1 2,6 * * *',// 
  'jd_jxqd.js': '20 1,8 * * *',// 京喜APP-我的-京喜签到
  'jd_joy_park_task.js': '0 0,20 * * *',// 
  // 'jd_joy_park_task.js':'0 0,7,9,17,20 * * *',// 
  'jd_jxbox.js': '5 6,12 * * *',// 京喜-88红包-宝箱
  'jd_jxg.js': '1 6,12 * * *',// 边玩边赚-》京小鸽吾悦寄
  'jd_mofang.js': '1 6,12 * * *',// 
  'jd_mpdzcar.js': '10 8 * * *',// 头文子J 京东汽车 - 右下角 - 领京豆
  'jd_mpdzcar_game.js': '10 6,10,12 * * *',// 头文字J 游戏
  'jd_sjzjd.js': '21 9 * * *',// MM领京豆
  'jd_wxFansli.js': '5 5,15 * * *',// 饭粒
  'jd_bean_box.js': '1 9,12,18 * * *',// 
  'jx_sign.js': '20 1,8 * * *',// 京喜签到
  'jd_jxgc.js': '30 */6 * * *',// 
  'jd_jxmc_getCoin.js': '0,30 * * * *',// 
  'jd_yili_cow.js': '0 12 * * *',// 
  'jd_wish.js': '39 0,2 * * *',// 
  'jd_vivo.js': '10 2,9,17 * * *',// 
  'jd_ttpt.js': '0 15 * * *',// 
  'jd_try.js': '0 6 * * *',// 
  'jd_try_notify.js': '22 9 * * *',// 京东试用待领取通知
  'jx_box.js': '5 6,12 * * *',// 
  'jd_tewu.js': '15 8,20 * * *',// 京东-下拉
  'jd_validate_Worker.js': '2 23 * * *',// 
  'jd_shop_sign.js': '45 23 * * *',// 
  'jd_sendBeans.js': '45 1,12 * * *',// 来客有礼小程序 送豆得豆
  'jd_reward.js': '3 13,22 * * *',// 
  'jd_ccSign.js': '17 0 * * *',// 
  'jd_mf.js': '13 1,6 * * *',// 
  'jd_guaUnknownTask7.js': '27 8,18 * * *',// 
  'jd_ifanli.js': '17 0 * * *',// 
  'jd_IndustryLottery.js': '17 0 * * *',// 
  'jd_guawealth_island_help.js': '18 1,9,14,18 * * *',// 财富大陆互助
  'jd_guawealth_island.js': '18 6-23/2 * * *',// 财富大陆
  'jd_guaMMdou.js': '9 9 * * *',// 升级赚京豆
  'jd_getUp.js': '30 6 * * *',// 
  'jd_guaddworld.js': '17 1,15 * * *',// 东东世界
  'JD_DailyBonus.js': '17 7 * * *',// 
  'jd_fruit_moreTask.js': '2 9 * * *',// 
  'jd_dwapp.js': '33 7,19 * * *',// 
  'jd_foodRunning.js': '33 5,15 * * *',// 
  'jd_ddworld.js': '17 1,15 * * *',// 东东世界
  'jd_bean_change.js': '0 6,16 * * *',// 京豆变动通知
  'jd_get_share_code.js': '47 7 * * *',// 导到所有互助码
  'jd_rankingList.js': '11 9 * * *',// 京东排行榜
  'jd_dragonboat.js': '15 5,23 1-19 6 *',//龙舟🐉
  'jd_xgyl.js': '34 9 * * *',// 小鸽有礼2(活动时间：2021年1月28日～2021年2月28日)
  'jd_nzmh.js': '35 1,23 * * *',//女装盲盒 活动时间：2021-2-19至2021-2-25
  'jd_bean_sign.js': '3 0,18 * * * ',// 签到
  'jd_blueCoin.js': '59 23 * * *',// 东东超市兑换奖品
  'jd_club_lottery.js': '6 0,23 * * *',// 摇京豆
  'jd_connoisseur.js': '15 3,6 * * *',// 内容鉴赏官
  'jd_fruit.js': '5 */3 * * *',// 东东农场
  'jd_joy.js': '15 */3 * * *',// 宠汪汪
  'jd_joy_feedPets.js': '15 5/* * * *',// 宠汪汪喂食
  'jd_joy_steal.js': '13 0-21/3 * * *',// 宠汪汪偷好友积分与狗粮 10 0-21/3 * * *  
  'jd_moneyTree.js': '3 */2 * * *',// 摇钱树
  'jd_pet.js': '5 6,12,18 * * *',// 东东萌宠
  'jd_plantBean.js': '1 7-22/2 * * *',// 京东种豆得豆
  'jd_plantBean_help.js': '40 4,17 * * *',// 京东种豆得豆
  'jd_redPacket.js': '1 1,2,23',// 京东全民开红包
  'jd_shop.js': '30 0 * * * ',// 进店领豆
  'jd_speed_redpocke-new.js': '39 0,22 * * *',//京东极速版天天领红包 活动时间：2021-1-18至2021-3-3
  'jd_speed_redpocke.js': '20 0,22 * * *',//京东极速版天天领红包 活动时间：2021-1-18至2021-3-3
  'jd_speed.js': '0 */3 * * * ',// 京东天天加速
  'jd_speed_sign.js': '1 1,6 * * *',//京东极速版签到+赚现金任务
  'jd_superMarket.js': '11 */5 * * *',// 东东超市
  'jd_lotteryMachine.js': '11 1 * * *',// 京东抽奖机
  'jd_daily_egg.js': '18 * * * *',// 天天提鹅
  'jd_pigPet.js': '12 */6 * * *',// 金融养猪
  'jd_necklace.js': '20 20 * * *',// 点点券
  'jd_dreamFactory.js': '0 5,15 * * *',// 京喜工厂
  'jd_small_home.js': '16 6,23 * * *',// 东东小窝
  'jd_jdfactory.js': '10 * * * *',// 东东工厂
  'jd_price.js': '39 20 * * *',//京东保价
  'jd_beauty.js': '20 0 * * *',//美丽研究院
  'jd_beauty_ex.js': '20 0 * * *',//美丽研究院
  'jd_ms.js': '10 6,21 * * *',// 京东秒秒币
  'jd_sgmh.js': '20 8,22 * * *',//闪购盲盒
  'jd_family.js': '1 12,23 * * *',// 京东家庭号(暂不知最佳cron*/20 * * * *) '1 12,23 * * *'
  'jd_cash.js': '2 */4 * * *',// 签到领现金
  'jd_jxnc.js': '0 9,12,18 * * *',// 京喜农场 0 9,12,18 * * *
  'jd_bookshop.js': '1 8,12,18 * * *',// 口袋书店
  'jd_car_exchange.js': '0 0 * * *',// 京东汽车旅程赛点兑换金豆
  'jd_crazy_joy.js': '10 7 * * *',// crazyJoy自动每日任务
  'jd_joy_run.js': '10 9-20/2 * * *',// 宠汪汪邀请助力
  'jd_bean_home.js': '33 4 * * *',// 领京豆额外奖励(每日可获得3京豆)
  'jd_car.js': '15 1 * * *',// 京东汽车(签到满500赛点可兑换500京豆)
  'jd_kd.js': '10 0 * * *',// 京东快递签到
  'jd_syj.js': '36 8,18 * * *',// 十元街 10 0,7,23 * * *
  'jd_big_winner.js': '20 * * * *',//省钱大赢家之翻翻乐
  'jd_cfd.js': '5 */3 * * *',//京喜财富岛
  'jd_cfd_loop.js': '5 */4 * * *',//
  'jd_cfd_mooncake.js': '5 * * * *',//
  'jd_cfd_stock.js': '5 */6 * * *',//
  'jd_crazy_joy_bonus.js': '10 12 * * *',//监控crazyJoy分红
  'jd_crazy_joy_coin.js': '10 1,12 * * *',//crazyJoy挂机
  'jd_daily_lottery.js': '21 8,19 * * *', //每日抽奖
  'jd_gold_creator.js': '13 1,22 * * *', //金榜创造营
  'jd_health_collect.js': '5 */2 * * *', //东东健康社区收集能量
  'jd_health.js': '13 1,6,22 * * *', //东东健康社区
  'jd_jin_tie.js': '30 0 * * *',//领金贴
  'jd_joy_reward.js': '0 0-16/8 * * *',//宠汪汪积分兑换奖品
  'jd_jump.js': '1 0,11,21 * * *', //跳跳乐瓜分京豆
  'jd_jxlhb.js': '0 2,12,21 * * *',//京喜领88元红包
  'jd_jxmc.js': '10 */5 * * *',//惊喜牧场
  'jd_jxmc3.js': '0 */6 * * *',//惊喜牧场
  'jd_live.js': '50 12-14 * * *',//京东直播
  'jd_live_redrain.js': '0,30 * * * *',//超级直播间红包雨
  'jd_market_lottery.js': '4 10 * * *',//幸运大转盘
  'jd_mcxhd.js': '4 10 * * *',//新潮品牌狂欢
  'jd_mohe.js': '0 0-9/3 * * *',//5G超级盲盒
  'jd_xtg.js': '0 0 0 * * *',//家电星推官
  'jd_xtg_help.js': '0 0 0 * * *',//家电星推官好友互助
  'xmSports.js': '15 17 * * *', //小米运动 ./backUp/
  'jd_brandcarnivalcity.js': '0 * * * *',//品牌狂欢城
  'jd_cash_exchange.js': '0 0 * * *',//领现金兑换红包
  'jd_carnivalcity.js': '0 3,8,11,22 * * *',//手机狂欢城
  'jd_daily_bounds.js': '15 8 * * *',//京东每日签到
  'jd_flipcards.js': '1 */2 * * *',//翻翻乐
  'jd_half_redrain.js': '30 16-23 * * *',//半点京豆雨
  'jd_hby_lottery.js': '0 12 * * *',//主会场红包雨
  'jd_limitBox.js': '30 7,19 1-18 6 *',//限时盲盒
  'jd_mcxhd_brandcity.js': '0 */1 * * *',//新潮品牌狂欢
  'jd_petPig.js': '23 8 * * *',//京东金融养猪猪🐖
  'jd_priceProtect.js': '1 1 */3 * *',//京东价格保护
  'jd_shake.js': '10 23,21,9 * * *',//超级摇一摇
  'jd_super_redrain.js': '0 16-23 * * *',//整点京豆雨
  'jd_shoplottery.js': '3 15 * * *',//
  'jd_ShopSign.js': '10 17,4 * * *',//
  'jd_small_home.js': '55 16 * * *',//东东小窝
  'jd_star_shop.js': '0 1,21 * * *',//明星小店
  'jd_zc.js': '30 4,23 * * *',//总裁送好礼
  'jd_zoo.js': '3 */2 * * *',//动物连萌
  'jd_zooCollect.js': '1 */2 * * *',//动物联盟收集金币
  // 'jd_zsign.js':'0 3,9 * * *',// 
}
module.exports.cronMap = cronMap;