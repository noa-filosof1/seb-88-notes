// import packages/dependencies 
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');
const authController = require('./controllers/auth.js');

// set the port from the environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : 3000;

// connect to mongo
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

// check for middleware
// url encoded data from forms 
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

// tell express app to use the authController to handle requests that match the '/auth' URL pattern
app.use('/auth', authController);

// routes
app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
})

// listen
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}`);
})