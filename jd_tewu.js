"use strict";
/**
 * 京东-下拉
 * cron: 15 8,20 * * *
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
var path = require("path");
var cookie = '', UserName = '', res = '', message = '', shareCodes = [], shareCodesSelf = [], shareCodesHW = [], black = [];
var except = (0, TS_USER_AGENTS_1.exceptCookie)(path.basename(__filename));
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, activityId, _a, _b, _c, index, value, encryptProjectId, divide, _d, _e, t, tp, _f, _g, sign, e_1_1, e_2_1, sum, userStarNum, i, e_3, e_4, e_5_1, full, _h, _j, _k, index, value, shareCodes_1, shareCodes_1_1, code, e_6_1, e_7_1;
    var e_5, _l, e_2, _m, e_1, _o, e_7, _p, e_6, _q;
    var _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
    return __generator(this, function (_9) {
        switch (_9.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.getCookie)()];
            case 1:
                cookiesArr = _9.sent();
                _9.label = 2;
            case 2:
                _9.trys.push([2, 44, 45, 46]);
                _a = __values(cookiesArr.entries()), _b = _a.next();
                _9.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 43];
                _c = __read(_b.value, 2), index = _c[0], value = _c[1];
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                if (except.includes(encodeURIComponent(UserName))) {
                    console.log('已设置跳过');
                    return [3 /*break*/, 42];
                }
                return [4 /*yield*/, api('showSecondFloorCardInfo', { "source": "card" })];
            case 4:
                res = _9.sent();
                _9.label = 5;
            case 5:
                _9.trys.push([5, 40, , 42]);
                activityId = res.data.result.activityBaseInfo.activityId;
                encryptProjectId = res.data.result.activityBaseInfo.encryptProjectId;
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 6:
                _9.sent();
                divide = res.data.result.activityCardInfo.divideStatus === 0 && res.data.result.activityCardInfo.cardStatus === 1;
                return [4 /*yield*/, api('superBrandTaskList', { "source": "card", "activityId": activityId, "assistInfoFlag": 1 })];
            case 7:
                // 任务
                res = _9.sent();
                _9.label = 8;
            case 8:
                _9.trys.push([8, 25, 26, 27]);
                _d = (e_2 = void 0, __values(res.data.result.taskList)), _e = _d.next();
                _9.label = 9;
            case 9:
                if (!!_e.done) return [3 /*break*/, 24];
                t = _e.value;
                if (!(t.completionCnt !== t.assignmentTimesLimit)) return [3 /*break*/, 22];
                if (!(((_r = t.ext) === null || _r === void 0 ? void 0 : _r.shoppingActivity) || ((_s = t.ext) === null || _s === void 0 ? void 0 : _s.followShop))) return [3 /*break*/, 12];
                tp = ((_t = t.ext) === null || _t === void 0 ? void 0 : _t.shoppingActivity) || ((_u = t.ext) === null || _u === void 0 ? void 0 : _u.followShop);
                tp = tp[0];
                console.log(tp.title || tp.shopName, tp.itemId);
                return [4 /*yield*/, api('superBrandDoTask', { "source": "card", "activityId": activityId, "encryptProjectId": encryptProjectId, "encryptAssignmentId": t.encryptAssignmentId, "assignmentType": t.assignmentType, "itemId": tp.itemId, "actionType": 0 })];
            case 10:
                res = _9.sent();
                console.log((_v = res.data) === null || _v === void 0 ? void 0 : _v.bizMsg);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 11:
                _9.sent();
                _9.label = 12;
            case 12:
                if (!((_w = t.ext) === null || _w === void 0 ? void 0 : _w.sign2)) return [3 /*break*/, 22];
                _9.label = 13;
            case 13:
                _9.trys.push([13, 20, 21, 22]);
                _f = (e_1 = void 0, __values(t.ext.sign2)), _g = _f.next();
                _9.label = 14;
            case 14:
                if (!!_g.done) return [3 /*break*/, 19];
                sign = _g.value;
                if (!(sign.status === 0 && [10, 18].includes(new Date().getHours()))) return [3 /*break*/, 17];
                return [4 /*yield*/, api('superBrandDoTask', { "source": "card", "activityId": activityId, "encryptProjectId": encryptProjectId, "encryptAssignmentId": t.encryptAssignmentId, "assignmentType": t.assignmentType, "itemId": t.ext.currentSectionItemId, "actionType": 0 })];
            case 15:
                res = _9.sent();
                console.log((_x = res.data) === null || _x === void 0 ? void 0 : _x.bizMsg);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 16:
                _9.sent();
                console.log('下拉任务', (_y = t.ext) === null || _y === void 0 ? void 0 : _y.sign2);
                return [3 /*break*/, 18];
            case 17:
                if (sign.status !== 0) {
                    console.log("".concat(sign.beginTime, " \u7B7E\u5230\u5B8C\u6210"));
                }
                _9.label = 18;
            case 18:
                _g = _f.next();
                return [3 /*break*/, 14];
            case 19: return [3 /*break*/, 22];
            case 20:
                e_1_1 = _9.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 22];
            case 21:
                try {
                    if (_g && !_g.done && (_o = _f["return"])) _o.call(_f);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 22:
                // 助力码
                if ((_z = t.ext) === null || _z === void 0 ? void 0 : _z.assistTaskDetail) {
                    console.log('助力码：', t.ext.assistTaskDetail.itemId);
                    console.log('收到助力：', (_2 = (_1 = (_0 = t.ext) === null || _0 === void 0 ? void 0 : _0.assistList) === null || _1 === void 0 ? void 0 : _1.length) !== null && _2 !== void 0 ? _2 : 0);
                    shareCodesSelf.push({
                        activityId: activityId,
                        encryptProjectId: encryptProjectId,
                        encryptAssignmentId: t.encryptAssignmentId,
                        itemId: t.ext.assistTaskDetail.itemId
                    });
                }
                _9.label = 23;
            case 23:
                _e = _d.next();
                return [3 /*break*/, 9];
            case 24: return [3 /*break*/, 27];
            case 25:
                e_2_1 = _9.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 27];
            case 26:
                try {
                    if (_e && !_e.done && (_m = _d["return"])) _m.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 27:
                _9.trys.push([27, 35, , 36]);
                if (!(new Date().getHours() === 20)) return [3 /*break*/, 34];
                sum = 0;
                return [4 /*yield*/, api('superBrandSecondFloorMainPage', { "source": "card" })];
            case 28:
                res = _9.sent();
                userStarNum = res.data.result.activityUserInfo.userStarNum;
                console.log('可以抽奖', userStarNum, '次');
                i = 0;
                _9.label = 29;
            case 29:
                if (!(i < userStarNum)) return [3 /*break*/, 33];
                return [4 /*yield*/, api('superBrandTaskLottery', { "source": "card", "activityId": activityId })];
            case 30:
                res = _9.sent();
                if ((_5 = (_4 = (_3 = res.data.result) === null || _3 === void 0 ? void 0 : _3.rewardComponent) === null || _4 === void 0 ? void 0 : _4.beanList) === null || _5 === void 0 ? void 0 : _5.length) {
                    console.log('抽奖获得京豆：', res.data.result.rewardComponent.beanList[0].quantity);
                    sum += res.data.result.rewardComponent.beanList[0].quantity;
                }
                else {
                    console.log('没抽到？', JSON.stringify(res));
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 31:
                _9.sent();
                _9.label = 32;
            case 32:
                i++;
                return [3 /*break*/, 29];
            case 33:
                message += "\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n\u62BD\u5956").concat(userStarNum, "\u6B21\uFF0C\u83B7\u5F97\u4EAC\u8C46").concat(sum, "\n\n");
                _9.label = 34;
            case 34: return [3 /*break*/, 36];
            case 35:
                e_3 = _9.sent();
                console.log('error');
                return [3 /*break*/, 36];
            case 36: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 37:
                _9.sent();
                if (!divide) return [3 /*break*/, 39];
                console.log('瓜分');
                return [4 /*yield*/, api('superBrandTaskLottery', { "source": "card", "activityId": activityId, "encryptProjectId": encryptProjectId, "tag": "divide" })];
            case 38:
                res = _9.sent();
                if (res.data.success) {
                    console.log('瓜分成功', (_8 = (_7 = (_6 = res.data.result) === null || _6 === void 0 ? void 0 : _6.rewardComponent) === null || _7 === void 0 ? void 0 : _7.beanList[0]) === null || _8 === void 0 ? void 0 : _8.quantity);
                }
                _9.label = 39;
            case 39: return [3 /*break*/, 42];
            case 40:
                e_4 = _9.sent();
                black.push(UserName);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 41:
                _9.sent();
                return [3 /*break*/, 42];
            case 42:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 43: return [3 /*break*/, 46];
            case 44:
                e_5_1 = _9.sent();
                e_5 = { error: e_5_1 };
                return [3 /*break*/, 46];
            case 45:
                try {
                    if (_b && !_b.done && (_l = _a["return"])) _l.call(_a);
                }
                finally { if (e_5) throw e_5.error; }
                return [7 /*endfinally*/];
            case 46:
                (0, TS_USER_AGENTS_1.o2s)(shareCodesSelf);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.getshareCodeHW)('tewu')];
            case 47:
                shareCodesHW = _9.sent();
                shareCodes = __spreadArray(__spreadArray([], __read(shareCodesSelf), false), __read(shareCodesHW), false);
                full = [];
                _9.label = 48;
            case 48:
                _9.trys.push([48, 60, 61, 62]);
                _h = __values(cookiesArr.entries()), _j = _h.next();
                _9.label = 49;
            case 49:
                if (!!_j.done) return [3 /*break*/, 59];
                _k = __read(_j.value, 2), index = _k[0], value = _k[1];
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                if (except.includes(encodeURIComponent(UserName))) {
                    console.log('已设置跳过');
                    return [3 /*break*/, 58];
                }
                if (black.includes(UserName)) {
                    console.log('黑号');
                    return [3 /*break*/, 58];
                }
                _9.label = 50;
            case 50:
                _9.trys.push([50, 56, 57, 58]);
                shareCodes_1 = (e_6 = void 0, __values(shareCodes)), shareCodes_1_1 = shareCodes_1.next();
                _9.label = 51;
            case 51:
                if (!!shareCodes_1_1.done) return [3 /*break*/, 55];
                code = shareCodes_1_1.value;
                if (full.includes(code.itemId))
                    return [3 /*break*/, 54];
                console.log("\u8D26\u53F7".concat(index + 1, " ").concat(UserName, " \u53BB\u52A9\u529B ").concat(code.itemId));
                return [4 /*yield*/, api('superBrandDoTask', { "source": "card", "activityId": code.activityId, "encryptProjectId": code.encryptProjectId, "encryptAssignmentId": code.encryptAssignmentId, "assignmentType": 2, "itemId": code.itemId, "actionType": 0 })];
            case 52:
                res = _9.sent();
                if (res.data.bizCode === '0') {
                    console.log('助力成功');
                }
                else if (res.data.bizCode === '103') {
                    console.log('助力满了');
                    full.push(code.itemId);
                }
                else if (res.data.bizCode === '104') {
                    console.log('已助力过');
                }
                else if (res.data.bizCode === '108') {
                    console.log('上限');
                    return [3 /*break*/, 55];
                }
                else if (res.data.bizCode === '109') {
                }
                else if (res.data.bizCode === '2001') {
                    console.log('黑号');
                    return [3 /*break*/, 55];
                }
                else if (res.data.bizCode === '4001') {
                    console.log('助力码过期');
                    full.push(code.itemId);
                }
                else {
                    (0, TS_USER_AGENTS_1.o2s)(res, 'error');
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 53:
                _9.sent();
                _9.label = 54;
            case 54:
                shareCodes_1_1 = shareCodes_1.next();
                return [3 /*break*/, 51];
            case 55: return [3 /*break*/, 58];
            case 56:
                e_6_1 = _9.sent();
                e_6 = { error: e_6_1 };
                return [3 /*break*/, 58];
            case 57:
                try {
                    if (shareCodes_1_1 && !shareCodes_1_1.done && (_q = shareCodes_1["return"])) _q.call(shareCodes_1);
                }
                finally { if (e_6) throw e_6.error; }
                return [7 /*endfinally*/];
            case 58:
                _j = _h.next();
                return [3 /*break*/, 49];
            case 59: return [3 /*break*/, 62];
            case 60:
                e_7_1 = _9.sent();
                e_7 = { error: e_7_1 };
                return [3 /*break*/, 62];
            case 61:
                try {
                    if (_j && !_j.done && (_p = _h["return"])) _p.call(_h);
                }
                finally { if (e_7) throw e_7.error; }
                return [7 /*endfinally*/];
            case 62: return [2 /*return*/];
        }
    });
}); })();
function api(fn, body) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.post)("https://api.m.jd.com/?uuid=&client=wh5&appid=ProductZ4Brand&functionId=".concat(fn, "&t=").concat(Date.now(), "&body=").concat(encodeURIComponent(JSON.stringify(body))), '', {
                        'Host': 'api.m.jd.com',
                        'Origin': 'https://pro.m.jd.com',
                        'User-Agent': TS_USER_AGENTS_1["default"],
                        'Referer': 'https://pro.m.jd.com/',
                        'Cookie': cookie
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
