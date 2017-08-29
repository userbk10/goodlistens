let passport = require("passport"),
    localStrategy = require("passport-local").Strategy,
    mongoose = require("mongoose");

let User = mongoose.model("User");

passport.use(new localStrategy( 
    function(username, password, done) {
        User.findOne({username: username})   
        .then( (user) => {
            if( !user || !(user.validPassword(password) )) {
                return done(null, false, {message: "Incorrect username or password"});
            } 
            return done(null, user);
        }).catch(done);
    }));