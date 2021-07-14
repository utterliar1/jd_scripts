let request = require('request');
let CryptoJS = require('crypto-js');
let qs = require('querystring');
let urls = require('url');
let path = require('path');
let notify = require('./sendNotify');
let eval = require("./eval");
let assert = require('assert');
let jxAlgo = require("./jxAlgo");
class env {
    constructor(name) {
        this.name = name;
        this.message = [];
        this.sharecode = [];
        this.code = [];
        this.timestamp = new Date().getTime();
        this.time = this.start = parseInt(this.timestamp / 1000);
        this.options = {
            'headers': {}
        };
        console.log(`\n🔔${this.name}, 开始!\n`)
        console.log(`=========== 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()} ===========\n`)
    }
    done() {
        let timestamp = new Date().getTime();
        let work = ((timestamp - this.timestamp) / 1000).toFixed(2)
        console.log(`=========================脚本执行完成,耗时${work}s============================\n`)
        console.log(`🔔${this.name}, 结束!\n`)
    }
    notify(array) {
        let text = '';
        for (let i of array) {
            text += `${i.user} -- ${i.msg}\n`
        }
        console.log(`\n=============================开始发送提醒消息=============================`)
        notify.sendNotify(this.name + "消息提醒", text)
    }
    wait(t) {
        return new Promise(e => setTimeout(e, t))
    }
    setOptions(params) {
        this.options = params;
    }
    setCookie(cookie) {
        this.options.headers.cookie = cookie
    }
    jsonParse(str) {
        if (typeof str == "string") {
            try {
                return JSON.parse(str);
            } catch (e) {
                try {
                    str = str.match(/try\s*\{\w+\s*\(([^\)]+)/)[1]
                    return JSON.parse(str);
                } catch (ee) {
                    return str
                }
            }
        }
    }
    curl(params) {
        if (typeof(params) != 'object') {
            params = {
                'url': params
            }
        }
        //if (params.url.match(/jd.com\/|jingxi.com\//)) {
        // 只有访问京东链接才带cookie
        params = Object.assign({ ...this.options
        }, params);
        //}
        params.method = params.body ? 'POST' : 'GET';
        if (params.ua) {
            this.options.headers['user-agent'] = params.ua;
        }
        if (params.referer) {
            this.options.headers.referer = params.referer;
        }
        if (params.cookie) {
            this.options.headers.cookie = params.cookie;
        }
        if (params.headers) {
            this.options.headers = params.headers;
        }
        if (params.params) {
            params.url += '?' + qs.stringify(params.params)
        }
        if (params.form) {
            params.method = 'POST'
        }
        return new Promise(resolve => {
            request(params, async (err, resp, data) => {
                try {
                    if (params.console) {
                        console.log(data)
                    }
                    this.source = this.jsonParse(data);
                } catch (e) {
                    console.log(e, resp)
                } finally {
                    resolve(data);
                }
            })
        })
    }
    dumps(dict) {
        return JSON.stringify(dict)
    }
    loads(str) {
        return JSON.parse(str)
    }
    notice(msg) {
        this.message.push({
            'index': this.index,
            'user': this.user,
            'msg': msg
        })
    }
    notices(msg, user, index = '') {
        this.message.push({
            'user': user,
            'msg': msg,
            'index': index
        })
    }
    urlparse(url) {
        return urls.parse(url, true, true)
    }
    md5(encryptString) {
        return CryptoJS.MD5(encryptString).toString()
    }
    haskey(data, key, value) {
        value = typeof value !== 'undefined' ? value : '';
        var spl = key.split('.');
        for (var i of spl) {
            i = !isNaN(i) ? parseInt(i) : i;
            try {
                data = data[i];
            } catch (error) {
                return '';
            }
        }
        if (data == undefined) {
            return ''
        }
        if (value !== '') {
            return data === value ? true : false;
        } else {
            return data
        }
    }
    match(pattern, string) {
        pattern = (pattern instanceof Array) ? pattern : [pattern];
        for (let pat of pattern) {
            // var match = string.match(pat);
            var match = pat.exec(string)
            if (match) {
                var len = match.length;
                if (len == 1) {
                    return match;
                } else if (len == 2) {
                    return match[1];
                } else {
                    var r = [];
                    for (let i = 1; i < len; i++) {
                        r.push(match[i])
                    }
                    return r;
                }
                break;
            }
            // console.log(pat.exec(string))
        }
        return '';
    }
    matchall(pattern, string) {
        pattern = (pattern instanceof Array) ? pattern : [pattern];
        var match;
        var result = [];
        for (var pat of pattern) {
            while ((match = pat.exec(string)) != null) {
                var len = match.length;
                if (len == 1) {
                    result.push(match);
                } else if (len == 2) {
                    result.push(match[1]);
                } else {
                    var r = [];
                    for (let i = 1; i < len; i++) {
                        r.push(match[i])
                    }
                    result.push(r);
                }
            }
        }
        return result;
    }
    compare(property) {
        return function(a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    }
    filename(file, rename = '') {
        if (!this.runfile) {
            this.runfile = path.basename(file).replace(".js", '')
        }
        if (rename) {
            rename = `-${rename}`;
        }
        return path.basename(file).replace(".js", rename);
    }
    rand(n, m) {
        var random = Math.floor(Math.random() * (m - n + 1) + n);
        return random;
    }
    random(arr, num) {
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i = 0; i < num; i++) {
            if (temp_array.length > 0) {
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            } else {
                break;
            }
        }
        return return_array;
    }
}
module.exports = {
    env,
    eval,
    assert,
    jxAlgo,
}
