const express = require("express");
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const ejsLint = require('ejs-lint');

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const book = require("./routes/api/book");

const app = express();

// Set engine View Ejs
app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(expressLayouts);
// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.get("/",
  function (req, res) {
    res.render("layouts/layout", {
      route: "home"
    });
  });

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/book", book);
// @route   GET api/users/register
// @desc    Register user
// @access  Public

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));