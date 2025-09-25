const express = require("express");
const { validateBlogTitle } = require("../middleware/blogCRUDValidators");
const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        message:"Placeholder blog post GET endpoint"
    });
});

router.post("/", validateBlogTitle, (request, response, next) => {
    if (request.errors){
        return next(new Error("There is an error."))
    }

    response.json({
        message: "Placeholder blog post POST endpoint"
    });
});

module.exports = router;