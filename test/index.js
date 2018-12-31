const grabLineage = require('../')

const output = grabLineage({
  getMetadata: true
})

console.log(output)