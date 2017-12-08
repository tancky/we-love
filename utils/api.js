const fetch = require('./fetch.js');
const API_DOMAIN = "https://huahui.qingyy.net/zhuangxiutp/public/api";

/**
 * @param  {String} 接口地址   
 * @param  {Objece} params 接口参数参数
 */

function fetchApi(api, params) {
  return fetch(API_DOMAIN, api, params);
}

// 用户名信息
function wx_userName (params) {
  return fetchApi("ad/index", params).then(res => res.data);
}
//商品导航信息
function wx_cate(params) {
  return fetchApi("cate/index", params).then(res => res.data);
}
//商家列表信息
function wx_getBus(params) {
  return fetchApi("shop/index", params).then(res => res.data);
}

module.exports = {
  wx_userName,
  wx_cate,
  wx_getBus
}