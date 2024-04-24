const express = require('express')
const {
  createProfile,
  getProfile,
  updateProfile,
  getProfileById
} = require('../controllers/profileController')

const router = express.Router()


router.get('/:username', getProfile)

router.patch('/:username', updateProfile)

router.post('/:username', createProfile)

router.get('/id/:id', getProfileById)

module.exports = router