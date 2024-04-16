const Profile = require('../models/profileModel')

// Get username info
const getProfile = async (req, res) => {
  const {username} = req.params

  const profile = await Profile.findOne({ username: username })

  if (!profile) {
    return res.status(404).json({error: 'No such profile'})
  }

  res.status(200).json(profile)
}

// Update profile

// Create profile
const createProfile = async (req, res) => {
  const {title, username, documentId, tags} = req.body

  // Add profile to db
  try {
    const profile = await Profile.create({title, username, documentId, tags})
    res.status(200).json(profile)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Export functions
module.exports = {
  createProfile,
  getProfile
}