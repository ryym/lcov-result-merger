#!/usr/bin/env node

var vfs = require('vinyl-fs')
var through = require('through2')
var fs = require('fs')
var lcovResultMerger = require('../index')
var cli = require('../cli')

if (process.argv.length < 3) {
  console.error('')
  console.error("Usage: node lcov-result-merger 'pattern'..." +
    " [-o 'output file']")
  console.error("EX: node lcov-result-merger 'target/**/lcov.out'" +
    "'coverage/lcov.info' -o 'target/lcov-merged.out'")
  console.error('')
  process.exit(1)
}

var args = cli.parseArgs(process.argv)

vfs.src(args.inputFiles)
  .pipe(lcovResultMerger())
  .pipe(through.obj(function (file) {
    if (args.outputFile) {
      fs.writeFileSync(args.outputFile, file.contents)
    } else {
      process.stdout.write(file.contents)
    }
  }))
