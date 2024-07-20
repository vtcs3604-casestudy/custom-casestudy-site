const multer = require('multer')
const path = require('path');
const fs = require('fs');


// Files config
// ----------------------------------------

const fileDirectory = path.join(__dirname, "../../files");

const allowedTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
}

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const username = req.params.username;
    const userDir = path.join(fileDirectory, username);
    await fs.existsSync(userDir);
    
    cb(null, userDir)
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})


// API Routes
// ----------------------------------------

// routes the file get
const getFile = async (req, res) => {
  const fileName = req.params.fileName;
  const username = req.params.username;
  const filePath = path.join(fileDirectory, username, fileName);
  console.log('Looking for file at:', filePath);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Send the file to the client
    res.sendFile(filePath);
  } else {
    // If the file does not exist, send a 404 response
    res.status(404).json({ message: 'File not found' });
  }
};

// route uploading a new file
const postFile = async (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(201).json({ message: 'File uploaded successfully', filename: req.file.originalname });
  });

}

// delete a file
const deleteFile = async (req, res) => {
  res.json({mssg: 'DELETE file'})
}

module.exports = {
  getFile,
  postFile,
  deleteFile
}