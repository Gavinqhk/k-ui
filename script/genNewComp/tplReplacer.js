const { resolve } = require('path')
const fs = require('fs-extra')
const handlebars = require('handlebars')

const getTplFilePath = meta => ({
  // docs 目录
  readme: {
    from: './.template/docs/index.md.tpl',
    to: `../../docs/${meta.compName}/index.md`
  },
  demo: {
    from: './.template/docs/demo.vue.tpl',
    to: `../../docs/${meta.compName}/demo.vue`
  },
  // src 目录
  vue: {
    from: './.template/src/index.vue.tpl',
    to: `../../packages/${meta.compName}/src/index.vue`
  },
  // 根目录
  install: {
    from: './.template/src/index.ts.tpl',
    to: `../../packages/${meta.compName}/index.ts`
  }
})

/**
 * 创建对应组件的docs和package路径上的文件
 * @param {*} meta
 */
const createCompFiles = meta => {
  const filePaths = getTplFilePath(meta)
  Object.keys(filePaths).forEach(key => {
    const fileTpl = fs.readFileSync(resolve(__dirname, filePaths[key].from), 'utf-8')
    const fileContent = handlebars.compile(fileTpl)(meta)
    fs.outputFileSync(resolve(__dirname, filePaths[key].to), fileContent, err => {
      console.error(err)
    })
  })
}

const updataPkgInstall = pkgListContent => {
  const installTplPath = './.template/install.ts.tpl'
  const installFilePath = '../../packages/index.ts'
  const installFileTpl = fs.readFileSync(resolve(__dirname, installTplPath), 'utf-8')
  const installMeta = {
    importPlugins: pkgListContent
      .map(({ compName }) => `import {${compName}Plugin} from './${compName}'`)
      .join('\n'),
    installPlugins: pkgListContent
      .map(({ compName }) => `${compName}Plugin.install?.(app);`)
      .join('\n'),
    exportPlugins: pkgListContent.map(({ compName }) => `export * from './${compName}'`).join('\n')
  }
  const installFileContent = handlebars.compile(installFileTpl, {
    noEscape: true
  })(installMeta)
  fs.outputFileSync(resolve(__dirname, installFilePath), installFileContent)
}

/**
 * 更新packages/list.json文件
 * @param {命令行输入的参数} meta
 */
const updatePackageList = meta => {
  const pkgListPath = '../../packages/list.json'
  const pkgListTpl = fs.readFileSync(resolve(__dirname, pkgListPath), 'utf-8')
  const pkgListContent = JSON.parse(pkgListTpl)
  pkgListContent.push(meta)
  const newPkgListContent = JSON.stringify(pkgListContent, null, 2)

  fs.writeFileSync(resolve(__dirname, pkgListPath), newPkgListContent)
  return pkgListContent
}

/**
 *更新router.ts配置
 * @param {packages/list.json数据} pkgListContent
 */
const updataRouterConfig = pkgListContent => {
  const routerFileFrom = './.template/router.ts.tpl'
  const routerFileTo = '../../src/router.ts'
  const routerFileTpl = fs.readFileSync(resolve(__dirname, routerFileFrom), 'utf-8')

  const routerMeta = {
    routes: pkgListContent.map(comp => {
      return `{
      title: '${comp.compZhName}',
      name: '${comp.compName}',
      path: '/${comp.compName}',
      component: () => import('../docs/${comp.compName}/index.md'),
    }`
    })
  }

  const routerFileContent = handlebars.compile(routerFileTpl, {
    noEscape: true
  })(routerMeta)

  fs.outputFileSync(resolve(__dirname, routerFileTo), routerFileContent)
}

module.exports = meta => {
  createCompFiles(meta)
  const pkgListContent = updatePackageList(meta)
  updataRouterConfig(pkgListContent)
  updataPkgInstall(pkgListContent)

  console.log(`创建成功，请前往packages/${meta.compName}和docs/${meta.compName} 目录下开发`)
}
