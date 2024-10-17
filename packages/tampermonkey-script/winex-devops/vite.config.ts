import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// import { meta as injectMeta } from '@wqdy/tool-core'

import getMetaString from './src/meta/'
import prodMeta from './src/meta/prod.meta'

export default defineConfig(() => {
  return {
    define: {
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
    },
    // plugins: [injectMeta(getMetaString(prodMeta))],
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main.ts'),
        name: 'userscript',
        formats: ['iife'], // 自运行打包格式，与默认模版一致
        fileName: (format) => `index.user.js`
      },
      minify: 'terser',
      terserOptions: {
        // mangle: false, // 关闭名称混淆，遵守Greasefork规则
        // format: {
        //   beautify: true // 美化代码开启缩进，遵守Greasefork规则
        // }
      }
    }
  }
})
