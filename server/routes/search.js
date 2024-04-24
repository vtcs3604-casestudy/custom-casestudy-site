const express = require('express')
const {
  getIDsFromTitle,
  getIDsFromTag,
  getListOfTags,
  getListOfIDs
} = require('../controllers/searchController')

const router = express.Router()

router.get('/title/:searchString', getIDsFromTitle)

router.get('/tag/:tag', getIDsFromTag)

router.get('/tags', getListOfTags)

router.get('/all', getListOfIDs)

module.exports = router