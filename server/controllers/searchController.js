const Profile = require('../models/profileModel')

// Get list of ids from title
const getIDsFromTitle = async (req, res) => {
  const {searchString} = req.params

  const ids = await Profile.find(
    { title: 
      { $regex: searchString, $options: 'i' }
    },
    {_id: 1})
  
  res.status(200).json(ids)
}

// Get list of ids from tag
const getIDsFromTag = async (req, res) => {
  const {tag} = req.params

  const ids = await Profile.find({tags: tag}, {_id: 1})

  res.status(200).json(ids)
}

const getListOfTags = async (req, res) => {
  const tags = await Profile.distinct('tags');
  res.status(200).json(tags)
}

const getListOfIDs = async (req, res) => {
  const ids = await Profile.distinct('_id');
  res.status(200).json(ids)
}

module.exports = {
  getIDsFromTitle,
  getIDsFromTag,
  getListOfTags,
  getListOfIDs
}