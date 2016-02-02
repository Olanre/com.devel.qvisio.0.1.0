function processArielTransitSearch(response, url){
	var search_status = response.status;
	var search_id = response.search_id; 
	var progress = response.progress;
	var endPoint = ArielGetEndpoints('single_search_status', search_id);
	var type = 'get';
	
	
	if(endPoint !== null){
		console.log("Search status is" + search_status);
		if(search_status in Items("WAIT", "EXECUTE", "SORTING")){
			//continue polling
			//setTimeout('pollAriel('  + secs + ')',1000);
			setTimeout( function(){ 
					console.log(endPoint);
				    //when we have gotten all the log sources from the ariel search
					sendAPIRequest(endPoint, type, processArielTransitSearch);
					processed = progress/2;
					console.log("we have processed " + processed);
			}, 200);
			
			//handle transit message here
		}else if(search_status in Items("COMPLETED")){
			var endPoint = ArielGetEndpoints('search_result', search_id);
			processed = progress/2; //would be 100% complete. Processed will be 50% 
			console.log("we have processed " + processed + " Search has completed");
			sendAPIRequest(endPoint, type, processArielResult);
		}else{
			//handle errors here
			alert("Could not contact API query server, please try again later");
			ErrorHandler('409');
		}
	}
	else{
		console.log("endPoint recieved was null");
		ErrorHandler('400');
	}
}

function processArielResult(response, url){
	if(response !== null && Object.keys(response).length > 0){
		console.log( "Log Source Ariel Search returned the list: " + response.events);
		insertEventSearchData( response.events );
	}else{
		console.log("Server Response recieved was null");
		ErrorHandler('409');
	}
}
