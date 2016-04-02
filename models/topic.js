//Load Packages
var mongoose = require('mongoose');

//Define Schema
var TopicSchema = new mongoose.Schema({

	_id: Schema.Types.ObjectId,
	subject_id: Schema.Types.ObjectId,
	description: String,
	name: String
	//TODO resources

})

//Export the model=
module.exports = mongoose.model('topic', TopicSchema);