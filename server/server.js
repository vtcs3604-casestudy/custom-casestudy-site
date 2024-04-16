require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/editProfile')

// express app
const app = express()

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.get('/', (req, res) => {
  res.json({mssg: 'Welcome to the app'})
})

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT)
})

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