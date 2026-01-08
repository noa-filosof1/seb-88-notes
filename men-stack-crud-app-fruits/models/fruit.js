// create the file as fruit (not fruits) as the model is the singular representation of the data
// import mongoose 
const mongoose = require('mongoose');

// create the schema (our blueprint)
const fruitSchema = new mongoose.Schema({
  name: String, // what data type you want this property to be - e.g. string will accept infinite amount of string 
  isReadyToEat: Boolean // what data type e.g. boolean will only accept data of true or false
})

// link the schema to a model (the factory - the representation of the schema in mongoDB)
// The model serves as a constructor for creating new documents and reinforces the structure 
const Fruit = mongoose.model('Fruit', fruitSchema); // first argument is the name, second argument is the schema to apply 

// export the model - for use in the rest of our application
// we export fruit as the model and all the operation you can perform on the model
module.exports = Fruit;