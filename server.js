let express = require("express"),
    logger = require("./src/logger.js"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    session = require("express-session");//,
    //validator = require("express-validator");
    
let secret = process.env.secret || "devsecret";
let app = express();
//mongoose models
require("./models/User");
require("./models/Podcast");
require("./models/Episode");

//express middleware

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session( {
    "secret": secret,
    "resave": true,
    "saveUninitialized": false
}));
require("./src/config/passport.js")(app);
app.use(logger);
app.use("/", express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost/goodlistens", { useMongoClient: true});

//mongoose models
require("./models/User");
require("./models/Podcast");
require("./models/Episode");

let podcastRouter = require("./routes/podcastRoutes.js");
let authRouter = require("./routes/authRoutes.js");

//express routes
app.use("/api/podcasts", podcastRouter);
app.use("/auth", authRouter);


let test = new Episode({
    
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Running on port: ${port}`);
});