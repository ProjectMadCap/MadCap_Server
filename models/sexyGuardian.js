var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');

var SexyGuardianSchema = new mongoose.Schema({
    first: String,
    last: String,
    instructor_id: String,
    email: String,
    password: String
});

SexyGuardianSchema.pre('save', function(done){
    var SexyGuardian = this;
    //break if pass hasnt changed
    if(!SexyGuardian.isModified('password')) return done();
    //Pass Changed
    bcrypt.genSalt(5, function(err, salt){
        if(err) return done(err);
        bcrypt.hash(SexyGuardian.password, salt, function(err, hash){
            if(err) {
                return done(err);
            }
            SexyGuardian.password = hash;
            done();
        });
    });
});

SexyGuardianSchema.methods.verifyPassword = function(password, done){
    console.log("In verify - password: " + password);
    console.log("done: " + done);
    bcrypt.compare(password, this.password, function(err, isMatch){
        console.log("err: " + err);
        console.log("isMatch: " + isMatch);
        if(err) return done(err);
        console.log("no error");
        done(null, isMatch);
    });
};

module.exports = mongoose.model('SexyGuardian', SexyGuardianSchema);