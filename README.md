# grab-lineage
> Grab the parent package in the dependency tree as well as the current one.

This utility package will climb the file tree, dictating everywhere it finds a `package.json` as an npm package.

## Install
This package has not yet been published to npm, so for now you can just install it from the git repository.

    npm install https://github.com/Dakedres/grab-lineage.git

## Usage
`foo`, an installed dependency of `bar`:
```JS
const grabLineage = require('grab-lineage')

// Get the paths of all parent packages, note that in this example the "foo" package is installed
// locally, usually it'd be in the node_modules directory.
grabLineage()
//=> [ '/home/dakedres/Projects/Node/bar/foo', '/home/dakedres/Projects/Node/bar' ]

// Get the paths of all parent packages including their normalized package.json data.
grabLineage({
  getMetadata: true
})
// => [
//   {
//      path: '/home/dakedres/Projects/Node/bar/foo',
//      json: {
//        name: 'foo',
//        version: '1.0.0',
//        description: 'This is the current package',
//        main: 'index.js',
//        private: true,
//        author: {
//          name: 'Dakedres'
//        },
//        dependencies: {
//          'grab-lineage': 'git+https://github.com/Dakedres/grab-lineage.git' },
//        readme: 'ERROR: No README data found!',
//        _id: 'foo@1.0.0'
//     }
//   },
//   {
//     path: '/home/dakedres/Projects/Node/bar',
//     json: {
//        name: 'bar',
//        version: '1.0.0',
//        description: 'This is the parent package',
//        main: 'foo.js',
//        private: true,
//        author: {
//          name: 'Dakedres'
//        },
//        dependencies: {
//          foo: 'file:foo'
//        },
//        readme: 'ERROR: No README data found!',
//        _id: 'bar@1.0.0'
//     }
//   }
// ]

// And if you want them in the same format, but without the package.json data obviously.
grabLineage({
  returnAsObjects: true
})
// => [
//   { path: '/home/dakedres/Projects/Node/bar/foo' },
//   { path: '/home/dakedres/Projects/Node/bar' }
// ]

// Now let's say you just want to get the "bar" package, no matter where it is in the dependency
// tree. Note that you can still enable other options and they will work fine with it!
grabLineage({
  getMetadata: true,
  name: 'bar'
})
// => {
//   path: '/home/dakedres/Projects/Node/bar',
//   json: {
//     name: 'bar',
//     version: '1.0.0',
//     description: 'This is the parent package',
//     main: 'foo.js',
//     private: true,
//     author: {
//       name: 'Dakedres'
//     },
//     dependencies: {
//       foo: 'file:foo'
//     },
//     readme: 'ERROR: No README data found!',
//     _id: 'bar@1.0.0'
//   }
// }

// But if you just wanted to get the parent package (where the current one is installed), you
// could just use the "parent" synonym property, it's the same as getting the 1st index of the
// array.
grabLineage().parent
//=> '/home/dakedres/Projects/Node/bar'

// There's also a synonym for the current directory.
grabLineage().current
//=> '/home/dakedres/Projects/Node/bar/foo'
```
`bar.js`
```JS
console.log("This is pretty irrelevant but I'm including it anyway!")

require('foo')
```