const mongoose = require("Mongoose");

let Schema = mongoose.Schema;

let podcastNetworkSchema = new Schema({
    name: String,
    podcasts: {type: mongoose.Schema.Types.ObjectId, ref: "Podcast"}
});

mongoose.Schema("podcastNetwork", podcastNetworkSchema);