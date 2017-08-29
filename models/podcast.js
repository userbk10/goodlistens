const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let podcastSchema = new Schema( {
    name: {type: String, required: true, unique: true},
    website: {type: String, default: ""},
    author: {type: String, default: ""},
    description: {type: String, default: ""},
    episodes: [{type: mongoose.Schema.Types.ObjectId, ref: "Episode"}],
    network: {type: String, default: ""},
    tags: [String],
    ratingsCount: {type: Number, default: 0},
    averageRating: {type: Number, default: 0} // this is a total rating, not an average.  Average is calculated
});

podcastSchema.plugin(uniqueValidator, {message: "Another podcast for given name already exists!"});

mongoose.model("Podcast", podcastSchema);