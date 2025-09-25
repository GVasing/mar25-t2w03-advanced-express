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

module.exports = {
    randomRouteStopper
};