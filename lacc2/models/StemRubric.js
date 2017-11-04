var mongoose = require('mongoose');

var stemSchema = new mongoose.Schema({
  apclasses: {
    type: Number,
    min: 0,
    max: 3,
    required: true
  },
  honorsclasses: {
    type: Number,
    min: 0,
    max: 3,
    required: true
  },
  apgrades: {
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

var StemRubric = mongoose.model('StemRubric', stemSchema);

module.exports = StemRubric


