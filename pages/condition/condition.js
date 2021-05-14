var util = require('../../util/util.js')
import * as echarts from '../../ec-canvas/echarts';
var initChart = null
var app = getApp()


function setOption(chart, ylist) {
  var options = {
    title: {
      left: 'center'
    },
    color: ["#37A2DA"],
    grid: {
      top: 20,
      right: 20,
      bottom: 30
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['6s前', '5s前', '4s前', '3s前', '2s前', '1s前']
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      type: 'line',
      smooth: true,
      data: ylist
    }]
  }
  chart.setOption(options);
}

Page({
  data: {
    allParams: [{
        text: '径向力',
        value: 'force'
      },
      {
        text: '第一相电流',
        value: 'phase_current_1'
      },
      {
        text: '第二相电流',
        value: 'phase_current_2'
      },
      {
        text: '旋转速率',
        value: 'speed'
      },
      {
        text: '负荷扭矩',
        value: 'torque'
      },
      {
        text: '振动信号',
        value: 'vibration_1'
      }
    ],
    time: '',
    zcnum: ['1_M01_F10', '2_M01_F10','3_M01_F10', '4_M01_F10','5_M07_F04', '6_M07_F04','7_M07_F04', '8_M07_F04','9_M07_F10', '10_M07_F10','11_M07_F10', '12_M07_F10'],
    array: ['1号轴承', '2号轴承', '3号轴承','4号轴承', '5号轴承','6号轴承', '7号轴承','8号轴承', '9号轴承','10号轴承','11号轴承', '12号轴承'],
    allConditionName: ['径向力', '第一相电流', '第二相电流', '旋转速率', '负荷扭矩', '振动信号'],
    zcfile:['1_M01_F10_test.csv','2_M01_F10_test.csv','3_M01_F10_test.csv','4_M01_F10_test.csv','5_M07_F04_test.csv','6_M07_F04_test.csv','7_M07_F04_test.csv','8_M07_F04_test.csv','9_M07_F10_test.csv','10_M07_F10_test.csv','11_M07_F10_test.csv','12_M07_F10_test.csv'],
    index: 0,
    index2: 0,
    labels: [],
    result: [],
    series: [],
    i: 0,
    timer: '',
    timer2: '',
    chartTimer: '',
    ec: {
      lazyLoad: true
    }
  },

  // 打开页面自动触发
  onLoad: function () {
    // 默认打开页面时获取第一个轴承的所有参数
    this.getAllParamsDatas("1_M01_F10")
    // 设置时钟
    this.setData({
      time: util.formatTime(new Date()),
    })
    this.oneComponent = this.selectComponent('#mychart-dom-line');
    // 获取预测结果
    this.getLabel("1_M01_F10_test.csv")
  },
  //获取单个工况原始数据
  getSingParamData: function (zcId, attr, callback) {
    var that = this
    wx.request({
      url: 'https://phmlearn.com/component/data/paderborn',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.globalData.access_token,
        device_id: zcId,
        attribute: attr
      },
      success: function (res) {
        callback(res)
      }
    })
  },

  //获取所有工况数据
  getAllParamsDatas: function (zcId) {
    const allParamsName = this.data.allParams;
    let promises = []
      let paramsKey0 = allParamsName[0].value
        this.getSingParamData(zcId,paramsKey0,res=>{
          this.getChartdata(res.data.data.force)
        })
      // promises异步传数据
      promises.push(this.getSingParamData(zcId, paramsKey0, res => {
        const data = res.data.data.force
        this.setData({
          [`result[${0}]`]: {
            key: allParamsName[0].text,
            max: util.getMaxValue(data),
            min: util.getMinValue(data),
            arr: util.getDataArray(data)
          }
        })
      }))

      let paramsKey1 = allParamsName[1].value
      promises.push(this.getSingParamData(zcId, paramsKey1, res => {
        const data = res.data.data.phase_current_1
        this.setData({
          [`result[${1}]`]: {
            key: allParamsName[1].text,
            max: util.getMaxValue(data),
            min: util.getMinValue(data),
            arr: util.getDataArray(data)
          }
        })
      }))

      let paramsKey2 = allParamsName[2].value
      promises.push(this.getSingParamData(zcId, paramsKey2, res => {
        const data = res.data.data.phase_current_2
        this.setData({
          [`result[${2}]`]: {
            key: allParamsName[2].text,
            max: util.getMaxValue(data),
            min: util.getMinValue(data),
            arr: util.getDataArray(data)
          }
        })
      }))

      let paramsKey3 = allParamsName[3].value
      promises.push(this.getSingParamData(zcId, paramsKey3, res => {
        const data = res.data.data.speed
        this.setData({
          [`result[${3}]`]: {
            key: allParamsName[3].text,
            max: util.getMaxValue(data),
            min: util.getMinValue(data),
            arr: util.getDataArray(data)
          }
        })
      }))

      let paramsKey4 = allParamsName[4].value
      promises.push(this.getSingParamData(zcId, paramsKey4, res => {
        const data = res.data.data.torque
        this.setData({
          [`result[${4}]`]: {
            key: allParamsName[4].text,
            max: util.getMaxValue(data),
            min: util.getMinValue(data),
            arr: util.getDataArray(data)
          }
        })
      }))

      let paramsKey5 = allParamsName[5].value
      promises.push(this.getSingParamData(zcId, paramsKey5, res => {
        const data = res.data.data.vibration_1
        this.setData({
          [`result[${5}]`]: {
            key: allParamsName[5].text,
            max: util.getMaxValue(data),
            min: util.getMinValue(data),
            arr: util.getDataArray(data)
          }
        })
      }))
    // }
    
    Promise.all(promises).then(res => {
      this.startTimer();
      this.setDate()
    })
  },


  //获取折线图数据
  getChartdata: function (array) {
    wx.showLoading({
      title: '折线图加载中',
    })
    if (this.data.chartTimer) {
      this.closeTimer(this.data.chartTimer)
    }
    let index = 0
    this.setData({
      chartTimer: setInterval(() => {
        if (index <= 3000) {
          this.setData({
            ylist: array.slice(index, index + 6)
          })
          index++
        } else {
          this.closeTimer(this.data.chartTimer)
          this.setData({
            ylist: array.slice(array.length - 7, array.length - 1)
          })
        }
        this.oneComponent.init((canvas, width, height) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          setOption(chart, this.data.ylist) //赋值给echart图表
          this.chart = chart;
          wx.hideLoading()
          return chart;
        });
      }, 2000)
    })
  },
  //开启刷新时间定时器
  setDate: function () {
    this.setData({
      timer2: setInterval(() => {
        this.setData({
          time: util.formatTime(new Date())
        })
      }, 1000)
    })
  },
  //开启刷新数据定时器
  startTimer: function () {
    this.setData({
      i: 0
    })
    this.setData({
      timer: setInterval(() => {
        if (this.data.i <= 3000) {
          this.setData({
            i: this.data.i + 1
          })
        } else {
          this.setData({
            i: 0
          })
          this.closeTimer(this.data.timer)
          this.closeTimer(this.data.timer2)
        }
      }, 1000)
    })
  },
  //关闭定时器
  closeTimer: function (time) {
    clearInterval(time)
  },
  //切换设备picker，拨动当前设备栏时触发事件
  bindPickerChange: function (e) {
    let arr = ['1_M01_F10', '2_M01_F10','3_M01_F10', '4_M01_F10','5_M07_F04', '6_M07_F04','7_M07_F04', '8_M07_F04','9_M07_F10', '10_M07_F10','11_M07_F10', '12_M07_F10']
    this.closeTimer(this.data.timer)
    this.closeTimer(this.data.timer2)
    this.setData({
      index: e.detail.value
    })
    let j = this.data.index
    let zcid = this.data.zcfile[j]
    // 获取新的预测结果
    this.getLabel(zcid)
    // 获取新工况
    this.getAllParamsDatas(arr[j])
  },
  //切换工况picker，拨动当前工况时触发事件
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value
    })
    let index = e.detail.value
    let arr = this.data.result[index].arr
    this.getChartdata(arr)
  },
  //调用API，获取风机结冰故障预测结果
  getLabel: function (zcid) {
    var that=this
    // 调用特征提取API
    wx.request({
      url: "https://phmlearn.com/component/upload/2/470",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        "access_token": app.globalData.access_token,
        "file_name": zcid,
      },
      complete(res){
        wx.hideLoading();
        if(res.data.status == 0){
          //调用模型API
          wx.request({
            url: "https://phmlearn.com/component/upload/ML/model/170/386",
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data:{
              "access_token": app.globalData.access_token,
              "file_name": res.data.data.file_name,
            },
            complete(res){
              console.log(res.data.data.predict)
              that.setData({
                labels:res.data.data.predict
              })
            }
            })
        }else{};
      }
      })
  },
  //页面卸载时清空定时器
  onUnload: function () {
    if (this.data.timer) {
      this.closeTimer(this.data.timer)
    }
    if (this.data.timer2) {
      this.closeTimer(this.data.timer2)
    }
    if (this.data.chartTimer) {
      this.closeTimer(this.data.chartTimer)
    }
  }
})