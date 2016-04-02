var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Instructor = require("../models/instructor");
var config = require('../config.js');

exports.authenticateInstructor = function(req, res) {
    Instructor.findOne({
            email: req.body.email
        }, function (err, instructor) {

            if (err) res.send(err);

            if (!instructor) {
                res.json({success: false, message: 'Authentication failed. Instructor not found.'});
            } else if (instructor) {

                // check if password matches
                instructor.verifyPassword(req.body.password, function(err, isMatch){
                    if(err)
                        res.json({success: false, message: 'Authentication failed. Error:' + err});
                    if(!isMatch)
                        res.json({success: false, message: 'Authentication failed. Wrong password.'});
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(instructor, config.secret, {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                });
            }

        }
    );
};
exports.authentication = function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
};