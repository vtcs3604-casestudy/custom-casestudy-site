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
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// *****************************************************************************
// START OF ROUTES
// *****************************************************************************

// Routes for search results
app.use('/api/search', searchRoutes)

// Routes for profile edits
app.use('/api/profile', profileRoutes)

// Routes for file access
app.use('/files', fileRoutes)

// *****************************************************************************
// END OF ROUTES
// *****************************************************************************

// connect to mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })