var CourseHistory = require("../models/course_history");

exports.postCourseHistory = function(req, res, done){
	console.log('Add Course History');

	var courseHistory = new CourseHistory({

		student_id: req.body.student_id,
		course_id: req.body.course_id,
		quarter: req.body.quarter
	});

	courseHistory.save(function(err){
		if(err) res.send(err);

		res.send("Course History added");
	});
};

exports.getCourseHistory = function(req, res){
	CourseHistory.findOne({'_id' : req.params._id}, function(err, courseHistory){
		if(err) res.send(err);

		console.log("Finding course: " + req.params._id);
		console.log(JSON.stringify(courseHistory, null, 2));

		//success
		res.json(courseHistory);
	})
}