"use strict";
/**
 * 京喜工厂：肯德基、沃尔玛
 * cron: 0 * * * *
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var sendNotify_1 = require("./sendNotify");
var cookie = '', res = '', message = '';
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, keywords, _a, _b, t, name_1, commodityId, desp, keywords_1, keywords_1_1, keyword, e_1_1, e_2_1;
    var e_2, _c, e_1, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requestAlgo)(10001)];
            case 1:
                _e.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 2:
                cookiesArr = _e.sent();
                cookie = cookiesArr[Math.floor(Math.random() * cookiesArr.length)];
                return [4 /*yield*/, api()];
            case 3:
                /*
                let exist: string[] = [];
                if (existsSync('json/jxgc_stock.json')) {
                  exist = JSON.parse(readFileSync('./json/jxgc_stock.json').toString() || '[]')
                }
                res = await api();
                let current: string[] = []
                for (let t of res.data.commodityList) {
                  console.log(t.name)
                  current.push(t.name)
                  if (!exist.includes(t.name)) {
                    message += t.name + '\n'
                  }
                }
                writeFileSync('./json/jxgc_stock.json', JSON.stringify(current))
                if (message) {
                  console.log('send...')
                  sendNotify('京喜工厂可生产', message)
                }
                 */
                res = _e.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 4:
                _e.sent();
                keywords = ['KFC', 'kfc', '肯德基', '沃尔玛'];
                _e.label = 5;
            case 5:
                _e.trys.push([5, 18, 19, 20]);
                _a = __values(res.data.commodityList), _b = _a.next();
                _e.label = 6;
            case 6:
                if (!!_b.done) return [3 /*break*/, 17];
                t = _b.value;
                name_1 = t.name, commodityId = t.commodityId;
                return [4 /*yield*/, api(commodityId)];
            case 7:
                res = _e.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 8:
                _e.sent();
                desp = res.data.commodityList[0].description;
                if (desp.indexOf('红包') > -1) {
                    desp = desp.match(/奖[励|品]以(.*)发放/)[1];
                    message += "".concat(name_1, " ").concat(desp, "\n");
                }
                else if (desp.indexOf('支付') > -1) {
                    desp = desp.match(/完成需(.*元)/)[1];
                }
                else {
                    (0, TS_USER_AGENTS_1.o2s)(res);
                }
                console.log(name_1, desp);
                _e.label = 9;
            case 9:
                _e.trys.push([9, 14, 15, 16]);
                keywords_1 = (e_1 = void 0, __values(keywords)), keywords_1_1 = keywords_1.next();
                _e.label = 10;
            case 10:
                if (!!keywords_1_1.done) return [3 /*break*/, 13];
                keyword = keywords_1_1.value;
                if (!(name_1.indexOf(keyword) > -1)) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, sendNotify_1.sendNotify)("京喜工厂", name_1)];
            case 11:
                _e.sent();
                return [3 /*break*/, 13];
            case 12:
                keywords_1_1 = keywords_1.next();
                return [3 /*break*/, 10];
            case 13: return [3 /*break*/, 16];
            case 14:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 16];
            case 15:
                try {
                    if (keywords_1_1 && !keywords_1_1.done && (_d = keywords_1.return)) _d.call(keywords_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 16:
                _b = _a.next();
                return [3 /*break*/, 6];
            case 17: return [3 /*break*/, 20];
            case 18:
                e_2_1 = _e.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 20];
            case 19:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 20:
                if (message) {
                    (0, sendNotify_1.sendNotify)('京喜工厂送红包', message);
                }
                return [2 /*return*/];
        }
    });
}); })();
function api(commodityId) {
    return __awaiter(this, void 0, void 0, function () {
        var t, url, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t = Date.now();
                    url = commodityId
                        ? "https://m.jingxi.com/dreamfactory/diminfo/GetCommodityDetails?zone=dream_factory&commodityId=".concat(commodityId, "&_time=").concat(t, "&_ts=").concat(t, "&_=").concat(t, "&sceneval=2&g_login_type=1&callback=jsonpCBK").concat((0, TS_USER_AGENTS_1.randomWord)(), "&g_ty=ls")
                        : "https://m.jingxi.com/dreamfactory/diminfo/GetCommodityList?zone=dream_factory&flag=2&pageNo=1&pageSize=12&_time=".concat(t, "&_ts=").concat(t, "&_=").concat(t, "&sceneval=2&g_login_type=1&callback=jsonpCBK").concat((0, TS_USER_AGENTS_1.randomWord)(), "&g_ty=ls");
                    return [4 /*yield*/, axios_1.default.get(url, {
                            headers: {
                                'Host': 'm.jingxi.com',
                                'User-Agent': 'jdpingou;',
                                'Referer': 'https://st.jingxi.com/',
                                'Cookie': cookie
                            }
                        })];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/, JSON.parse(data.match(/jsonpCBK.?\((.*)/)[1])];
            }
        });
    });
}
