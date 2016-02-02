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
		Error = "An internal Server Error";
	};
	cases['404'] = function() {
		//render body template for 404 Page not found
		Error= "Resource not Found: 404";
	};
	cases['422'] = function() {
		//render body template for Invalid Query to the API
		Error="Invalid Query to the API";
	};
	cases['409'] = function() {
		//render body template for API could not handle the request - will be ignored
		Error="The API could not handle the request";
	};
	cases['400'] = function() {
		//render body template for API could not handle the request - will be ignored
		Error="Oops, we messed up. please try accessing the App at a later time";
	};
	cases['403'] = function() {
		//render body template for API could not handle the request - will be ignored
		Error="Cannot access resource on the server - Forbiddened";
	};
	
	if(typeof cases[code] == 'function') {
		  // only executes if we've defined it above
		  cases[code]();  //execute the body of the code map
		} else {
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

function checkFilter( filter, type){
	
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