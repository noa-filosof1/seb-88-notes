// all file imports
const express = require('express');
// import with ecmascript 
// import express from 'express';
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // loads the environment variables from the .env file 
const Fruit = require('./models/fruit.js');

// use express (using app)
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan('dev'));

mongoose.connect(process.env.MONGODB_URI); // Connects to mongoDB using the connection string (our key) 
mongoose.connection.on('connected', () => {
  console.log(`connected to MongoDB ${mongoose.connection.name}`);
}) // our entry to the house is confirmed 


// routes 
// root route
app.get('/', async (req, res) => {
  res.render('index.ejs');
})

// Get fruits (index page)
app.get('/fruits', async (req, res) => {
  const allFruits = await Fruit.find(); // find all the fruits in my fruits collection from MongoDB
  console.log('all of my fruits pls', allFruits); // log out the fruits
  res.render('fruits/index.ejs', { fruits: allFruits });
})

// get for new fruits
app.get("/fruits/new", (req, res) => {
  res.render('fruits/new.ejs');
})

// show route - specific data 
// url looks something like fruits/:id
app.get('/fruits/:fruitId', async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  console.log('found fruit', foundFruit);
  res.render("fruits/show.ejs", { fruit: foundFruit });
})

app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect('/fruits');
})

// update route 
app.put("/fruits/:fruitId", async (req, res) => {
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  // first parameter is the req.params.fruitId (which is the id we use to find the fruit)
  // the next parameter is the req.body which is the data from the form to update the fruit
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  res.redirect(`/fruits/${req.params.fruitId}`);
})

// post fruits 
app.post('/fruits', async (req, res) => {
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  console.log(req.body); // we get the req body (the request body) from the form data
  await Fruit.create(req.body); // create fruit in MongoDB
  res.redirect('/fruits'); // once we get that data, redirect back to the form creation page 
})

// edit route (can put at the bottom because it does not conflict)
app.get('/fruits/:fruitId/edit', async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  console.log('found fruit for edit', foundFruit);
  res.render("fruits/edit.ejs", {
    fruit: foundFruit,
  })
}) 

// listen 
app.listen(3000, () => {
  console.log('Listening on port 3000');
})


// edit route 
// GET /fruits/:fruitId/edit
// have a look at routing table for the edit route + create route 
// update route
// /fruits/:fruitId
