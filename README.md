##ASL
##grubQuest
## ------------
####Connecting to Mongo with Node
1. Run command to install Mongo Driver if you don't have it
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
4.	Storing info into variables
	*
	```javascript

		//Storing collection
		var collection = db.collection('test');

	```


####Parsing Incoming Json using Node
1. Store request into a variable
	* 
	```javascript
		var request = require('request');
	```
2. Make the Request
	*
	```javascript
		//url for the API stored in a variable
		apiURL = 'http://api.wunderground.com/api/00bacbd3046f5248/conditions/q/'+zipcode+'.json';

		// make the request to the api
		request(apiURL, function (error, response, body) {

		});
	```
3. Parse Incoming Json (do this inside the request function)
	*
	```javascript

		// Parse the incoming json
		var json = JSON.parse(body);

	```
4. Spit back out the info needed
	*
	```javascript

		//if there is no errors in retrieving the data
			if(!json.response.error){
				//spit back out the information to the user
				msg.send(json.current_observation.display_location.city + ", " + json.current_observation.display_location.state_name + " on " + json.current_observation.local_time_rfc822 +
				"\nTemperature: " + json.current_observation.temp_f + " degrees Fahrenheit.\nFeels like: " +
				json.current_observation.feelslike_f + " degrees Fahrenheit.");

		//if there is an error
			}else{
				//display that specific error message from the json
				var error = json.response.error.description;
			}

	```