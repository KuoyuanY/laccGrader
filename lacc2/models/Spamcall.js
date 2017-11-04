var mongoose = require('mongoose');

var spamcallSchema = new mongoose.Schema({
	phonenum: {
		type: String,
		maxlength: 10,
		minlength: 10,
		required: true
	},
	calltype: [String],
	callcontent: [String],
	reports: {
		type: Number,
		min: 1,
		required: true
	},
	howtounsub: [String]
});

var Spamcall = mongoose.model('Spamcall', spamcallSchema);

module.exports = Spamcall;