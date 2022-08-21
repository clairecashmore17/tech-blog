const express = require("express");
const sequelize = require("./config/connection");

const path = require("path");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
const routes = require("./controllers");

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// After creating our session , use the session here

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware for style sheet accessed through the public folder

//turn on our routes
app.use(routes);

//turn on connection to db and server
// sync means that this is sequelize taking the models and connection them to associated database tables
// force : true means we would drop and recreate all of the database tables on startup
// will create a table for you if it doesnt find one
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
