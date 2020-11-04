const {Schema, model} = require('mongoose')

const documentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true,
    unique: true
  },
  section: {
    type: String,
    required: true
  }
});

module.exports = model('Document', documentSchema);