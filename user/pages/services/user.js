const { fetch } = require('../../utils/fetch.js');
const { loginType, apiPrefix } = require("../../utils/config.js");
const app = getApp()
/**
 * 用户信息
 * @param {*} cb 
 */
const getUserInfo = (cb) => {
  // 登录
  wx.login({
    success: res => {
      const { code } = res;
      if (!code) return;
      //获取用户信息
      wx.getUserInfo({
        success: _res => {
          return typeof cb === 'function' && cb(null, { code, ..._res });
        },
        fail: err => {
          return typeof cb === 'function' && cb(err);
        }
      })
    }
  })
}



module.exports = {
  getUserInfo
}