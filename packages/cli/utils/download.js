import fetch from 'node-fetch'
import { createWriteStream, unlinkSync, renameSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import ProgressBar from 'progress'

// __filename 和 __dirname 通过 import 对象的 meta 属性获取
// / 通过 url 模块的 fileURLToPath 方法转换为路径
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/*
  fileURL 下载 的文件 地址
  dir 下载目录
 */
async function download ({ fileURL, dir }) {
  try { mkdirSync(dir) } catch {}

  // 下载保存的文件路径
  const fileSavePath = path.join(dir, path.basename(fileURL))

  // 缓存文件路径
  const temporaryFileSavePath = fileSavePath + '.tmp'

  // 创建写入流
  const fileStream = createWriteStream(temporaryFileSavePath).on('error', function (error) {
    console.error('error==>', error)
  })

  process.on('SIGINT', () => {
    console.log(' \n下载停止:', temporaryFileSavePath)
    try {
      unlinkSync(temporaryFileSavePath)
    } catch {
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
    }

    const length = response.headers.get('content-length')
    const bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: Number.parseInt(length)
    })

    console.log('开始下载:', fileURL)
    for await (const chunk of response.body) {
      fileStream.write(chunk)
      bar.tick(chunk.length)
    }

    // 下载完成后重命名文件
    renameSync(temporaryFileSavePath, fileSavePath)
    console.log('下载完成:', fileSavePath)
    return fileSavePath
  } catch (error) {
    console.error(error.stack)
  }
}

export default download
