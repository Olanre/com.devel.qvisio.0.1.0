var EC_flare;
var Type_flare;
var Group_flare;

function generateEventCollectorJson( pre_flare){
	var flare = { "name": "flare", "children" : [] };
	var keys = Object.keys(pre_flare);
	var key, name, id, logsources;
	var collection;
	for(var i = 0 ; i<keys.length; i++){
		key = keys[i];
		id = pre_flare[key].id;
		logsources = pre_flare[key].log_sources;
		collection = {"name" : key, "id" : id, "children" : logsources};
		flare.children.push(collection);
		
		
	}
	return flare;
}

function generateLogSourceTypeJSON( pre_flare){
	var flare = { "name": "flare", "children" : [] };
	var keys = Object.keys(pre_flare);
	var key, name, id, logsources;
	var collection;
	for(var i = 0 ; i<keys.length; i++){
		key = keys[i];
		id = pre_flare[key]
		name = pre_flare[key].name;
		logsources = pre_flare[key].log_sources;
		collection = {"name" : name, "id" : id, "children" : logsources};
		flare.children.push(collection);
	}
	return flare;


}

//http://stackoverflow.com/questions/15713878/create-javascript-tree-out-of-list-of-objects
function generateLogSourceGroupJSON( pre_flare){
	var flare = { "name": "flare", "children" : [] };	
	
	var keys = Object.keys(pre_flare);
	var key, name, id, logsources;
	var collection;
	
	var roots = pre_flare.filter(function(item) { return item.parent_id === null; });
	var roots = { 'id' : roots.id, 'name': roots.name, 'children' : [] };
	pre_flare.forEach(function(item) {
	    if(item.parent_id !== null) {
	    	collection = {"name" : item.name, "id" : item.id, "children" : item.logsources};
	        roots.children.push(item);
	    }
	});
	flare.children.push(roots);
	return flare;

}

//I can do better than this for loading but meh
function initVisio(filter, callback){
	processed = 0;
	getLogSource_by_Query(filter);
	var id = setInterval(frame, 100);
	  function frame() {
	    if (processed == 60) {
	    	var log_source_string = eventStorage["LogSources"].toString();
	    	if(log_source_string !== null){
	    		var filter = "?filter=id in (" + log_source_string + ")";
	    		getAllDevices(filter, 100)
	    	}
	      
	    } else if( processed == 70) {
	    	getDeviceTypes(200);
	    	
	    }else if( processed == 80){
	    	getDeviceGroups(200);
	      //still waiting
	    }else if( processed == 90){
	    	EC_flare= generateEventCollectorJson( defaultStorage["EventCollectors"]);
	    	Type_flare= generateLogSourceTypeJSON( defaultStorage["LogSourceTypes"]);
	    	Group_flare= generateLogSourceTypeJSON( defaultStorage["LogSourceGroups"]);
	    	processed = 100;
	    	//done
	    	clearInterval(id);
	    	callback;
	    	return;
	    }
	  }
}