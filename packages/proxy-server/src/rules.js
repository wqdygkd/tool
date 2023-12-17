// const globalAssignHookComponent = require('../components/global-assign-hook-component/core/global-assign-hook-component-main')

// https://github.com/alibaba/anyproxy/tree/master/docs-src/cn

import { responseCache } from './utils.js'

// 拦截请求
const blockRule = [
  {}
]

// 缓存请求到本地
const cacheRule = []

//

export default {
  // 发送请求前拦截处理
  * beforeSendRequest (requestDetail) {
    // 修改请求参数
    // const newOption = Object.assign({}, requestDetail.requestOptions)
    // newOption.path = '/redirect/to/another/path'
    // return {
    //   requestOptions: newOption
    // }

    // 修改请求body
    // return {
    //   requestData: 'my new request data'
    //   //这里也可以同时加上requestOptions
    // };

    // 直接返回客户端，不再发起请求，其中statusCode header 是必选字段
    // return {
    //   response: {
    //     statusCode: 200,
    //     header: { 'content-type': 'text/html' },
    //     body: 'this could be a <string> or <buffer>'
    //   }
    // }
  },

  // 发送请求前拦截处理
  * beforeSendResponse (requestDetail, responseDetail) {
    responseCache(requestDetail, responseDetail)
    // globalAssignHookComponent.process(requestDetail, responseDetail)
  },
  // 请求出错的事件
  * onError (requestDetail, error) { /* ... */ },
  // https连接服务器出错
  * onConnectError (requestDetail, error) { /* ... */ }

  // 在向服务器发出请求前，AnyProxy会调用这个接口，可以在此时修改发送请求的参数
  // replaceRequestOption : function(req,option){
  //     var newOption = option;
  //     delete newOption.headers['if-modified-since'];
  //     return newOption;
  // },

  // 修改响应数据
  // replaceServerResDataAsync: function(req,res,serverResData,callback){
  //     //append "hello world" to all web pages
  //     if(/html/i.test(res.headers['content-type'])){
  //         var newDataStr = serverResData.toString();
  //         newDataStr += "hello world!";
  //         callback(newDataStr);
  //     }else{
  //         callback(serverResData);
  //     }
  // }
}
