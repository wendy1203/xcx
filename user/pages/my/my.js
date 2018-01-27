const app = getApp();

Page({
  data: {
    userInfo: {}
  },

  // 去详情页
  goDetail(e) {
    const { dataset: { id } } = e.currentTarget;
    wx.navigateTo({ url: `../orderdetail/orderdetail?orderCode=${id}` });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let { globalData } = app;
    console.log('my : ', globalData)
    wx.showLoading({ title: '加载中', mask: true });

    if (globalData.userInfo) {
      const { userInfo } = globalData;
      console.log('my1 : ', globalData)
      this.setData({ userInfo });
      wx.hideLoading();  
    }else{
      app.forceLogin((err,res)=>{
        console.log(err,res)
        wx.hideLoading();  
        console.log('my2 : ', globalData)
      })
    }

    // app.getlogin((err, res) => {
    //   if (err) {
    //     wx.openSetting({
    //       success: () => {
    //         app.getlogin((_err, _res) => {
    //           if (_err) return false;
    //           const {  vUserInfo: userInfo } = _res;
    //           _this.setData({ userInfo });
    //         });
    //       }
    //     });
    //   } else {
    //     const { vUserInfo: userInfo } = res;
    //     _this.setData({ userInfo });
    //   }
    // });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  }
})