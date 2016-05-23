module.exports = function(app) {
    

    var BearerStrategy = require('passport-azure-ad').BearerStrategy;
    var config = require('./config');

    var users = []; // Array of acceptable users

    var findById = function(id, fn) {
        for (var i = 0, len = users.length; i < len; i++) {
            var user = users[i];
            if (user.sub === id) {
                console.log('Found user: ', user);
                return fn(null, user);
            }
        }
        return fn(null, null);
    };

    var bearerStrategy = new BearerStrategy(config.creds,
        function(token, done) {
            console.log(token);
            console.log('verifying the user');
            console.log(token, 'was the token retreived');
            findById(token.sub, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    // "Auto-registration"
                    console.log('User was added automatically as they were new. Their sub is: ', token.sub);
                    users.push(token);
                    //owner = token.sub;
                    return done(null, token);
                }
                owner = token.sub;
                return done(null, user, token);
            });
        }
    );
    passport.use(bearerStrategy);

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    
    app.use(passport.initialize())
    app.use(passport.session())

    var options = {
        // The URL of the metadata document for your app. We will put the keys for token validation from the URL found in the jwks_uri tag of the in the metadata.
        identityMetadata: config.creds.identityMetadata,
        issuer: config.creds.issuer,
        audience: config.creds.audience
    };

}