const express = require("express");
const { randomRouteStopper } = require("./middleware/exampleMiddleware");
const app = express();

// This allows us to receive JSON body data on requests
app.use(express.json());

/*

// Regular route:
app.VERB(path, callback);

// Route with middleware:
app.VERB(path, callback, callback);

*/

app.use((request, response, next) => {
    console.log("Middleware running on every route");
    next();
});

app.get(
    // PATH
    "/middleware-demo",
    // Callback (Middleware callback)
    (request, response, next) => {
        console.log("middleware is running here");
        next();
    },
    (request, response, next) => {
        if (request.headers.password == "password"){
            next();
        } else {
            response.json({
                message: "Wrong Password."
            });
        }
    },
    // Callback
    (request, response) => {
        console.log("Route is being handled here after middleware is complete");
        response.json({
            message:"Middleware route complete"
        });
    }
);

app.get(
    "/weird-middleware-demo",
    randomRouteStopper,
    randomRouteStopper,
    randomRouteStopper,
    randomRouteStopper,
    randomRouteStopper,
    randomRouteStopper,
    randomRouteStopper,
    randomRouteStopper,
    randomRouteStopper,
    randomRouteStopper,
    randomRouteStopper,
    randomRouteStopper,
    randomRouteStopper,
    (request, response) => {
        response.json({
            coinCount: request.coinCount
        });
    }
);

app.get("/", (request, response) => {
    response.json({
        message: "Hello World"
    });
});

const blogRouter = require("./controllers/blogController.js");

app.use("/blogs", blogRouter);

// Error handler will catch any next() that contain an error as an argument
app.use((error, request, response, next) => {

    response.json({
        message: "Something went wrong",
        errorsArray: request.errors,
        error: error.message
    });

})

module.exports = {
    app
}