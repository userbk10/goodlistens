//Express middleware for logging
module.exports = function (request, response, next) {
    let startTime = +new Date();
    let stream = process.stdout;
    let method = request.method;

    response.on("finish", function ()  {
        let duration = +new Date() - startTime;
        stream.write(`${ method } method took ${duration} ms to process \n`);
    });
    next();
};