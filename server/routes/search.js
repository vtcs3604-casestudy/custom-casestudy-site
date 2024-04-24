const express = require('express')
const {
  getIDsFromTitle,
  getIDsFromTag,
  getListOfTags
} = require('../controllers/searchController')

const router = express.Router()

router.get('/title/:searchString', getIDsFromTitle)

router.get('/tag/:tag', getIDsFromTag)

router.get('/tags', getListOfTags)

module.exports = router