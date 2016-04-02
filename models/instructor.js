//Load Packages
var mongoose = require('mongoose');

//Define Schema
var InstructorSchema = new mongoose.Schema({

	first: String,
	last: String,
	email: String,
	password: String,
	bio: String
});

//Export the model=
module.exports = mongoose.model('Instructor', InstructorSchema);