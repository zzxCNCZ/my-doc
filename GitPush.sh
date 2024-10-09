#!/usr/bin/env bash
echo "please enter commit ->"
read  commit
time=`date "+%Y-%m-%d_%H-%M-%S"`
who="zzx"
git add .
git commit -m "${who} $commit push @ ${time}"
git push -u origin master
#git push -u github master
echo "Finished Push"
