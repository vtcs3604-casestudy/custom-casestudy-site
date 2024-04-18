const express = require('express')
const multer = require('multer')

const router = express.Router()

router.get('/:id', (req, res) => {
  res.json({mssg: 'GET file'})
})

router.patch('/:id', (req, res) => {
  res.json({mssg: 'UPDATE file'})
})

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
    cb(null, "../frontend/public/files")
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.status(200).json({
      message: "File uploaded successfully",
      fileInfo: req.file
    })
  } else {
    res.status(400).json({
      message: "No file uploaded or unsupported file type"
    })
  }
})

router.delete('/:id', (req, res) => {
  res.json({mssg: 'DELETE file'})
})

module.exports = router