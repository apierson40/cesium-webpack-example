# cesium-webpack-example

A minimal recommended setup for an applications using [Cesium](https://cesium.com) with [Webpack](https://webpack.js.org/concepts/).

[![Build Status](https://travis-ci.org/AnalyticalGraphicsInc/cesium-webpack-example.svg?branch=using-custom-loader)](https://travis-ci.org/AnalyticalGraphicsInc/cesium-webpack-example)

### Running this application

	npm install
	npm start

Navigate to `localhost:8080`.

### Running in docker

To use this app with docker, run these docker-compose command :

	docker-compose up

Then navigate to `localhost:8080`.

##### Available scripts

* `npm start` - Runs a webpack build with `webpack.config.js` and starts a development server
* `npm run build` - Runs a webpack build with `webpack.config.js`
* `npm run release` - Runs an optimized webpack build with `webpack.release.config.js`
* `npm run serve-release` - Runs an optimized webpack build with `webpack.release.config.js` and starts a development server

##### Configurations

We've included two webpack configuration files in this repository. `webpack.config.js` contains configuration for development while `webpack.release.config.js` contains an optimized configuration for production use.

### Documentation

Presentation available in /doc/project_slides.odp
