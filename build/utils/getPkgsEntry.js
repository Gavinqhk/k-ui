const { resolve } = require('path')
const fs = require('fs-extra')

module.exports = function getPkgsEntry(exclude = ['index.ts', 'list.json']) {
  const pkgsPath = resolve(__dirname, '../../packages')
  const dirs = fs.readdirSync(pkgsPath)
  const entrys = dirs.reduce((pre, curr) => {
    if (!exclude.includes(curr)) {
      pre[curr] = resolve(__dirname, `../../packages/${curr}/index.ts`)
    }
    return pre
  }, {})
  return entrys
}
