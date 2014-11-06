var mongojs = require("mongojs"),
	express = require("express"),
	url = require("url"),
	// bodyParser = require('body-parser'),
	// cookieParser = require('cookie-parser'),
	// session = require('express-session'),
	engine = require("ejs-locals"),
	fs = require("fs"),
	async = require("async"),
	http = require("http"),
	locu = require("locu"),			//locu lib
	key = "2834e3e19203329d8c2d1d6208afdd0c44fe2ad6",	//API key
	port = 4000;	//port number


// var MongoStore = require('connect-mongo')(session);
// 	sessionStore = MongoStore({
// 			'db':'mongosession',
// 			'auto_reconnect': true
// 		}), // Mongo connection
// 	collections = ["users"],
// 	db = require("mongojs").connect("mongodb://localhost:27017/users", collections);



//initlaize express
var app = express();

// Create the http Server
var httpServer = http.createServer(app);

// Set View Engine to EJS
app.engine('ejs', engine);

// set template engine to ejs
app.set('view engine', 'ejs');
app.use('/views', express.static('/views'));
app.use('/assets', express.static(__dirname + '/assets'));


// http variables
// app.use(express.cookieParser('grubQuest'));
// app.use(express.bodyParser());
// app.use(express.session({
// 	'secret': 'grubQuest',
// 	'store': sessionStore
// }));

// INDEX ROUTE -----------------------------------------------------------------------------------------------------
app.get("/", function(req, res){
	res.render("index", {"Greeting": "Good morning"});
});

// NAVIGATE TO ANY PAGE OTHER THAN INDEX ----------------------------------------------------------------------------
app.get('/:page',function(req, res){
	//GETTING JSON AND PUTTING IT INTO AN ARRAY
	//STILL CANT GET IT TO WRITE TO THE ACTUAL PAGE
	//new client
	//initialize with locu method
	var vclient = new locu.VenueClient(key);

	vclient.search({has_menu: 'True', category: 'restaurant', postal_code: 32792}, function(results){

		//search result objects stored in array
		global.searchVar = new Array();

		global.searchVar.push(results);

		//returns "Subway"
		console.log("Json: %j", global.searchVar[0].objects[0].name);
		//returns all restaurants
		console.log("Json: %j", global.searchVar);


		if(fs.existsSync('views/'+req.params.page+'.ejs')){
			//Using Global Variables returns this
			//Cannot read property '0' of undefined

			res.render(req.params.page, {message: req.params.id});
			res.write("Json  ", global.searchVar[0], " ");
	}else{
		res.render('404: Page not found');
	}
	});

});



// RESULTS PAGE ---------------------------------------------------------------------------------------------------
app.get("/results", function (req, res){
	if(fs.existsSync('views/'+req.params.page+'.ejs')){

		res.render(req.params.page, {message: req.params.id, fullUrl : req.protocol + '://' + req.get('host') + req.originalUrl});


	}else{
		res.render('404: Page not found');
	}
});


// DETAILS PAGE ---------------------------------------------------------------------------------------------------
app.get("/details/:name/:menuId", function (req, res){
	if(fs.existsSync('views/'+req.params.page+'.ejs')){

		// console.log(url.parse("http://localhost:4000/details/?name=Subway&menuId=0898c257b1d80a428a3b",true).pathname);


		res.render(req.params.page, {message: req.params.id});


	}else{
		res.render('404: Page not found');
	}
});


// REGISTER ---------------------------------------------------------------------------------------------------------
app.post('/register', function(reg,res){
	var hashed = sha224("grubQuest"+req.body.register[0].username+req.body.register[0].password);
	db.users.insert({
		_id:uId.v4(),
		type:'user',
		firstname:req.body.register[0].fname,
		lastname:req.body.register[0].lname,
		username:req.body.register[0].username,
		password:hashed,
		active:true
	});

	db.users.findOne({username:req.body.register[0].username, password:hashed}, function(err, success){
		if(success){
			res.redirect('/dash');
		}else{
			res.redirect('/');
		}
	});
});


// LOGIN --------------------------------------------------------------------------------------------------------------
app.post('/login', function(req,res){
	var hashed = sha224("grubQuest"+req.body.users.username+req.body.users.password);
	db.users.findOne({username:req.body.users.username, password:hashed}, function(err, success){
		if(success){
			res.redirect('/dash');
			console.log("Success!");
		}else{
			console.log('Wrong username or password');
			console.log(err);
			res.redirect('/');
		}
	});
});

// START THE SERVER ---------------------------------------------------------------------------------------------------
httpServer.listen(port, function() {
	console.log('listening on port '+port);
});