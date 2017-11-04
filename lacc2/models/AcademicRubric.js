var mongoose = require('mongoose');

var academicSchema = new mongoose.Schema({
  gpa: {
    type: Number,
    min: 0,
    max: 3,
    required: true
  },
  rank: {
    type: Number,
    min: 0,
    max: 3,
    required: true
  },
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
});

var AcademicRubric = mongoose.model('AcademicRubric', academicSchema);

module.exports = AcademicRubric;


