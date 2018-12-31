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

module.exports = options => {
  let cwd = module.parent.filename,
      parents = new PackageArray

  while(cwd !== null) {
    parents.push(path.dirname(parents.length === 0 ? cwd : path.join(cwd, '..')))

    cwd = findUp.sync('package.json', { cwd: parents.slice(-1)[0] })
  }

  parents = parents.slice(0, -1)

  if(!options) return parents

  const {
    returnAsObjects,
    getMetadata,
    name
  } = new Options(options)

  if(returnAsObjects || getMetadata)
    parents = parents.map(path => ({ path }))

  if(getMetadata)
    parents = parents.map(object => {
      const parent = object
      parent.json = readPkg.sync({ cwd: parent.path })

      return parent
    })

  if(name)
    return parents.find(value => name === (value.json || readPkg.sync({ cwd: value })).name)

  return parents
}