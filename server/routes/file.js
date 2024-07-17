const express = require('express')
const multer = require('multer')
const path = require('path');
const fs = require('fs');

const router = express.Router()

router.get('/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../../files/", fileName);
  console.log('Looking for file at:', filePath);
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Send the file to the client
    res.sendFile(filePath);
  } else {
    // If the file does not exist, send a 404 response
    res.status(404).json({ message: 'File not found' });
  }
});

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