var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Instructor = require("../models/instructor");
var config = require('../config.js');

//exports.authenticateInstructor = function(req, res) {
//    Instructor.find({
//            email: req.body.email
//        }, function (err, instructor) {
//
//            if (err) res.send(err);
//
//            if (!instructor) {
//                res.json({success: false, message: 'Authentication failed. Instructor not found.'});
//            } else if (instructor) {
//
//                // check if password matches
//                instructor.verifyPassword(req.body.password, function(err, isMatch){
//                    if(err)
//                        res.json({success: false, message: 'Authentication failed. Error:' + err});
//                    if(!isMatch)
//                        res.json({success: false, message: 'Authentication failed. Wrong password.'});
//                    // if user is found and password is right
//                    // create a token
//                    var token = jwt.sign(instructor, config.secret, {
//                        expiresInMinutes: 1440 // expires in 24 hours
//                    });
//
//                    // return the information including token as JSON
//                    res.json({
//                        success: true,
//                        message: 'Enjoy your token!',
//                        token: token
//                    });
//                });
//            }
//
//        }
//    );
//}