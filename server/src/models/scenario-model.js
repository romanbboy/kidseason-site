const {Schema, model} = require('mongoose');

const scenarioSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = model('Scenario', scenarioSchema);