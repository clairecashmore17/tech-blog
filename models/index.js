//import our User model
const User = require("./User");
//import our Post model
const Post = require("./Post");
//import our COmment model
const Comment = require("./Comment");

//Create our model associations
//Note: User to Post is one to Many
User.hasMany(Post, {
  foreignKey: "user_id",
});

//Make reverse assocation to ensure Post cant belong to any others
Post.belongsTo(User, {
  foreignKey: "user_id",
});

//Comment model associations
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
