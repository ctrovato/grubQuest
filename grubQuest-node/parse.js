
var request = require('request');

// Function to parse Venue json
function getVenue(msg){

	//get zipcode the user entered
	var zipcode = msg.match[1];

	// Conditional statement to check if user entered an integer or not
	if (isNaN(zipcode)) {

		//tell them they messed up if they entered a string
		msg.send("The location you entered is invalid. Enter a valid zipcode and try again.");

	}else {

		//url for the API stored in a variable
		apiURL = 'http://api.locu.com/v1_0/venue/search/?postal_code='+zipcode+'&has_menu=true&api_key=2834e3e19203329d8c2d1d6208afdd0c44fe2ad6';


		// make the request to the api
		request(apiURL, function (error, meta, body) {

				// This conditional makes sure the connection goes through successfully
				if (!error && meta.statusCode < 300){

					// Parse the incoming json
					var json = JSON.parse(meta.body);

					//if there is no errors in retrieving location
					if(!json.object!=[]){ç

						//spit back out the information to the user
						msg.send(json.objects[0] + "<br>" + json.objects.street_address + " " + json.objects[0].locality + " " + json.objects[0].postal_code + "<br>" +
						json.objects[0].website_url + "<br>" + "\nCall: " + json.objects[0].phone + "<br>");

					//if there is an error
					}else{
						//display that specific error message from the json
						var error = json.meta.error.description;
						//spit back out the error to the user
						msg.send(error);
					}
				}else{
					//If the API actually never responds whatsoever
					msg.send("It appears the API is down. Please try again later.");
				}

		});
	}
}





