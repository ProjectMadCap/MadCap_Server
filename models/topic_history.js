//Load Packages
var mongoose = require('mongoose');

//Define Schema
var Topic_HistorySchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,
	student_id: Schema.Types.ObjectId,
	topic_id: Schema.Types.ObjectId,
	date: Date,
	rating: Number

})

//Export the model=
module.exports = mongoose.model('topic_history' Topic_HistorySchema);