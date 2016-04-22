'use strict'
const WebApp = require('./src/webapp')
const config = require('./config/settings.js')

let app = new WebApp(config);

app.start();