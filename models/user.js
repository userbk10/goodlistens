let mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");
let crypto = require("crypto");


let userSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, required: [true, "username cannot be empty"], match: [/^[a-zA-Z0-9]+$/, "Username is invalid"], index: true}, 
    email: {type: String, lowercase: true, unique: true, required: [true, "Email cannot be empty"], match: [/\S+@\S+\.\S+/, "Invalid email"] },
    subscribed: [{type: mongoose.Schema.Types.ObjectId, ref: "Podcast"}],
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: "Podcast"}],
    passwordHash: {type: String, required: true},
    salt: String,
    podcastRatings: [{  // A user can have none or many
        podcastId: {type: mongoose.Schema.Types.ObjectId, ref: "Podcast"},
        rating: {type: Number, min: 1, max: 5}
    }],
    episodeRatings: [{ //this is probably not the best way to do this
        episodeId: {type: mongoose.Schema.Types.ObjectId, ref: "Episode"},
        rating: {type: Number, min: 1, max:5}
    }],
});

userSchema.methods.validPassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
    return this.passwordHash === hash;
};

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};



userSchema.plugin(uniqueValidator, {message: " is already taken"});

mongoose.model("User", userSchema);