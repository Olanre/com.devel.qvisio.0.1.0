/**
 * Code for managing log sources on the client side.
 */

/** 
 * Creates a new device in this simulation. This is not what is called when a simulation is created,
 * that is coming different.
 */
function getAllDevices(filter, limit){
	var type = 'get';
	var endPoint = logSourceGetEndpoints('log_sources', filter );
	
	console.log(endPoint);
	if(endPoint !== null && endPoint !== undefined){
		sendAPIRequest(endPoint, type, processLogSources, limit );
	}
	else{
		ErrorHandler('400');
		console.log("endPoint recieved was null");
	}
}

function getDeviceTypes(filter, limit){
	var type = 'get';
	var endPoint = logSourceGetEndpoints('log_source_types', filter);
	
	console.log(endPoint);
	if(endPoint !== null && endPoint !== undefined){
		sendAPIRequest(endPoint, type, processLogSourceTypes, limit);
	}
	else{
		ErrorHandler('400');
		console.log("endPoint recieved was null");
	}
}

function getDeviceGroups(filter, limit){
	var type = 'get';
	var endPoint = logSourceGetEndpoints('log_sources_groups',  filter);
	
	console.log(endPoint);
	if(endPoint !== null && endPoint !== undefined){
		sendAPIRequest(endPoint, type, processLogSourceGroups, limit);
	}
	else{
		ErrorHandler('400');
		console.log("endPoint recieved was null");
	}
}

function getLogSource_by_Query(filter, where){
	where =  where || '';
	var query = "select logsourceid, count(*) as 'count', LogSourceName(logSourceId) as 'logsourcename' from events" + where +
	" group by logsourceid order by 'count' desc LIMIT 100 " + filter;
	var endPoint = ArielPostEndpoints('search')+query;
	var type = 'post';
	
	console.log(endPoint);
	if(endPoint != null){
		sendAPIRequest(endPoint, type,  processArielTransitSearch );
	}else{
		ErrorHandler('400');
		console.log("endPoint recieved was null");
	}

}

function processLogSources( response, url){
	
	if(response !== null && response.length > 0 ){
		console.log( "Log Source API returned the list: ");
		console.log(response);
		insertLogSourceData( response );
	}else{
		console.log("Server Response recieved was null");
		ErrorHandler('500');
	}
	
}

function processLogSourceGroups( response, url){
	if(response !== null && response.length > 0 ){
		console.log( "Log Source Groups API returned the list: ");
		console.log(response);
		insertLogSourceGroupData( response );
	}else{
		console.log("Server Response recieved was null");
		ErrorHandler('409');
	}
	
}

function processLogSourceTypes( response, url){
	if(response !== null && response.length > 0){
		console.log( "Log Source Groups API returned the list: ");
		console.log(response);
		insertLogSourceTypeData( response );
	}else{
		console.log("Server Response recieved was null");
		ErrorHandler('409');
	}
	
}


