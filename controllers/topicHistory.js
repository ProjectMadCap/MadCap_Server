var TopicHistory = require("../models/topicHistory");

exports.postCourseHistory = function(req, res, done){

    console.log('Adding Course History')

    var topicHistory = new TopicHistory({
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        date: req.body.date,
        rating: req.body.rating,
        description: req.body.description

    });

    topicHistory.save(function(err){
        if(err) res.send(err);

        res.send('topicHistory added');
    });
};

exports.getTopicHistory = function(req, res){
    TopicHistory.findOne({'student_id': req.params.student_id}, function(err, topicHistory){
        if(err) res.send(err);

        console.log('find topicHistory ' + req.params.student_id);
        console.log(JSON.stringify(topicHistory, null, 2));

        res.send(topicHistory);
    });
};