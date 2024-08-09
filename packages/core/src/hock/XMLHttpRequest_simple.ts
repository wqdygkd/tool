/**
 * @description 简易的ajax请求拦截  更多功能可以使用 https://www.npmjs.com/package/ajax-hook
 * @param {Object} window 对象
 * @param {function} callback 拦截回调
 * // e.g.
        addXMLRequestCallback( function( xhr ) {
                // 调用劫持函数，填入一个function的回调函数
                // 回调函数监听了对xhr调用了监听load状态，并且在触发的时候再次调用一个function，进行一些数据的劫持以及修改
                xhr.addEventListener("load", function(){
                if ( xhr.readyState == 4 && xhr.status == 200 ) {
                    console.log( xhr.responseURL );
                }
            });
        });
 */

export function XMLHttpRequestSimpleHock(window: Window, callback: (xhr: XMLHttpRequest) => void) {
  let XMLHttpRequest = window.XMLHttpRequest
  let oldSend
  let i

  if (XMLHttpRequest.callbacks) {
    XMLHttpRequest.callbacks.push(callback)
  } else {
    XMLHttpRequest.callbacks = [callback]
    oldSend = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function () {
      for (i = 0; i < XMLHttpRequest.callbacks.length; i++) {
        XMLHttpRequest.callbacks[i](this)
      }
      oldSend.apply(this, arguments)
    }
  }

  return {
    unhock: function () {

    }
  }
}

// XMLHttpRequestSimpleHock( function( xhr ) {
//   // 调用劫持函数，填入一个function的回调函数
//   // 回调函数监听了对xhr调用了监听load状态，并且在触发的时候再次调用一个function，进行一些数据的劫持以及修改
//   xhr.addEventListener("load", function(){
//     if ( xhr.readyState == 4 && xhr.status == 200 ) {
//         console.log( xhr.responseURL)
//     }
//   })
// })
