const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let podcastSchema = new Schema( {
    name: {type: String, required: true},
    website: String,
    author: String,
    description: String,
    episodes: [{type: mongoose.Schema.Types.ObjectId, ref: "Episode"}],
    network: String,
    tags: [String]
});

mongoose.model("Podcast", podcastSchema);

