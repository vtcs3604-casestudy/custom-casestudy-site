require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// Routes import
const profileRoutes = require('./routes/profile')
const searchRoutes = require('./routes/search')
const fileRoutes = require('./routes/file')

// express app
const app = express()

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// *****************************************************************************
// START OF ROUTES
// *****************************************************************************

// Test route
app.get('/test', (req, res) => {
  res.json({mssg: 'Welcome to the app'})
})

// Routes for search results
app.use('/api/search', searchRoutes)

// Routes for profile edits
app.use('/api/profile', profileRoutes)

// Routes for file access
app.use('/files', fileRoutes)

// *****************************************************************************
// END OF ROUTES
// *****************************************************************************

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