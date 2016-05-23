var koa = require('koa');
var app = koa();
var Router = require('koa-router');
var passport = require('koa-passport');

// body parser 
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
 
// Sessions 
const session = require('koa-generic-session')
app.keys = ['secret']
app.use(session())

require('./passport.js')(app)

// Begin Application

var public = new Router();
var secured = new Router();

public.get('/',function *(){
  this.body = 'OK';
});

secured.get('/secureData', function*(next) {
    var ctx = this
    yield passport.authenticate('oauth-bearer', {session: false}, function*(err, info){
        if (info) {
            ctx.body = info
            yield next
        } else {
            ctx.response.status = 401
        }
    });
});

app.use(public.routes());
app.use(secured.routes());

app.listen(5001);
