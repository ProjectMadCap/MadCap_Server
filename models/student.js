//Load Packages
var mongoose = require('mongoose');

//Define Schema
var StudentSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,
	first: String,
	last: String,
	sexy_guardian_id: Schema.Types.ObjectId,
	is_student_of_week: Boolean

})

//Export the model=
module.exports = mongoose.model('student' StudentSchema);