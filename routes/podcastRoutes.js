const podcastRouter = require("express").Router();
let mongoose = require("mongoose");
let Podcast = mongoose.model("Podcast");
let User = mongoose.model("User");
"use strict";
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
        let limit = 20; // default query limit
        let offset = 0;
        if(typeof req.query.limit !== "undefined" && req.query.limit < 50) {
            limit = req.query.limit;
        }
        //ignore all the query stuff for now, let's just get the podcast returning from the database.
        Podcast.find({})
        .populate("episodes")
        .then( function ( result) {
            res.json(result);
        }).catch((err)=> {
            next(err);
        });
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
    .get( function (req, res, next) {
        if(isValidId(req.params.podcastId)) {
            Podcast.findById(req.params.podcastId)
            .then( (result) => {
                if(result) {
                    res.json(result);
                } else {
                    res.status(404).json({error: `Could not find podcast with id ${req.params.podcastId}` });
                }               
            }).catch( (err) => {
                next(err);   
            });
        } else {
            res.status(400).json({error: "Podcast ID is not valid!"});
        }
    });

podcastRouter.route("/:podcastId/Episodes")
    .get( function( req, res, next) {
        if(isValidId(req.params.podcastId)) {
            //do stuff
        }
    });

podcastRouter.route("/:podcastId/Rating")
    .put( function (req, res, next) {
        if(!req.user) {
            res.status(403).json({error: "You must be logged in to rate podcasts!"});
        } else {
            if(isValidId(req.params.podcastId)) {
                if(req.body.rating <= 5 && req.body.rating > 0) { //we are good to update the rating for the podcast. 
                    Podcast.findById(req.params.podcastId)
                    .then ((result) => {
                        if(result) {
                            // need old total rating number to calculate new average rating
                            let totalRating = result.averageRating * result.ratingsCount; 
                            result.ratingsCount += 1;
                            result.averageRating = ( totalRating + Number(req.body.rating) ) / result.ratingsCount;
                            result.save()
                                .then( (updatedPodcast) => {
                                    //res.send(UpdatedPodcast);
                                    User.update(
                                        {_id: req.user._id},
                                        {$addToSet: {podcastRatings: {podcastId: updatedPodcast._id, rating: req.body.rating}}}
                                    )
                                    .then((updatedUser) => {
                                        res.send({Podcast: updatedPodcast, User: updatedUser});
                                    }).catch((err) => {
                                        next(err);
                                    });     
                                }).catch((err) => {
                                    next(err);
                                });
                        } else { // no podcast found with that ID, return 404 Not Found
                            res.status(404).json({error: `Could not find podcast with id ${req.params.podcastId}` });
                        }
                    }).catch( (err) => {
                        next(err);
                    });
                } else {
                    res.status(400).json({error: "Rating is not valid!"});
                }
            } else {
                res.status(400).json({error: "Podcast ID is not valid!"});
            }
        }

    });

module.exports = podcastRouter;