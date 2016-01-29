//TODO
//generic function to handle AJAX requests to the QRadar API
//Includes error handler
function sendAPIRequest(url, type, callback){
	var xhttp;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
	xhttp.onreadystatechange = function() {
		  if (xhttp.readyState == 4 && xhttp.status == 200 || xhttp.readyState == 4 && xhttp.status == 201) {
			  callback(xmlHttp.responseText);
		  }else{
			  ErrorHandler(xhttp.status);
		  }
		
		};
		xhttp.open(type, url, true);
		xhttp.send();
}

//Using a hash map (logarithmic execution time for server) to map response codes to handling functions
function ErrorHandler(code){
	var cases = {};
	cases['500'] = function() {
		  //render body template for Server Error
	};
	cases['404'] = function() {
		//render body template for 404 Page not found
	};
	cases['422'] = function() {
		//render body template for Invalid Query to the API
	};
	cases['409'] = function() {
		//render body template for API could not handle the request - will be ignored
	};
	
	if(typeof cases[code] == 'function') {
		  // only executes if we've defined it above
		  cases[code]();  //execute the body of the code map
		} else {
		  // default (the fallthrough) if we really don't understand what the server sent us
	}
}

function logSourceGetEndpoints(type){
	var endPoints = {'log_sources': '/api/configuration/log_sources',
					'log_source_types': '/api/configuration/log_source_types',
					'log_source_protocols': '/api/configuration/log_source_protocols',
					'log_source_groups': '/api/configuration/log_source_groups'};
	if([endPoints[type] !== null){
		return endPoints[type];
	}else{
		return null;
	}
}

function ArielGetEndpoints(type){
	var endPoints = {'all_searches': '/api/ariel/searches',
					'single_search_status': '/api/ariel/searches/{{search_id}}',
					'search_result': '/ariel/searches/{{search_id}}/results'};
	return endPoints;
}

function getValueById(id){
	var element = document.getElementById(id);
	if(element !== null){
		return element.value;
	}else{
		return null;
	}
	
}