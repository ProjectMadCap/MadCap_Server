var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('./config'); // get our config file
var Instructor = require('./models/instructor');
var app = express();

//Add Controllers
var InstructorController = require('./controllers/instructor');
var AuthController = require('./controllers/auth');
var CourseController = require('./controllers/course');
var SexyGuardianController = require('./controllers/sexyGuardian');
var StudentController = require('./controllers/student');
var BehaviorController = require('./controllers/behavior');
var BehaviorHistoryController = require('./controllers/behavior_history');
var CourseHistoryController = require('./controllers/courseHistory');
var SubjectController = require('./controllers/subject');
var TopicController = require('./controllers/topic');
var TopicHistoryController = require('./controllers/topicHistory');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 80; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable


app.set('view engine', 'ejs');

// use body parser so we can get info from POST and/or URL parameters
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({secret: 'secretSecrets'}));

// use morgan to log requests to the console
app.use(morgan('dev'));

// Use express static for images, css, and js files
app.use('/static', express.static('public'));

// login page 
app.get('/login', function(req, res) {
    res.render('pages/login');
});

// register page 
app.get('/register', function(req, res) {
    res.render('pages/register');
});

// register page 
app.get('/home', function(req, res) {
    res.render('pages/home');
});

// classes page 
app.get('/classes', function(req, res) {
    res.render('pages/classes');
});

// classForm page
app.get('/classForm', function(req, res) {
    res.render('pages/classForm');
});

var apiRouter = express.Router();

//Endpoint for api/Instructor
apiRouter.route('/instructor/')
	.post(InstructorController.postInstructor)
	.get(InstructorController.getInstructor); //TODO: add authentication

apiRouter.route('/instructor/:email')
    .post(InstructorController.getInstructor);

//----------------------------------------------------------------------------

apiRouter.route('/course')
	.post(CourseController.postCourse);

apiRouter.route('/course/:_id')
	.get(CourseController.getCourse);

//----------------------------------------------------------------------------

apiRouter.route('/sexyGuardian')
	.post(SexyGuardianController.postGuardian)
	.get(SexyGuardianController.getGuardian); //TODO: add authentication

apiRouter.route('/sexyGuardian/:email')
	.get(SexyGuardianController.getGuardianNow);

apiRouter.route('/student')
    .post(StudentController.postStudent)
    .get(StudentController.getStudent);

//----------------------------------------------------------------------------
apiRouter.route('/behavior')
	.post(BehaviorController.postBehavior);

apiRouter.route('/behavior/:_id')
	.get(BehaviorController.getBehavior);
//----------------------------------------------------------------------------

apiRouter.route('/behavior_history')
	.post(BehaviorHistoryController.postBehaviorHistory);

apiRouter.route('/behavior_history/{_id}')
	.get(BehaviorHistoryController.getBehaviorHistory);
//----------------------------------------------------------------------------

apiRouter.route('/courseHistory')
	.post(CourseHistoryController.postCourseHistory);

apiRouter.route('/courseHistory/:id')
	.get(CourseHistoryController.getCourseHistory);

//----------------------------------------------------------------------------

apiRouter.route('/subject')
	.post(SubjectController.postSubject);

apiRouter.route('/subject/:_id')
	.get(SubjectController.getSubject);

//----------------------------------------------------------------------------

apiRouter.route('/topic')
	.post(TopicController.postTopic);

apiRouter.route('/topic/:_id')
	.get(TopicController.getTopic);

//----------------------------------------------------------------------------

apiRouter.route('/topicHistory')
	.post(TopicHistoryController.postTopicHistory);

apiRouter.route('/topicHistory/:id')
	.get(TopicHistoryController.getTopicHistory);

//----------------------------------------------------------------------------

app.route('/authenticate')
    .post(AuthController.authenticateInstructor);

app.post('/authenticate/device', AuthController.authenticateParent);

apiRouter.use(function(req, res, next) {
    AuthController.authentication(req, res, next);
});

app.use('/api', apiRouter);

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.listen(port);
console.log("Server running at " + port);