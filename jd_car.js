"use strict";
/**
 * 京东-汽车-签到
 * cron: 15 1 * * *
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
var cookie = '', res = '', UserName;
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, _a, _b, _c, index, value, e_1, e_2_1;
    var e_2, _d;
    var _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    return __generator(this, function (_q) {
        switch (_q.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 1:
                cookiesArr = _q.sent();
                _q.label = 2;
            case 2:
                _q.trys.push([2, 11, 12, 13]);
                _a = __values(cookiesArr.entries()), _b = _a.next();
                _q.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 10];
                _c = __read(_b.value, 2), index = _c[0], value = _c[1];
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                _q.label = 4;
            case 4:
                _q.trys.push([4, 8, , 9]);
                return [4 /*yield*/, api()];
            case 5:
                res = _q.sent();
                console.log(((_f = (_e = res.data) === null || _e === void 0 ? void 0 : _e.dailyAward) === null || _f === void 0 ? void 0 : _f.title) || ((_h = (_g = res.data) === null || _g === void 0 ? void 0 : _g.continuityAward) === null || _h === void 0 ? void 0 : _h.title));
                console.log('获得京豆', ((_l = (_k = (_j = res.data) === null || _j === void 0 ? void 0 : _j.dailyAward) === null || _k === void 0 ? void 0 : _k.beanAward) === null || _l === void 0 ? void 0 : _l.beanCount) * 1 || ((_p = (_o = (_m = res.data) === null || _m === void 0 ? void 0 : _m.continuityAward) === null || _o === void 0 ? void 0 : _o.beanAward) === null || _p === void 0 ? void 0 : _p.beanCount) * 1);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 6:
                _q.sent();
                return [4 /*yield*/, cgame()];
            case 7:
                res = _q.sent();
                console.log('获得京豆', res.data.beanNum);
                return [3 /*break*/, 9];
            case 8:
                e_1 = _q.sent();
                console.log(e_1);
                return [3 /*break*/, 9];
            case 9:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 10: return [3 /*break*/, 13];
            case 11:
                e_2_1 = _q.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 13];
            case 12:
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 13: return [2 /*return*/];
        }
    });
}); })();
function api() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post('https://api.m.jd.com/client.action', 'functionId=signBeanIndex&appid=ld', {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            'Host': 'api.m.jd.com',
                            'Origin': 'https://api.m.jd.com',
                            'Referer': 'https://api.m.jd.com',
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
function cgame() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post('https://cgame-stadium.jd.com/api/v1/sign', '', {
                        headers: {
                            'Connection': 'keep-alive',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Content-Type': 'application/json',
                            'Origin': 'https://pro.m.jd.com',
                            'ActivityId': '7c51826be9f241c1ad9733df34d242c5',
                            'Host': 'cgame-stadium.jd.com',
                            'Referer': 'https://pro.m.jd.com/mall/active/dj6us2JJRLMMBb4iDaSK4wxvBMt/index.html',
                            'Accept-Language': 'zh-cn',
                            'Accept': 'application/json',
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
