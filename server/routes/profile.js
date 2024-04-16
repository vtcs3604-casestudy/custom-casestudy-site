const express = require('express')

const router = express.Router()

router.get('/:username', (req, res) => {
  res.json({mssg: 'GET username info'})
})

router.patch('/:username', (req, res) => {
  res.json({mssg: 'UPDATE username info'})
})

router.post('/username', (req, res) => {
  res.json({mssg: 'POST username info'})
})

module.exports = router