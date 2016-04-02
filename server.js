var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var app = express();

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.createConnection(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port);
console.log("Server running at 8080");