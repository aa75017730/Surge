var tlist = {
  1: ["๐งโ๐พ   ๅณๅจ่   ๐งโ๐พ", "2022-05-01"],
  2: ["๐   520   ๐", "2022-05-20"],
  3: ["๐ฃโโ๏ธ   ็ซฏๅ่   ๐ฃโโ๏ธ", "2022-06-03"],
  4: ["๐   ๆถต็ฟ็ๆฅ   ๐", "2022-06-11"],
  5: ["๐   ไธๅค   ๐", "2022-08-04"],
  6: ["๐จโ๐ฉโ๐ฆโ๐ฆ ๐ฅฎ   ไธญ็งไฝณ่   ๐จโ๐ฉโ๐ฆโ๐ฆ ๐ฅฎ", "2022-09-10"],
  7: ["๐   ๅฒณ็ถ็ๆฅ   ๐", "2022-09-22"],
  8: ["๐   ๆถตๆ็ๆฅ   ๐", "2022-09-26"],
  9: ["๐   ๅฝๅบ่", "2022-10-01"],
  10: ["๐   ๆ็็ๆฅ   ๐", "2022-10-13"],
  11: ["๐   ่ๅฉ็ๆฅ   ๐", "2022-10-15"],
  12: ["๐   ๅๆฆ่   ๐", "2023-01-01"],
  13: ["๐   ๅฒณๆฏ็ๆฅ   ๐", "2023-01-16"],
  14: ["๐   ็ธ็ธ็ๆฅ   ๐", "2023-01-17"],
  15: ["๐   ๆฅ่   ๐", "2023-01-22"],
  16: ["ๅๅฎต่", "2023-02-05"],
  17: ["ๆธๆ่", "2023-04-05"],
  18: ["๐   ๅฆๅฆ็ๆฅ   ๐", "2023-05-03"]
};
let tnow = new Date();
let tnowf =
  tnow.getFullYear() + "-" + (tnow.getMonth() + 1) + "-" + tnow.getDate();

/* ่ฎก็ฎ2ไธชๆฅๆ็ธๅทฎ็ๅคฉๆฐ๏ผไธๅๅซไปๅคฉ๏ผๅฆ๏ผ2016-12-13ๅฐ2016-12-15๏ผ็ธๅทฎ2ๅคฉ
 * @param startDateString
 * @param endDateString
 * @returns
 */
function dateDiff(startDateString, endDateString) {
  var separator = "-"; //ๆฅๆๅ้็ฌฆ
  var startDates = startDateString.split(separator);
  var endDates = endDateString.split(separator);
  var startDate = new Date(startDates[0], startDates[1] - 1, startDates[2]);
  var endDate = new Date(endDates[0], endDates[1] - 1, endDates[2]);
  return parseInt(
    (endDate - startDate) / 1000 / 60 / 60 / 24
  ).toString();
}

//่ฎก็ฎ่พๅฅๅบๅทๅฏนๅบ็ๆถ้ดไธ็ฐๅจ็ๅคฉๆฐ้ด้
function tnumcount(num) {
  let dnum = num;
  return dateDiff(tnowf, tlist[dnum][1]);
}

//่ทๅๆๆฅ่ฟ็ๆฅๆ
function now() {
  for (var i = 1; i <= Object.getOwnPropertyNames(tlist).length; i++) {
    if (Number(dateDiff(tnowf, tlist[i.toString()][1])) >= 0) {
      //console.log("ๆ่ฟ็ๆฅๆๆฏ:" + tlist[i.toString()][0]);
      //console.log("ๅ่กจ้ฟๅบฆ:" + Object.getOwnPropertyNames(tlist).length);
      //console.log("ๆถ้ดๅทฎ่ท:" + Number(dateDiff(tnowf, tlist[i.toString()][1])));
      return i;
    }
  }
}

//ๅฆๆๆฏ0ๅคฉ๏ผๅ้emoji;
let nowlist = now();
function today(day) {
  let daythis = day;
  if (daythis == "0") {
    datenotice();
    return "๐๐๐๐";
  } else {
    return daythis;
  }
}

//ๆ้ๆฅๅฝๅคฉๅ้้็ฅ
function datenotice() {
  if ($persistentStore.read("timecardpushed") != tlist[nowlist][1] && tnow.getHours() >= 6) {
    $persistentStore.write(tlist[nowlist][1], "timecardpushed");
    $notification.post("ๅๆฅ็ฅ็ฆ","", "ไปๅคฉๆฏ" + tlist[nowlist][1] + "ๆฅ " + tlist[nowlist][0] + "   ๐")
  } else if ($persistentStore.read("timecardpushed") == tlist[nowlist][1]) {
    //console.log("ๅฝๆฅๅทฒ้็ฅ");
  }
}
$done({
title:"่ฬถฬฌฬญฬออฬอๅาฬฬฑฬฆฬฬญอฬออๆฅฬตฬฬฃฬฉอฬฆฬฬๅฬถอฬฆฬชฬฑฬฬอฬพฬ่ฎกาออฬคฬฑฬ?อฬฬๆถาฬซฬฬฅฬฒฬฬ",
icon:"repeat.circle.fill",
'icon-color': "#03fc30",
content:tlist[nowlist][0]+"  :  "+today(tnumcount(nowlist))+"ๅคฉ\n"+tlist[Number(nowlist) + Number(1)][0] +"  :  "+ tnumcount(Number(nowlist) + Number(1))+ "ๅคฉ\n"+tlist[Number(nowlist) + Number(2)][0]+"  :  "+tnumcount(Number(nowlist) + Number(2))+"ๅคฉ"
})
