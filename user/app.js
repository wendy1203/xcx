const { getUserInfo } = require("./pages/services/user.js");

App({
  onLaunch: function (ops) {
    // 登录
    wx.login({
      success: res => {
        console.log('app login',res)
      }
    })
    //用户信息
    wx.getUserInfo({
      success: _res => {
        const { userInfo} = _res;
        this.globalData = Object.assign(this.globalData, { userInfo });
        console.log('app gldata : ', this.globalData)
      }
    })
  },
  /**
 * 登录
 * @param {*} cb 
 */
  getlogin: function (cb) {
    const { userInfo } = this.globalData;
    if (userInfo) return typeof cb === 'function' && cb(null, { userInfo });

    getUserInfo((err, users) => {
      if (err) return typeof cb === 'function' && cb({ errMsg: "getUserInfo:fail auth deny" });
      this.globalData = Object.assign(this.globalData, { userInfo: users.userInfo });
      const { code, encryptedData, iv } = users;
      return typeof cb === 'function' && cb(null, users);
    });
  },
  /**
 * 强制登录
 * @param {*} cb 
 */
  forceLogin: function (cb) {
    // 授权判断
    const { userInfo } = this.globalData;
    if (userInfo) {
      return typeof cb === 'function' && cb(null, { ...userInfo });
    }
    this.getlogin((err, res) => {
      if (err) {
        wx.openSetting({
          success: () => {
            this.getlogin((_err, _res) => {
              if (_err) return false;
              const { userInfo } = _res;
              Object.assign(this.globalData, { userInfo });
              return typeof cb === 'function' && cb(null, { ...userInfo });
            });
          }
        });
      } else {
        const { userInfo } = res;
        // Object.assign(this.globalData, { userInfo });
        return typeof cb === 'function' && cb(null, { ...userInfo });
      }
    });

  },
  globalData: {
    userInfo: null,
    token: null
  }
})