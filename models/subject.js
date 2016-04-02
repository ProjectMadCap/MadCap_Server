//Load Packages
var mongoose = require('mongoose');

//Define Schema
var SubjectSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,
	description: String,
	name: String
})

//Export the model=
module.exports = mongoose.model('subject', SubjectSchema);