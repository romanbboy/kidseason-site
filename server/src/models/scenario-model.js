const {Schema, model} = require('mongoose');

const scenarioSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sign: {
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
  },
  methodical: Boolean
});

module.exports = model('Scenario', scenarioSchema);