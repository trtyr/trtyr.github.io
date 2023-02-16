var start_date = "202302016",
  date = new Date(),
  end_date =
    "" +
    date.getFullYear() +
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()),
  access_token =
    "121.21e725b1016a81ac88249636b64ea8e8.YnBhh6TIzr-1WhXaMbECUKzUCR_wv-PMWFAOTNY.fj0Nfw",
  site_id = "18769636",
  dataUrl =
    "https://baidu-tongji-api.vercel.app/api?access_token=" +
    access_token +
    "&site_id=" +
    site_id,
  metrics = "pv_count",
  metricsName =
    "pv_count" === metrics
      ? "访问次数"
      : "visitor_count" === metrics
      ? "访客数"
      : "",
  color =
    "light" === document.documentElement.getAttribute("data-theme")
      ? "#4c4948"
      : "rgba(255,255,255,0.7)";
function mapChart() {
  let script = document.createElement("script"),
    paramUrl;
  fetch(
    dataUrl +
      ("&start_date=" +
        start_date +
        "&end_date=" +
        end_date +
        "&metrics=" +
        metrics +
        "&method=overview/getDistrictRpt")
  )
    .then((data) => data.json())
    .then((data) => {
      let mapName = data.result.items[0],
        mapValue = data.result.items[1],
        mapArr = [],
        max = mapValue[0][0];
      for (let i = 0; i < mapName.length; i++)
        mapArr.push({ name: mapName[i][0], value: mapValue[i][0] });
      let mapArrJson = JSON.stringify(mapArr);
      (script.innerHTML = `\n      var mapChart = echarts.init(document.getElementById('map-chart'), 'light');\n      var mapOption = {\n        title: {\n          text: '博客访问来源地图',\n          x: 'center',\n          textStyle: {\n            color: '${color}'\n          }\n        },\n        tooltip: {\n          trigger: 'item'\n        },\n        visualMap: {\n          min: 0,\n          max: ${max},\n          left: 'left',\n          top: 'bottom',\n          text: ['高','低'],\n          color: ['#37a2da', '#92d0f9'],\n          textStyle: {\n            color: '${color}'\n          },\n          calculable: true\n        },\n        series: [{\n          name: '${metricsName}',\n          type: 'map',\n          mapType: 'china',\n          showLegendSymbol: false,\n          label: {\n            normal: {\n              show: false\n            },\n            emphasis: {\n              show: true,\n              color: '#617282'\n            }\n          },\n          itemStyle: {\n            normal: {\n              areaColor: 'rgb(230, 232, 234)',\n              borderColor: 'rgb(255, 255, 255)',\n              borderWidth: 1\n            },\n            emphasis: {\n              areaColor: 'gold'\n            }\n          },\n          data: ${mapArrJson}\n        }]\n      };\n      mapChart.setOption(mapOption);\n      window.addEventListener("resize", () => { \n        mapChart.resize();\n      });`),
        document.getElementById("map-chart").after(script);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function trendsChart() {
  let script = document.createElement("script"),
    paramUrl;
  fetch(
    dataUrl +
      ("&start_date=" +
        start_date +
        "&end_date=" +
        end_date +
        "&metrics=" +
        metrics +
        "&method=trend/time/a&gran=month")
  )
    .then((data) => data.json())
    .then((data) => {
      let monthArr = [],
        monthValueArr = [],
        monthName = data.result.items[0],
        monthValue = data.result.items[1];
      for (let i = monthName.length - 1; i >= 0; i--)
        monthArr.push(monthName[i][0].substring(0, 7).replace("/", "-")),
          monthValueArr.push("--" !== monthValue[i][0] ? monthValue[i][0] : 0);
      let monthArrJson = JSON.stringify(monthArr),
        monthValueArrJson = JSON.stringify(monthValueArr);
      (script.innerHTML = `\n      var trendsChart = echarts.init(document.getElementById('trends-chart'), 'light');\n      var trendsOption = {\n        title: {\n          text: '博客访问统计图',\n          x: 'center',\n          textStyle: {\n            color: '${color}'\n          }\n        },\n        tooltip: {\n          trigger: 'axis'\n        },\n        xAxis: {\n          name: '日期',\n          type: 'category',\n          boundaryGap: false,\n          nameTextStyle: {\n            color: '${color}'\n          },\n          axisTick: {\n            show: false\n          },\n          axisLabel: {\n            show: true,\n            color: '${color}'\n          },\n          axisLine: {\n            show: true,\n            lineStyle: {\n              color: '${color}'\n            }\n          },\n          data: ${monthArrJson}\n        },\n        yAxis: {\n          name: '${metricsName}',\n          type: 'value',\n          nameTextStyle: {\n            color: '${color}'\n          },\n          splitLine: {\n            show: false\n          },\n          axisTick: {\n            show: false\n          },\n          axisLabel: {\n            show: true,\n            color: '${color}'\n          },\n          axisLine: {\n            show: true,\n            lineStyle: {\n              color: '${color}'\n            }\n          }\n        },\n        series: [{\n          name: '${metricsName}',\n          type: 'line',\n          smooth: true,\n          lineStyle: {\n              width: 0\n          },\n          showSymbol: false,\n          itemStyle: {\n            opacity: 1,\n            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{\n              offset: 0,\n              color: 'rgba(128, 255, 165)'\n            },\n            {\n              offset: 1,\n              color: 'rgba(1, 191, 236)'\n            }])\n          },\n          areaStyle: {\n            opacity: 1,\n            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{\n              offset: 0,\n              color: 'rgba(128, 255, 165)'\n            }, {\n              offset: 1,\n              color: 'rgba(1, 191, 236)'\n            }])\n          },\n          data: ${monthValueArrJson},\n          markLine: {\n            data: [{\n              name: '平均值',\n              type: 'average',\n              label: {\n                color: '${color}'\n              }\n            }]\n          }\n        }]\n      };\n      trendsChart.setOption(trendsOption);\n      window.addEventListener("resize", () => { \n        trendsChart.resize();\n      });`),
        document.getElementById("trends-chart").after(script);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function sourcesChart() {
  let script = document.createElement("script"),
    paramUrl;
  fetch(
    dataUrl +
      ("&start_date=" +
        start_date +
        "&end_date=" +
        end_date +
        "&metrics=" +
        metrics +
        "&method=source/all/a")
  )
    .then((data) => data.json())
    .then((data) => {
      let sourcesName = data.result.items[0],
        sourcesValue = data.result.items[1],
        sourcesArr = [];
      for (let i = 0; i < sourcesName.length; i++)
        sourcesArr.push({
          name: sourcesName[i][0].name,
          value: sourcesValue[i][0],
        });
      let sourcesArrJson = JSON.stringify(sourcesArr);
      (script.innerHTML = `\n      var sourcesChart = echarts.init(document.getElementById('sources-chart'), 'light');\n      var sourcesOption = {\n        title: {\n          text: '博客访问来源统计图',\n          x: 'center',\n          textStyle: {\n            color: '${color}'\n          }\n        },\n        legend: {\n          top: 'bottom',\n          textStyle: {\n            color: '${color}'\n          }\n        },\n        tooltip: {\n          trigger: 'item'\n        },\n        series: [{\n          name: '${metricsName}',\n          type: 'pie',\n          radius: [30, 80],\n          center: ['50%', '50%'],\n          roseType: 'area',\n          label: {\n            color: '${color}',\n            formatter: "{b} : {c} ({d}%)"\n          },\n          data: ${sourcesArrJson},\n          itemStyle: {\n            emphasis: {\n              shadowBlur: 10,\n              shadowOffsetX: 0,\n              shadowColor: 'rgba(255, 255, 255, 0.5)'\n            }\n          }\n        }]\n      };\n      sourcesChart.setOption(sourcesOption);\n      window.addEventListener("resize", () => { \n        sourcesChart.resize();\n      });`),
        document.getElementById("sources-chart").after(script);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function switchVisitChart() {
  let color =
    "light" === document.documentElement.getAttribute("data-theme")
      ? "#4c4948"
      : "rgba(255,255,255,0.7)";
  if (document.getElementById("map-chart") && mapOption)
    try {
      let mapOptionNew = mapOption;
      (mapOptionNew.title.textStyle.color = color),
        (mapOptionNew.visualMap.textStyle.color = color),
        mapChart.setOption(mapOptionNew);
    } catch (error) {
      console.log(error);
    }
  if (document.getElementById("trends-chart") && trendsOption)
    try {
      let trendsOptionNew = trendsOption;
      (trendsOptionNew.title.textStyle.color = color),
        (trendsOptionNew.xAxis.nameTextStyle.color = color),
        (trendsOptionNew.yAxis.nameTextStyle.color = color),
        (trendsOptionNew.xAxis.axisLabel.color = color),
        (trendsOptionNew.yAxis.axisLabel.color = color),
        (trendsOptionNew.xAxis.axisLine.lineStyle.color = color),
        (trendsOptionNew.yAxis.axisLine.lineStyle.color = color),
        (trendsOptionNew.series[0].markLine.data[0].label.color = color),
        trendsChart.setOption(trendsOptionNew);
    } catch (error) {
      console.log(error);
    }
  if (document.getElementById("sources-chart") && sourcesOption)
    try {
      let sourcesOptionNew = sourcesOption;
      (sourcesOptionNew.title.textStyle.color = color),
        (sourcesOptionNew.legend.textStyle.color = color),
        (sourcesOptionNew.series[0].label.color = color),
        sourcesChart.setOption(sourcesOptionNew);
    } catch (error) {
      console.log(error);
    }
}
document.getElementById("map-chart") && mapChart(),
  document.getElementById("trends-chart") && trendsChart(),
  document.getElementById("sources-chart") && sourcesChart(),
  document.getElementById("darkmode").addEventListener("click", function () {
    setTimeout(switchVisitChart, 100);
  });
