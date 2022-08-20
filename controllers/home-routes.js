const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

//Get the homepage with / in url
router.get("/", (req, res) => {
  //log our session variables
  console.log(req.session);
  // Find all of the posts on the site
  Post.findAll({
    attributes: ["id", "post_text", "title", "created_at"],
    //Include Comments and the user that created them
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      // Also include the username of the user making the post
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      //gather post data in an array
      // DONT FORGET to get the data we want with get({ plain: true })
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("homepage", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login page route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
module.exports = router;
