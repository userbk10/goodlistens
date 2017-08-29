let mongoose = require("mongoose");

let episodeSchema = new mongoose.Schema( {
    title: String,
    description: String,
    podcastId: {type: mongoose.Schema.Types.ObjectId, ref: "Podcast"},
    episodeNumber: Number,
    releasedDate: Date,
    ratingsCount: {type: Number, default: 0},
    averageRating: {type: Number, default: 0}
});

mongoose.model("Episode", episodeSchema);