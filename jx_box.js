"use strict";
/**
 * 京喜-88红包-宝箱
 * 做任务、开宝箱
 * 每号可收20次助力，出1次助力
 * cron: 5 0,6,12 * * *
 * CK1默认优先助力HW.ts，其余助力CK1
 * HW_Priority: boolean
 * true  HW.ts -> 内部
 * false 内部   -> HW.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var cookie = '', res = '', UserName, index;
var shareCodeSelf = [], shareCode = [], shareCodeHW = ['bdf489af86e5021575040fffee407bc2', '92a46b6081a955fb4dcea1e56e590b3a', '638d77021a1dd4d74cad72d44afd9899', 'f4dc33716d2551e372fd44f5ac0baca8', 'c99659c47858f18fb34427fec4647f17', '34bf741e6bb01c53d879f58b2c1a9205'];
var HW_Priority = true;
process.env.HW_Priority === 'false' ? HW_Priority = false : '';
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, i, HW_Random, shareCode_1, shareCode_1_1, code, e_1_1, i, _a, _b, t, e_2_1, _c, _d, t, e_3_1, e_4;
    var e_1, _e, e_2, _f, e_3, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requestAlgo)()];
            case 1:
                _h.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 2:
                cookiesArr = _h.sent();
                cookie = cookiesArr[0];
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F71 ".concat(UserName, "\n"));
                return [4 /*yield*/, api('query', 'signhb_source,smp,type', {})];
            case 3:
                res = _h.sent();
                console.log('助力码:', res.smp);
                shareCodeSelf.push(res.smp);
                console.log('内部助力:', shareCodeSelf);
                i = 0;
                _h.label = 4;
            case 4:
                if (!(i < cookiesArr.length)) return [3 /*break*/, 14];
                HW_Random = shareCodeHW[Math.floor(Math.random() * shareCodeHW.length)];
                if (i === 0 && HW_Priority) {
                    shareCode = Array.from(new Set(__spreadArray([HW_Random], __read(shareCodeSelf), false)));
                }
                else {
                    shareCode = Array.from(new Set(__spreadArray(__spreadArray([], __read(shareCodeSelf), false), [HW_Random], false)));
                }
                cookie = cookiesArr[i];
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                _h.label = 5;
            case 5:
                _h.trys.push([5, 11, 12, 13]);
                shareCode_1 = (e_1 = void 0, __values(shareCode)), shareCode_1_1 = shareCode_1.next();
                _h.label = 6;
            case 6:
                if (!!shareCode_1_1.done) return [3 /*break*/, 10];
                code = shareCode_1_1.value;
                console.log("".concat(UserName, " \u53BB\u52A9\u529B ").concat(code));
                return [4 /*yield*/, api('query', 'signhb_source,smp,type', { signhb_source: 5, smp: code, type: 1 })];
            case 7:
                res = _h.sent();
                console.log('助力码:', res.smp);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 8:
                _h.sent();
                if (res.autosign_sendhb !== '0' || res.todaysign === 1)
                    return [3 /*break*/, 10];
                _h.label = 9;
            case 9:
                shareCode_1_1 = shareCode_1.next();
                return [3 /*break*/, 6];
            case 10: return [3 /*break*/, 13];
            case 11:
                e_1_1 = _h.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 13];
            case 12:
                try {
                    if (shareCode_1_1 && !shareCode_1_1.done && (_e = shareCode_1.return)) _e.call(shareCode_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 13:
                i++;
                return [3 /*break*/, 4];
            case 14:
                i = 0;
                _h.label = 15;
            case 15:
                if (!(i < cookiesArr.length)) return [3 /*break*/, 43];
                cookie = cookiesArr[i];
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                index = i + 1;
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index, "\u3011").concat(UserName, "\n"));
                _h.label = 16;
            case 16:
                _h.trys.push([16, 39, , 40]);
                return [4 /*yield*/, api('query', 'ispp,signhb_source,smp,tk,type', { signhb_source: 5, smp: '', ispp: 0, tk: '', type: 1 })];
            case 17:
                // 宝箱任务
                res = _h.sent();
                try {
                    console.log(res.invitesign);
                    console.log(parseFloat(res.invitesign.getmoney));
                }
                catch (e) {
                    console.log(res);
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 18:
                _h.sent();
                return [4 /*yield*/, api('query', 'signhb_source,smp,type', { signhb_source: 5, smp: '', type: 1 })];
            case 19:
                res = _h.sent();
                _h.label = 20;
            case 20:
                _h.trys.push([20, 26, 27, 28]);
                _a = (e_2 = void 0, __values(res.commontask || [])), _b = _a.next();
                _h.label = 21;
            case 21:
                if (!!_b.done) return [3 /*break*/, 25];
                t = _b.value;
                if (!(t.status === 1)) return [3 /*break*/, 24];
                console.log(t.taskname);
                return [4 /*yield*/, api("https://m.jingxi.com/fanxiantask/signhb/dotask?task=".concat(t.task, "&signhb_source=5&_=").concat(Date.now(), "&sceneval=2"), '')];
            case 22:
                res = _h.sent();
                if (res.ret === 0) {
                    console.log('任务完成，获得：', res.sendhb);
                }
                else {
                    console.log('任务失败：', res.errmsg);
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)];
            case 23:
                _h.sent();
                _h.label = 24;
            case 24:
                _b = _a.next();
                return [3 /*break*/, 21];
            case 25: return [3 /*break*/, 28];
            case 26:
                e_2_1 = _h.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 28];
            case 27:
                try {
                    if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 28: return [4 /*yield*/, api('query', 'signhb_source,smp,type', { signhb_source: 5, smp: '', type: 1 })];
            case 29:
                // 开宝箱
                res = _h.sent();
                if (!(res.baoxiang_left != 0)) return [3 /*break*/, 38];
                console.log(res.baoxiang_stage);
                _h.label = 30;
            case 30:
                _h.trys.push([30, 36, 37, 38]);
                _c = (e_3 = void 0, __values(res.baoxiang_stage)), _d = _c.next();
                _h.label = 31;
            case 31:
                if (!!_d.done) return [3 /*break*/, 35];
                t = _d.value;
                if (!(t.status === 1)) return [3 /*break*/, 34];
                return [4 /*yield*/, api("https://m.jingxi.com/fanxiantask/signhb/bxdraw?_=".concat(Date.now(), "&sceneval=2"), '')];
            case 32:
                res = _h.sent();
                console.log('开宝箱，获得：', res.sendhb);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)];
            case 33:
                _h.sent();
                _h.label = 34;
            case 34:
                _d = _c.next();
                return [3 /*break*/, 31];
            case 35: return [3 /*break*/, 38];
            case 36:
                e_3_1 = _h.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 38];
            case 37:
                try {
                    if (_d && !_d.done && (_g = _c.return)) _g.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 38: return [3 /*break*/, 40];
            case 39:
                e_4 = _h.sent();
                console.log(e_4);
                return [3 /*break*/, 40];
            case 40: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)];
            case 41:
                _h.sent();
                _h.label = 42;
            case 42:
                i++;
                return [3 /*break*/, 15];
            case 43: return [2 /*return*/];
        }
    });
}); })();
function api(fn, stk, params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var url, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://m.jingxi.com/fanxiantask/signhb/".concat(fn, "?_stk=").concat(encodeURIComponent(stk), "&_ste=1&_=").concat(Date.now(), "&sceneval=2&g_login_type=1&callback=jsonpCBK").concat((0, TS_USER_AGENTS_1.randomWord)(), "&g_ty=ls");
                    if (fn.match(/(dotask|bxdraw)/)) {
                        url = fn;
                    }
                    url = (0, TS_USER_AGENTS_1.h5st)(url, stk, params, 10038);
                    return [4 /*yield*/, axios_1.default.get(url, {
                            headers: {
                                'Host': 'm.jingxi.com',
                                'Accept': '*/*',
                                'Connection': 'keep-alive',
                                'User-Agent': 'jdpingou;',
                                'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
                                'Referer': 'https://st.jingxi.com/',
                                'Cookie': cookie,
                            }
                        })];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/, JSON.parse(data.match(/\((.*)/)[1])];
            }
        });
    });
}
