const express = require('express')
const {
  createProfile,
  getProfile,
  updateProfile,
  getProfileById,
  addTag,
  removeTag,
  updateTitle
} = require('../controllers/profileController')

const router = express.Router()

router.get('/:username', getProfile)

router.patch('/:username', updateProfile)

router.post('/:username', createProfile)

router.get('/id/:id', getProfileById)

router.post('/tag/:username/:tag', addTag)

router.delete('/tag/:username/:tag', removeTag)

router.patch('/title/:username/:title', updateTitle)

module.exports = router