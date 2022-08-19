//import our User model
const User = require("./User");
//import our Post model
const Post = require("./Post");
//import our COmment model
const Comment = require("./Comment");

//Connecting the Post model to User by using user_id
User.hasMany(Post, {
  foreignKey: "user_id",
});
//Reverse association
Post.hasMany(User, {
  foreignKey: "user_id",
});

//Comment Associations

//Comments are connected to Users through Comment.user_id
Comment.belongsTo(User, {
  foreignKey: "user_id",
});
// A user is able to have multiple comments
User.hasMany(Comment, {
  foreignKey: "user_id",
});

//Comments are ALSO connected to Post through their Comment.post_id
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

//a post is able to have multiple comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
