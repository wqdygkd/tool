import fetch from 'node-fetch'
import { createWriteStream, unlinkSync, renameSync, mkdirSync } from 'fs'
import path from 'path'
import ProgressBar from 'progress'

// __filename 和 __dirname 通过 import 对象的 meta 属性获取
// / 通过 url 模块的 fileURLToPath 方法转换为路径
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/*
  fileURL 下载 的文件 地址
  dir 下载目录
 */
async function download ({ fileURL, dir }) {
  try { mkdirSync(dir) } catch (_) {}

  // 下载保存的文件路径
  const fileSavePath = path.join(dir, path.basename(fileURL))

  // 缓存文件路径
  const tmpFileSavePath = fileSavePath + '.tmp'

  // 创建写入流
  const fileStream = createWriteStream(tmpFileSavePath).on('error', function (e) {
    console.error('error==>', e)
  })

  process.on('SIGINT', () => {
    console.log(' \n下载停止:', tmpFileSavePath)
    try {
      unlinkSync(tmpFileSavePath)
    } catch (err) {
      // 处理错误
    }
    process.exit(0)
  })

  // 请求文件
  const response = await fetch(fileURL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/octet-stream' }
    // timeout: 100,
  })

  try {
    if (response.status !== 200) {
      console.log('下载失败', response.status)
      process.exit(0)
    }

    const len = response.headers.get('content-length')
    const bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: parseInt(len)
    })

    console.log('开始下载:', fileURL)
    for await (const chunk of response.body) {
      fileStream.write(chunk)
      bar.tick(chunk.length)
    }

    // 下载完成后重命名文件
    renameSync(tmpFileSavePath, fileSavePath)
    console.log('下载完成:', fileSavePath)
    return fileSavePath
  } catch (err) {
    console.error(err.stack)
  }
}

export default download
