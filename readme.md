# ios-splash-generate 
[![Build Status](https://travis-ci.com/randytarampi/ios-splash-generate.svg?branch=master)](https://travis-ci.com/randytarampi/ios-splash-generate)
[![Dependency Status](https://david-dm.org/randytarampi/ios-splash-generate.svg)](https://david-dm.org/randytarampi/ios-splash-generate)
[![devDependency Status](https://david-dm.org/randytarampi/ios-splash-generate/dev-status.svg)](https://david-dm.org/randytarampi/ios-splash-generate#info=devDependencies) 

> Generate all required splash screen images from one source. Right size, right file name.

The default splash screen image file names and required sizes for iOS are retrieved from the [ios-splash](http://github.com/randytarampi/ios-splash) module. 

The files created have the default names as you might want to use them, for example, in [`config.xml`](http://docs.phonegap.com/en/3.5.0/config_ref_images.md.html) of a PhoneGap/Cordova project and the correct dimensions.

## How does it work?

A 2208x2208 source image gets scaled first and then cropped to the target dimensions. If you put the relevant part (logo, text, etc.) of your splash screen in the exact center of your source image, this means that the resulting images are all going to be centered as well.


## Install

```sh
$ npm install --save @randy.tarampi/ios-splash-generate
```


## Usage

```js
var generate = require('@randy.tarampi/ios-splash-generate');

generate('path/to/source.png', 'output/splash/').then(function() {
	// splash images created
});

```


## CLI

```sh
$ npm install --global @randy.tarampi/ios-splash-generate
```

```sh
$ ios-splash-generate --help
Generate all required splash screen images from one source. Right size, right file name.

Example
  $ ios-splash-generate -i path/to/source.png -o path/to/output/
	
```


## License
MIT © [David Pfahler](http://excellenteasy.com)
