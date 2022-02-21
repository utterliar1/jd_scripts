"use strict";
/**
 * 京东-锦鲤红包
 * 做任务、助力、开红包
 * cron: 1 0,6,18 * * *
 * CK1助力顺序
 * HW.ts -> 内部
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
var sendNotify_1 = require("./sendNotify");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var cookie = '', res = '', UserName;
var shareCodesSelf = [], shareCodes = [], shareCodesHW = [], fullCode = [];
var min = [0.02, 0.12, 0.3, 0.6, 0.7, 0.8, 1, 2];
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, _a, _b, _c, index, value, e_1, e_2_1, _d, _e, _f, index, value, shareCodes_1, shareCodes_1_1, code, e_3_1, e_4, e_5_1, _g, _h, _j, index, value, _k, _l, t, _m, _o, tp, e_6_1, e_7_1, _p, _q, t, e_8_1, j, _r, _s, t, e_9_1, e_10, e_11_1;
    var e_2, _t, e_5, _u, e_3, _v, e_11, _w, e_7, _x, e_6, _y, e_8, _z, e_9, _0;
    return __generator(this, function (_1) {
        switch (_1.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 1:
                cookiesArr = _1.sent();
                _1.label = 2;
            case 2:
                _1.trys.push([2, 11, 12, 13]);
                _a = __values(cookiesArr.entries()), _b = _a.next();
                _1.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 10];
                _c = __read(_b.value, 2), index = _c[0], value = _c[1];
                _1.label = 4;
            case 4:
                _1.trys.push([4, 8, , 9]);
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                return [4 /*yield*/, api('h5launch', { "followShop": 0, "random": (0, TS_USER_AGENTS_1.getRandomNumberByRange)(36135846, 74613584), "log": "".concat(Date.now(), "~0iuxyee"), "sceneid": "JLHBhPageh5" })];
            case 5:
                res = _1.sent();
                console.log('活动初始化：', res.data.result.statusDesc);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 6:
                _1.sent();
                return [4 /*yield*/, api('h5activityIndex', { "isjdapp": 1 })];
            case 7:
                res = _1.sent();
                console.log('红包ID：', res.data.result.redpacketInfo.id);
                shareCodesSelf.push(res.data.result.redpacketInfo.id);
                return [3 /*break*/, 9];
            case 8:
                e_1 = _1.sent();
                console.log(e_1);
                return [3 /*break*/, 9];
            case 9:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 10: return [3 /*break*/, 13];
            case 11:
                e_2_1 = _1.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 13];
            case 12:
                try {
                    if (_b && !_b.done && (_t = _a.return)) _t.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 13:
                console.log('内部助力：', shareCodesSelf);
                _1.label = 14;
            case 14:
                _1.trys.push([14, 32, 33, 34]);
                _d = __values(cookiesArr.entries()), _e = _d.next();
                _1.label = 15;
            case 15:
                if (!!_e.done) return [3 /*break*/, 31];
                _f = __read(_e.value, 2), index = _f[0], value = _f[1];
                _1.label = 16;
            case 16:
                _1.trys.push([16, 29, , 30]);
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                if (!(shareCodesHW.length === 0)) return [3 /*break*/, 18];
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.getshareCodeHW)('jlhb')];
            case 17:
                shareCodesHW = _1.sent();
                _1.label = 18;
            case 18:
                if (index === 0 || cookiesArr.length === 2) { // 红包1需2个助力
                    shareCodes = Array.from(new Set(__spreadArray(__spreadArray([], __read(shareCodesHW), false), __read(shareCodesSelf), false)));
                }
                else {
                    shareCodes = Array.from(new Set(__spreadArray(__spreadArray([], __read(shareCodesSelf), false), __read(shareCodesHW), false)));
                }
                if (cookiesArr.length > 5 && cookiesArr.length < 8 && index > 4) { // 红包3需要7个助力
                    shareCodes = Array.from(new Set(__spreadArray(__spreadArray([], __read(shareCodesHW), false), __read(shareCodesSelf), false)));
                }
                _1.label = 19;
            case 19:
                _1.trys.push([19, 26, 27, 28]);
                shareCodes_1 = (e_3 = void 0, __values(shareCodes)), shareCodes_1_1 = shareCodes_1.next();
                _1.label = 20;
            case 20:
                if (!!shareCodes_1_1.done) return [3 /*break*/, 25];
                code = shareCodes_1_1.value;
                if (!!fullCode.includes(code)) return [3 /*break*/, 23];
                console.log("\u8D26\u53F7".concat(index + 1, " ").concat(UserName, " \u53BB\u52A9\u529B ").concat(code, " ").concat(shareCodesSelf.includes(code) ? '*内部*' : ''));
                return [4 /*yield*/, api('jinli_h5assist', { "redPacketId": code, "followShop": 0, "random": (0, TS_USER_AGENTS_1.getRandomNumberByRange)(36135846, 74613584), "log": "".concat(Date.now(), "~0gga2ik"), "sceneid": "JLHBhPageh5" })];
            case 21:
                res = _1.sent();
                if (res.data.result.status === 0) {
                    console.log('助力成功：', parseFloat(res.data.result.assistReward.discount));
                }
                else if (res.data.result.status === 3) {
                    console.log('今日助力次数已满');
                    return [3 /*break*/, 25];
                }
                else {
                    console.log('助力结果：', res.data.result.statusDesc);
                    if (res.data.result.statusDesc === '啊偶，TA的助力已满，开启自己的红包活动吧~') {
                        fullCode.push(code);
                    }
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 22:
                _1.sent();
                return [3 /*break*/, 24];
            case 23:
                console.log("Code ".concat(code, " \u5DF2\u88AB\u52A9\u6EE1"));
                _1.label = 24;
            case 24:
                shareCodes_1_1 = shareCodes_1.next();
                return [3 /*break*/, 20];
            case 25: return [3 /*break*/, 28];
            case 26:
                e_3_1 = _1.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 28];
            case 27:
                try {
                    if (shareCodes_1_1 && !shareCodes_1_1.done && (_v = shareCodes_1.return)) _v.call(shareCodes_1);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 28: return [3 /*break*/, 30];
            case 29:
                e_4 = _1.sent();
                console.log(e_4);
                return [3 /*break*/, 30];
            case 30:
                _e = _d.next();
                return [3 /*break*/, 15];
            case 31: return [3 /*break*/, 34];
            case 32:
                e_5_1 = _1.sent();
                e_5 = { error: e_5_1 };
                return [3 /*break*/, 34];
            case 33:
                try {
                    if (_e && !_e.done && (_u = _d.return)) _u.call(_d);
                }
                finally { if (e_5) throw e_5.error; }
                return [7 /*endfinally*/];
            case 34:
                _1.trys.push([34, 93, 94, 95]);
                _g = __values(cookiesArr.entries()), _h = _g.next();
                _1.label = 35;
            case 35:
                if (!!_h.done) return [3 /*break*/, 92];
                _j = __read(_h.value, 2), index = _j[0], value = _j[1];
                _1.label = 36;
            case 36:
                _1.trys.push([36, 90, , 91]);
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                return [4 /*yield*/, api('taskHomePage', {})];
            case 37:
                // 做任务
                res = _1.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 38:
                _1.sent();
                _1.label = 39;
            case 39:
                _1.trys.push([39, 60, 61, 62]);
                _k = (e_7 = void 0, __values(res.data.result.taskInfos)), _l = _k.next();
                _1.label = 40;
            case 40:
                if (!!_l.done) return [3 /*break*/, 59];
                t = _l.value;
                if (!(!t.alreadyReceivedCount || t.alreadyReceivedCount < t.requireCount)) return [3 /*break*/, 53];
                if (![2, 3, 4, 5, 8].includes(t.taskType)) return [3 /*break*/, 53];
                return [4 /*yield*/, api('startTask', { "taskType": t.taskType, "random": (0, TS_USER_AGENTS_1.getRandomNumberByRange)(36135846, 74613584), "log": "".concat(Date.now(), "~1orj8k3"), "sceneid": "JLHBhPageh5" })];
            case 41:
                res = _1.sent();
                console.log(t.title, res.data.biz_msg);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 42:
                _1.sent();
                return [4 /*yield*/, api('getTaskDetailForColor', { taskType: t.taskType })];
            case 43:
                res = _1.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 44:
                _1.sent();
                _1.label = 45;
            case 45:
                _1.trys.push([45, 51, 52, 53]);
                _m = (e_6 = void 0, __values(res.data.result.advertDetails)), _o = _m.next();
                _1.label = 46;
            case 46:
                if (!!_o.done) return [3 /*break*/, 50];
                tp = _o.value;
                if (!(tp.status === 0)) return [3 /*break*/, 49];
                return [4 /*yield*/, api('taskReportForColor', { "taskType": t.taskType, "detailId": tp.id })];
            case 47:
                res = _1.sent();
                console.log(t.title, tp.name, res.data.biz_msg);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 48:
                _1.sent();
                _1.label = 49;
            case 49:
                _o = _m.next();
                return [3 /*break*/, 46];
            case 50: return [3 /*break*/, 53];
            case 51:
                e_6_1 = _1.sent();
                e_6 = { error: e_6_1 };
                return [3 /*break*/, 53];
            case 52:
                try {
                    if (_o && !_o.done && (_y = _m.return)) _y.call(_m);
                }
                finally { if (e_6) throw e_6.error; }
                return [7 /*endfinally*/];
            case 53:
                if (!(t.innerStatus === 3)) return [3 /*break*/, 58];
                return [4 /*yield*/, api('h5receiveRedpacketAll', { "taskType": t.taskType, "random": (0, TS_USER_AGENTS_1.getRandomNumberByRange)(36135846, 74613584), "log": "".concat(Date.now(), "~138q6w6"), "sceneid": "JLHBhPageh5" })];
            case 54:
                res = _1.sent();
                console.log("".concat(t.title, " \u6253\u5F00\u6210\u529F\uFF0C\u83B7\u5F97"), parseFloat(res.data.result.discount));
                if (!!min.includes(parseFloat(res.data.result.discount))) return [3 /*break*/, 56];
                return [4 /*yield*/, (0, sendNotify_1.sendNotify)("\u9526\u9CA4\u7EA2\u5305", "\u8D26\u53F7".concat(index + 1, " ").concat(UserName, "\n").concat(res.data.result.discount))];
            case 55:
                _1.sent();
                _1.label = 56;
            case 56: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 57:
                _1.sent();
                _1.label = 58;
            case 58:
                _l = _k.next();
                return [3 /*break*/, 40];
            case 59: return [3 /*break*/, 62];
            case 60:
                e_7_1 = _1.sent();
                e_7 = { error: e_7_1 };
                return [3 /*break*/, 62];
            case 61:
                try {
                    if (_l && !_l.done && (_x = _k.return)) _x.call(_k);
                }
                finally { if (e_7) throw e_7.error; }
                return [7 /*endfinally*/];
            case 62: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)
                // 打开任务红包
            ];
            case 63:
                _1.sent();
                return [4 /*yield*/, api('taskHomePage', {})];
            case 64:
                // 打开任务红包
                res = _1.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 65:
                _1.sent();
                _1.label = 66;
            case 66:
                _1.trys.push([66, 74, 75, 76]);
                _p = (e_8 = void 0, __values(res.data.result.taskInfos)), _q = _p.next();
                _1.label = 67;
            case 67:
                if (!!_q.done) return [3 /*break*/, 73];
                t = _q.value;
                if (!(t.innerStatus === 3)) return [3 /*break*/, 72];
                return [4 /*yield*/, api('h5receiveRedpacketAll', { "taskType": t.taskType, "random": (0, TS_USER_AGENTS_1.getRandomNumberByRange)(36135846, 74613584), "log": "".concat(Date.now(), "~138q6w6"), "sceneid": "JLHBhPageh5" })];
            case 68:
                res = _1.sent();
                console.log("".concat(t.title, " \u6253\u5F00\u6210\u529F\uFF0C\u83B7\u5F97"), parseFloat(res.data.result.discount));
                if (!!min.includes(parseFloat(res.data.result.discount))) return [3 /*break*/, 70];
                return [4 /*yield*/, (0, sendNotify_1.sendNotify)("\u9526\u9CA4\u7EA2\u5305", "\u8D26\u53F7".concat(index + 1, " ").concat(UserName, "\n").concat(res.data.result.discount))];
            case 69:
                _1.sent();
                _1.label = 70;
            case 70: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 71:
                _1.sent();
                _1.label = 72;
            case 72:
                _q = _p.next();
                return [3 /*break*/, 67];
            case 73: return [3 /*break*/, 76];
            case 74:
                e_8_1 = _1.sent();
                e_8 = { error: e_8_1 };
                return [3 /*break*/, 76];
            case 75:
                try {
                    if (_q && !_q.done && (_z = _p.return)) _z.call(_p);
                }
                finally { if (e_8) throw e_8.error; }
                return [7 /*endfinally*/];
            case 76: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)
                // 打开助力红包
            ];
            case 77:
                _1.sent();
                j = 1;
                return [4 /*yield*/, api('h5activityIndex', { "isjdapp": 1 })];
            case 78:
                res = _1.sent();
                _1.label = 79;
            case 79:
                _1.trys.push([79, 87, 88, 89]);
                _r = (e_9 = void 0, __values(res.data.result.redpacketConfigFillRewardInfo)), _s = _r.next();
                _1.label = 80;
            case 80:
                if (!!_s.done) return [3 /*break*/, 86];
                t = _s.value;
                if (!(t.packetStatus === 2)) return [3 /*break*/, 81];
                console.log("\u7EA2\u5305".concat(j, "\u5DF2\u62C6\u8FC7\uFF0C\u83B7\u5F97"), t.packetAmount);
                return [3 /*break*/, 84];
            case 81:
                if (!(t.packetStatus === 1)) return [3 /*break*/, 84];
                console.log("\u7EA2\u5305".concat(j, "\u53EF\u62C6"));
                return [4 /*yield*/, api('h5receiveRedpacketAll', { "random": (0, TS_USER_AGENTS_1.getRandomNumberByRange)(36135846, 74613584), "log": "".concat(Date.now(), "~0suodw0"), "sceneid": "JLHBhPageh5" })];
            case 82:
                res = _1.sent();
                console.log(res.data.biz_msg, parseFloat(res.data.result.discount));
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 83:
                _1.sent();
                _1.label = 84;
            case 84:
                j++;
                _1.label = 85;
            case 85:
                _s = _r.next();
                return [3 /*break*/, 80];
            case 86: return [3 /*break*/, 89];
            case 87:
                e_9_1 = _1.sent();
                e_9 = { error: e_9_1 };
                return [3 /*break*/, 89];
            case 88:
                try {
                    if (_s && !_s.done && (_0 = _r.return)) _0.call(_r);
                }
                finally { if (e_9) throw e_9.error; }
                return [7 /*endfinally*/];
            case 89: return [3 /*break*/, 91];
            case 90:
                e_10 = _1.sent();
                console.log(e_10);
                return [3 /*break*/, 91];
            case 91:
                _h = _g.next();
                return [3 /*break*/, 35];
            case 92: return [3 /*break*/, 95];
            case 93:
                e_11_1 = _1.sent();
                e_11 = { error: e_11_1 };
                return [3 /*break*/, 95];
            case 94:
                try {
                    if (_h && !_h.done && (_w = _g.return)) _w.call(_g);
                }
                finally { if (e_11) throw e_11.error; }
                return [7 /*endfinally*/];
            case 95: return [2 /*return*/];
        }
    });
}); })();
function api(fn, body) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("https://api.m.jd.com/api?appid=jinlihongbao&functionId=".concat(fn, "&loginType=2&client=jinlihongbao&t=").concat(Date.now(), "&clientVersion=10.2.4&osVersion=-1"), "body=".concat(encodeURIComponent(JSON.stringify(body))), {
                        headers: {
                            'Host': 'api.m.jd.com',
                            'Origin': 'https://happy.m.jd.com',
                            'Connection': 'keep-alive',
                            'Accept': 'application/json, text/plain, */*',
                            'User-Agent': TS_USER_AGENTS_1.default,
                            'Referer': 'https://happy.m.jd.com/',
                            'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
                            'Content-Type': 'application/x-www-form-urlencoded',
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
