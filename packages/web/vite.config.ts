import { defineConfig, loadEnv  } from 'vite'
// import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

// 自动加载 element 组件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
// import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode } ) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
    return {
      define: {
        __APP_ENV__: JSON.stringify(env.APP_ENV),
      },
      plugins: [
        vue(),
        // vueJsx(),
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.svg', 'robots.txt'],
          manifest: {
            name: '工具箱',
            short_name: '工具箱',
            theme_color: '#000000',
            start_url: '.',
            display: 'standalone',
            background_color: '#ffffff',
            icons: [
              {
                src: 'favicon.svg',
                type: 'image/png',
                sizes: '64x64',
              },
            ],
          },
        }),
      ],
      resolve: {
        // alias: {
        //   '@': fileURLToPath(new URL('./src', import.meta.url))
        // },
        alias: [
          {
            find: '@',
            replacement: resolve(__dirname, 'src')
          }
        ]
      }
    }
  }
)
