const express = require('express')
const multer = require('multer')

const {
  getFile,
  patchFile,
  postFile,
  deleteFile
} = require('../controllers/fileController')

// Incorperate multer for file support
const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../../files")
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

const router = express.Router()

router.get('/:fileName', getFile);

router.patch('/:id', patchFile)

router.post('/upload', upload.single('file'), postFile)

router.delete('/:id', deleteFile)

module.exports = router