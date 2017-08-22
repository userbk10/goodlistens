const podcastRouter = require("express").Router();
let mongoose = require("mongoose");
let Podcast = mongoose.model("Podcast");

//  /Podcasts route

/*
    Get method for /podcasts.
    Valid query params: name, author, network, tag, limit, offset, rating
    You can sort by sort=name_asc\desc or sort=rating_asc\desc
*/
podcastRouter.route("/")
    .get(function (req, res, next) {
        //need to implement querying
        let query = {};
        let limit = 20;
        let offset = 0;
        if(typeof req.query.limit !== "undefined" && req.query.limit <= 50) {
            limit = req.query.limit;
        }
        //ignore all the query stuff for now, let's just get the podcast returning from the database.
        console.log("Querying for all podcasts");
        Podcast.find({})
        .populate("episodes")
        .then( function ( result) {
            res.json(result);
        });
        /*
        .then( (result) => {
            res.json(result);
        });
        */
    });

podcastRouter.route("/")
    .post(function (req, res, next) { 
        if(req.headers["content-type"] !== "application/json") {
            console.log("request headers:  ");
            console.log(req.headers);
            res.status(415).send("Request header content-type must be 'application/json'");
            next();
        }
        let newPodcast = new Podcast();
        if(req.body.name) {
            newPodcast.name = req.body.name;
        } else {
            res.status(422).send("Missing required value for podcast name!");
            next();
        }
        if(req.body.website) {
            newPodcast.website = req.body.website;
        }
        if(req.body.author) {
            newPodcast.author = req.body.author;
        }
        if(req.body.description) {
            newPodcast.description = req.body.description;
        }
        if(req.body.network) {
            newPodcast.network = req.body.network;
        }
        if(req.body.tags) {
            newPodcast.tags = req.body.tags;
        }

        newPodcast.save()
        .then( (response) => {
            res.status(201).json(response);
        }).catch((err) => {
            next(err);
        });
    });

function isValidId(id) {
    let regex = RegExp("^[a-zA-Z0-9]{24}$"); // Alphanumeric string of length 24
    return regex.test(id);
}

podcastRouter.route("/:podcastId")
    .get( function (req, res) {
        if(isValidId(req.params.podcastId)) {
            Podcast.findById(req.params.podcastId)
            .then( (result) => {
                if(result) {
                    res.json(result);
                } else {
                    res.status(404).json(`Could not find podcast with id: ${req.params.podcastId}`);
                }               
            });
        } else {
            res.status(400).json("Podcast ID is not valid");
        }
    });

podcastRouter.route("/:podcastId/Episodes")
    .get( function( req, res) {
        if(isValidId((req.params.podcastId))) {
            Podcast.findById(req.params.podcastId)
            .then ((result) => {
                if(result) {
                    res.json(result.shit);
                } else { // no podcast found with that ID, return 404 Not Found
                    res.status(404).json(`Could not find podcast with id ${req.params.podcastId}`);
                }
            });
        } else {
            res.status(400).json("Podcast ID is not valid");
        }// podcastId is not a valid ID, return 400 Bad Request  
    });

module.exports = podcastRouter;