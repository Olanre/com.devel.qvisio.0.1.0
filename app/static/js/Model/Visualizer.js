var EC_flare;
var Type_flare;
var Group_flare;

function generateEventCollectorJson( pre_flare){
	var flare = { "name": "flare", "children" : [] };
	var keys = Object.keys(pre_flare);
	var key, name, id, logsources;
	var collection;
	if(pre_flare.length < 1){
		ErrorHandler('400');
		console.log("Event Collector JSON recieved is empty");
		
	}else{
		for(var i = 0 ; i<keys.length; i++){
			key = keys[i];
			id = pre_flare[key].id;
			logsources = pre_flare[key].log_sources;
			collection = {"name" : key, "id" : id, "children" : logsources};
			flare.children.push(collection);
			
			
		}
		console.log(flare);
		return flare;
	}
	
}

function generateLogSourceTypeJSON( pre_flare){
	var flare = { "name": "flare", "children" : [] };
	var keys = Object.keys(pre_flare);
	var key, name, id, logsources;
	var collection;
	
	if(pre_flare.length < 1){
		ErrorHandler('400');
		console.log("Log source type JSON recieved is empty");
		
	}else{
		for(var i = 0 ; i<keys.length; i++){
			key = keys[i];
			id = pre_flare[key]
			name = pre_flare[key].name;
			logsources = pre_flare[key].log_sources;
			collection = {"name" : name, "id" : id, "children" : logsources};
			flare.children.push(collection);
		}
		console.log(flare);
		return flare;
	}


}

//http://stackoverflow.com/questions/15713878/create-javascript-tree-out-of-list-of-objects
function generateLogSourceGroupJSON( pre_flare){
	var flare = { "name": "flare", "children" : [] };	
	
	var keys = Object.keys(pre_flare);
	var key, name, id, logsources;
	var collection;
	if(pre_flare.length < 1){
		ErrorHandler('400');
		console.log("Log source group JSON recieved is empty");	
	}else{
		pre_flare.forEach(function(item) {
		    if(item.parent_id !== null) {
		    	collection = {"name" : item.name, "id" : item.id, "children" : item.logsources};
		        flare.children.push(item);
		    }
		});
		console.log(flare);
		return flare;
	}

}

//I can do better than this for loading but meh
function initVisio(filter, callback){
	processed = 0;
	getLogSource_by_Query(filter);
	var id = setInterval(frame, 200);
	  function frame() {
		  var filter
		  console.log(processed);
		 if( Error.length > 1 && Error !== undefined){
		    	clearInterval(id);
		    	callback;
		    	return;
		  }
	    if (processed == 60 ) {
	    	processed = 61;
	    	var log_source_string = eventStorage["LogSources"].join();
	    	console.log(log_source_string);
	    	if(log_source_string !== null){
	    		 filter = "?filter=id in (" + log_source_string + ")";
	    		getAllDevices(filter, 100);
	    	}
	      
	    } else if( processed == 70) {
	    	processed = 71;
	    	var types_string = Object.keys(defaultStorage["LogSourceTypes"]).join();
	    	if(types_string !== null){
	    		 filter = "?filter=id in (" + types_string + ")";
	    		getDeviceTypes(filter, 100);
	    	}
	    }else if( processed == 80){
	    	processed = 81;
	    	var groups_string = Object.keys(defaultStorage["LogSourceGroups"]).join();
	    	if(groups_string !== null){
	    		 filter = "?filter=id in (" + groups_string + ")";
	    		getDeviceGroups(filter, 200);
	    	}
	      //still waiting
	    }else if( processed == 90){
	    	processing = 91;
	    	EC_flare= generateEventCollectorJson( defaultStorage["EventCollectors"]);
	    	Type_flare= generateLogSourceTypeJSON( defaultStorage["LogSourceTypes"]);
	    	Group_flare= generateLogSourceTypeJSON( defaultStorage["LogSourceGroups"]);
	    	processed = 100;
	    	console.log("Done building the model");
	    	clearInterval(id);
	    	callback();
	    	return;
	    }
	  }
}

