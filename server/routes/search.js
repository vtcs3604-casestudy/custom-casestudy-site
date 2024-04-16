const express = require('express')

const router = express.Router()

router.get('/title/:searchString', (req, res) => {
  res.json({mssg: 'GET title search'})
})

router.get('/tag/:tag', (req, res) => {
  res.json({mssg: 'GET tag search'})
})

module.exports = router