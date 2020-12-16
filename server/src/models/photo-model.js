const {Schema, model} = require('mongoose')

const photoSchema = new Schema({
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

module.exports = model('Photo', photoSchema);