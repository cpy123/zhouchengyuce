//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'myclouds-2gry74yo645585f8',
        traceUser: true,
      })
    }

    // 全局变量
    this.globalData = {
      input_fileName: "testdatashuffle_2_demo.csv",
      access_token: "d75e03fb13634665ae40ad7ca892f873.ce1d414dc746dca8749960c1b0100149",
      output_fileName: '',
      resultArray: []
    }
  }
})
