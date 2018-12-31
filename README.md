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

//Get the paths of all parent packages
grabLineage()
//=> '' 
```
`bar.js`
```JS
console.log("This is irrelevant but I'm including it anyway!")
```