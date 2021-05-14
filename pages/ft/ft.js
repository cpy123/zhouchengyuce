// miniprogram/pages/ft/ft.js
var util = require('../../util/util.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 点击触发事件，用于调用模型API，得出预测结果，并跳转到下一个页面
  tap2(e) {
    util.reqFunc('https://phmlearn.com/component/upload/ML/model/170/386',
      {
        "access_token": app.globalData.access_token,
        "file_name": app.globalData.output_fileName,
      }, "result",function(res){
        console.log(res);
        // 向全局变量resultArray传递评价参数
        app.globalData.resultArray = [res.data.data.result.accuracy, 
          res.data.data.result.recall, 
          res.data.data.result.precision, 
          res.data.data.result.fMeasure, 
          res.data.data.result.rocArea,
          res.data.data.predict[49]
        ];
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