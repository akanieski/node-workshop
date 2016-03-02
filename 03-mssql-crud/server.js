var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Router     = require('./config/router');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

app.use('/api', new Router());

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server Listening on ' + port);