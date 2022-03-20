"use strict";
/**
 * 京喜->领88元红包
 * CK1    HW.ts -> 内部
 * CK2-n  内部   -> HW.ts
 * cron: 5 0,6,16 * * *
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var V3_1 = require("./utils/V3");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var token = require('./utils/jd_jxmc.js').token;
var cookie = '', res = '', UserName, UA = '';
var shareCodesSelf = [], shareCodes = [], shareCodesHW = [], jxToken, data;
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, _a, _b, _c, index, value, strUserPin, dwHelpedTimes, e_1_1, _d, _e, _f, index, value, strUserPin, shareCodes_1, shareCodes_1_1, code, e_2_1, e_3_1, _g, _h, _j, index, value, dwHelpedTimes, _k, _l, t, e_4_1, e_5_1;
    var e_1, _m, e_3, _o, e_2, _p, e_5, _q, e_4, _r;
    var _s;
    return __generator(this, function (_t) {
        switch (_t.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 1:
                cookiesArr = _t.sent();
                _t.label = 2;
            case 2:
                _t.trys.push([2, 12, 13, 14]);
                _a = __values(cookiesArr.entries()), _b = _a.next();
                _t.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 11];
                _c = __read(_b.value, 2), index = _c[0], value = _c[1];
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                return [4 /*yield*/, token(cookie)];
            case 4:
                jxToken = _t.sent();
                return [4 /*yield*/, (0, V3_1.requestAlgo)('e395f')];
            case 5:
                _t.sent();
                return [4 /*yield*/, api('GetUserInfo', 'activeId', { activeId: '529439' })];
            case 6:
                res = _t.sent();
                (0, TS_USER_AGENTS_1.o2s)(res);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 7:
                _t.sent();
                strUserPin = res.Data.strUserPin, dwHelpedTimes = res.Data.dwHelpedTimes;
                console.log('收到助力:', dwHelpedTimes);
                console.log('助力码：', strUserPin);
                shareCodesSelf.push(strUserPin);
                return [4 /*yield*/, api('JoinActive', 'phoneid,stepreward_jstoken,strPin,timestamp', { phoneid: jxToken.phoneid, stepreward_jstoken: jxToken.farm_jstoken, strPin: '', timestamp: jxToken.timestamp })];
            case 8:
                res = _t.sent();
                res.iRet === 0 ? console.log('JoinActive: 成功') : console.log('JoinActive:', res.sErrMsg);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 9:
                _t.sent();
                _t.label = 10;
            case 10:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 11: return [3 /*break*/, 14];
            case 12:
                e_1_1 = _t.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 14];
            case 13:
                try {
                    if (_b && !_b.done && (_m = _a.return)) _m.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 14:
                console.log('内部助力码：', shareCodesSelf);
                _t.label = 15;
            case 15:
                _t.trys.push([15, 33, 34, 35]);
                _d = __values(cookiesArr.entries()), _e = _d.next();
                _t.label = 16;
            case 16:
                if (!!_e.done) return [3 /*break*/, 32];
                _f = __read(_e.value, 2), index = _f[0], value = _f[1];
                return [4 /*yield*/, (0, V3_1.requestAlgo)('e395f')];
            case 17:
                _t.sent();
                cookie = value;
                return [4 /*yield*/, token(cookie)];
            case 18:
                jxToken = _t.sent();
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                return [4 /*yield*/, api('GetUserInfo', 'activeId', { activeId: '529439' })];
            case 19:
                res = _t.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 20:
                _t.sent();
                strUserPin = res.Data.strUserPin;
                if (!(shareCodesHW.length === 0)) return [3 /*break*/, 22];
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.getshareCodeHW)('88hb')];
            case 21:
                shareCodesHW = _t.sent();
                _t.label = 22;
            case 22:
                if (index === 0) {
                    shareCodes = Array.from(new Set(__spreadArray(__spreadArray([], __read(shareCodesHW), false), __read(shareCodesSelf), false)));
                }
                else {
                    shareCodes = Array.from(new Set(__spreadArray(__spreadArray([], __read(shareCodesSelf), false), __read(shareCodesHW), false)));
                }
                _t.label = 23;
            case 23:
                _t.trys.push([23, 29, 30, 31]);
                shareCodes_1 = (e_2 = void 0, __values(shareCodes)), shareCodes_1_1 = shareCodes_1.next();
                _t.label = 24;
            case 24:
                if (!!shareCodes_1_1.done) return [3 /*break*/, 28];
                code = shareCodes_1_1.value;
                if (!(code !== strUserPin)) return [3 /*break*/, 27];
                console.log("\u8D26\u53F7 ".concat(UserName, " \u53BB\u52A9\u529B ").concat(code));
                return [4 /*yield*/, api('EnrollFriend', 'phoneid,stepreward_jstoken,strPin,timestamp', {
                        phoneid: jxToken.phoneid,
                        stepreward_jstoken: jxToken.farm_jstoken,
                        strPin: code,
                        timestamp: jxToken.timestamp
                    })];
            case 25:
                res = _t.sent();
                if (res.iRet === 0) {
                    console.log('成功');
                }
                else if (res.iRet === 2015) {
                    console.log('上限');
                    return [3 /*break*/, 28];
                }
                else if (res.iRet === 2016) {
                    console.log('火爆');
                    return [3 /*break*/, 28];
                }
                else {
                    console.log('其他错误:', res);
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(5000)];
            case 26:
                _t.sent();
                _t.label = 27;
            case 27:
                shareCodes_1_1 = shareCodes_1.next();
                return [3 /*break*/, 24];
            case 28: return [3 /*break*/, 31];
            case 29:
                e_2_1 = _t.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 31];
            case 30:
                try {
                    if (shareCodes_1_1 && !shareCodes_1_1.done && (_p = shareCodes_1.return)) _p.call(shareCodes_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 31:
                _e = _d.next();
                return [3 /*break*/, 16];
            case 32: return [3 /*break*/, 35];
            case 33:
                e_3_1 = _t.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 35];
            case 34:
                try {
                    if (_e && !_e.done && (_o = _d.return)) _o.call(_d);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 35:
                _t.trys.push([35, 52, 53, 54]);
                _g = __values(cookiesArr.entries()), _h = _g.next();
                _t.label = 36;
            case 36:
                if (!!_h.done) return [3 /*break*/, 51];
                _j = __read(_h.value, 2), index = _j[0], value = _j[1];
                return [4 /*yield*/, (0, V3_1.requestAlgo)('e395f')];
            case 37:
                _t.sent();
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                return [4 /*yield*/, token(cookie)];
            case 38:
                jxToken = _t.sent();
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, " \u62C6\u7EA2\u5305\n"));
                return [4 /*yield*/, api('GetUserInfo', 'activeId', { activeId: '529439' })];
            case 39:
                res = _t.sent();
                dwHelpedTimes = res.Data.dwHelpedTimes;
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 40:
                _t.sent();
                _t.label = 41;
            case 41:
                _t.trys.push([41, 48, 49, 50]);
                _k = (e_4 = void 0, __values(res.Data.gradeConfig)), _l = _k.next();
                _t.label = 42;
            case 42:
                if (!!_l.done) return [3 /*break*/, 47];
                t = _l.value;
                if (!(dwHelpedTimes >= t.dwHelpTimes && t.dwIsHasDraw === 1)) return [3 /*break*/, 45];
                return [4 /*yield*/, api('DoGradeDraw', 'grade', { grade: t.dwGrade })];
            case 43:
                res = _t.sent();
                if (res.iRet === 0)
                    console.log("\u7B49\u7EA7".concat(t.dwGrade, "\u7EA2\u5305\u6253\u5F00\u6210\u529F"));
                else {
                    console.log('其他错误', (_s = res.sErrMsg) !== null && _s !== void 0 ? _s : JSON.stringify(res));
                    return [3 /*break*/, 47];
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(15000)];
            case 44:
                _t.sent();
                return [3 /*break*/, 46];
            case 45:
                console.log("\u7B49\u7EA7".concat(t.dwGrade, "\u7EA2\u5305\u5DF2\u6253\u5F00"));
                _t.label = 46;
            case 46:
                _l = _k.next();
                return [3 /*break*/, 42];
            case 47: return [3 /*break*/, 50];
            case 48:
                e_4_1 = _t.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 50];
            case 49:
                try {
                    if (_l && !_l.done && (_r = _k.return)) _r.call(_k);
                }
                finally { if (e_4) throw e_4.error; }
                return [7 /*endfinally*/];
            case 50:
                _h = _g.next();
                return [3 /*break*/, 36];
            case 51: return [3 /*break*/, 54];
            case 52:
                e_5_1 = _t.sent();
                e_5 = { error: e_5_1 };
                return [3 /*break*/, 54];
            case 53:
                try {
                    if (_h && !_h.done && (_q = _g.return)) _q.call(_g);
                }
                finally { if (e_5) throw e_5.error; }
                return [7 /*endfinally*/];
            case 54: return [2 /*return*/];
        }
    });
}); })();
function api(fn, stk, params) {
    return __awaiter(this, void 0, void 0, function () {
        var timestamp, url, t, _a, _b, _c, key, value, h5st, data_1, e_6;
        var e_7, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    timestamp = Date.now();
                    url = "https://m.jingxi.com/cubeactive/steprewardv3/".concat(fn, "?activeId=529439&_stk=").concat(stk, "&_ste=1&userDraw=0&publishFlag=1&channel=7&_t=").concat(timestamp, "&_=").concat(timestamp, "&sceneval=2&g_login_type=1&callback=jsonpCBK").concat((0, TS_USER_AGENTS_1.randomWord)(), "&g_ty=ls");
                    UA = "jdpingou;iPhone;4.13.0;14.4.2;".concat((0, TS_USER_AGENTS_1.randomString)(40), ";network/wifi;model/iPhone10,2;appBuild/100609;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/").concat(Math.random() * 98 + 1, ";pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148");
                    t = [];
                    try {
                        for (_a = __values(Object.entries(params)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            _c = __read(_b.value, 2), key = _c[0], value = _c[1];
                            t.push({ key: key, value: value });
                            url += "&".concat(key, "=").concat(value);
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    h5st = (0, V3_1.geth5st)(t, 'e395f');
                    url += "&h5st=".concat(encodeURIComponent(h5st));
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get(url, {
                            headers: {
                                'Host': 'm.jingxi.com',
                                'User-Agent': UA,
                                'Referer': 'https://st.jingxi.com/sns/202106/29/signinhb_new/index.html',
                                'Cookie': cookie
                            }
                        })];
                case 2:
                    data_1 = (_e.sent()).data;
                    return [2 /*return*/, JSON.parse(data_1.match(/jsonpCBK.?\((.*)/)[1])];
                case 3:
                    e_6 = _e.sent();
                    return [2 /*return*/, {}];
                case 4: return [2 /*return*/];
            }
        });
    });
}
