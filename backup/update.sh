#!/usr/bin/env bash
# 强制更新
if [ -s /jd ];then
  echo "========= 检查到V4环境，开始强制更新 ========="
  cd /jd/scripts/ && git fetch --all; git reset --hard origin/master; git pull && jup scripts
elif [ -s /ql ];then
  echo "========= 检查到青龙环境，开始强制更新 ========="
  cd /ql/repo/utterliar1_jd_scripts/ && git fetch --all; git reset --hard origin/master; git pull && ql repo https://github.com/utterliar1/jd_scripts.git "jd_" "utils|backup|tools" "^jd[^_]|USER|package|tools|utils"
else
  echo "========= 环境未知，请自行更新 ========="
fi