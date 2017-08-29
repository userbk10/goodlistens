db = new Mongo().getDB("goodlistens");
db.podcasts.drop();
db.createCollection("podcasts",{collation: {locale: "en_US", strength: 2, caseLevel: false}}); // case insensitive collection
db.podcasts.insertMany([
    {
        name: "Sample Podcast",
        website: "www.samplepodcast.com",
        author: "John Doe",
        description: "",
        episodes: [],
        network: "Sample Podcast Network",
        tags: ["comedy","sports"],
        ratingsCount: 0,
        averageRating: 0
    },   
    {
        name:"Podcast Wonderful",
        website: "www.wonderfulcast.com",
        author: "Jane Johnson",
        episodes: [],
        network: "",
        tags: ["true crime","serial"],
        ratingsCount: 0,
        averageRating: 0
    },{
        name:"ShowStopper",
        website: "www.showstopper.com",
        author: "Robbo Jimm",
        episodes: [],
        network: "",
        tags: ["history","serial"],
        ratingsCount: 0,
        averageRating: 0

    },{
        name:"Podcast podcast",
        website: "www.podcastcastCast.com",
        author: "Jane Johnson",
        episodes: [],
        network: "",
        tags: ["meta","soVery"],
        ratingsCount: 0,
        averageRating: 0

    },{
        name:"Hambone Presents",
        website: "www.hammyfist.com",
        author: "Pork Sausage",
        episodes: [],
        network: "",
        tags: ["storytelling","food"],
        ratingsCount: 0,
        averageRating: 0

    },{
        name:"Tripping Through history",
        website: "www.LSDRome.com",
        author: "Alan Watts",
        episodes: [],
        network: "",
        tags: ["visual","history"],
        ratingsCount: 0,
        averageRating: 0

    },{
        name:"MovieCast",
        website: "www.rateThemAll.com",
        author: "Jane Johnson",
        episodes: [],
        network: "",
        tags: ["movies"],
        ratingsCount: 0,
        averageRating: 0

    },{
        name:"Mystery Show",
        website: "",
        author: "Jane Johnson",
        episodes: [],
        network: "",
        tags: [],
        ratingsCount: 0,
        averageRating: 0
    }]);

var podcastID = db.podcasts.find({name: "podcast podcast"}).toArray()[0]._id;

db.episodes.drop(); // kill all the fake episodes
//Make the new fake episodes
//Manually add an ID because I don't want to query for it after the fact.
var episodeID = new ObjectId();
db.episodes.insert({
    _id: episodeID,
    title: "Episode 1: Euphoria Overdrive",
    description: "An in-depth look into the values that control our society and why ice cream is a good diet plan",
    podcastId: podcastID,
    episodeNumber: 1,
    releasedDate: new Date(),
});

db.podcasts.update({name: "podcast podcast"}, { $addToSet: {episodes: [episodeID] } }  );