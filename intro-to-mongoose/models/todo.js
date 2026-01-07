const mongoose = require('mongoose');

// this is the blueprint 
const todoSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,
});

// contains functionality to perform CRUD on a MongoDB collection 
const Todo = mongoose.model('Todo', todoSchema);

// I need to export it to access it in my app
module.exports = Todo;