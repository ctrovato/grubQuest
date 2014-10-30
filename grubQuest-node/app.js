var mongojs = require("mongojs");
var express = require("express");
var engine = require("ejs-locals");
var async = require("async");
var http = require("http");

var app = express();

// Create the http Server
var httpServer = http.createServer(app);

// Set View Engine to EJS
app.engine('ejs', engine);

// set template engine to ejs (jade sucks)
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));


app.get("/", function(req, res){
	res.render("index", {"Greeting": "Good morning"})
})


// Start the Server
httpServer.listen(4000, function() {
	console.log('Express server listening on port 4000');
});