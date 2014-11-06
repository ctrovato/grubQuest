var mongojs = require("mongojs"),
	express = require("express"),
	engine = require("ejs-locals"),
	fs = require('fs'),
	async = require("async"),
	http = require("http"),
	locu = require('locu'),
	port = 4000;




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
	res.render("index", {"Greeting": "Good morning"});

});

app.get('/:page',function(req, res){
	//GETTING JSON AND PUTTING IT INTO AN ARRAY
	//STILL CANT GET IT TO WRITE TO THE ACTUAL PAGE
	var locu = require('locu');
	var key = '2834e3e19203329d8c2d1d6208afdd0c44fe2ad6';
	var vclient = new locu.VenueClient(key);
	var searchVar = [];
	vclient.search({has_menu: 'True', category: 'restaurant', postal_code: 32792}, function(results){
		searchVar.push(results);
		console.log("Json: %j", searchVar);
	});
	if(fs.existsSync('views/'+req.params.page+'.ejs')){
		res.render(req.params.page, {message: req.params.id, fullUrl : req.protocol + '://' + req.get('host') + req.originalUrl});

	}else{
		res.render('404: Page not found');
	}
});

app.get("/results", function (req, res){
	if(fs.existsSync('views/'+req.params.page+'.ejs')){
		res.render(req.params.page, {message: req.params.id, fullUrl : req.protocol + '://' + req.get('host') + req.originalUrl});
	}else{
		res.render('404: Page not found');
	}
});

// Start the Server
httpServer.listen(port, function() {
	console.log('listening on port '+port);
});