var mongoose = require('mongoose');

var athleticSchema = new mongoose.Schema({
  numteams: {
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
  awards: {
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
});

var AthleticRubric = mongoose.model('AthleticRubric', athleticSchema);

module.exports = AthleticRubric;


