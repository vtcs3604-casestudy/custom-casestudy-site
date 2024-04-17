const express = require('express')
const {
  createProfile,
  getProfile,
  updateProfile
} = require('../controllers/profileController')

const router = express.Router()


router.get('/:username', getProfile)

router.patch('/:username', updateProfile)

router.post('/:username', createProfile)

module.exports = router