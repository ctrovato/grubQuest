##ASL
##grubQuest
## ------------
####Connecting to Mongo with Node
1. Run command to install Mongo Driver
  *npm install mongodb
2. Once spun up , SSH into server(s) via terminal.
  * 
  ```javascript
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
    if(!err) {
      console.log("We are connected");
    }
  });
  ```