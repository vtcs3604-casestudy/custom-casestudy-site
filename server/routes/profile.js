const express = require('express')
const {
  createProfile,
  getProfile
} = require('../controllers/profileController')

const router = express.Router()


router.get('/:username', getProfile)

router.patch('/:username', (req, res) => {
  res.json({mssg: 'UPDATE username info'})
})

router.post('/:username', createProfile)

module.exports = router