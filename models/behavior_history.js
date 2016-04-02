//Load Packages
var mongoose = require('mongoose');

//Define Schema
var Behavior_HistorySchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,
	student_id: Schema.Types.ObjectId,
	behavior_id: Schema.Types.ObjectId,
	date: Date,
	rating: Number,
	description: String

})

//Export the model=
module.exports = mongoose.model('behavior_history' Behavior_HistorySchema);