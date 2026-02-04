// npm
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Import routers
const authRouter = require('./controllers/auth');
const testJwtRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const hootsRouter = require("./controllers/hoots.js");


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use((req, res, next) => {
  console.log("[HIT]", req.method, req.originalUrl);
  next();
});

// Routes
app.use('/auth', authRouter);
app.use('/test-jwt', testJwtRouter);
app.use('/users', usersRouter);
app.use("/hoots", hootsRouter);


// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('The express app is ready!');
});


// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoidGVzdCIsIl9pZCI6IjY5ODIxN2JjN2ZlOTVlMWMyMzUzZjE5YSJ9LCJpYXQiOjE3NzAxMzM0MzZ9.vhPnzIRhDQLWiqUIXFPjHilA5WfE_ftdURik9quWIKc