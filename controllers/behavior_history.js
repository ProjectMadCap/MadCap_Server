var Behavior_History = require("../models/behavior_history");

exports.postBehaviorHistory = function(req, res, done){

	console.log('Adding Behavior History')

	var behavior_history = new Behavior_History({
		student_id: req.body.student_id,
		behavior_id: req.body.behavior_id,
		date: req.body.date,
		rating: req.body.rating,
		description: req.body.description

	});

	behavior_history.save(function(err){
		if(err) res.send(err);

		res.send('behavior_history added');
	});
};

exports.getBehaviorHistory = function(req, res){
	Behavior_History.findOne({'_id': req.params._id}, function(err, behavior_history){
		if(err) res.send(err);

		console.log('find behavior_history ' + req.params._id);
		console.log(JSON.stringify(behavior_history, null, 2));

		res.send(behavior_history);
	});
};