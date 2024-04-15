require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/editProfile')


// express app
// run with nodemon server.js
const app = express()

// Calls for every request
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes (set path at /api)
app.use('/api/editProfile', workoutRoutes)

// listen to requests
app.listen(process.env.PORT, ()=> {
  console.log('Listening on port', process.env.PORT)
})