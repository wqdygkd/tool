import { exec } from 'node:child_process'
import { EOL } from 'node:os' // 回车、换行，通过JSON.stringify()能够观测到
import path from 'node:path'

const dirname = import.meta.url.slice(8, import.meta.url.lastIndexOf('/'))
const p = new Promise((resolve, reject) => {
  exec(`python ${path.join(dirname, 'index.py')}`, (error, stdout, stderr) => {
    if (error) {
      reject(new Error(error))
    } else if (stderr) {
      reject(new Error(stderr))
    } else if (stdout) {
      const result = stdout.trim().split(EOL).toString() // 将返回的结果去掉前后的空格以及回车换行
      resolve(result)
    }
  })
})

p.then(value => {
  console.log('val', value)
}).catch(error => {
  console.log(error)
})
