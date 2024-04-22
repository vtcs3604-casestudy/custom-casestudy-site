const express = require('express')
const {
  getIDsFromTitle,
  getIDsFromTag
} = require('../controllers/searchController')

const router = express.Router()

router.get('/title/:searchString', getIDsFromTitle)

router.get('/tag/:tag', getIDsFromTag)

module.exports = router