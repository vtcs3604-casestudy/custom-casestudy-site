const express = require('express')
const Profile = require('../models/profileModel')

const router = express.Router()

router.get('/:username', (req, res) => {
  res.json({mssg: 'GET username info'})
})

router.patch('/:username', (req, res) => {
  res.json({mssg: 'UPDATE username info'})
})

router.post('/:username', async (req, res) => {
  const {title, username, documentId, tags} = req.body

  try {
    const profile = await Profile.create({title, username, documentId, tags})
    res.status(200).json(profile)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = router