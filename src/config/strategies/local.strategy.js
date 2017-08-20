let passport = require("passport"),
    localStrategy = require("passport-local").Strategy,
    mongoose = require("mongoose");

let User = mongoose.model("User");

passport.use(new localStrategy( 
    function(username, password, done) {
        console.log("THE PASSWORD WE ARE PASSING IN IS:  " + password);
        User.findOne({username: username})   
        .then( (user) => {
            console.log("IN LOCAL STRAT, FOUND USER: " + user);
            if( !user || !(user.validPassword(password) )) {
                console.log("SUCK IT WEINER");
                return done(null, false, {message: "Incorrect username or password"});
            } 

            return done(null, user);
        }).catch(done);
    }));