var express = require("express");
var http = require("http");
var uId = require('node-uuid');
var sha224 = require('js-sha256').sha224;
var engine = require("ejs-locals");
var fs = require('fs');
var async = require("async");
var locu = require('locu');


var collections = ["users"];
var db = require("mongojs").connect("mongodb://localhost:27017/users", collections);


var app = express();
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
		res.render(req.params.page, {message: req.params.id});
	}else{
		res.render('404: Page not found');
	}
});

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






// Start the Server
httpServer.listen(4000, function() {
	console.log('listening on port 4000');
});