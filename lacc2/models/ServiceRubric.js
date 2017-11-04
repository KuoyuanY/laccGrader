var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
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

var ServiceRubric = mongoose.model('ServiceRubric', serviceSchema);

module.exports = ServiceRubric;


