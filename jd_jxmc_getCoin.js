"use strict";
/**
 * 单独收牛牛
 * cron: 0,30 * * * *
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
var path = require("path");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var V3_1 = require("./utils/V3");
var fs_1 = require("fs");
var cookie = '', res = '', homePageInfo, jxToken, UserName, index;
var _a = require('./utils/jd_jxmc.js'), cow = _a.cow, token = _a.token, ua = 'jdpingou;';
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var account, cookiesArr, except, i, account_1, account_1_1, acc, lastgettime, food, cowToken;
    var e_1, _a;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                account = [];
                if ((0, fs_1.existsSync)('./utils/account.json')) {
                    try {
                        account = JSON.parse((0, fs_1.readFileSync)('./utils/account.json').toString());
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                return [4 /*yield*/, (0, V3_1.requestAlgo)('00df8', 'jdpingou;')];
            case 1:
                _d.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 2:
                cookiesArr = _d.sent();
                except = (0, TS_USER_AGENTS_1.exceptCookie)(path.basename(__filename));
                i = 0;
                _d.label = 3;
            case 3:
                if (!(i < cookiesArr.length)) return [3 /*break*/, 10];
                cookie = cookiesArr[i];
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                index = i + 1;
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index, "\u3011").concat(UserName, "\n"));
                if (except.includes(encodeURIComponent(UserName))) {
                    console.log('已设置跳过');
                    return [3 /*break*/, 9];
                }
                ua = 'jdpingou;';
                try {
                    for (account_1 = (e_1 = void 0, __values(account)), account_1_1 = account_1.next(); !account_1_1.done; account_1_1 = account_1.next()) {
                        acc = account_1_1.value;
                        if ((acc === null || acc === void 0 ? void 0 : acc.pt_pin.includes(UserName)) && (acc === null || acc === void 0 ? void 0 : acc.jdpingou)) {
                            ua = acc.jdpingou;
                            console.log('指定UA：', ua);
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (account_1_1 && !account_1_1.done && (_a = account_1.return)) _a.call(account_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return [4 /*yield*/, token(cookie)];
            case 4:
                jxToken = _d.sent();
                return [4 /*yield*/, api('queryservice/GetHomePageInfo', 'activeid,activekey,channel,isgift,isqueryinviteicon,isquerypicksite,isregionflag,jxmc_jstoken,phoneid,sceneid,timestamp', { isgift: 1, isquerypicksite: 1, isqueryinviteicon: 1, isregionflag: 0, activeid: null })];
            case 5:
                homePageInfo = _d.sent();
                lastgettime = void 0;
                if ((_c = (_b = homePageInfo.data) === null || _b === void 0 ? void 0 : _b.cow) === null || _c === void 0 ? void 0 : _c.lastgettime) {
                    lastgettime = homePageInfo.data.cow.lastgettime;
                }
                else {
                    return [3 /*break*/, 9];
                }
                food = 0;
                try {
                    food = homePageInfo.data.materialinfo[0].value;
                }
                catch (e) {
                    console.log('未开通？黑号？');
                    return [3 /*break*/, 9];
                }
                return [4 /*yield*/, cow(lastgettime)];
            case 6:
                cowToken = _d.sent();
                return [4 /*yield*/, api('operservice/GetCoin', 'activeid,activekey,channel,commtype,jxmc_jstoken,phoneid,sceneid,timestamp,token', { token: cowToken, commtype: 0, activeid: 'jxmc_active_0001' })];
            case 7:
                res = _d.sent();
                if (res.ret === 0)
                    console.log('收牛牛:', res.data.addcoin);
                else
                    console.log('收牛牛:', res);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)];
            case 8:
                _d.sent();
                _d.label = 9;
            case 9:
                i++;
                return [3 /*break*/, 3];
            case 10: return [2 /*return*/];
        }
    });
}); })();
function api(fn, stk, params) {
    return __awaiter(this, void 0, void 0, function () {
        var url, t, _a, _b, _c, key, value, data, e_2;
        var e_3, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    t = [
                        { key: 'activekey', value: 'null' },
                        { key: 'channel', value: '7' },
                        { key: 'jxmc_jstoken', value: jxToken.farm_jstoken },
                        { key: 'phoneid', value: jxToken.phoneid },
                        { key: 'sceneid', value: '1001' },
                        { key: 'timestamp', value: jxToken.timestamp.toString() },
                    ];
                    url = "https://m.jingxi.com/jxmc/".concat(fn, "?channel=7&sceneid=1001&activekey=null&jxmc_jstoken=").concat(jxToken['farm_jstoken'], "&timestamp=").concat(jxToken.timestamp, "&phoneid=").concat(jxToken.phoneid, "&_stk=").concat(encodeURIComponent(stk), "&_ste=1&_=").concat(Date.now(), "&sceneval=2&g_login_type=1&callback=jsonpCBK").concat((0, TS_USER_AGENTS_1.randomWord)(), "&g_ty=ls");
                    try {
                        for (_a = __values(Object.entries(params)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            _c = __read(_b.value, 2), key = _c[0], value = _c[1];
                            t.push({ key: key, value: value });
                            url += "&".concat(key, "=").concat(value);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    url += "&h5st=".concat(encodeURIComponent((0, V3_1.geth5st)(t, '00df8')));
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get(url, {
                            headers: {
                                'Host': 'm.jingxi.com',
                                'Accept': '*/*',
                                'Connection': 'keep-alive',
                                'User-Agent': ua,
                                'Referer': 'https://st.jingxi.com/pingou/jxmc/index.html',
                                'Cookie': cookie
                            }
                        })];
                case 2:
                    data = (_e.sent()).data;
                    return [2 /*return*/, JSON.parse(data.replace(/jsonpCBK.?\(/, '').split('\n')[0])];
                case 3:
                    e_2 = _e.sent();
                    console.log('api Error:', e_2);
                    return [2 /*return*/, {}];
                case 4: return [2 /*return*/];
            }
        });
    });
}
