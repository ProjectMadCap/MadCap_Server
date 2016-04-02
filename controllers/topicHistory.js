var TopicHistory = require("../models/topic_history");

exports.postTopicHistory = function(req, res, done){

	console.log('Adding Behavior History')

	var topicHistory = new TopicHistory({
		student_id: req.body.student_id,
		behavior_id: req.body.behavior_id,
		date: req.body.date,
		rating: req.body.rating,
		description: req.body.description

	});

	topicHistory.save(function(err){
		if(err) res.send(err);

		res.send('TopicHistory added');
	});
};

exports.getTopicHistory = function(req, res){
	TopicHistory.findOne({'_id': req.params._id}, function(err, topicHistory){
		if(err) res.send(err);

		console.log('find TopicHistory ' + req.params._id);
		console.log(JSON.stringify(topicHistory, null, 2));

		res.send(topicHistory);
	});
};