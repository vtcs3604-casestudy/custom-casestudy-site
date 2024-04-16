const express = require('express')

const router = express.Router()

router.get('/:id', (req, res) => {
  res.json({mssg: 'GET file'})
})

router.patch('/:id', (req, res) => {
  res.json({mssg: 'UPDATE file'})
})

router.post('/:id', (req, res) => {
  res.json({mssg: 'POST file'})
})

router.delete('/:id', (req, res) => {
  res.json({mssg: 'DELETE file'})
})

module.exports = router