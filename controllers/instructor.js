//Load Models
var Instructor = require("../models/instructor");

//Create endpoint for /api/user for Post

exports.postInstructor = function(req, res, done){

	//create new Instructor instance
	console.log('Trying to add Instructor to database');

	var instructor = new Instructor({
		first: req.body.first,
		last: req.body.last,
		email: req.body.email,
		password: req.body.password
	});

	//Save Instructor
	instructor.save(function(err){
		if(err){
			console.log('Add instructor failed, Email Taken');
			res.send('Email Taken');
		}
		else{
			console.log('Sucess! Instructor added');
			res.send('Thanks for Registering');
		}
	});
};

exports.getInstructor = function(req, res){
	res.send('Authenticated');
};