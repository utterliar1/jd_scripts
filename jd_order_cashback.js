"use strict";
/**
 * 下单返红包助力
 * 只助力助力池，不助力内部，多次被同账号助力可能会黑
 * cron: 30 0,9,17 * * *
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var ts_md5_1 = require("ts-md5");
var cookie = '', UserName, index, res = '';
var orders = [], shareCodeSelf = [], shareCodes = [];
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, i, order, _a, _b, t, remaininghongbaosum, e_1_1, _c, _d, _e, index_1, value, shareCodes_1, shareCodes_1_1, code, e_2_1, e_3_1;
    var e_1, _f, e_3, _g, e_2, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 1:
                cookiesArr = _j.sent();
                i = 0;
                _j.label = 2;
            case 2:
                if (!(i < cookiesArr.length)) return [3 /*break*/, 17];
                cookie = cookiesArr[i];
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                index = i + 1;
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index, "\u3011").concat(UserName, "\n"));
                return [4 /*yield*/, getOrderList()];
            case 3:
                res = _j.sent();
                order = '' // 订单号
                ;
                _j.label = 4;
            case 4:
                _j.trys.push([4, 14, 15, 16]);
                _a = (e_1 = void 0, __values(res.orderList)), _b = _a.next();
                _j.label = 5;
            case 5:
                if (!!_b.done) return [3 /*break*/, 13];
                t = _b.value;
                if (t.parentId !== '0') {
                    order = t.parentId;
                }
                else {
                    order = t.orderId;
                }
                if (!!orders.includes(order)) return [3 /*break*/, 12];
                orders.push(order);
                return [4 /*yield*/, api("QueryGroupDetail", order)];
            case 6:
                res = _j.sent();
                if (!(res.data.groupinfo && res.data.groupinfo.end_time * 1000 > Date.now())) return [3 /*break*/, 9];
                remaininghongbaosum = res.data.groupinfo.remaininghongbaosum * 1;
                console.log("\u8BA2\u5355 ".concat(order, " \u2705"), res.data.groupinfo.groupid, '剩余：', remaininghongbaosum);
                if (!(remaininghongbaosum !== 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, makeShareCodes(res.data.groupinfo.groupid)];
            case 7:
                _j.sent();
                shareCodeSelf.push(res.data.groupinfo.groupid);
                _j.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                console.log("\u8BA2\u5355 ".concat(order, " \u274C"));
                _j.label = 10;
            case 10: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 11:
                _j.sent();
                _j.label = 12;
            case 12:
                _b = _a.next();
                return [3 /*break*/, 5];
            case 13: return [3 /*break*/, 16];
            case 14:
                e_1_1 = _j.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 16];
            case 15:
                try {
                    if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 16:
                i++;
                return [3 /*break*/, 2];
            case 17:
                _j.trys.push([17, 31, 32, 33]);
                _c = __values(cookiesArr.entries()), _d = _c.next();
                _j.label = 18;
            case 18:
                if (!!_d.done) return [3 /*break*/, 30];
                _e = __read(_d.value, 2), index_1 = _e[0], value = _e[1];
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.getShareCodePool)('fanxian', 20)];
            case 19:
                shareCodes = _j.sent();
                _j.label = 20;
            case 20:
                _j.trys.push([20, 27, 28, 29]);
                shareCodes_1 = (e_2 = void 0, __values(shareCodes)), shareCodes_1_1 = shareCodes_1.next();
                _j.label = 21;
            case 21:
                if (!!shareCodes_1_1.done) return [3 /*break*/, 26];
                code = shareCodes_1_1.value;
                if (!!shareCodeSelf.includes(code)) return [3 /*break*/, 24];
                console.log("\u8D26\u53F7".concat(index_1 + 1, " ").concat(UserName, " \u53BB\u52A9\u529B ").concat(code));
                return [4 /*yield*/, api('Help', code)];
            case 22:
                res = _j.sent();
                if (res.msg === '') {
                    console.log('助力成功，获得：', parseFloat(res.data.prize.discount));
                }
                else {
                    console.log(res.msg);
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 23:
                _j.sent();
                return [3 /*break*/, 25];
            case 24:
                console.log("\u8DF3\u8FC7\u5185\u90E8\u8D26\u53F7");
                _j.label = 25;
            case 25:
                shareCodes_1_1 = shareCodes_1.next();
                return [3 /*break*/, 21];
            case 26: return [3 /*break*/, 29];
            case 27:
                e_2_1 = _j.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 29];
            case 28:
                try {
                    if (shareCodes_1_1 && !shareCodes_1_1.done && (_h = shareCodes_1.return)) _h.call(shareCodes_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 29:
                _d = _c.next();
                return [3 /*break*/, 18];
            case 30: return [3 /*break*/, 33];
            case 31:
                e_3_1 = _j.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 33];
            case 32:
                try {
                    if (_d && !_d.done && (_g = _c.return)) _g.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 33: return [2 /*return*/];
        }
    });
}); })();
function api(fn, orderid) {
    return __awaiter(this, void 0, void 0, function () {
        var url, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = fn === 'Help'
                        ? "https://wq.jd.com/fanxianzl/zhuli/Help?groupid=".concat(orderid, "&_stk=groupid&_ste=2&sceneval=2")
                        : "https://m.jingxi.com/fanxianzl/zhuli/".concat(fn, "?isquerydraw=1&orderid=").concat(orderid, "&groupid=&_=").concat(Date.now(), "&sceneval=2");
                    return [4 /*yield*/, axios_1.default.get(url, {
                            headers: {
                                'Host': 'm.jingxi.com',
                                'User-Agent': "jdpingou;iPhone;5.12.0;15.1;".concat((0, TS_USER_AGENTS_1.randomString)(40), ";network/wifi;"),
                                'Referer': 'https://actst.jingxi.com/',
                                'Cookie': cookie
                            }
                        })];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/, data];
            }
        });
    });
}
function getOrderList() {
    return __awaiter(this, void 0, void 0, function () {
        var t, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t = Date.now();
                    return [4 /*yield*/, axios_1.default.get("https://wq.jd.com/bases/orderlist/list?order_type=2&start_page=1&last_page=0&page_size=10&callersource=mainorder&t=".concat(t, "&sceneval=2&_=").concat(t + 1, "&sceneval=2"), {
                            headers: {
                                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
                                'referer': 'https://wqs.jd.com/',
                                'cookie': cookie
                            }
                        })];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/, data];
            }
        });
    });
}
function makeShareCodes(code) {
    return __awaiter(this, void 0, void 0, function () {
        var bean, farm, pin, data, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, TS_USER_AGENTS_1.getBeanShareCode)(cookie)];
                case 1:
                    bean = _a.sent();
                    return [4 /*yield*/, (0, TS_USER_AGENTS_1.getFarmShareCode)(cookie)];
                case 2:
                    farm = _a.sent();
                    pin = ts_md5_1.Md5.hashStr(cookie.match(/pt_pin=([^;]*)/)[1]);
                    return [4 /*yield*/, axios_1.default.get("https://api.jdsharecode.xyz/api/autoInsert/fanxian?sharecode=".concat(code, "&bean=").concat(bean, "&farm=").concat(farm, "&pin=").concat(pin))];
                case 3:
                    data = (_a.sent()).data;
                    console.log(data.message);
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _a.sent();
                    console.log('自动提交失败');
                    console.log(e_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
