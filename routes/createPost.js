const express = require("express");
const router = express.Router();
// Initialize firestore
const firestore = require("firebase/firestore");
// Create reference to the database
const db = firestore.getFirestore();

const createPostForm = `
<h1>Create Post</h1>
<form action="/create/submit">
    <div style="display: flex; flex-direction: column; max-width: 400px;">
    <label for="title">Title</label>
    <input type="text" name="postTitle" placeholder="Title" />
    <label for="text">Text</label>
    <input type="text" name="postText" placeholder="Text" />
    <label for="Author">Author</label>
    <input type="text" name="postAuthor" placeholder="Author" />
    <button type="submit">Submit</button>
    </div>
</form>
`;

// middleware that is specific to this route
router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
  res.send(createPostForm);
});

router.get("/submit", (req, res) => {
  const queryParams = req.query; // Query params from URL
  const title = queryParams.postTitle;
  const text = queryParams.postText;
  const author = queryParams.postAuthor;

  // Create ID from title
  const idFromTitle = title.replace(/\s+/g, "-").toLowerCase();

  // Submit post to firebase
  const setBlogPost = firestore.setDoc(
    firestore.doc(db, "posts", idFromTitle),
    {
      title,
      text,
      author,
    }
  );

  setBlogPost
    .then((response) => {
      // if successful, send  correct message
      res.send(`
    <h1>Submission Successful</h1>
    <p><a href="/create">Submit Another Post</a></p>
    <p><a href="/">Return Home</a></p>`);
    })
    .catch((error) => {
      // If failure, send correct message
      console.warn(error);
      res.send(`Error Submitting:  ${error.toString()}`);
    });
});

module.exports = router;
