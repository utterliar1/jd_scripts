"use strict";
/**
 * 京喜工厂
 * cron: 30 * * * *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
var axios_1 = require("axios");
var path = require("path");
var date_fns_1 = require("date-fns");
var sendNotify_1 = require("./sendNotify");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var V3_1 = require("./utils/V3");
var cookie = '', res = '', UserName;
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, except, _a, _b, _c, index, value, productionId, factoryId, investedElectric, needElectric, progress, flag, j, _d, _e, t, e_1_1, j, e_2_1;
    var e_2, _f, e_1, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0: return [4 /*yield*/, (0, V3_1.requestAlgo)('c0ff1')];
            case 1:
                _h.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.getCookie)()];
            case 2:
                cookiesArr = _h.sent();
                except = (0, TS_USER_AGENTS_1.exceptCookie)(path.basename(__filename));
                _h.label = 3;
            case 3:
                _h.trys.push([3, 38, 39, 40]);
                _a = __values(cookiesArr.entries()), _b = _a.next();
                _h.label = 4;
            case 4:
                if (!!_b.done) return [3 /*break*/, 37];
                _c = __read(_b.value, 2), index = _c[0], value = _c[1];
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                if (except.includes(encodeURIComponent(UserName))) {
                    console.log('已设置跳过');
                    return [3 /*break*/, 36];
                }
                return [4 /*yield*/, api('userinfo/GetUserInfo', '_time,materialTuanId,materialTuanPin,needPickSiteInfo,pin,sharePin,shareType,source,zone', { pin: '', sharePin: '', shareType: '', materialTuanPin: '', materialTuanId: '', needPickSiteInfo: 0, source: '' })];
            case 5:
                res = _h.sent();
                productionId = 0, factoryId = 0;
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 6:
                _h.sent();
                try {
                    productionId = res.data.productionList[0].productionId;
                    factoryId = res.data.factoryList[0].factoryId;
                    investedElectric = res.data.productionList[0].investedElectric, needElectric = res.data.productionList[0].needElectric, progress = (investedElectric / needElectric * 100).toFixed(2);
                    console.log('生产进度：', progress);
                    if (progress === '100.00') {
                        (0, sendNotify_1.sendNotify)("京喜工厂生产完成", "\u8D26\u53F7".concat(index + 1, " ").concat(UserName));
                        return [3 /*break*/, 36];
                    }
                }
                catch (e) {
                    console.log('当前没有产品在生产');
                    return [3 /*break*/, 36];
                }
                if (!(res.data.productionStage.productionStageAwardStatus === 1)) return [3 /*break*/, 9];
                return [4 /*yield*/, api('userinfo/DrawProductionStagePrize', '_time,productionId,zone', { productionId: productionId })];
            case 7:
                res = _h.sent();
                console.log('打开红包：', res.data.active);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(4000)];
            case 8:
                _h.sent();
                _h.label = 9;
            case 9: return [4 /*yield*/, api('generator/QueryCurrentElectricityQuantity', '_time,factoryid,querytype,zone', { factoryid: factoryId, querytype: 1 })];
            case 10:
                // 收发电机
                res = _h.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 11:
                _h.sent();
                flag = -1;
                if (res.data.nextCollectDoubleFlag === 1) {
                    // 下次双倍
                    if (res.data.currentElectricityQuantity === res.data.maxElectricityQuantity) {
                        // 发电机满
                        flag = 1;
                    }
                    else {
                        console.log('发电机可收取双倍，但没满');
                    }
                }
                else {
                    // 没有双倍，直接收
                    flag = 0;
                }
                if (!(flag !== -1)) return [3 /*break*/, 13];
                return [4 /*yield*/, api('generator/CollectCurrentElectricity', '_time,apptoken,doubleflag,factoryid,pgtimestamp,phoneID,zone', { apptoken: '', pgtimestamp: '', phoneID: '', factoryid: factoryId, doubleflag: flag, timeStamp: 'undefined' })];
            case 12:
                res = _h.sent();
                res.ret === 0
                    ? console.log('发电机收取成功：', res.data.CollectElectricity)
                    : console.log('发电机收取失败：', res);
                _h.label = 13;
            case 13: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(4000)
                // 投入电力
            ];
            case 14:
                _h.sent();
                j = 0;
                _h.label = 15;
            case 15:
                if (!(j < 2)) return [3 /*break*/, 19];
                return [4 /*yield*/, api('userinfo/InvestElectric', '_time,productionId,zone', { productionId: productionId })];
            case 16:
                res = _h.sent();
                if (res.ret === 0) {
                    console.log('投入电力成功：', res.data.investElectric);
                }
                else {
                    console.log('投入电力失败：', res);
                    return [3 /*break*/, 19];
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)];
            case 17:
                _h.sent();
                _h.label = 18;
            case 18:
                j++;
                return [3 /*break*/, 15];
            case 19: return [4 /*yield*/, api('friend/QueryHireReward', '_time,zone')];
            case 20:
                res = _h.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 21:
                _h.sent();
                _h.label = 22;
            case 22:
                _h.trys.push([22, 28, 29, 30]);
                _d = (e_1 = void 0, __values(res.data.hireReward)), _e = _d.next();
                _h.label = 23;
            case 23:
                if (!!_e.done) return [3 /*break*/, 27];
                t = _e.value;
                if (!(t.date !== (0, date_fns_1.format)(Date.now(), "yyyyMMdd") && new Date().getHours() >= 6)) return [3 /*break*/, 26];
                return [4 /*yield*/, api('friend/HireAward', '_time,date,type,zone', { date: t.date })];
            case 24:
                res = _h.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 25:
                _h.sent();
                if (res.ret === 0)
                    console.log('收取气泡成功：', t.electricityQuantity);
                _h.label = 26;
            case 26:
                _e = _d.next();
                return [3 /*break*/, 23];
            case 27: return [3 /*break*/, 30];
            case 28:
                e_1_1 = _h.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 30];
            case 29:
                try {
                    if (_e && !_e.done && (_g = _d["return"])) _g.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 30:
                console.log('任务列表开始');
                j = 0;
                _h.label = 31;
            case 31:
                if (!(j < 30)) return [3 /*break*/, 35];
                return [4 /*yield*/, task()];
            case 32:
                if ((_h.sent()) === 0) {
                    return [3 /*break*/, 35];
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(5000)];
            case 33:
                _h.sent();
                _h.label = 34;
            case 34:
                j++;
                return [3 /*break*/, 31];
            case 35:
                console.log('任务列表结束');
                _h.label = 36;
            case 36:
                _b = _a.next();
                return [3 /*break*/, 4];
            case 37: return [3 /*break*/, 40];
            case 38:
                e_2_1 = _h.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 40];
            case 39:
                try {
                    if (_b && !_b.done && (_f = _a["return"])) _f.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 40: return [2 /*return*/];
        }
    });
}); })();
function task() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, t, e_3_1;
        var e_3, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, api('GetUserTaskStatusList', '_time,bizCode,showAreaTaskFlag,source', { showAreaTaskFlag: 1, bizCode: 'dream_factory' })];
                case 1:
                    res = _d.sent();
                    console.log('GetUserTaskStatusList: 刷新任务列表');
                    return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 15, 16, 17]);
                    _a = __values(res.data.userTaskStatusList), _b = _a.next();
                    _d.label = 4;
                case 4:
                    if (!!_b.done) return [3 /*break*/, 14];
                    t = _b.value;
                    if (!(t.awardStatus === 2)) return [3 /*break*/, 13];
                    if (!(t.completedTimes >= t.targetTimes)) return [3 /*break*/, 8];
                    console.log('可领奖：', t.taskName);
                    return [4 /*yield*/, api('Award', '_time,bizCode,source,taskId', { taskId: t.taskId, bizCode: t.bizCode })];
                case 5:
                    res = _d.sent();
                    if (!(res.ret === 0)) return [3 /*break*/, 7];
                    console.log('领奖成功：', res.data.prizeInfo.trim() * 1);
                    return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(4000)];
                case 6:
                    _d.sent();
                    return [2 /*return*/, 1];
                case 7:
                    console.log('领奖出错');
                    return [2 /*return*/, 0];
                case 8:
                    if (!(t.dateType === 2 && t.completedTimes < t.targetTimes && [2, 6, 9].indexOf(t.taskType) > -1)) return [3 /*break*/, 13];
                    console.log('任务开始：', t.taskName);
                    return [4 /*yield*/, api('DoTask', '_time,_ts,bizCode,configExtra,source,taskId', { taskId: t.taskId, bizCode: t.bizCode, configExtra: '' })];
                case 9:
                    res = _d.sent();
                    return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(5000)];
                case 10:
                    _d.sent();
                    if (!(res.ret === 0)) return [3 /*break*/, 12];
                    console.log('任务完成');
                    return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)];
                case 11:
                    _d.sent();
                    return [2 /*return*/, 1];
                case 12:
                    console.log('任务失败');
                    return [2 /*return*/, 0];
                case 13:
                    _b = _a.next();
                    return [3 /*break*/, 4];
                case 14: return [3 /*break*/, 17];
                case 15:
                    e_3_1 = _d.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 17];
                case 16:
                    try {
                        if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 17: return [2 /*return*/, 0];
            }
        });
    });
}
function api(fn, stk, params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var url, timestamp, t, w, _a, _b, _c, key, value, h5st, data;
        var e_4, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    timestamp = Date.now();
                    t = [
                        { key: '_time', value: timestamp.toString() },
                        { key: '_ts', value: timestamp.toString() },
                        { key: 'bizCode', value: 'dream_factory' },
                        { key: 'source', value: 'dreamfactory' },
                    ];
                    w = (0, TS_USER_AGENTS_1.randomWord)();
                    if (['GetUserTaskStatusList', 'DoTask', 'Award'].includes(fn))
                        url = "https://m.jingxi.com/newtasksys/newtasksys_front/".concat(fn, "?source=dreamfactory&_time=").concat(timestamp, "&_ts=").concat(timestamp, "&_stk=").concat(encodeURIComponent(stk), "&_=").concat(timestamp + 3, "&sceneval=2&g_login_type=1&callback=jsonpCBK").concat(w).concat(w, "&g_ty=ls");
                    else
                        url = "https://m.jingxi.com/dreamfactory/".concat(fn, "?zone=dream_factory&_time=").concat(timestamp, "&_stk=").concat(encodeURIComponent(stk), "&_ste=1&_=").concat(timestamp + 3, "&sceneval=2&g_login_type=1&callback=jsonpCBK").concat(w).concat(w, "&g_ty=ls");
                    try {
                        for (_a = __values(Object.entries(params)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            _c = __read(_b.value, 2), key = _c[0], value = _c[1];
                            t.push({ key: key, value: value });
                            url += "&".concat(key, "=").concat(value);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    h5st = (0, V3_1.geth5st)(t, 'c0ff1');
                    url += "&h5st=".concat(encodeURIComponent(h5st));
                    return [4 /*yield*/, axios_1["default"].get(url, {
                            headers: {
                                'Host': 'm.jingxi.com',
                                'User-Agent': 'jdpingou;',
                                'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
                                'Referer': 'https://st.jingxi.com/',
                                'Cookie': cookie
                            }
                        })];
                case 1:
                    data = (_e.sent()).data;
                    return [2 /*return*/, JSON.parse(data.match(/try.?{jsonpCBK.?.?\((.*)/)[1])];
            }
        });
    });
}
