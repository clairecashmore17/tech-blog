const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

const sessions = require("express-session");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// After creating our session , use the session here

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware for style sheet accessed through the public folder
app.use(express.static(path.join(__dirname, "public")));
//turn on our routes NOT IMPLEMENTING ROUTES YET
//app.use(routes)

//turn on connection to db and server
// sync means that this is sequelize taking the models and connection them to associated database tables
// force : true means we would drop and recreate all of the database tables on startup
// will create a table for you if it doesnt find one
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
