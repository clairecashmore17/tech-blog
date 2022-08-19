const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

//get all users
router.get("/", (req, res) => {
  User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET /api/users/1
router.get("/:id", (req, res) => {
  //We can user findOne() instead to work with one parameter
  // findOne -> Just like SELECT * FROM users WHERE id = param;
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_url", "created_at"],
      },
      // include the Comment model here:
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  //expects {username: 'Claire', email: 'cbear5@live.com', password: 'password1234'}
  //.create() works like: INSERT INTO users (username, email, password) VALUES ('Claire', 'cbear5@live.com','password1234')
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      // we do session.save() in order to make sure the session is created before we send the response back(initiates the creation of session then runs callback function once to complete)
      //   req.session.save(() => {
      //     req.session.user_id = dbUserData.id;
      //     req.session.username = dbUserData.username;
      //     req.session.loggedIn = true;
      console.log(dbUserData);
      res.json(dbUserData);
      //   });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a User
router.put("/:id", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete a user
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
