const express = require("express");
const app = express();
const firebase = require("firebase/app");
const port = process.env.PORT || 4000;

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDo3y6B_zMIl7U8SZelw73Q5nV2Ruyy7rg",
  authDomain: "dm3193-exercise-five.firebaseapp.com",
  projectId: "dm3193-exercise-five",
  storageBucket: "dm3193-exercise-five.appspot.com",
  messagingSenderId: "1085101582590",
  appId: "1:1085101582590:web:c5166b0de95f882d355daf",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const homePage = require("./routes/index");
const singlePostRoute = require("./routes/singlePost");
const createPostRoute = require("./routes/createPost");

app.use("/", homePage);
app.use("/post/", singlePostRoute);
app.use("/create", createPostRoute);

app.listen(port, () => {
  console.log("Listening");
});
