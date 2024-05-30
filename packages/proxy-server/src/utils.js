import fs from 'node:fs'

export function exists (path) {
  try {
    fs.statSync(path)
    return true
  } catch (error) {
    return !error.message.includes('no such file or directory')
  }
}

// 判断是否是HTML类型的响应内容
export function isHtmlResponse (responseDetail) {
  for (const key in responseDetail.response.header) {
    if (key.toLowerCase() === 'content-type' && responseDetail.response.header[key].toLowerCase().toLowerCase().includes('text/html')) {
      if (!responseDetail.response.header[key].toLowerCase().endsWith('charset=utf-8')) {
        responseDetail.response.header[key] = responseDetail.response.header[key] + ';charset=UTF-8'
      }
      return true
    }
  }
  return false
}

/**
 * 判断请求头，请求头里的content-type字段如果包含javascript字样的话则认为是JavaScript字样
 * @param responseDetail
 * @returns {boolean}
 */
export function isJavaScriptResponse (responseDetail) {
  for (const key in responseDetail.response.header) {
    if (key.toLowerCase() === 'content-type' && responseDetail.response.header[key].toLowerCase().toLowerCase().includes('javascript')) {
      if (!responseDetail.response.header[key].toLowerCase().endsWith('charset=utf-8')) {
        responseDetail.response.header[key] = responseDetail.response.header[key] + ';charset=UTF-8'
      }
      return true
    }
  }
  return false
}

export function responseCache (requestDetail, responseDetail) {
  // console.log(1)
  const url = requestDetail.url
  // const body = responseDetail.response.body.toString()
  // // console.log(responseDetail)
  // console.log(body)
  console.log(url)
  // const md5 = crypto.createHash('md5')
  // const cacheFilePath = injectSuccessJsFileCacheDirectory + '/' + md5.update(url).digest('hex') + '.js'
  // const meta = {
  //   url,
  //   filepath: cacheFilePath,
  //   cacheTime: Date.now()
  // }

  // fs.writeFileSync(cacheFilePath, newJsCode)
  // fs.appendFileSync(injectSuccessJsFileCacheMetaFile, JSON.stringify(meta) + '\n')
}
