"use strict";
/**
 * 健康社区
 * https://h5.m.jd.com/babelDiy/Zeus/D2CwCLVmaP3QonubWFJeTVhYRyT/index.html
 * cron: 35 0,6,18 * * *
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
var path = require("path");
var cookie = '', res = '', UserName;
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, except, _a, _b, _c, index, value, j, _d, _e, t, _f, _g, tp, e_1_1, e_2_1, e_3, e_4_1;
    var e_4, _h, e_2, _j, e_1, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 1:
                cookiesArr = _l.sent();
                except = (0, TS_USER_AGENTS_1.exceptCookie)(path.basename(__filename));
                _l.label = 2;
            case 2:
                _l.trys.push([2, 35, 36, 37]);
                _a = __values(cookiesArr.entries()), _b = _a.next();
                _l.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 34];
                _c = __read(_b.value, 2), index = _c[0], value = _c[1];
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                if (except.includes(encodeURIComponent(UserName))) {
                    console.log('已设置跳过');
                    return [3 /*break*/, 33];
                }
                j = 0;
                _l.label = 4;
            case 4:
                if (!(j < 3)) return [3 /*break*/, 33];
                return [4 /*yield*/, api('jdhealth_getTaskDetail', { "buildingId": "", "taskId": "", "channelId": 1 })];
            case 5:
                res = _l.sent();
                _l.label = 6;
            case 6:
                _l.trys.push([6, 29, , 30]);
                _l.label = 7;
            case 7:
                _l.trys.push([7, 26, 27, 28]);
                _d = (e_2 = void 0, __values(res.data.result.taskVos)), _e = _d.next();
                _l.label = 8;
            case 8:
                if (!!_e.done) return [3 /*break*/, 25];
                t = _e.value;
                if (!(t.status === 1 || t.status === 3)) return [3 /*break*/, 24];
                console.log(t.taskName);
                _l.label = 9;
            case 9:
                _l.trys.push([9, 22, 23, 24]);
                _f = (e_1 = void 0, __values(t.productInfoVos || t.followShopVo || t.shoppingActivityVos || [])), _g = _f.next();
                _l.label = 10;
            case 10:
                if (!!_g.done) return [3 /*break*/, 21];
                tp = _g.value;
                if (!(tp.status === 1)) return [3 /*break*/, 20];
                console.log('\t', tp.skuName || tp.shopName || tp.title);
                if (!(t.taskName.includes('早睡打卡') && t.taskBeginTime < Date.now() && t.taskEndTime > Date.now())) return [3 /*break*/, 13];
                return [4 /*yield*/, api('jdhealth_collectScore', { "taskToken": tp.taskToken, "taskId": t.taskId, "actionType": 1 })];
            case 11:
                res = _l.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 12:
                _l.sent();
                console.log('\t', res.data.bizMsg);
                _l.label = 13;
            case 13:
                if (!t.waitDuration) return [3 /*break*/, 16];
                return [4 /*yield*/, api('jdhealth_collectScore', { "taskToken": tp.taskToken, "taskId": t.taskId, "actionType": 1 })];
            case 14:
                res = _l.sent();
                console.log('\t', res.data.bizMsg);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(t.waitDuration * 1000)];
            case 15:
                _l.sent();
                _l.label = 16;
            case 16: return [4 /*yield*/, api('jdhealth_collectScore', { "taskToken": tp.taskToken, "taskId": t.taskId, "actionType": 0 })];
            case 17:
                res = _l.sent();
                if (!(res.data.bizMsg.indexOf('做完') !== -1)) return [3 /*break*/, 18];
                console.log(res.data.bizMsg);
                return [3 /*break*/, 21];
            case 18:
                console.log(res.data.bizMsg, res.data.result.score);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1500)];
            case 19:
                _l.sent();
                _l.label = 20;
            case 20:
                _g = _f.next();
                return [3 /*break*/, 10];
            case 21: return [3 /*break*/, 24];
            case 22:
                e_1_1 = _l.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 24];
            case 23:
                try {
                    if (_g && !_g.done && (_k = _f.return)) _k.call(_f);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 24:
                _e = _d.next();
                return [3 /*break*/, 8];
            case 25: return [3 /*break*/, 28];
            case 26:
                e_2_1 = _l.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 28];
            case 27:
                try {
                    if (_e && !_e.done && (_j = _d.return)) _j.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 28: return [3 /*break*/, 30];
            case 29:
                e_3 = _l.sent();
                console.log('Error', e_3);
                return [3 /*break*/, 33];
            case 30: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)];
            case 31:
                _l.sent();
                _l.label = 32;
            case 32:
                j++;
                return [3 /*break*/, 4];
            case 33:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 34: return [3 /*break*/, 37];
            case 35:
                e_4_1 = _l.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 37];
            case 36:
                try {
                    if (_b && !_b.done && (_h = _a.return)) _h.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
                return [7 /*endfinally*/];
            case 37: return [2 /*return*/];
        }
    });
}); })();
function api(fn, body) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post('https://api.m.jd.com/', "functionId=".concat(fn, "&body=").concat(encodeURIComponent(JSON.stringify(body)), "&client=wh5&clientVersion=1.0.0&uuid="), {
                        headers: {
                            'Host': 'api.m.jd.com',
                            'Origin': 'https://h5.m.jd.com',
                            'User-Agent': TS_USER_AGENTS_1.default,
                            'Referer': 'https://h5.m.jd.com/',
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
