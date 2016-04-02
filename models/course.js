//Load Packages
var mongoose = require('mongoose');

//Define Schema
var CourseSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,
	instructor_id: Schema.Types.ObjectId,
	grade_level: Number,
	description: String,
	name: String
})

//Export the model=
module.exports = mongoose.model('course', CourseSchema);