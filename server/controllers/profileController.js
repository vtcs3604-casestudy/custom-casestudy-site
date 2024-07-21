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

// Get profile but by id
const getProfileById = async (req, res) => {
  const {id} = req.params

  const profile = await Profile.findOne({_id: id})

  if (!profile) {
    return res.status(400).json({error: 'No such profile'})
  }

  res.status(200).json(profile)
}

// Update profile
const updateProfile = async (req, res) => {
  const { username } = req.params
  
  const profile = await Profile.findOneAndUpdate({username: username}, {
    ...req.body
  })

  if (!profile) {
    return res.status(400).json({error: 'No such profile'})
  }

  res.status(200).json(profile)
}

// Create profile
const createProfile = async (req, res) => {
  const {title, username, documents, tags} = req.body

  // Add profile to db
  try {
    const profile = await Profile.create({title, username, documents, tags})
    res.status(200).json(profile)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Add tag
const addTag = async (req, res) => {
  const { username, tag } = req.params
  try {
    const profile = await Profile.updateOne({username: username}, { $push: {tags: tag}})
    res.status(200).json({ message: 'Tag Added'})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Remove tag
const removeTag = async (req, res) => {
  const { username, tag } = req.params
  try {
    const profile = await Profile.updateOne({username: username}, { $pull: {tags: tag}})
    res.status(202).json({ message: 'Tag Deleted'})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const updateTitle = async (req, res) => {
  const { username, title } = req.params
  try {
    const profile = await Profile.updateOne({username: username}, {title: title})
    res.status(200).json({ message: 'Title changed' })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Export functions
module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  getProfileById,
  addTag,
  removeTag,
  updateTitle
}