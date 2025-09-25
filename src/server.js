const express = require("express");

const app = express();

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

function randomRouteStopper(request, response, next){
    // True/false on the random number generator as a coinflip
    let coinFlipResult = Math.random() > 0.4;

    if (coinFlipResult){
        if (request.coinCount){
            request.coinCount++
        } else {
            request.coinCount = 1;
        }
        // OR
        // request.coinCount = (request.coinCount || 0) + 1;
        next();
    } else {
        response.json({
            message:"Coin flip finished.",
            coinCount: request.coinCount || 1
        });
    }
}

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

module.exports = {
    app
}