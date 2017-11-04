var mongoose = require('mongoose');

var artSchema = new Mongoose.Schema({
    creativity:{
        type: Number,
        min: 0,
        max: 3,
        required: True
    }
    skill:{
        type: Number,
	    min: 0,
        max: 3,
        required: True
    }
    impression:{
        type: Number,
	    min: 0,
        max: 3,
        required: True
    }
    design:{
        type: Number,
	    min: 0,
        max: 3,
        required: True
    }
    numArts: {
        type: Number,
	    min: 0,
        max: 3,
        required: True
    }
    artGrade: {
        type: Number,
	    min: 0,
        max: 3,
        required: True
    }
    discretionary: {
        type: Number,
	    min: 0,
        max: 3,
        required: True
    }
})
