import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'node:path'

const pathSrc = resolve(__dirname, 'src')

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    resolve: {
      alias: {
        '~/': `${pathSrc}/`
      }
    },
    // server: {port: 3000,}
    plugins: [],
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main.ts'),
        name: 'userscript',
        formats: ['iife'], // 自运行打包格式，与默认模版一致
        fileName: (format) => `index.user.js` // 非函数的常量会自动添加后缀
      },
      minify: 'terser',
      terserOptions: {
        mangle: false, // 关闭名称混淆，遵守Greasefork规则
        format: {
          beautify: true // 美化代码开启缩进，遵守Greasefork规则
        }
      }
    }
  }
})
