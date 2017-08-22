function getHelpfulMessage(err) {
    if(err.name) { // very "helpful"
        return err;
    }
}

module.exports = function( app ) {
    app.use( function (err, req, res, next) {
        console.log(err);
        console.log("-----------------");
        console.log(err.stack);
        res.status(500).send("You broke it! " + getHelpfulMessage(err));
    });
};