//Load Packages
var mongoose = require('mongoose');

//Define Schema
var Course_HistorySchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,
	student_id: Schema.Types.ObjectId,
	course_id: Schema.Types.ObjectId,
	quarter: String

})

//Export the model=
module.exports = mongoose.model('course_history' Course_HistorySchema);