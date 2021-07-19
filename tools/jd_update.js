/**
 * 强制更新
 * cron=0 0-23/12 * * *
 */

if [ ! -d "/ql" ];then
  echo "========= 检查到V4环境，开始强制更新 ========="
  cd /jd/scripts/ && git fetch --all; git reset --hard origin/master; git pull && jup scripts
else
  echo "========= 检查到青龙环境，开始强制更新 ========="
  cd /ql/repo/utterliar1_jd_scripts/ && git fetch --all; git reset --hard origin/master; git pull && ql repo https://github.com/utterliar1/jd_scripts.git "jd_" "utils|backup|tools|jxmcToken" "^jd[^_]|USER|package|jxmcToken"
fi