const vue = require('@vitejs/plugin-vue')
const { defineConfig, build } = require('vite')
const { resolve } = require('path')
const dts = require('vite-plugin-dts')

const getPkgsEntry = require('./utils/getPkgsEntry')

const entrys = getPkgsEntry()
console.log('entrys===:', entrys)

const baseConfig = defineConfig({
  plugins: [vue(), dts()]
})

const rollupOptions = {
  // 确保外部化处理那些你不想打包进库的依赖
  external: ['vue'],
  output: {
    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    globals: {
      vue: 'Vue'
    }
  }
}

const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        outDir: 'lib',
        lib: {
          entry: resolve(__dirname, '../packages/index.ts'),
          name: 'K_UI',
          fileName: format => `kui.${format}.js`
        },
        rollupOptions
      }
    })
  )
}

const buildSingle = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        outDir: `lib/Button`,
        lib: {
          entry: resolve(__dirname, '../packages/Button/index.ts'),
          name: 'K_UI',
          fileName: format => `kui.Button.${format}.js`
        },
        rollupOptions
      }
    })
  )
}

const buildLib = async () => {
  await buildAll()
  buildSingle()
}
buildLib()
