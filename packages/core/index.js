import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前执行文件所在目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__filename)
console.log(__dirname)

// 获取当前命令所在目录
console.log(path.resolve('./'))
console.log(process.cwd())
