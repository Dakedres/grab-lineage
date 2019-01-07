const grabLineage = require('../')

grabLineage({
  getMetadata: true
})
  .then(console.log)
  .catch(console.error)