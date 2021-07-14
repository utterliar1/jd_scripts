function mainEval($) {
    return `
!(async () => {
    jdcookie = process.env.JD_COOKIE ? process.env.JD_COOKIE.split("&") : require("./utils/jdcookie").cookie;
    cookies={
        'all':jdcookie,
        'help': typeof(help) != 'undefined' ? [...jdcookie].splice(0,parseInt(help)):[]
    }
    taskCookie=cookies['all']
    jxAlgo = new common.jxAlgo();
    console.log(\`======================本次任务共\${taskCookie.length}个京东账户Cookie======================\\n\`)
    try{
        await prepare();
        if ($.sharecode.length > 0) {
            $.sharecode = $.sharecode.filter(d=>d && JSON.stringify(d)!='{}')
            console.log('助力码', $.sharecode )
        }
    }catch(e1){console.log("初始函数不存在,将继续执行主函数Main\\n")}
    for (let i = 0; i < taskCookie.filter(d => d).length; i++) {
        $.cookie = taskCookie[i];
        $.user = decodeURIComponent($.cookie.match(/pt_pin=([^;]+)/)[1])
        $.index = parseInt(i) + 1;
        let info = {
            'index': $.index,
            'user': $.user,
            'cookie': $.cookie
        }
        try{
            if (!$.thread) {
                console.log(\`\n******开始【京东账号\${$.index}】\${$.user} 任务*********\n\`);
                $.setCookie($.cookie)
            }
            if ($.sharecode.length > 0) {
                for (let smp of $.sharecode) {
                    smp = Object.assign({ ...info}, smp);
                    $.thread ? main(smp) : await main(smp);
                }
            }else{
                $.thread ? main(info) : await main(info);
            }
        }
        catch(em){
            console.log(em.message)
        }

    }
    if (typeof(extra) != 'undefined') {
        console.log(\`============================开始运行额外任务============================\`)
        try{
            await extra();
        }catch(e4){console.log(e4.message)}
    }
})().catch((e) => {
    console.log(e.message)
}).finally(() => {
    if ($.message.length > 0) {
        $.notify($.message)
    }
    $.done();
});

`
}
module.exports = {
    mainEval
}
