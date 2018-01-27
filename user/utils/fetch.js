const fetch = (options, cb) => {
  let { url, header = {}, ...other } = options;
  header = Object.assign({ 'Content-Type': 'application/json' }, header);
  wx.request({
    url,
    header,
    ...other,
    success(res) {
      return typeof cb === 'function' && cb(null, res.data);
    },
    fail(err) {
      return typeof cb === 'function' && cb(err);
    }
  });
}

module.exports = {
  fetch
}    
