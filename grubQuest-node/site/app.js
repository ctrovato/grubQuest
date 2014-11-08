var mongojs = require("mongojs"),
	express = require("express"),
	url = require("url"),
	bodyParser = require("body-parser"),
	request = require("request"),
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


//initialize express
var app = express();

//initialize body parser
app.use(bodyParser());

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


// RESULTS PAGE ---------------------------------------------------------------------------------------------------
//CHANGED TO APP.POST in order to recieve the incoming form data
app.post("/results", function (req, res){

	//take routed path
	var path = req.path;

	//set last index
	//which will start at the slash
	var lastIndex = path.lastIndexOf("/");

	//as long as there are slashes in the path name
	//run this
	while(lastIndex > 1){
		//cuts slash off of path
		path = path.substring(0, lastIndex);
		lastIndex = path.lastIndexOf("/");
	};

	//using body-parser
	//get the zip code the user entered
	global.zip = req.body.zip;

	//make new client connection
	var vclient = new locu.VenueClient(key);

	//use locu library method to search for venues
	//makes sure each restaurant has a menu, is a restaurant, and has the zip code
	vclient.search({has_menu: 'True', category: 'restaurant', postal_code: zip}, function(results){

		//global empty array made each time user searches
		global.searchVar = new Array();

		//push results into array
		global.searchVar.push(results);

		// //returns all restaurants
		// console.log("Json: %j", global.searchVar);

		//if path exists
		if(fs.existsSync('views'+path+'.ejs')){
			//render the page
			res.render("results");
			//write the all the data we need to the page
			//which is search results and zipcode for the bread crumbs.
			res.write("Json  ", global.searchVar[0], " ", global.zip);
		}else{
			//otherwise 404
			res.render('404: Page not found');
		}
	});
});

// DETAILS PAGE ---------------------------------------------------------------------------------------------------
app.get("/details/:menuId", function (req, res){
	//for testing
	// console.log(req.path);
	// console.log(req.params.menuId);
	// console.log(path);


	//take routed path
	var path = req.path;

	//set last index
	//which will start at the slash
	var lastIndex = path.lastIndexOf("/");

	//as long as there are slashes in the path name
	//run this
	while(lastIndex > 1){
		//cuts slash off of path
		path = path.substring(0, lastIndex);
		lastIndex = path.lastIndexOf("/");
	};
	

	//if that path exists
	if(fs.existsSync('views'+path+'.ejs')){

		//make request to locu menu search
		request("http://api.locu.com/v1_0/venue/"+req.params.menuId+"/?api_key="+key, function (error, result, body){

			if(!error && result.statusCode == 200){
				//renders menu in terminal
				global.menuResults = JSON.parse(body);
				console.log(global.menuResults.objects[0].name);
			
			}else{
				console.log("shit");

			}
		});

		res.render("details");
		res.write("Json  ", global.menuResults, " ");
	}else{
		//if path does not exist
		res.render('404: Page not found');
	}
	
});

// REGISTER ---------------------------------------------------------------------------------------------------------
app.post('/register', function(req,res){
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