var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');
var config = require('./config'); // get our config file
var Instructor = require('./models/instructor');
var app = express();

//Add Controllers
var InstructorController = require('./controllers/instructor');
var AuthController = require('./controllers/auth');
var CourseController = require('./controllers/course');
var SexyGuardianController = require('./controllers/sexy_guardian');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable


app.set('view engine', 'ejs');

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.get('/setup', function(req, res) {

    // create a sample user
    var nick = new Instructor();
    nick.first = "Nick";
    nick.last = "March";
    nick.email = "nick@march.com";
    nick.password = "password";
    nick.biography = "I am a super coder monkey";
    console.log(nick);
    // save the sample user
    nick.save(function(err) {
        if (err) {
            console.log("Error creating sample user");
            res.send(err);
        }
        else {
            console.log('Instructor saved successfully');
            res.json({success: true});
        }
    });
});

var apiRouter = express.Router();

//Endpoint for api/Instructor
apiRouter.route('/Instructor')
	.post(InstructorController.postInstructor)
	.get(InstructorController.getInstructor); //TODO: add authentication

apiRouter.route('/Course')
	.post(CourseController.postCourse)
	.get(CourseController.getCourse);

apiRouter.route('/Sexy_Guardian')
	.post(SexyGuardianController.postGuardian)
	.get(SexyGuardianController.getGuardian); //TODO: add authentication


apiRouter.route('Instructor/authenticate')
    .post(AuthController.authenticateInstructor);

app.use('/api', apiRouter);

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.listen(port);
console.log("Server running at 8080");