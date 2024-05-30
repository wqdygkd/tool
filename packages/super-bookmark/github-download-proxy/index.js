// github 资源代理下载

(function () {
  navigator.clipboard.readText()
    .then(v => {
      window.open('https://mirrors.ghproxy.com/' + v)
    })
    .catch(error => {
      console.log('获取剪贴板失败:', error)
    })
}())
