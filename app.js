const express = require("express");
const app = express();
const router = express.Router();
const port = process.env.PORT || 4000;

const homePage = require("./routes/index.js");

app.use("/", homePage);

app.listen(port, () => {
  console.log("Listening");
});
