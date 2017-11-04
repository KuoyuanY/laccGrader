var mongoose = require('mongoose');

var artsSchema = new mongoose.Schema({
  creativity: {
    type: Number,
    min: 0,
    max: 3,
    required: true
  },
  craftsmanship: {
    type: Number,
    min: 0,
    max: 3,
    required: true
  },
  impression: {
    type: Number,
    min: 0,
    max: 3,
    required: true
  },
  composition: {
    type: Number,
    min: 0,
    max: 3,
    required: true
  },
  grades: {
    type: Number,
    min: 0,
    max: 3,
    required: true
  },
  discretionary: {
    type: Number,
    min: 0,
    max: 3,
    required: true
  }
};

var ArtsRubric = mongoose.model('ArtsRubric', artsSchema);

module.exports = ArtsRubric;


