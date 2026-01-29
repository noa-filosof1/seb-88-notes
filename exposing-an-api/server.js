const express = require('express');
const app = express();

app.use(express.json());

// create a simple calculator API 
// GET - /calculator -- return the current total of the calculator 
// POST - /calculator -- accept a number and an operation to update the total 
// DELETE - /calculator -- reset the calculator (reset total to 0)
// routes

// track the calculator total 
let total = 0;

// exposing the GET route
app.get('/calculator', (req, res) => {
  res.status(200).json({ total });
})

// exposing the POST route
app.post('/calculator', (req, res) => {
  // {
  //   "number": 5,
  //   "operation": "add"
  // }
  // with the total being 0 : 0 + 5 = 5
  // response to be the updated total 
  const number = req.body.number;
  const operation = req.body.operation;

  if (operation === 'add') {
    total += number;
  } else if (operation === 'subtract') {
    total -= number;
  } else if (operation === 'multiply') {
    total *= number;
  } else if (operation === 'divide') {
    total /= number;
  } else {
    return res.status(400).json({ error: 'invalid operations'})
  }

  res.status(200).json({ total });
})

// exposing the DELETE route
// endpoint - /calculator
// request - DELETE it will take no data 
// response - `no content` - find the status code is for no content
// when you make the request, total is to be reset to 0
app.delete('/calculator', (req, res) => {
  total = 0;
  res.status(204).json({});
})

app.listen(3000, () => {
  console.log('server listening on port 3000')
})

// API - Application Programming Interface
// set of rules and definitions - 
// set of data or functionality the can be used when building their own applications 
// Third party APIs
// google maps API 
// Stripe API 


// Internal APIs
// e.g. banks account management system 

// 3 key concepts for building APIs
// endpoints - specific path or route - how it interacts with the outside world 
// requests - HTTP method, data (payload or information sent by the client), URL - baseURL + specific endpoint to specify where the request is sent
// response - what is sent back to the client after processing the request; data (typical comes back in JSON), status code e..g (200, 204, 400) 

