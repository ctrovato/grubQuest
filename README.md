##ASL
##grubQuest
## ------------
####Connecting to Mongo with Node
1. Run command to install Mongo Driver
  * npm install mongodb
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
3.	Creating Collections
	* 
	```javascript
		//The '{strict:true}' makes sure collection doesn't already exist. If it already exists it will return with an error.
		db.collection('test', {strict:true}, function(err, collection) {});

	```
4.	Storing info in variables
	*
	```javascript
		//Storing collection
		var collection = db.collection('test');

	```