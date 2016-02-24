var cluster = require('cluster');
var os = require('os');

if (cluster.isMaster) {
    // Count the machine's CPUs
    var cpuCount = process.env.NODE_WORKER_COUNT || os.cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
    var express    = require('express');        // call express
    var app        = express();                 // define our app using express
    var bodyParser = require('body-parser');

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    var port = process.env.PORT || 8080;        // set our port

    // ROUTES FOR OUR API
    // =============================================================================
    var router = express.Router();              // get an instance of the express Router

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function(req, res) {
        res.json({ message: 'Sample Data' });   
    });

    // more routes for our API will happen here

    // REGISTER OUR ROUTES -------------------------------
    // all of our routes will be prefixed with /api
    app.use('/api/sample', router);

    // START THE SERVER
    // =============================================================================
    app.listen(port);
    console.log('Server Listening on ' + port + ' under process id [' + process.pid + ']');
}