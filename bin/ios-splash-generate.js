#!/usr/bin/env node
'use strict'
var argv = require('minimist')(process.argv.slice(2))
var pkg = require('../package.json')
var generate = require('../')
var input = argv.input || argv.i
var output = argv.output || argv.o

function help () {
  console.log([
    pkg.description,
    '',
    'Example',
    '  $ ios-splash-generate -i path/to/source.png -o path/to/output/'
  ].join('\n'))
}

function cli () {
  if (argv.help) {
    help()
    return
  }

  if (argv.version) {
    console.log(pkg.version)
    return
  }

  if (input) {
    generate(argv.input || argv.i, output)
    return
  } else {
    console.error('Please specify an input icon file witht the `-i` option.')
  }
}

cli()
