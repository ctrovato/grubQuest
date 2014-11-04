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
	res.render("index", {"Greeting": "Good morning"})
});
app.get('/:page',function(req, res){
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