const authRouter = require("express").Router();
let mongoose = require("mongoose");
let User = mongoose.model("User");
let passport = require("passport");


authRouter.route("/register")
    .post(function (req, res, next) {
        if(req.body.password !== req.body.passwordConfirm) {
            return res.status(422).json("Passwords do not match!");
        }
        var user = new User(); 
        user.username = req.body.username;
        user.email = req.body.email;
        user.setPassword(req.body.password);
        user.save()
        .then( () => {
            res.json({success: "Yes! Navigate to the login page now.  This goes nowhere."});
        }).catch(next);
    });

authRouter.route("/profile")
    .get( function (req, res, next) {
        console.log(req);
        if(!req.user) {
            res.status(401).json("You must be logged in to view this page");
        }
        User.findById(req.user._id)
        .then( (result) => {
            res.json(result);
        }).catch(next);
    });

authRouter.route("/login")
    .post(passport.authenticate("local", { failureRedirect: "/"}),
     function (req, res) {
         res.redirect("/auth/profile");
     });


module.exports = authRouter;