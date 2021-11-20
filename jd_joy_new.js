"use strict";
/**
 * 宠汪汪三代目
 * cron: 0 0-23/3 * * *
 *
 * follow_fail就停
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
exports.__esModule = true;
var axios_1 = require("axios");
var ts_md5_1 = require("ts-md5");
var date_fns_1 = require("date-fns");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var cookie = '', res = '', UserName, index, invokeKey = 'q8DNJdpcfRQ69gIx';
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookiesArr, i, lastFeedTime, winCoin, _i, _a, user, _b, _c, t, _d, _e, task, _f, _g, task, _h, _j, task;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0: return [4 /*yield*/, (0, TS_USER_AGENTS_1.requireConfig)()];
            case 1:
                cookiesArr = _k.sent();
                i = 0;
                _k.label = 2;
            case 2:
                if (!(i < cookiesArr.length)) return [3 /*break*/, 68];
                cookie = cookiesArr[i];
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                index = i + 1;
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7".concat(index, "\u3011").concat(UserName, "\n"));
                return [4 /*yield*/, doTask('enterRoom/h5', {}, '&invitePin=')];
            case 3:
                res = _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 4:
                _k.sent();
                lastFeedTime = res.data.lastFeedTime;
                if (!((0, date_fns_1.differenceInMinutes)(Date.now(), lastFeedTime) > 180)) return [3 /*break*/, 9];
                return [4 /*yield*/, click('feed')];
            case 5:
                _k.sent();
                return [4 /*yield*/, beforeFeed()];
            case 6:
                _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 7:
                _k.sent();
                return [4 /*yield*/, feed()];
            case 8:
                res = _k.sent();
                if (res.errorCode === 'feed_ok') {
                    console.log('喂食成功', 80);
                }
                else {
                    console.log('喂食失败', res);
                }
                return [3 /*break*/, 10];
            case 9:
                console.log('feed间隔未满3小时，上次喂食', (0, date_fns_1.format)(lastFeedTime, 'HH:mm:ss'));
                _k.label = 10;
            case 10: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)
                // run
            ];
            case 11:
                _k.sent();
                // run
                return [4 /*yield*/, click('race')];
            case 12:
                // run
                _k.sent();
                return [4 /*yield*/, beforeFeed('race')];
            case 13:
                _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 14:
                _k.sent();
                return [4 /*yield*/, api('pet/combat/detail/v2', '', '&help=false')];
            case 15:
                res = _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 16:
                _k.sent();
                if (!(res.data.petRaceResult === 'unreceive')) return [3 /*break*/, 19];
                winCoin = res.data.winCoin // 赛跑奖励
                ;
                return [4 /*yield*/, api('pet/combat/receive')];
            case 17:
                res = _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 18:
                _k.sent();
                if (!res.errorCode) {
                    console.log('赛跑领奖成功', winCoin);
                }
                return [3 /*break*/, 31];
            case 19:
                if (!(res.data.petRaceResult === 'not_participate')) return [3 /*break*/, 30];
                console.log('可参赛');
                return [4 /*yield*/, api('pet/combat/match', '', '&teamLevel=2')];
            case 20:
                res = _k.sent();
                return [4 /*yield*/, beforeFeed('race_match')];
            case 21:
                _k.sent();
                return [4 /*yield*/, click('race_match')];
            case 22:
                _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(5000)];
            case 23:
                _k.sent();
                _k.label = 24;
            case 24:
                if (!1) return [3 /*break*/, 29];
                if (!(res.data.petRaceResult === 'matching')) return [3 /*break*/, 27];
                console.log('正在匹配......');
                return [4 /*yield*/, api('pet/combat/match', '', '&teamLevel=2')];
            case 25:
                res = _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(5000)];
            case 26:
                _k.sent();
                return [3 /*break*/, 28];
            case 27: return [3 /*break*/, 29];
            case 28: return [3 /*break*/, 24];
            case 29: return [3 /*break*/, 31];
            case 30:
                if (res.data.petRaceResult === 'participate') {
                    console.log('比赛中......');
                    for (_i = 0, _a = res.data.raceUsers; _i < _a.length; _i++) {
                        user = _a[_i];
                        console.log(user.nickName, user.distance);
                    }
                }
                else {
                    console.log('race状态未知');
                    (0, TS_USER_AGENTS_1.o2s)(res);
                }
                _k.label = 31;
            case 31: return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)];
            case 32:
                _k.sent();
                return [4 /*yield*/, api('pet/getPetTaskConfig')];
            case 33:
                res = _k.sent();
                _b = 0, _c = res.datas;
                _k.label = 34;
            case 34:
                if (!(_b < _c.length)) return [3 /*break*/, 67];
                t = _c[_b];
                if (!(t.receiveStatus === 'unreceive')) return [3 /*break*/, 37];
                console.log('可领奖:', t.taskName);
                return [4 /*yield*/, api('pet/getFood', t.taskType)];
            case 35:
                res = _k.sent();
                if (res.errorCode === 'received') {
                    console.log('已领取:', res.data);
                }
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(3000)];
            case 36:
                _k.sent();
                _k.label = 37;
            case 37:
                if (!(t.taskName === '浏览频道')) return [3 /*break*/, 50];
                return [4 /*yield*/, beforeFeed('follow_channel')];
            case 38:
                _k.sent();
                return [4 /*yield*/, click('follow_channel')];
            case 39:
                _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 40:
                _k.sent();
                return [4 /*yield*/, api('pet/getFollowChannels')];
            case 41:
                res = _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 42:
                _k.sent();
                _d = 0, _e = res.datas;
                _k.label = 43;
            case 43:
                if (!(_d < _e.length)) return [3 /*break*/, 50];
                task = _e[_d];
                if (!!task.status) return [3 /*break*/, 49];
                console.log('浏览频道', task.channelName);
                return [4 /*yield*/, click('follow_channel', task.channelId)];
            case 44:
                _k.sent();
                return [4 /*yield*/, beforeTask('follow_channel', task.channelId)];
            case 45:
                _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(6000)];
            case 46:
                _k.sent();
                return [4 /*yield*/, doTask('scan', { "channelId": task.channelId, "taskType": 'FollowChannel' })];
            case 47:
                _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 48:
                _k.sent();
                _k.label = 49;
            case 49:
                _d++;
                return [3 /*break*/, 43];
            case 50:
                if (!(t.taskName === '逛会场')) return [3 /*break*/, 58];
                _f = 0, _g = t.scanMarketList;
                _k.label = 51;
            case 51:
                if (!(_f < _g.length)) return [3 /*break*/, 58];
                task = _g[_f];
                if (!!task.status) return [3 /*break*/, 57];
                console.log('逛逛会场', task.marketName);
                return [4 /*yield*/, beforeTask('scan_market', encodeURIComponent(task.marketLink || task.marketLinkH5))];
            case 52:
                _k.sent();
                return [4 /*yield*/, click('scan_market', encodeURIComponent(task.marketLink || task.marketLinkH5))];
            case 53:
                _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(6000)];
            case 54:
                _k.sent();
                return [4 /*yield*/, doTask('scan', { "marketLink": task.marketLink || task.marketLinkH5, "taskType": "ScanMarket" })];
            case 55:
                _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(2000)];
            case 56:
                _k.sent();
                _k.label = 57;
            case 57:
                _f++;
                return [3 /*break*/, 51];
            case 58:
                if (!(t.taskName === '关注商品')) return [3 /*break*/, 66];
                _h = 0, _j = t.followGoodList;
                _k.label = 59;
            case 59:
                if (!(_h < _j.length)) return [3 /*break*/, 66];
                task = _j[_h];
                if (!!task.status) return [3 /*break*/, 65];
                console.log('关注商品', task.skuName);
                return [4 /*yield*/, beforeTask('follow_good', task.sku)];
            case 60:
                _k.sent();
                return [4 /*yield*/, click('follow_good', task.sku)];
            case 61:
                _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(6000)];
            case 62:
                _k.sent();
                return [4 /*yield*/, doTask('followGood', "sku=".concat(task.sku))];
            case 63:
                _k.sent();
                return [4 /*yield*/, (0, TS_USER_AGENTS_1.wait)(1000)];
            case 64:
                _k.sent();
                _k.label = 65;
            case 65:
                _h++;
                return [3 /*break*/, 59];
            case 66:
                _b++;
                return [3 /*break*/, 34];
            case 67:
                i++;
                return [3 /*break*/, 2];
            case 68: return [2 /*return*/];
        }
    });
}); })();
function api(fn, taskType, params) {
    return __awaiter(this, void 0, void 0, function () {
        var lkt, lks, url, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lkt = Date.now();
                    lks = ts_md5_1.Md5.hashStr('' + invokeKey + lkt);
                    url = taskType
                        ? "https://jdjoy.jd.com/common/".concat(fn, "?reqSource=h5&invokeKey=").concat(invokeKey, "&taskType=").concat(taskType)
                        : "https://jdjoy.jd.com/common/".concat(fn, "?reqSource=h5&invokeKey=").concat(invokeKey) + params;
                    return [4 /*yield*/, axios_1["default"].get(url, {
                            headers: {
                                'Host': 'jdjoy.jd.com',
                                'Accept': '*/*',
                                'lkt': lkt.toString(),
                                'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
                                'Content-Type': 'application/json',
                                'Origin': 'https://h5.m.jd.com',
                                'User-Agent': TS_USER_AGENTS_1["default"],
                                'lks': lks,
                                'Referer': 'https://h5.m.jd.com/',
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
function beforeFeed(fn) {
    if (fn === void 0) { fn = 'feed'; }
    return __awaiter(this, void 0, void 0, function () {
        var lkt, lks, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lkt = Date.now();
                    lks = ts_md5_1.Md5.hashStr('' + invokeKey + lkt);
                    return [4 /*yield*/, axios_1["default"].get("https://jdjoy.jd.com/common/pet/icon/click1?iconCode=".concat(fn, "&reqSource=h5&invokeKey=").concat(invokeKey), {
                            headers: {
                                'Host': 'jdjoy.jd.com',
                                'lkt': lkt.toString(),
                                'Origin': 'https://h5.m.jd.com',
                                'User-Agent': TS_USER_AGENTS_1["default"],
                                'lks': lks,
                                'Referer': 'https://h5.m.jd.com/',
                                'Content-Type': 'application/json',
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
function feed() {
    return __awaiter(this, void 0, void 0, function () {
        var lkt, lks, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lkt = Date.now();
                    lks = ts_md5_1.Md5.hashStr('' + invokeKey + lkt);
                    return [4 /*yield*/, axios_1["default"].get("https://jdjoy.jd.com/common/pet/feed?feedCount=80&reqSource=h5&invokeKey=".concat(invokeKey), {
                            headers: {
                                'Host': 'jdjoy.jd.com',
                                'lkt': lkt.toString(),
                                'Origin': 'https://h5.m.jd.com',
                                'User-Agent': TS_USER_AGENTS_1["default"],
                                'lks': lks,
                                'Referer': 'https://h5.m.jd.com/',
                                'Content-Type': 'application/json',
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
function beforeTask(fn, linkAddr) {
    return __awaiter(this, void 0, void 0, function () {
        var lkt, lks, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lkt = Date.now();
                    lks = ts_md5_1.Md5.hashStr('' + invokeKey + lkt);
                    return [4 /*yield*/, axios_1["default"].get("https://jdjoy.jd.com/common/pet/icon/click1?iconCode=".concat(fn, "&linkAddr=").concat(linkAddr, "&reqSource=h5&invokeKey=").concat(invokeKey), {
                            headers: {
                                'Host': 'jdjoy.jd.com',
                                'Accept': '*/*',
                                'lkt': lkt.toString(),
                                'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
                                'Origin': 'https://h5.m.jd.com',
                                'User-Agent': TS_USER_AGENTS_1["default"],
                                'Connection': 'keep-alive',
                                'lks': lks,
                                'Referer': 'https://h5.m.jd.com/',
                                'Content-Type': 'application/json',
                                'Cookie': cookie
                            }
                        })];
                case 1:
                    data = (_a.sent()).data;
                    if (data.errorCode) {
                        console.log(data.errorCode);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function doTask(fn, body, params) {
    return __awaiter(this, void 0, void 0, function () {
        var lkt, lks, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lkt = Date.now();
                    lks = ts_md5_1.Md5.hashStr('' + invokeKey + lkt);
                    return [4 /*yield*/, axios_1["default"].post("https://jdjoy.jd.com/common/pet/".concat(fn, "?reqSource=h5&invokeKey=").concat(invokeKey) + params, typeof body === 'object' ? JSON.stringify(body) : body, {
                            headers: {
                                'Host': 'jdjoy.jd.com',
                                'lkt': lkt.toString(),
                                'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
                                'Origin': 'https://h5.m.jd.com',
                                'User-Agent': TS_USER_AGENTS_1["default"],
                                'Referer': 'https://h5.m.jd.com/',
                                'lks': lks,
                                'Content-Type': typeof body === 'object' ? 'application/json' : 'application/x-www-form-urlencoded',
                                'Cookie': cookie
                            }
                        })];
                case 1:
                    data = (_a.sent()).data;
                    if (data.errorCode) {
                        console.log(data.errorCode);
                    }
                    return [2 /*return*/, data];
            }
        });
    });
}
function click(iconCode, linkAddr) {
    return __awaiter(this, void 0, void 0, function () {
        var lkt, lks, url, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lkt = Date.now();
                    lks = ts_md5_1.Md5.hashStr('' + invokeKey + lkt);
                    url = linkAddr
                        ? "https://jdjoy.jd.com/common/pet/icon/click?code=1624363341529274068136&iconCode=".concat(iconCode, "&linkAddr=").concat(linkAddr, "&reqSource=h5&invokeKey=").concat(invokeKey)
                        : "https://jdjoy.jd.com/common/pet/icon/click?code=1624363341529274068136&iconCode=".concat(iconCode, "&reqSource=h5&invokeKey=").concat(invokeKey);
                    return [4 /*yield*/, axios_1["default"].get(url, {
                            headers: {
                                'Host': 'jdjoy.jd.com',
                                'Connection': 'keep-alive',
                                'Sec-Fetch-Mode': 'cors',
                                'Origin': 'https://h5.m.jd.com',
                                'lks': lks,
                                'User-Agent': TS_USER_AGENTS_1["default"],
                                'lkt': lkt.toString(),
                                'content-type': 'application/json',
                                'X-Requested-With': 'com.jingdong.app.mall',
                                'Referer': 'https://h5.m.jd.com/babelDiy/Zeus/2wuqXrZrhygTQzYA7VufBEpj4amH/index.html',
                                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                                'Cookie': cookie
                            }
                        })];
                case 1:
                    data = (_a.sent()).data;
                    if (data.errorCode) {
                        console.log(data.errorCode);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
