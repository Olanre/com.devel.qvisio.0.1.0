/**
 * Code for managing log sources on the client side.
 */

/** 
 * Creates a new device in this simulation. This is not what is called when a simulation is created,
 * that is coming different.
 */
function getAllDevices(filter, limit){
	var type = 'get';
	//var log_source_string = eventStorage["LogSources"].toString();
	//var filter = "?filter=id%20in%20(" + log_source_string + ")";
	var endPoint = logSourceGetEndpoints('log_sources', filter );
	
	console.log(endPoint);
	if(endPoint !== null){
		sendAPIRequest(endPoint, type, processLogSources, limit );
	}
	else{
		console.log("endPoint recieved was null");
	}
}

function getDeviceTypes(limit){
	var type = 'get';
	var endPoint = logSourceGetEndpoints('log_sources_types');
	
	console.log(endPoint);
	if(endPoint !== null){
		sendAPIRequest(endPoint, type, processLogSourceTypes, limit);
	}
	else{
		console.log("endPoint recieved was null");
	}
}

function getDeviceGroups(limit){
	var type = 'get';
	var endPoint = logSourceGetEndpoints('log_sources_groups');
	
	console.log(endPoint);
	if(endPoint !== null){
		sendAPIRequest(endPoint, type, processLogSourceGroups, limit);
	}
	else{
		console.log("endPoint recieved was null");
	}
}

function getLogSource_by_Query(filter, where){
	where =  where || '';
	var query = "select logsourceid, count(*) as 'count', LogSourceName(logSourceId) as 'logsourcename' from events" + where +
	" group by logsourceid order by 'count' desc LIMIT 100" + filter;
	var endPoint = ArielPostEndpoints('search')+query;
	var type = 'post';
	
	console.log(endPoint);
	if(endPoint != null){
		sendAPIRequest(endPoint, type,  processArielTransitSearch );
	}

}

function processLogSources( response, url){
	if(response !== null){
		console.log( "Log Source API returned the list: ");
		insertLogSourceData( response );
	}
	
}

function processLogSourceGroups( response, url){
	if(response !== null){
		console.log( "Log Source Groups API returned the list: ");
		insertLogSourceGroupData( response );
	}
	
}

function processLogSourceTypes( response, url){
	if(response !== null){
		console.log( "Log Source Groups API returned the list: ");
		insertLogSourceTypeData( response );
	}
	
}


