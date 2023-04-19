var tlist = {
  1: ["🧑‍🌾   劳动节   🧑‍🌾", "2023-05-01"],
  2: ["👄   520   👄", "2023-05-20"],
  3: ["🚣‍♀️   端午节   🚣‍♀️", "2023-06-22"],
  4: ["🎂   涵睿生日   🎂", "2023-06-30"],
  5: ["🌈   七夕   🌈", "2023-08-22"],
  6: ["👨‍👩‍👦‍👦 🥮   中秋佳节   👨‍👩‍👦‍👦 🥮", "2023-09-29"],
  7: ["🎂   岳父生日   🎂", "2023-10-11"],
  8: ["🎂   涵易生日   🎂", "2023-10-15"],
  9: ["🎊   国庆节", "2023-10-01"],
  10: ["🎂   我的生日   🎂", "2023-11-01"],
  11: ["🎂   老婆生日   🎂", "2023-11-03"],
  12: ["🎊   元旦节   🎊", "2024-01-01"],
  13: ["🎂   岳母生日   🎂", "2024-02-04"],
  14: ["🎂   爸爸生日   🎂", "2024-02-05"],
  15: ["🎁   春节   🎁", "2024-02-09"],
  16: ["元宵节", "2024-02-24"],
  17: ["清明节", "2024-04-04"],
  18: ["🎂   妈妈生日   🎂", "2024-04-22"]
};
let tnow = new Date();
let tnowf =
  tnow.getFullYear() + "-" + (tnow.getMonth() + 1) + "-" + tnow.getDate();

/* 计算2个日期相差的天数，不包含今天，如：2016-12-13到2016-12-15，相差2天
 * @param startDateString
 * @param endDateString
 * @returns
 */
function dateDiff(startDateString, endDateString) {
  var separator = "-"; //日期分隔符
  var startDates = startDateString.split(separator);
  var endDates = endDateString.split(separator);
  var startDate = new Date(startDates[0], startDates[1] - 1, startDates[2]);
  var endDate = new Date(endDates[0], endDates[1] - 1, endDates[2]);
  return parseInt(
    (endDate - startDate) / 1000 / 60 / 60 / 24
  ).toString();
}

//计算输入序号对应的时间与现在的天数间隔
function tnumcount(num) {
  let dnum = num;
  return dateDiff(tnowf, tlist[dnum][1]);
}

//获取最接近的日期
function now() {
  for (var i = 1; i <= Object.getOwnPropertyNames(tlist).length; i++) {
    if (Number(dateDiff(tnowf, tlist[i.toString()][1])) >= 0) {
      //console.log("最近的日期是:" + tlist[i.toString()][0]);
      //console.log("列表长度:" + Object.getOwnPropertyNames(tlist).length);
      //console.log("时间差距:" + Number(dateDiff(tnowf, tlist[i.toString()][1])));
      return i;
    }
  }
}

//如果是0天，发送emoji;
let nowlist = now();
function today(day) {
  let daythis = day;
  if (daythis == "0") {
    datenotice();
    return "🎉🎉🎊🎊";
  } else {
    return daythis;
  }
}

//提醒日当天发送通知
function datenotice() {
  if ($persistentStore.read("timecardpushed") != tlist[nowlist][1] && tnow.getHours() >= 6) {
    $persistentStore.write(tlist[nowlist][1], "timecardpushed");
    $notification.post("假日祝福","", "今天是" + tlist[nowlist][1] + "日 " + tlist[nowlist][0] + "   🎉")
  } else if ($persistentStore.read("timecardpushed") == tlist[nowlist][1]) {
    //console.log("当日已通知");
  }
}
$done({
title:"节̶̬̭̝͂͋́͑假҉̖̱̦̜̭͗̈͌͂日̵̙̣̩͔̦̅̚倒̶͉̦̪̱̑̌͂̾̚计҉͙͇̤̱̠͋̂̚时҉̫̙̥̲̌̉",
icon:"repeat.circle.fill",
'icon-color': "#03fc30",
content:tlist[nowlist][0]+"  :  "+today(tnumcount(nowlist))+"天\n"+tlist[Number(nowlist) + Number(1)][0] +"  :  "+ tnumcount(Number(nowlist) + Number(1))+ "天\n"+tlist[Number(nowlist) + Number(2)][0]+"  :  "+tnumcount(Number(nowlist) + Number(2))+"天"
})
