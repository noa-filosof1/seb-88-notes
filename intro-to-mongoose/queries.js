// installing packages into file 
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Todo = require('./models/todo.js');

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  
  console.log('Connected to MongoDB');

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries()

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');

  // Close our app, bringing us back to the command line.
  process.exit();
};

const runQueries = async () => {
  console.log('Queries running.')
  // The functions calls to run queries in our db will go here as we write them.
  // await createTodo();
  await readDocuments();
  await readDocument();
  await readDocument2();
};

connect()
/*------------------------------ Query Functions -----------------------------*/
const createTodo = async () => {
  const todoData = {
    text: 'Learn JS',
    isComplete: false,
  };
  const todo = await Todo.create(todoData);
  console.log('new todo:', todo);
}

// reading a document/documents
const readDocuments = async () => {
  // find() - this will retrieve all docs from the collection 
  const todos = await Todo.find({});
  // returns an array of document objects
  console.log('retrieve all', todos);
}

// read one document using the ID
const readDocument = async () => {
  // findById() - it will accept an ObjectId and it will retrieve the doc that matched that identifier
  // this will convert the string into a mongoDB ObjectID
  const todo = await Todo.findById('695e799273f5a89121639ce9')
  // findById returns a document object
  console.log('Retrieve one document', todo);
}

// read one document using another identifier
const readDocument2 = async () => {
  const todo = await Todo.findOne({ text: "Learn CSS" })
  console.log('retrieve css', todo);
}



// first create a schema - instruction manual for our db
// mongoose schema example 

// const todoSchema = new mongoose.Schema({
//   text: String,
//   isComplete: Boolean,
//   isOpen: Boolean,
//   openingDay: Date,
// });

// then we create a model 
// the model is the tool which we use to interact with the db 

