var console_ip;
//global Error variable
var Errors;
var EC_flare;
var Type_flare;
var Group_flare;
var my_interval, processed;
var time_in_minutes = 60;
var refresher;
//localstorage variables
var defaultStorage = { 'EventCollectors': {}, 'LogSourceGroups': [], 'LogSourceTypes': [], 'LogSources' : {} };
var eventStorage = { "LogSources": [],  "event_rate" : {}};

var log_source_string;

function generateEventCollectorJson( pre_flare){
	var flare = { "name": "flare", "children" : [] };
	var keys = Object.keys(pre_flare);
	var key, name, id, logsources;
	var collection;
	var event_rate;
	if(pre_flare.length < 1){
		ErrorHandler('400');
		console.log("Event Collector JSON recieved is empty");
		
	}else{
		for(var i = 0 ; i<keys.length; i++){
			key = keys[i];
			id = pre_flare[key].id;
			event_rate = getECRate(key);
			logsources = pre_flare[key].log_sources;
			collection = {"name" : key, "id" : id, "children" : logsources, "event_rate": event_rate};
			flare.children.push(collection);
			
			
		}
		console.log("Event collector flare is ");
		console.log(flare);
		return flare;
	}
	
}

function generateLogSourceTypeJSON( pre_flare){
	var flare = { "name": "flare", "children" : [] };
	var keys = Object.keys(pre_flare);
	var key, name, id, logsources;
	var collection;
	var event_rate;
	if(pre_flare.length < 1){
		ErrorHandler('400');
		console.log("Log source type JSON recieved is empty");
		
	}else{
		for(var i = 0 ; i<keys.length; i++){
			key = keys[i];
			
			id = key;
			name = pre_flare[key].name;
			event_rate = getTypeRate(id);
			logsources = pre_flare[key].log_sources;
			collection = {"name" : name, "id" : id, "children" : logsources , "event_rate": event_rate};
			flare.children.push(collection);
		}
		console.log(" Log Source type flare is ");
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
	var event_rate;
	var logsources;
	if(pre_flare.length < 1){
		ErrorHandler('400');
		console.log("Log source group JSON recieved is empty");	
	}else{
		pre_flare.forEach(function(item) {
		    if(item.parent_id !== null) {
		    	event_rate = getGroupRate(item.id);
		    	logsources = item.log_sources;
		    	collection = {"name" : item.name, "id" : item.id, "children" : logsources , "event_rate": event_rate};
		        flare.children.push(collection);
		    }
		});
		console.log( " Log source group flare is ");
		console.log(flare);
		return flare;
	}

}


function loadApp(){
	try{
		Error = undefined;
		defaultStorage = { 'EventCollectors': {}, 'LogSourceGroups': [], 'LogSourceTypes': [], 'LogSources' : {} };
		eventStorage = { "LogSources": [],  "event_rate" : {}};
		EC_flare = null;
		Type_flare = null;
		processed = 0;
		Group_flare = null;
		if(refresher !== undefined){
			clearInterval(refresher);
			refresher = undefined;
		}
		$(".se-pre-con").fadeIn("fast");
		
	 	my_interval = "LAST " + time_in_minutes + " MINUTES";
	 	var str =  window.location.href + 'ConsoleIP' ;	
	 	console.log(my_interval);
		$.ajax({
		    url: str,
		    type: "GET",
		    dataType: "json",
		    success: function(data){
		    	console_ip = 'https://' + data.console;
		        console.log(console_ip);
		      //on page start
			 	initVisio(my_interval, renderPage);
		        
		    },
		    error: function(data){
		         ErrorHandler('500');
		         console.log(data);
		    }
		});
		
		 
	 	
	 	
	}
	catch(err){
		console.log(err);
		ErrorHandler(err);
	}
}

function renderPage(){
	 clearLoader();
 	 //render input field for manual intervals
 	 	renderInputListener();
 	 //initialize refresher for eps on log sources
 	 	if(refresher == undefined){
 	 		refresher = initEPSRefresh(my_interval, 5000);
 	 	}
 	 	//render default Dashboard
 	 	buildDefaultDashboard();
 	    
 	   console.log("Executed refresh interval");
}

function initEPSRefresh(filter, rate){
	var id = setInterval(lapse, rate);
	 console.log("event Storage string is " + log_source_string);
	  function lapse() {
		  console.log("Starting EPS refresh loop " + processed);
		 if(  Errors !== undefined){
		    	clearInterval(id);
		    	return;
		  } else if(processed >= 60){
			 updateEventRate(filter);
			 
		 }
	  }
	  return id;
}

function clearLoader () {
    console.log("Finished loading model");
    $(".se-pre-con").fadeOut("fast");
}

function showError(){
	 var error_div = getError();
	 error_div.innerHTML = ErrorTemplate(Errors);
	 $('#Error').modal('show');
	 clearPageElements();
     var header;
	var html = '';
	header = getHeader();		
	html = HeaderTemplate(Errors);
	console.log(html);
	header.innerHTML = html;
}


function RenderView(type){
	try{
		var flare = getFlareByType(type);
		renderLogView(type, flare);
	} 
	catch(e){
		console.log(e);
		ErrorHandler('400');
	}
}



