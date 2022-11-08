const express = require("express");
const router = express.Router();
const firestore = require("firebase/firestore");
const db = firestore.getFirestore();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
router.get("/:id", (req, res) => {
  const postId = req.params.id;
  const postQuery = firestore.getDoc(firestore.doc(db, "posts", postId));
  postQuery
    .then((response) => {
      const post = response.data();
      if (!post) res.send({});
      res.send(post);
    })
    .catch(function (error) {
      console.log("error:", error);
      return res.send(error);
    });
});

module.exports = router;
