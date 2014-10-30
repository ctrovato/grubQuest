##ASL
##grubQuest
## ------------
####Connecting to Mongo with Node
1. Run command to install Mongo Driver
  *npm install mongodb
2. How to Connect to the database
  * 
  ```javascript
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
    if(!err) {
    	console.log("We are connected.");
    }else{
    	console.log("Connection Failed.");
	}
  });
  ```