require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
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
//app.use('/api/editProfile', workoutRoutes)

// connect to mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, ()=> {
      console.log('connected to db and listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })