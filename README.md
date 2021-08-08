# 利用github action整合各个库并维护crontab.list
- 主库是[@JDHelloWorld](https://github.com/JDHelloWorld/jd_scripts.git)，自动转换ts脚本为js脚本   
- 本库初衷是方便V4用户且需要上车的朋友使用，其他用户建议使用其他更适合的库
- v4用户使用前请务必先删除scripts文件夹
- 如果发现脚本还没有同步过来，可以点亮/取消后点亮star激活action运行获取更新
- github action自动更新，所有脚本均为作者原版，无任何个人修改
- 临时脚本会同步到库里，但是不会及时添加定时，有需求自己运行即可
# V4容器docker-compoes.yml添加变量
```text
environment: 
    - JD_SCRIPTS_URL=https://github.com/utterliar1/jd_scripts.git
```
# 青龙容器添加repo命令
```text
ql repo https://github.com/utterliar1/jd_scripts.git "jd_" "utils|backup|tools" "^jd[^_]|USER|package|tools|utils"
```
extra.sh添加
```text
cp -f /ql/repo/utterliar1_jd_scripts/package.json /ql/scripts/package.json && cd scripts && pnpm install
```
# References:
- [@gossh520](https://github.com/gossh520/jd-v4.git)
- [@JDHelloWorld](https://github.com/JDHelloWorld/jd_scripts.git)
- [@cdle](https://github.com/cdle/jd_study.git)
- [@smiek](https://github.com/smiek2221/scripts)
- [@Wenmoux](https://github.com/Wenmoux/scripts.git)
- [@passerby](https://github.com/passerby-b/JDDJ.git)
- [@airacg](https://github.com/airacg/jd_task.git)
- [@NobyDa](https://github.com/NobyDa/Script.git)
- [@yangtingxiao](https://github.com/yangtingxiao/QuantumultX.git)
- [@jiulan](https://github.com/jiulan/platypus.git)
- [@Aaron-lv](https://github.com/Aaron-lv/sync.git)
- [@curtinlv](https://github.com/curtinlv/JD-Script.git)
