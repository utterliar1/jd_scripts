"use strict";
/**
 * 极速版-挖宝
 * 助力，挖宝，任务，提现
 * cron: 2 0,1,18 * * *
 * CK1     HW.ts -> 内部
 * CK2～n  内部   -> HW.ts
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
exports.__esModule = true;
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var h5st_1 = require("./utils/h5st");
var cookie = '', res = '', UserName, data, h5stTool = new h5st_1.H5ST("ce6c2", "jdltapp;", "9929056438203725");
var shareCodes = [], shareCodesHW = [], shareCodesSelf = [];
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, _a, _b, _c, index, value, e_1, e_2_1, _d, _e, _f, index, value, shareCodesSelf_1, shareCodesSelf_1_1, code, e_3_1, e_4, e_5_1, _g, _h, _j, index, value, blood, i, j, _k, _l, t, e_6_1, _m, _o, t, j, e_7_1;
    var e_2, _p, e_5, _q, e_3, _r, e_7, _s, e_6, _t, e_8, _u;
    return __generator(this, function (_v) {
        switch (_v.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()
                // 获取助力码
            ];
            case 1:
                cookiesArr = _v.sent();
                _v.label = 2;
            case 2:
                _v.trys.push([2, 12, 13, 14]);
                _a = __values(cookiesArr.entries()), _b = _a.next();
                _v.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 11];
                _c = __read(_b.value, 2), index = _c[0], value = _c[1];
                _v.label = 4;
            case 4:
                _v.trys.push([4, 7, , 8]);
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                return [4 /*yield*/, h5stTool.__genAlgo()];
            case 5:
                _v.sent();
                return [4 /*yield*/, api('happyDigHome', { "linkId": "pTTvJeSTrpthgk9ASBVGsw" })];
            case 6:
                res = _v.sent();
                console.log('助力码', res.data.markedPin, res.data.inviteCode);
                shareCodesSelf.push({ inviter: res.data.markedPin, inviteCode: res.data.inviteCode });
                return [3 /*break*/, 8];
            case 7:
                e_1 = _v.sent();
                console.log('error', e_1);
                return [3 /*break*/, 8];
            case 8: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 9:
                _v.sent();
                _v.label = 10;
            case 10:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 11: return [3 /*break*/, 14];
            case 12:
                e_2_1 = _v.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 14];
            case 13:
                try {
                    if (_b && !_b.done && (_p = _a["return"])) _p.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 14:
                console.log('内部助力');
                (0, TS_USER_AGENTS_1.o2s)(shareCodesSelf);
                _v.label = 15;
            case 15:
                _v.trys.push([15, 40, 41, 42]);
                _d = __values(cookiesArr.entries()), _e = _d.next();
                _v.label = 16;
            case 16:
                if (!!_e.done) return [3 /*break*/, 39];
                _f = __read(_e.value, 2), index = _f[0], value = _f[1];
                _v.label = 17;
            case 17:
                _v.trys.push([17, 36, , 38]);
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                return [4 /*yield*/, h5stTool.__genAlgo()];
            case 18:
                _v.sent();
                if (!(shareCodesHW.length === 0)) return [3 /*break*/, 20];
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.getshareCodeHW)('fcwb')];
            case 19:
                shareCodesHW = _v.sent();
                _v.label = 20;
            case 20:
                if (index === 0 && cookiesArr.length === 1) {
                    shareCodes = Array.from(new Set(__spreadArray(__spreadArray([], __read(shareCodesHW), false), __read(shareCodesSelf), false)));
                }
                else {
                    shareCodes = Array.from(new Set(__spreadArray(__spreadArray([], __read(shareCodesSelf), false), __read(shareCodesHW), false)));
                }
                _v.label = 21;
            case 21:
                _v.trys.push([21, 33, 34, 35]);
                shareCodesSelf_1 = (e_3 = void 0, __values(shareCodesSelf)), shareCodesSelf_1_1 = shareCodesSelf_1.next();
                _v.label = 22;
            case 22:
                if (!!shareCodesSelf_1_1.done) return [3 /*break*/, 32];
                code = shareCodesSelf_1_1.value;
                console.log("\u53BB\u52A9\u529B ".concat(code.inviteCode));
                return [4 /*yield*/, api('happyDigHelp', { "linkId": "pTTvJeSTrpthgk9ASBVGsw", "inviter": code.inviter, "inviteCode": code.inviteCode })];
            case 23:
                res = _v.sent();
                if (!(res.code === 0)) return [3 /*break*/, 25];
                console.log('助力成功');
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 24:
                _v.sent();
                return [3 /*break*/, 32];
            case 25:
                if (!(res.code === 16143)) return [3 /*break*/, 26];
                console.log('已助力');
                return [3 /*break*/, 29];
            case 26:
                if (!(res.code === 16144)) return [3 /*break*/, 28];
                console.log('上限');
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 27:
                _v.sent();
                return [3 /*break*/, 32];
            case 28:
                (0, TS_USER_AGENTS_1.o2s)(res);
                _v.label = 29;
            case 29: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 30:
                _v.sent();
                _v.label = 31;
            case 31:
                shareCodesSelf_1_1 = shareCodesSelf_1.next();
                return [3 /*break*/, 22];
            case 32: return [3 /*break*/, 35];
            case 33:
                e_3_1 = _v.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 35];
            case 34:
                try {
                    if (shareCodesSelf_1_1 && !shareCodesSelf_1_1.done && (_r = shareCodesSelf_1["return"])) _r.call(shareCodesSelf_1);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 35: return [3 /*break*/, 38];
            case 36:
                e_4 = _v.sent();
                console.log('error', e_4);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 37:
                _v.sent();
                return [3 /*break*/, 38];
            case 38:
                _e = _d.next();
                return [3 /*break*/, 16];
            case 39: return [3 /*break*/, 42];
            case 40:
                e_5_1 = _v.sent();
                e_5 = { error: e_5_1 };
                return [3 /*break*/, 42];
            case 41:
                try {
                    if (_e && !_e.done && (_q = _d["return"])) _q.call(_d);
                }
                finally { if (e_5) throw e_5.error; }
                return [7 /*endfinally*/];
            case 42:
                _v.trys.push([42, 74, 75, 76]);
                _g = __values(cookiesArr.entries()), _h = _g.next();
                _v.label = 43;
            case 43:
                if (!!_h.done) return [3 /*break*/, 73];
                _j = __read(_h.value, 2), index = _j[0], value = _j[1];
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                return [4 /*yield*/, h5stTool.__genAlgo()];
            case 44:
                _v.sent();
                return [4 /*yield*/, api('happyDigHome', { "linkId": "pTTvJeSTrpthgk9ASBVGsw" })];
            case 45:
                res = _v.sent();
                blood = res.data.blood;
                i = 0;
                _v.label = 46;
            case 46:
                if (!(i < 4)) return [3 /*break*/, 54];
                if (blood <= 1) {
                    console.log('能量剩余1，跳过 A');
                    return [3 /*break*/, 54];
                }
                j = 0;
                _v.label = 47;
            case 47:
                if (!(j < 4)) return [3 /*break*/, 53];
                if (blood <= 1) {
                    console.log('能量剩余1，跳过 B');
                    return [3 /*break*/, 53];
                }
                return [4 /*yield*/, api('happyDigDo', { "round": 1, "rowIdx": i, "colIdx": j, "linkId": "pTTvJeSTrpthgk9ASBVGsw" })];
            case 48:
                res = _v.sent();
                (0, TS_USER_AGENTS_1.o2s)(res);
                if (res.data.chunk.type === 1) {
                    console.log('挖到👎');
                }
                else if (res.data.chunk.type === 2) {
                    console.log('挖到🧧', parseFloat(res.data.chunk.value));
                }
                else if (res.data.chunk.type === 4) {
                    console.log('挖到💣');
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 49:
                _v.sent();
                return [4 /*yield*/, api('happyDigHome', { "linkId": "pTTvJeSTrpthgk9ASBVGsw" })];
            case 50:
                res = _v.sent();
                if (res.data.blood === 1) {
                    blood = 1;
                    console.log('能量剩余1，退出');
                    return [3 /*break*/, 53];
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 51:
                _v.sent();
                _v.label = 52;
            case 52:
                j++;
                return [3 /*break*/, 47];
            case 53:
                i++;
                return [3 /*break*/, 46];
            case 54: return [4 /*yield*/, api('apTaskList', { "linkId": "pTTvJeSTrpthgk9ASBVGsw" })];
            case 55:
                // 任务
                res = _v.sent();
                _v.label = 56;
            case 56:
                _v.trys.push([56, 62, 63, 64]);
                _k = (e_6 = void 0, __values(res.data)), _l = _k.next();
                _v.label = 57;
            case 57:
                if (!!_l.done) return [3 /*break*/, 61];
                t = _l.value;
                if (!(t.taskType === 'BROWSE_CHANNEL')) return [3 /*break*/, 60];
                console.log(t.taskTitle);
                return [4 /*yield*/, api('apDoTask', { "linkId": "pTTvJeSTrpthgk9ASBVGsw", "taskType": "BROWSE_CHANNEL", "taskId": t.id, "channel": 4, "itemId": encodeURIComponent(t.taskSourceUrl), "checkVersion": false })];
            case 58:
                data = _v.sent();
                data.errMsg ? console.log('任务失败', data.errMsg) : console.log('任务成功');
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 59:
                _v.sent();
                _v.label = 60;
            case 60:
                _l = _k.next();
                return [3 /*break*/, 57];
            case 61: return [3 /*break*/, 64];
            case 62:
                e_6_1 = _v.sent();
                e_6 = { error: e_6_1 };
                return [3 /*break*/, 64];
            case 63:
                try {
                    if (_l && !_l.done && (_t = _k["return"])) _t.call(_k);
                }
                finally { if (e_6) throw e_6.error; }
                return [7 /*endfinally*/];
            case 64:
                try {
                    for (_m = (e_8 = void 0, __values(res.data)), _o = _m.next(); !_o.done; _o = _m.next()) {
                        t = _o.value;
                        if (t.taskTitle === '发财挖宝浏览任务') {
                        }
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_o && !_o.done && (_u = _m["return"])) _u.call(_m);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                return [4 /*yield*/, api('apTaskDetail', { "linkId": "SS55rTBOHtnLCm3n9UMk7Q", "taskType": "BROWSE_CHANNEL", "taskId": 357, "channel": 4 })];
            case 65:
                res = _v.sent();
                j = res.data.status.userFinishedTimes;
                _v.label = 66;
            case 66:
                if (!(j < res.data.status.finishNeed)) return [3 /*break*/, 72];
                return [4 /*yield*/, api('apTaskTimeRecord', { "linkId": "SS55rTBOHtnLCm3n9UMk7Q", "taskId": 357 })];
            case 67:
                res = _v.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(20 * 1000)];
            case 68:
                _v.sent();
                return [4 /*yield*/, api('apTaskList', { "linkId": "SS55rTBOHtnLCm3n9UMk7Q" })];
            case 69:
                _v.sent();
                return [4 /*yield*/, api('apTaskDetail', { "linkId": "SS55rTBOHtnLCm3n9UMk7Q", "taskType": "BROWSE_CHANNEL", "taskId": 357, "channel": 4 })];
            case 70:
                res = _v.sent();
                console.log(res);
                _v.label = 71;
            case 71:
                j++;
                return [3 /*break*/, 66];
            case 72:
                _h = _g.next();
                return [3 /*break*/, 43];
            case 73: return [3 /*break*/, 76];
            case 74:
                e_7_1 = _v.sent();
                e_7 = { error: e_7_1 };
                return [3 /*break*/, 76];
            case 75:
                try {
                    if (_h && !_h.done && (_s = _g["return"])) _s.call(_g);
                }
                finally { if (e_7) throw e_7.error; }
                return [7 /*endfinally*/];
            case 76: return [2 /*return*/];
        }
    });
}); })();
function api(fn, body) {
    return __awaiter(this, void 0, void 0, function () {
        var timestamp, h5st;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timestamp = Date.now();
                    h5st = h5stTool.__genH5st({
                        appid: 'activities_platform',
                        body: JSON.stringify(body),
                        client: 'H5',
                        clientVersion: '1.0.0',
                        functionId: fn,
                        t: timestamp.toString()
                    });
                    return [4 /*yield*/, (0, TS_USER_AGENTS_1.get)("https://api.m.jd.com/?functionId=".concat(fn, "&body=").concat(encodeURIComponent(JSON.stringify(body)), "&t=").concat(timestamp, "&appid=activities_platform&client=H5&clientVersion=1.0.0&h5st=").concat(h5st), {
                            'Host': 'api.m.jd.com',
                            'Origin': 'https://bnzf.jd.com',
                            'User-Agent': "jdapp;iPhone;10.2.2;14.3;".concat((0, TS_USER_AGENTS_1.randomString)(40), ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;"),
                            'Referer': 'https://bnzf.jd.com/',
                            'Cookie': cookie
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
