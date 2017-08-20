const passport = require("passport");

module.exports = function (app) { 
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, {_id: user._id});
    });

    passport.deserializeUser(function (user, done) {
        user.deSerialized = true;
        done(null, user);
    });
    
    require("./strategies/local.strategy.js");
};