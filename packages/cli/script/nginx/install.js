#!/usr/bin/env node

import path from 'path'
import os from 'os'
import fs from 'fs'
import extract from 'extract-zip'
import { fileURLToPath } from 'url'
import download from '../../utils/download.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const platform = process.env.npm_config_platform || os.platform()
if (platform !== 'win32') {
  console.log('只支持win')
  process.exit(0)
}

// if (isInstalled()) {
//   process.exit(0)
// }

// 下载
download({
  fileURL: 'https://nginx.org/download/nginx-1.21.3.zip',
  dir: path.join(__dirname, 'dist')
}).then(extractFile).catch(err => {
  console.error(err.stack)
  process.exit(1)
})

function isInstalled () {
  const platformPath = ''
  // try {
  //   if (fs.readFileSync(path.join(__dirname, 'dist', 'version'), 'utf-8').replace(/^v/, '') !== version) {
  //     return false
  //   }

  //   if (fs.readFileSync(path.join(__dirname, 'path.txt'), 'utf-8') !== platformPath) {
  //     return false
  //   }
  // } catch (ignored) {
  //   return false
  // }

  const Path = path.join(__dirname, 'dist', platformPath)
  return fs.existsSync(Path)
}

// unzips and makes path.txt point at the correct executable
async function extractFile (zipPath) {
  try {
    await extract(zipPath, { dir: path.join(__dirname, 'dist') })
    fs.writeFile(path.join(__dirname, 'path.txt'), path.join('dist', path.basename(zipPath, '.zip'), 'nginx.exe'), err => {
      if (err) return Promise.reject(new Error(err))
      return true
    })
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}
