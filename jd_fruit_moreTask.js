"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 农场补充任务
 * cron: 0 11,12 * * *
 */
var axios_1 = require("axios");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var dotenv = require("dotenv");
var notify = require('./sendNotify');
dotenv.config();
var cookie = '', res = '';
var UserName, index;
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, i, _a, isLogin, nickName, k, _b, _c, t, e_1_1;
    var e_1, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 1:
                cookiesArr = _e.sent();
                i = 0;
                _e.label = 2;
            case 2:
                if (!(i < cookiesArr.length)) return [3 /*break*/, 21];
                cookie = cookiesArr[i];
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                index = i + 1;
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.TotalBean)(cookie)];
            case 3:
                _a = _e.sent(), isLogin = _a.isLogin, nickName = _a.nickName;
                if (!isLogin) {
                    notify.sendNotify(__filename.split('/').pop(), "cookie\u5DF2\u5931\u6548\n\u4EAC\u4E1C\u8D26\u53F7".concat(index, "\uFF1A").concat(nickName || UserName));
                    return [3 /*break*/, 20];
                }
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index, "\u3011").concat(nickName || UserName, "\n"));
                k = 0;
                _e.label = 4;
            case 4:
                if (!(k < 3)) return [3 /*break*/, 20];
                console.log("round:".concat(k + 1));
                return [4 /*yield*/, api("taskInitForFarm", { "version": 14, "channel": 1, "babelChannel": "120" })];
            case 5:
                res = _e.sent();
                _e.label = 6;
            case 6:
                _e.trys.push([6, 15, 16, 17]);
                _b = (e_1 = void 0, __values(res.gotBrowseTaskAdInit.userBrowseTaskAds)), _c = _b.next();
                _e.label = 7;
            case 7:
                if (!!_c.done) return [3 /*break*/, 14];
                t = _c.value;
                if (!(t.limit !== t.hadGotTimes)) return [3 /*break*/, 13];
                if (!(t.hadFinishedTimes !== 0)) return [3 /*break*/, 9];
                return [4 /*yield*/, api("browseAdTaskForFarm", { "advertId": t.advertId, "type": 1, "version": 14, "channel": 1, "babelChannel": "120" })];
            case 8:
                // 领取
                res = _e.sent();
                console.log('领取水滴：', res.amount);
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, api("browseAdTaskForFarm", { "advertId": t.advertId, "type": 0, "version": 14, "channel": 1, "babelChannel": "120" })];
            case 10:
                // 做任务
                res = _e.sent();
                if (res.code === '0')
                    console.log("".concat(t.mainTitle, "\uFF1A\u4EFB\u52A1\u5B8C\u6210"));
                else
                    console.log("".concat(t.mainTitle, "\uFF1A\u4EFB\u52A1\u5931\u8D25-").concat(res.code));
                _e.label = 11;
            case 11: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 12:
                _e.sent();
                _e.label = 13;
            case 13:
                _c = _b.next();
                return [3 /*break*/, 7];
            case 14: return [3 /*break*/, 17];
            case 15:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 17];
            case 16:
                try {
                    if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 17: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)];
            case 18:
                _e.sent();
                _e.label = 19;
            case 19:
                k++;
                return [3 /*break*/, 4];
            case 20:
                i++;
                return [3 /*break*/, 2];
            case 21: return [2 /*return*/];
        }
    });
}); })();
function api(fn, body) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("https://api.m.jd.com/client.action?functionId=".concat(fn, "&body=").concat(escape(JSON.stringify(body)), "&appid=wh5"), {
                        headers: {
                            'Referer': 'https://carry.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html',
                            'Connection': 'keep-alive',
                            'Origin': 'https://carry.m.jd.com',
                            'Host': 'api.m.jd.com',
                            'User-Agent': TS_USER_AGENTS_1.default,
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
