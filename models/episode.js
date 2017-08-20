let mongoose = require("mongoose");

let episodeSchema = new mongoose.Schema( {
    title: String,
    description: String,
    podcastId: {type: Number, ref: "Podcast"},
    episodeNumber: Number,
    releasedDate: Date,
    aggregateRating: {type: Number}
});

mongoose.model("Episode", episodeSchema);