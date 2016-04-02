var mongoose = require("mongoose");

var SexyGuardianSchema = new mongoose.Schema({
    first: String,
    last: String,
    instructor_id: String,
    email: String,
    password: String
});

module.exports = mongoose.model('SexyGuardian', SexyGuardianSchema);