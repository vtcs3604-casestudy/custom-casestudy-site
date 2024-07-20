const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  documents: {
    type: [String],
    required: true
  },
  tags: {
    type: [String],
    required: false
  }
}, {timestamps: true})

module.exports = mongoose.model('Profile', profileSchema)