const path = require('path'),
      findUp = require('find-up'),
      readPkg = require('read-pkg')

class Options {
  constructor(object) {
    return Object.assign({
      returnAsObjects: false,
      getMetadata: false,
      name: undefined,
    }, object)
  }
}

class PackageArray extends Array {
  constructor(...values) {
    super(...values)
  }

  get current() {
    return this[0]
  }

  get parent() {
    return this[1]
  }
}

const applyOptions = (parents, options) => {
  if(!options) return parents

  let modified = parents

  const {
    returnAsObjects,
    getMetadata,
    name
  } = new Options(options)

  if(returnAsObjects || getMetadata)
    modified = modified.map(path => ({ path }))

  if(getMetadata)
    modified = modified.map(object => {
      const parent = object
      parent.json = readPkg.sync({ cwd: parent.path })

      return parent
    })

  if(name)
    return modified.find(value => name === (value.json || readPkg.sync({ cwd: value })).name)

  return modified
}

const grabLineage = async options => {
  let cwd = module.parent.filename,
      parents = new PackageArray

  while(cwd !== null) {
    parents.push(path.dirname(cwd))

    cwd = await findUp('package.json', {
      cwd: path.join(cwd, '../'.repeat(parents.length === 0 ? 1 : 2))
    })
  }

  return applyOptions(parents, options)
}

const grabLineageSync = options => {
  let cwd = module.parent.filename,
      parents = new PackageArray

  while(cwd !== null) {
    parents.push(path.dirname(cwd))

    cwd = findUp.sync('package.json', {
      cwd: path.join(cwd, '../'.repeat(parents.length === 0 ? 1 : 2))
    })
  }

  return applyOptions(parents, options)
}

module.exports = Object.assign(grabLineage, {
  grabLineage,
  grabLineageSync
})