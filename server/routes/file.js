const express = require('express')
const multer = require('multer')

const {
  getFile,
  postFile,
  deleteFile
} = require('../controllers/fileController')

const router = express.Router()

router.get('/:username/:fileName', getFile);

router.post('/upload/:username', postFile)

router.delete('/:username/:fileName', deleteFile)

module.exports = router