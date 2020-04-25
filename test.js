'use strict'
var test = require('tape')
var resize = require('./')
var fs = require('fs')
var rimraf = require('rimraf')
var mkdirp = require('mkdirp')

test('creates all icons in tmp directory', function (t) {
  t.plan(10)
  rimraf('tmp', function () {
    return mkdirp('tmp').then(function () {
      resize('test/com.appbusinesspodcast.www.png', 'tmp/').then(function () {
        t.ok(fs.existsSync('tmp/Default~iphone.png'), 'Default~iphone.png' + ' created')
        t.ok(fs.existsSync('tmp/Default@2x~iphone.png'), 'Default@2x~iphone.png' + ' created')
        t.ok(fs.existsSync('tmp/Default-Portrait~ipad.png'), 'Default-Portrait~ipad.png' + ' created')
        t.ok(fs.existsSync('tmp/Default-Portrait@2x~ipad.png'), 'Default-Portrait@2x~ipad.png' + ' created')
        t.ok(fs.existsSync('tmp/Default-Landscape~ipad.png'), 'Default-Landscape~ipad.png' + ' created')
        t.ok(fs.existsSync('tmp/Default-Landscape@2x~ipad.png'), 'Default-Landscape@2x~ipad.png' + ' created')
        t.ok(fs.existsSync('tmp/Default-568h@2x~iphone.png'), 'Default-568h@2x~iphone.png' + ' created')
        t.ok(fs.existsSync('tmp/Default-667h.png'), 'Default-667h.png' + ' created')
        t.ok(fs.existsSync('tmp/Default-736h.png'), 'Default-736h.png' + ' created')
        t.ok(fs.existsSync('tmp/Default-Landscape-736h.png'), 'Default-Landscape-736h.png' + ' created')
      })
    })
  })
})
