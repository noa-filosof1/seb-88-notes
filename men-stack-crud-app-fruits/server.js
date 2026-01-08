// all file imports
const express = require('express');
// import with ecmascript 
// import express from 'express';
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // loads the environment variables from the .env file 
const Fruit = require('./models/fruit.js');

// use express (using app)
const app = express();
app.use(morgan('dev'));

mongoose.connect(process.env.MONGODB_URI); // Connects to mongoDB using the connection string (our key) 
mongoose.connection.on('connected', () => {
  console.log(`connected to MongoDB ${mongoose.connection.name}`);
}) // our entry to the house is confirmed 


// routes 
app.get('/', async (req, res) => {
  res.render('index.ejs');
})

// get for new fruits
app.get("/fruits/new", (req, res) => {
  res.render('fruits/new.ejs');
})

// listen 
app.listen(3000, () => {
  console.log('Listening on port 3000');
})