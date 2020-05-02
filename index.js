const splash = require('@randy.tarampi/ios-splash')
const { errorMessage, splashScreensGenerator: generator } = require('@randy.tarampi/generic-icon-splash-generate')

module.exports = (input, output = process.cwd()) => {
  if (!input) {
    errorMessage(new Error('`input` parameter is required.'))
  }
  return generator(splash(), input, output)
}
