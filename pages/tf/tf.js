// miniprogram/pages/tf/tf.js
//特征值提取之时频域分析

// 导入util中的函数
var util = require('../../util/util.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '1号轴承' , checked: 'true'},
      { name: '2', value: '2号轴承' },
      { name: '3', value: '3号轴承' },
      { name: '4', value: '4号轴承' },
      { name: '5', value: '5号轴承' },
      { name: '6', value: '6号轴承' },
      { name: '7', value: '7号轴承' },
      { name: '8', value: '8号轴承' },
      { name: '9', value: '9号轴承' },
      { name: '10', value: '10号轴承' },
      { name: '11', value: '11号轴承' },
      { name: '12', value: '12号轴承' },
  ]
  },

  // 表单触发事件，用于调用特征提取API并跳转到预测页面（ft）
  radioChange(e) {
    let data = ['1_M01_F10_test.csv','2_M01_F10_test.csv','3_M01_F10_test.csv','4_M01_F10_test.csv','5_M07_F04_test.csv','6_M07_F04_test.csv','7_M07_F04_test.csv','8_M07_F04_test.csv','9_M07_F10_test.csv','10_M07_F10_test.csv','11_M07_F10_test.csv','12_M07_F10_test.csv']
    console.log(data[e.detail.value-1])
    util.reqFunc('https://phmlearn.com/component/upload/2/470',
      {
        "access_token": app.globalData.access_token,
        "file_name": data[e.detail.value-1],
      }, "ft",function(res){
        app.globalData.output_fileName = res.data.data.file_name;
        console.log(app.globalData.output_fileName);
        console.log(res);
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})