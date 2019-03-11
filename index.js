'use strict'
var splash = require('@randy.tarampi/ios-splash')
var lwip = require('@randy.tarampi/lwip')
var path = require('path')
var colors = require('colors')

function openImage (path) {
  return new Promise(function (resolve, reject) {
    lwip.open(path, function (err, image) {
      if (err) {
        reject(err)
      }
      resolve(image)
    })
  })
}

function clone (image) {
  return new Promise(function (resolve, reject) {
    image.clone(function (err, clone) {
      if (err) {
        reject(err)
      }
      resolve(clone)
    })
  })
}

function scale (splash, image) {
  return new Promise(function (resolve, reject) {
    var ratio = splash.height < splash.width ? splash.width / image.width() : splash.height / image.height()
    image.scale(ratio, ratio, function (err, scaled) {
      if (err) return reject(err)
      resolve(scaled)
    })
  })
}

function crop (splash, image) {
  return new Promise(function (resolve, reject) {
    image.crop(splash.width, splash.height, function (err, cropped) {
      if (err) return reject(err)
      resolve(cropped)
    })
  })
}

function writeFile (path, image) {
  return new Promise(function (resolve, reject) {
    image.writeFile(path, function (err) {
      if (err) return reject(err)
      resolve(path)
    })
  })
}

function successMessage (splash, output, path) {
  return console.info(colors.green('OK'), 'Image scaled and cropped to', splash.width, 'x', splash.height, 'and written to', path)
}

function errorMessage (e) {
  var message = typeof e === 'string' ? e : (e.msg || e.message)
  console.error(colors.red('ERROR.'), message)
}

function transformAll (splash, output, image) {
  return Promise.all(splash
    .map(transform.bind(null, image, output))
  )
}

function transform (image, output, splash) {
  var out = output ? path.join(output, splash.name) : false
  return clone(image)
    .then(scale.bind(null, splash))
    .then(crop.bind(null, splash))
    .then(writeFile.bind(null, out))
    .then(successMessage.bind(null, splash, output))
    .catch(errorMessage)
}

module.exports = function (input, output) {
  if (!input) {
    errorMessage(new Error('`input` parameter is required.'))
  }
  output = output || process.cwd()
  return openImage(input).then(transformAll.bind(null, splash(), output))
}
