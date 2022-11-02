const express = require("express");
const path = require("path");
const app = express();


app.use(express.static("./build"));


app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

const PORT = 2055;

app.listen(PORT, () => console.log(`server start on port ${PORT}`));