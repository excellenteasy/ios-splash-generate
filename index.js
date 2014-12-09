'use strict'
var splash = require('ios-splash')
var lwip = require('lwip')
var Q = require('q')
var path = require('path')
var colors = require('colors')

function openImage(path) {
  var q = Q.defer()
  lwip.open(path, function(err, image) {
    if (err) {
        q.reject(err)
    }
    q.resolve(image)
  })
  return q.promise
}

function clone(image) {
  var q = Q.defer()
  image.clone(function(err, clone) {
    if (err) {
      q.reject(err)
    }
    q.resolve(clone)
  })
  return q.promise
}

function scale(splash, image) {
  var q = Q.defer()
  var ratio = splash.height < splash.width ? splash.width / image.width() : splash.height / image.height()
  image.scale(ratio, ratio, function(err, scaled) {
    if (err) return q.reject(err)
    q.resolve(scaled)
  })
  return q.promise
}

function crop(splash, image) {
  var q = Q.defer()
  image.crop(splash.width, splash.height, function(err, cropped) {
    if (err) return q.reject(err)
    q.resolve(cropped)
  })
  return q.promise
}

function writeFile(path, image) {
  var q = Q.defer()
  image.writeFile(path, function(err) {
    if (err) return q.reject(err)
    q.resolve(path)
  })
  return q.promise
}

function successMessage(splash, output, path) {
  return console.info(colors.green('OK'), 'Image scaled and cropped to', splash.width, 'x', splash.height, 'and written to', path)
}

function errorMessage(e) {
  var message = 'string' === typeof e ? e : (e.msg || e.message)
  console.error(colors.red('ERROR.'), message)
}

function transformAll(splash, output, image) {
  return Q.all(splash
    .map(transform.bind(null, image, output))
  )
}

function transform(image, output, splash) {
  var out = output ? path.join(output, splash.name) : false
  return clone(image)
    .then(scale.bind(null, splash))
    .then(crop.bind(null, splash))
    .then(writeFile.bind(null, out))
    .then(successMessage.bind(null, splash, output))
    .catch(errorMessage)
}

module.exports = function(input, output) {
  if (!input) {
    errorMessage(new Error('`input` parameter is required.'))
  }
  var output = output || process.cwd()
  return openImage(input).then(transformAll.bind(null, splash(), output))
}
