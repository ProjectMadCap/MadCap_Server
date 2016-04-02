//Load Models
var Sexy_Guardian = require("../models/sexy_guardian");

//Create endpoint for /api/sexy_guardian for post
exports.postGuardian = function(req, res, done){
	//create new Guardian
	console.log('Trying to add Guardian to database');

	var sexy_guardian = new Sexy_Guardian({
		first: req.body.first,
    	last: req.body.last,
    	instructor_id: req.body.instructor_id,
    	email: req.body.email,
    	password: req.body.password
	});

	//Save guardian
	sexy_guardian.save(function(err){
		if(err){
			console.log('Add Guardian failed');
			res.send(err)
		}
		else{
			console.log('Successful adding of guardian');
			res.send('Guardian added');
		}
	});
};

exports.getGuardian = function(req, res){
	res.send('Authenticated');
};

exports.getGuardianNow = function(req, res){
	Sexy_Guardian.findOne({ 'email' : req.params.email}, function(err, sexy_guardian){
		if(err) res.send(err);

		console.log("Finding Guardian " + req.params.email);
		console.log(JSON.stringify(sexy_guardian, null, 2));

		//success
		res.json(sexy_guardian);

	});
};