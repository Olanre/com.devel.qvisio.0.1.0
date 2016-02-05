

function buildDonutJSON(flare, morris_element, type){
	
	var new_data = [];
	for(var i = 0 ; i< flare.length; i++){
		var element = flare[i];
		var name = element.name;
		var id = element.id;
		var value = element.event_rate
		value = value.toFix(2);
		var json = {"name" : element.name, "id" : element.id, "value": value}
		data.push(json);
		
	}
	var morris_donut = { element : morris_element , data: new_data , resize: true};
	Morris.Donut(morris_donut). on('click', function(i, row){
	    //alert(row.label);
	    console.log("Should display lower graph for group " + row.id);
	    renderContent(row.id, '0', '10', type);
	});
	return morris_donut;
}

function startChart(flare, morris_element, name){
	var morris_area = { 
			element : morris_element ,
			data :flare, 
			resize: true,
			 xkey: 'period',
		     ykeys: ['rate'],
		     labels: [name],
		     pointSize: 2,
		     hideHover: 'auto',
		     resize: true};
	Morris.Donut(morris_area)
	return morris_area;
}


//I can do better than this for loading but meh
function initVisio(filter, callback){
	processed = 0;
	getLogSource_by_Query(filter);
	var id = setInterval(frame, 200);
	  function frame() {
		  var filter;
		 
		  console.log("Completion rate is " + processed);
		 if(  Errors !== undefined){
		    	clearInterval(id);
		    	callback();
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
	    	Group_flare= generateLogSourceGroupJSON( defaultStorage["LogSourceGroups"]);
	    	flattenLogSourceArr();
	    	processed = 100;
	    	console.log("Done building the model");
	    	clearInterval(id);
	    	callback();
	    	return;
	    }
	  }
}

