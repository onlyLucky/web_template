import { rmSync } from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import AutoImport from 'unplugin-auto-import/vite'
import pkg from './package.json'
import autoprefixer from 'autoprefixer';
import postCssPxToRem from 'postcss-pxtorem';
const path = require('path')
// import Config from "./public/config/index.json"

rmSync('dist-electron', { recursive: true, force: true })
const sourcemap = !!process.env.VSCODE_DEBUG
const isBuild = process.argv.slice(2).includes('build')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    electron([
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main/index.ts',
        onstart(options) {
          if (process.env.VSCODE_DEBUG) {
            console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')
          } else {
            options.startup()
          }
        },
        vite: {
          build: {
            sourcemap,
            minify: isBuild,
            outDir: 'dist-electron/main',
            rollupOptions: {
              external: Object.keys(pkg.dependencies),
            },
          },
        },
      },
      {
        entry: 'electron/preload/index.ts',
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
          // instead of restarting the entire Electron App.
          options.reload()
        },
        vite: {
          build: {
            sourcemap,
            minify: isBuild,
            outDir: 'dist-electron/preload',
            rollupOptions: {
              external: Object.keys(pkg.dependencies),
            },
          },
        },
      }
    ]),
    // Use Node.js API in the Renderer-process
    renderer({
      nodeIntegration: true,
    }),
    AutoImport({
      imports: ['vue'],
      dts: "src/auto-import.d.ts"
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, 'src/styles/variables.less')}";`
      }
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
        }),
        /* postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 102.4, // 75表示750设计稿(1rem = 75px)，37.5表示375设计稿  
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换
        }), */
      ],
    },
  },
  // 设置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'P': path.resolve(__dirname, 'public'),
      '_c': path.resolve(__dirname, 'src/components'),
      '_v': path.resolve(__dirname, 'src/views'),

    },
  },
  /* server: {
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: Config.network.baseUrl.value, //跨域地址
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/api/, "")//重写路径,替换/api
      }
    }
  }, */
  /* server: process.env.VSCODE_DEBUG ? (() => {
    const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
    return {
      host: url.hostname,
      port: +url.port,
      proxy: {
        '/api': {
          target: Config.baseUrl.value, //跨域地址
          changeOrigin: true, //支持跨域
          rewrite: (path) => path.replace(/^\/api/, "")//重写路径,替换/api
        }
      }

    }
  })() : undefined, */
  clearScreen: false,
})
