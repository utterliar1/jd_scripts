let common = require("./utils/common");
let $ = new common.env('京东验证码获取'); 
let validator = require("./utils/jdValidate");
let fs = require("fs"); 
$.setOptions({
    headers: {
        'content-type': 'application/json',
        'user-agent': 'jdapp;iPhone;9.4.6;14.2;965af808880443e4c1306a54afdd5d5ae771de46;network/wifi;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone8,4;addressid/;supportBestPay/0;appBuild/167618;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'referer': 'https://happy.m.jd.com/babelDiy/Zeus/3ugedFa7yA6NhxLN5gw2L3PF9sQC/index.html?asid=287215626&un_area=12_904_905_57901&lng=117.612969135975&lat=23.94014745198865',
    }
});
eval(common.eval.mainEval($));
async function prepare() {
    $.thread = 1;
    $.sleep *= 8;
    await fs.writeFile('./jdvalidate.txt', '', (error) => {
        if (error) return console.log("初始化失败" + error.message);
        console.log("初始化成功");
    })
}
async function main(id) {
    let code = new validator.JDJRValidator;
    for (let i = 0; i < 2; i++) {
        while (true) {
            try {
                let veri = await code.run();
                if (veri.validate) {
                    $.validate = veri.validate;
                    break
                }
            } catch (e) {}
        }
        $.code.push($.validate)
        fs.appendFile('./jdvalidate.txt', $.validate + "\n", (error) => {
            if (error) return console.log("追加文件失败" + error.message);
            console.log("追加成功");
        })
        console.log("验证码", $.validate)
    }
    try {} catch (e) {}
}