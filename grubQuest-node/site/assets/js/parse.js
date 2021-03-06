var my_api_key = '2834e3e19203329d8c2d1d6208afdd0c44fe2ad6'; // swap this out for your own
var menu_client = new locu.MenuItemClient(my_api_key);

	//get zipcode the user entered
	var zipcode = '';

	// Conditional statement to check if user entered an integer or not
	if (isNaN(zipcode)) {

		//tell them they messed up if they entered a string
		console.log("The location you entered is invalid. Enter a valid zipcode and try again.");
	}else {

		//url for the API stored in a variable
		apiURL = 'http://api.locu.com/v1_0/venue/search/?postal_code=' + zipcode + '&category=restaurant&has_menu=true&api_key=2834e3e19203329d8c2d1d6208afdd0c44fe2ad6';


		// make the request to the api
		request(apiURL, function (response, body) {

			// This conditional makes sure the connection goes through successfully
			if (!error && response.statusCode < 300){

				// Parse the incoming json
				var json = JSON.parse(body);

				//if there is no errors in retrieving location
				if(json.object.length != 0){

					//spit back out the information to the user
					console.log(json.objects[0] + "<br> Street Address: " + json.objects.street_address[0] + ". Located in " + json.objects[0].locality + " " + json.objects[0].postal_code + "<br>" +
						"\nCall: " + json.objects[0].phone + "<br>" + json.objects[0].website_url + "<br>" +);

				//if there is an error
				}else{
					console.log("Error");
				}
			}else{
				//If the API actually never responds whatsoever
				console.log("It appears the API is down. Please try again later.");
			}

		});
	}
}