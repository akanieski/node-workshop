var AsyncSample = require('./async-sample.js');

var app = new AsyncSample();

if (process.argv[2] == 'sync')
    app.startSynchronous();
else if (process.argv[2] == 'callback')
    app.startNestedCallbacks();
else if (process.argv[2] == 'async')
    app.startAsyncPackage();
else if (process.argv[2] == 'promises')
    app.startPromises();
else if (process.argv[2] == 'legacy-promises')
    app.startLegacyPromises();
else if (process.argv[2] == 'generators')
    app.startGenerators();
else
    console.log('Specifiy example: sync, callback, async, promises, generators');
