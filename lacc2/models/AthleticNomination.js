var mongoose = require('mongoose');

var athleticnomSchema = new mongoose.Schema({
  username: {
    type = String,
    required = true
  },
  nominator: {
    type: String,
    max: 100
  },
  nomineefname: {
    type: String,
    max: 50
  },
  nomineelname: {
    type: String,
    max: 50
  },
  school: {
    type: String,
    max: 50,
  },
  email: {
    type: String,
    max:50
  },
  phonenum: {
    type: String,
    min:10,
    max:10
  },
  hispanic: {
    type: Boolean
  },
  hispanicwhy: {
    type: String,
    max: 1000
  },
  numteams: {
    type: Number
  },
  pstatement: {
    Type:String
  },
  resume: {
    Type:String
  },
  transcript: {
    Type:String
  },
  score: {
    type = Number,
    required: true,
    default: -1
  },
  id: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
});

var nomination = mongoose.model('AthleticNomination', athleticnomSchema);

module.exports = nomination;


