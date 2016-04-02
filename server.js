var express = require('express');
var app = require('express')();
var server = require('http').Server(app);

server.listen(8080);
console.log("Server running at 8080");