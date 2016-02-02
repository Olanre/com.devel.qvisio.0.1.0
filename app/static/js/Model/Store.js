//localstorage variables
var defaultStorage = { 'EventCollectors': {}, 'LogSourceGroups': [], 'LogSourceTypes': [], 'LogSources' : {} };
var eventStorage = { "LogSources": [],  "event_rate" : {} };

function insertEventSearchData( events ){
	var logsourceid;
	var event_rate_element;
	var count;
	var logsourcename;
	//up to 100 elements will be processed
	for(var i =0; i<events.length; i++){
		logsourceid = events[i]["logsourceid"];
		count = events[i]["count"];
		logsourcename = events[i]["logsourcename"];
		
		//store the values in our local store variable, logsourceids in an array and the event rate as a mapping
		eventStorage["LogSources"].push(logsourceid);
		eventStorage["event_rate"][logsourceid] = [count, logsourcename];
		
	}
	console.log(eventStorage["LogSources"]);
	processed = 60;
}

function insertLogSourceData( items ){
	var logsourceid;
	var event_collector;
	var collectors = [];
	var types = []; 
	var groups = [];
	var event_collector_name;
	var logsourcegroup;
	var logsourcegroups;
	var logsourcetype;
	var logsourcename;
	var short_map = {}
	processed = 65;
		for(var i =0; i<items.length; i++){
			logsourceid = items[i]["id"];
			event_collector = items[i]["target_event_collector"];
			event_collector_name = event_collector.name;
			logsourcename = items[i]["name"];
			logsourcegroups = items[i]["groups"];
			logsourcetype = items[i]["type"];
			event_rate = eventStorage["event_rate"][logsourceid][0];
			short_map = { 'id': logsourceid, 'name' : logsourcename, 'event_rate': event_rate };
			
			//store the values in our local store variable, logsourceids in an array and the event rate as a mapping
			if(defaultStorage["EventCollectors"][event_collector_name] === undefined){
				defaultStorage["EventCollectors"][event_collector_name] = { 'id' : event_collector['id'], 'log_sources' : []};
				defaultStorage["EventCollectors"][event_collector_name]['log_sources'].push(short_map);
				collectors = Object.keys(defaultStorage["EventCollectors"]);
			}else if( (collectors.length > 0) &&  (collectors.indexOf(event_collector_name) > -1) ){
				defaultStorage["EventCollectors"][event_collector_name]['log_sources'].push(short_map);
			}
			
			
			if(defaultStorage["LogSources"][logsourceid] === undefined){
				defaultStorage["LogSources"][logsourceid] = items[i];
			}
			
			if(defaultStorage["LogSourceTypes"][logsourcetype] === undefined){
				defaultStorage["LogSourceTypes"][logsourcetype] = {'log_sources' : []};
				defaultStorage["LogSourceTypes"][logsourcetype]['log_sources'].push(short_map);
				types = Object.keys(defaultStorage["LogSourceTypes"]);
			}else if( types.length > 0 && types.indexOf(logsourcetype) > -1){
				defaultStorage["LogSourceTypes"][logsourcetype]['log_sources'].push(short_map);
			}
			
			for( var j = 0; j < logsourcegroups.length; j++){
				logsourcegroup = logsourcegroups[j];
				if(defaultStorage["LogSourceGroups"][logsourcegroup] === undefined){
					defaultStorage["LogSourceGroups"][logsourcegroup] = {'log_sources' : []};
					defaultStorage["LogSourceGroups"][logsourcegroup]['log_sources'].push(short_map);
					groups = Object.keys(defaultStorage["LogSourceGroups"]);
				}else if( groups.length > 0 && groups.indexOf(logsourcegroup) > -1){
					defaultStorage["LogSourceGroups"][logsourcegroup]['log_sources'].push(short_map);
				}
			}
		}
		processed = 70;
		console.log(defaultStorage["LogSources"]);
		console.log(defaultStorage["LogSourceGroups"]);
		console.log(defaultStorage["LogSourceTypes"]);
	
}

function insertLogSourceGroupData( items){
	var id;
	var current;
	var log_sources;
	var new_logs;
	var groups;
	
	processed = 75;
	for(var i =0; i<items.length; i++){
		id = items[i]["id"];
		if(defaultStorage["LogSourceGroups"][id] !== null){
			log_sources = defaultStorage["LogSourceGroups"][id]['log_sources'];
			defaultStorage["LogSourceGroups"][id] = items[i];
			defaultStorage["LogSourceGroups"][id]['log_sources'] = log_sources;
			
		}
		
	}
	processed = 80;
	console.log(defaultStorage["LogSourceGroups"]);
}

function insertLogSourceTypeData( items){
	var id;
	var log_sources;
	processed = 85;
	for(var i =0; i<items.length; i++){
		id = items[i]["id"];
		if(defaultStorage["LogSourceTypes"][id] !== null){
			log_sources = defaultStorage["LogSourceTypes"][id]['log_sources'];
			defaultStorage["LogSourceTypes"][id] = items[i];
			defaultStorage["LogSourceTypes"][id]['log_sources'] = log_sources;
		}
	}
	processed = 90;
	console.log(defaultStorage["LogSourceTypes"]);
}