var mongojs = require("mongojs");
var express = require("express");
var engine = require("ejs-locals");
var fs = require('fs');
var async = require("async");
var http = require("http");
var locu = require('locu');


var app = express();

// Create the http Server
var httpServer = http.createServer(app);

// Set View Engine to EJS
app.engine('ejs', engine);

// set template engine to ejs (jade sucks)
app.set('view engine', 'ejs');
app.use('/views', express.static('/views'));
app.use('/assets', express.static(__dirname + '/assets'));


app.get("/", function(req, res){
	res.render("index", {"Greeting": "Good morning"})
});
app.get('/:page',function(req, res){
	if(fs.existsSync('views/'+req.params.page+'.ejs')){
		res.render(req.params.page, {message: req.params.id, fullUrl : req.protocol + '://' + req.get('host') + req.originalUrl});
	}else if(req.params.page === "sitemap.xml"){
		sitemap.toXML( function (xml) {
			res.header('Content-Type', 'application/xml');
			res.send( xml );
		});
	}else{
		res.render('404');
	}
});


// Start the Server
httpServer.listen(4000, function() {
	console.log('listening on port 4000');
});