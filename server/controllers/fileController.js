const multer = require('multer')
const path = require('path');
const fs = require('fs');


// API Routes
// ----------------------------------------

// routes the file get
const getFile = async (req, res) => {
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
};

// routes the update file option
const patchFile = async (req, res) => {
  res.json({mssg: 'UPDATE file'})
}

// route uploading a new file
const postFile = async (req, res) => {
  console.log("Here")
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
}

// delete a file
const deleteFile = async (req, res) => {
  res.json({mssg: 'DELETE file'})
}

module.exports = {
  getFile,
  patchFile,
  postFile,
  deleteFile
}