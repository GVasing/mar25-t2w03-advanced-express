const express = require("express");
const { validateBlogTitle } = require("../middleware/blogCRUDValidators");
const router = express.Router();

router.get("/", (request, response) => {
    response.json({
        message:"Placeholder blog post GET endpoint"
    });
});

router.post("/", validateBlogTitle, (request, response) => {
    response.json({
        message: "Placeholder blog post POST endpoint"
    });
});

module.exports = router;