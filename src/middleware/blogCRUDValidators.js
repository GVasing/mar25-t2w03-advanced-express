function validateBlogTitle(request, response, next) {
    let titleToCheck = request.body.title;

    let errorArray = [];
    // if (titleToCheck && titleToCheck.trim().length > 3){
    //     next();
    // } else {
    //     return next(new Error("Title not provided or is too short"));

    //     // response.json({
    //     //     message: "Title not provided, or is too short"
    //     // })
    // }

    if (!titleToCheck){
        errorArray.push("Title not provided")
    } 
    if (titleToCheck.trim().length < 3){
        errorArray.push("Title too short.  Should be at least 3 characters long of alphanumeric characters.")
    }

    request.errors = [...errorArray];
    next();

    // if (errorArray.length > 0) {
    //     request.errors = [...errorArray];
    //     return next(new Error("Errors occured in validation"));
    // } else {
    //     next();
    // }
};

module.exports = {
    validateBlogTitle
};