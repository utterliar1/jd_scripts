"use strict";
/**
 * 赚赚
 * cron: 30 9 * * *
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var cookie = '', UserName = '', res = '';
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, _a, _b, _c, index, value, headers, _d, _e, t, taskItem, e_1_1, e_2_1;
    var e_2, _f, e_1, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.getCookie)()];
            case 1:
                cookiesArr = _h.sent();
                _h.label = 2;
            case 2:
                _h.trys.push([2, 17, 18, 19]);
                _a = __values(cookiesArr.entries()), _b = _a.next();
                _h.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 16];
                _c = __read(_b.value, 2), index = _c[0], value = _c[1];
                cookie = value;
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index + 1, "\u3011").concat(UserName, "\n"));
                headers = { 'Host': 'api.m.jd.com', 'wqreferer': 'http://wq.jd.com/wxapp/pages/hd-interaction/task/index', 'User-Agent': 'MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1', 'Referer': 'https://servicewechat.com/wx8830763b00c18ac3/115/page-frame.html', 'Content-Type': 'application/json', 'Cookie': cookie };
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.get)("https://api.m.jd.com/client.action?functionId=interactTaskIndex&body=%7B%22mpVersion%22%3A%223.4.0%22%7D&appid=wh5&loginWQBiz=interact&g_ty=ls&g_tk=".concat((0, TS_USER_AGENTS_1.randomNumString)(9)), headers)];
            case 4:
                res = _h.sent();
                console.log(res.data.cashExpected);
                _h.label = 5;
            case 5:
                _h.trys.push([5, 11, 12, 13]);
                _d = (e_1 = void 0, __values(res.data.taskDetailResList)), _e = _d.next();
                _h.label = 6;
            case 6:
                if (!!_e.done) return [3 /*break*/, 10];
                t = _e.value;
                if (!(t.times === 0)) return [3 /*break*/, 9];
                console.log(t.taskName);
                taskItem = __assign(__assign({}, t), { "fullTaskName": "".concat(t.taskName, " (0/1)"), "btnText": "去完成" });
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.get)("https://api.m.jd.com/client.action?functionId=doInteractTask&body=".concat(encodeURIComponent(JSON.stringify({ "taskId": t.taskId, "taskItem": taskItem, "actionType": 0, "taskToken": t.taskToken, "mpVersion": "3.4.0" })), "&appid=wh5&loginWQBiz=interact&g_ty=ls&g_tk=").concat((0, TS_USER_AGENTS_1.randomNumString)(9)), headers)];
            case 7:
                res = _h.sent();
                console.log(res.message);
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 8:
                _h.sent();
                _h.label = 9;
            case 9:
                _e = _d.next();
                return [3 /*break*/, 6];
            case 10: return [3 /*break*/, 13];
            case 11:
                e_1_1 = _h.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 13];
            case 12:
                try {
                    if (_e && !_e.done && (_g = _d["return"])) _g.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 13: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 14:
                _h.sent();
                _h.label = 15;
            case 15:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 16: return [3 /*break*/, 19];
            case 17:
                e_2_1 = _h.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 19];
            case 18:
                try {
                    if (_b && !_b.done && (_f = _a["return"])) _f.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 19: return [2 /*return*/];
        }
    });
}); })();
