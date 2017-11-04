var mongoose = require('mongoose');

var appSchema = new mongoose.Schema({
    nominator: {
        type: String,
        required: true
    },
    nominee: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

var application = mongoose.model('AcademicRubric', appSchema);

module.exports = application;


