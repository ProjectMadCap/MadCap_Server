//Load Packages
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Define Schema
var InstructorSchema = new mongoose.Schema({

	first: String,
	last: String,
	email: String,
	password: String,
	bio: String
});

InstructorSchema.pre('save', function(done){
	var Instructor = this;
	console.log("Nick's shitty ass code");
	//break if pass hasnt changed
	if(!Instructor.isModified('password')) return done();
	console.log('password not modified');
	//Pass Changed
	bcrypt.genSalt(5, function(err, salt){
		if(err) return done(err);
		console.log('hash this biaaatch');
		bcrypt.hash(Instructor.password, salt, null, function(err, hash){
			if(err) return done(err);
			console.log('ooOOOoooo you hash nasty');
			Instructor.password = hash;
			console.log('calling done');
			done();
		});
	});
});

InstructorSchema.methods.verifyPassword = function(password, done){
	bcrypt.compare(password, this.password, function(err, isMatch){
		if(err) return done(err);
		done(null, isMatch);
	});
};

//Export the model=
module.exports = mongoose.model('Instructor', InstructorSchema);