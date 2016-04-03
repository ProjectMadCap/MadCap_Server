var CourseHistory = require("../models/courseHistory");

exports.postCourseHistory = function(req, res, done){

    console.log('Adding Course History')

    var courseHistory = new CourseHistory({
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        date: req.body.date,
        rating: req.body.rating,
        description: req.body.description

    });

    courseHistory.save(function(err){
        if(err) res.send(err);

        res.send('courseHistory added');
    });
};

exports.getCourseHistory = function(req, res){
    CourseHistory.findOne({'student_id': req.params.student_id}, function(err, courseHistory){
        if(err) res.send(err);

        console.log('find courseHistory ' + req.params.student_id);
        console.log(JSON.stringify(courseHistory, null, 2));

        res.send(courseHistory);
    });
};