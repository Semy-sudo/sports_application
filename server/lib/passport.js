var connection = require('./connection.js');

module.exports = function (app) {
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        console.log('serializeUser', user);
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        console.log('deserializeUser', id);
        done(null, id);
    });

    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'passwd'
    }, function (username, password, done) {
        console.log('LocalStrategy', username, password);
        let sql = 'SELECT * FROM user WHERE id = ?';
        connection.query(sql, [username], function (err, results) {
            if (err) 
                return done(err);
            if (!results[0]) 
                return done('please check your id.');
            
            var user = results[0];
            if (user.passwd === password) {
                return done(null, user)
            } else {
                return done('please check your passwd');
            }
        });

    }));

    return passport;
}


