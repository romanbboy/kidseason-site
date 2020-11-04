const {Schema, model} = require('mongoose')

const videoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

module.exports = model('Video', videoSchema);