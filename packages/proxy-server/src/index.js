// https://github.com/alibaba/anyproxy/tree/master/rule_sample

import AnyProxy from 'anyproxy'
import rule from './rules.js'

const options = {
  port: 10_086,
  rule,
  webInterface: {
    enable: true,
    webPort: 8002
  },
  throttle: 10_000,
  forceProxyHttps: true,
  wsIntercept: false, // 不开启websocket代理
  silent: true
}

const proxyServer = new AnyProxy.ProxyServer(options)

proxyServer.on('ready', () => { /* */ })
proxyServer.on('error', _ => {})
proxyServer.start()
