console.log("PORT is " + process.env.PORT);

const PORT = process.env.PORT || 3000;

const {app} = require("./server.js");

app.listen(PORT, () => {
    console.log("Server is running on port " + process.env.PORT)
});