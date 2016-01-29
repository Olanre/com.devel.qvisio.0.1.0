/**
 * Code for managing log sources on the client side.
 */

/** 
 * Creates a new device in this simulation. This is not what is called when a simulation is created,
 * that is coming different.
 */
function getAllDevices(device_name){
	
	var endPoint = logSourceGetEndpoints('log_sources');
	if(endPoint !== null){
		var type = 'get';
		//creates the body of the event
		var timestamp = new Date();
		//adds the event to the event queue
		sendAPIRequest(endPoint, type, displayLogSources )
	}
	else{
		console.log("endPoint recieved was null");
	}
}

function getDeviceTypes(device_name){
	
	var endPoint = logSourceGetEndpoints('log_sources_types');
	if(endPoint !== null){
		var type = 'get';
		//creates the body of the event
		var timestamp = new Date();
		//adds the event to the event queue
		sendAPIRequest(endPoint, type, displayLogSources )
	}
	else{
		console.log("endPoint recieved was null");
	}
}

function getDeviceGroups(device_name){
	
	var endPoint = logSourceGetEndpoints('log_sources_groups');
	if(endPoint !== null){
		var type = 'get';
		//creates the body of the event
		var timestamp = new Date();
		//adds the event to the event queue
		sendAPIRequest(endPoint, type, displayLogSources )
	}
	else{
		console.log("endPoint recieved was null");
	}
}

