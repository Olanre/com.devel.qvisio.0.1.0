//TODO
//generic function to handle AJAX requests to the QRadar API
//Includes error handler


function sendAPIRequest(url, type,  callback, limit){
	limit = limit || 0;
	var xhttp;
	url = encodeURI(url);
	var sessionCookie = getCookie("QRadarCSRF");
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
	xhttp.onreadystatechange = function() {
		console.log(xhttp.status);
		  if (xhttp.readyState == 4 && xhttp.status == 200 || xhttp.readyState == 4 && xhttp.status == 201) {
			  callback(JSON.parse(xhttp.responseText), url);
		  }else{
			  ErrorHandler(xhttp.status);
		  }
		
		};
		xhttp.open(type, url, true);
		xhttp.setRequestHeader('Accept', "application/json");
		xhttp.setRequestHeader('Allow-Hidden', 'true')
		xhttp.setRequestHeader('QRadarCSRF',sessionCookie);
		
		if( limit !== 0){
			var range = "items=0-" + limit;
			console.log("Setting limit to be" + limit);
			xhttp.setRequestHeader('Range', range);
		}
		
		xhttp.setRequestHeader('Version', '5.1');
		xhttp.send();
}

//Using a hash map (logarithmic execution time for server) to map response codes to handling functions
function ErrorHandler(code){
	var cases = {};
	cases['500'] = function() {
		  //render body template for Server Error
		Errors = "An internal QRadar Server error occured. Please refresh the app";
	};
	cases['404'] = function() {
		//render body template for 404 Page not found
		Errors= "Resource not Found: 404";
	};
	cases['422'] = function() {
		//render body template for Invalid Query to the API
		Errors="Oops, somehow we sent an invalid Query to the QRadar API";
	};
	cases['409'] = function() {
		//render body template for API could not handle the request - will be ignored
		Errors="Uh-oh, QRadar API could not handle the request";
	};
	cases['400'] = function() {
		//render body template for API could not handle the request - will be ignored
		Errors="Oops, we messed up. please refresh your broswer";
	};
	cases['403'] = function() {
		//render body template for API could not handle the request - will be ignored
		Errors="Cannot access resource on the server - Forbiddened";
	};
	
	if(typeof cases[code] == 'function') {
		  // only executes if we've defined it above
		  cases[code]();  //execute the body of the code map
		  console.log("Detected Error " + code);
		  showError();
		} else {
			//Error="An Unknown Error occured";
		  // default (the fallthrough) if we really don't understand what the server sent us
	}
}

function logSourceGetEndpoints(type, filter){
	filter = filter || '';
	var endPoints = {'log_sources': '/api/configuration/log_sources' + filter ,
					'log_source_types': '/api/configuration/log_source_types' + filter,
					'log_source_protocols': '/api/configuration/log_source_protocols',
					'log_source_groups': '/api/config/log_source_groups' + filter};
	if(endPoints[type] !== null){
		return console_ip + endPoints[type];
	}else{
		return null;
	}
}

function ArielGetEndpoints(type, search_id){
	search_id = search_id || '';
	var endPoints = {'all_searches': '/api/ariel/searches/',
					'single_search_status': '/api/ariel/searches/' + search_id,
					'search_result': '/api/ariel/searches/'+ search_id +'/results'};
	if(endPoints[type] !== null){
		return console_ip + endPoints[type];
	}else{
		return null;
	}
}

function ArielPostEndpoints(type){
	var endPoints = {'search': '/api/ariel/searches?query_expression=',
			
	}
	if(endPoints[type] !== null){
		
		return console_ip + endPoints[type];
	}else{
		return null;
	}

}


function getValueById(id){
	var element = document.getElementById(id);
	
	if(element !== null){
		
		var value = element.value;
		
		return value;
	}else{
		return null;
	}
	
}

function getFlareByType(type){
		var flare = {};
		
		switch(type) {
	    case 'Log Source Groups':
	        flare = Group_flare;
	        
	        break;
	    case 'Event Collectors':
	        flare = EC_flare;
	        
	        break;
	    case 'Log Source Types':
	    	flare = Type_flare;
	    	
	    	break;
	    default:
	         ErrorHandler('400');
		}
		
		return flare;
		
		
	
}

function getCookie(name) {
	  var value = "; " + document.cookie;
	  var parts = value.split("; " + name + "=");
	  if (parts.length == 2) return parts.pop().split(";").shift();
	}

var Items = function()
{
    var obj = {};
    for(var i=0; i<arguments.length; i++)
        obj[arguments[i]] = null;

    return obj;
};

function intersect_safe(a, b)
{
	a = a.sort();
	b = b.sort();
  var ai = bi= 0;
  var result = [];

  while( ai < a.length && bi < b.length ){
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(ai);
       ai++;
       bi++;
     }
  }

  return result;
}

function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}

function timeConverter(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	  return time;
	}

function changeInterval(val){
	time_in_minutes = val;
	console.log("New interval is" + time_in_minutes);
	loadApp();
}

function getLastEventRate(logsourceid){
	var arr = eventStorage["event_rate"][logsourceid];
	var position;
	var count = 0;
	if(arr !== undefined){
		position = arr.length-1;
		count = arr[position]['rate']
		return Number(count.toFixed(2));
	}else{
		ErrorHandler('400');
		return 0;
	}
}

function getLastEvent(logsourceid){
	var arr = eventStorage["event_rate"][logsourceid];
	var position;
	var val = {};
	if(arr !== undefined){
		position = arr.length-1;
		val = arr[position];
		return val;
	}else{
		ErrorHandler('400');
		return 0;
	}
}


function getECRate(collector_name){
	var arr = defaultStorage["EventCollectors"][collector_name]['log_sources'];
	var rate = 0;
	if(arr.length > 0){
		arr.forEach(function(entry) {
		    rate = rate + getLastEventRate(entry.id);
		});
		return rate;
	}else{
		return 0;
	}
}

function getGroupRate(id){
	var arr = defaultStorage["LogSourceGroups"][id]['log_sources'];
	var rate = 0;
	if(arr.length > 0){
		arr.forEach(function(entry) {
		    rate += getLastEventRate(entry.id);
		});
		return rate;
	}else{
		return 0;
	}
}

function getTypeRate(id){
	var arr = defaultStorage["LogSourceTypes"][id]['log_sources'];
	var rate = 0;
	if(arr.length > 0){
		arr.forEach(function(entry) {
		    rate += getLastEventRate(entry.id);
		});
		return rate;
	}else{
		return 0;
	}
}