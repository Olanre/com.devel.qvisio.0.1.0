var console_ip;
//global Error variable
var Error;

var EC_flare;
var Type_flare;
var Group_flare;

var time_in_minutes = 60;

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
	console.log(keys);
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
	console.log(keys);
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
		console.log( " Log source group flare is ");
		console.log(flare);
		return flare;
	}

}


function fillGauge(id, value){
	var config1 = liquidFillGaugeDefaultSettings();
    config1.circleThickness = 0.2;
    config1.textVertPosition = 0.2;
    config1.waveAnimateTime = 1000;
    var gauge2= loadLiquidFillGauge(id, value, config1);
}


function loadApp(){
	//declare console ip
	var value = getValueById('console_ip');
 	 console_ip = 'https://' + value;
	//state of processing our API calls (from start to finsh)
 	var processed = 0;

 	//on page start
 	initVisio('LAST' + time_in_minutes + ' MINUTES', function () {
 	    clearLoader();
 	    defaultsideBarView();
 	    defaultheaderView();
 	});
}
function clearLoader () {
	    console.log("Finished loading model");
	    $(".se-pre-con").fadeOut("fast");;
	}



/**
 * displays the sidebar when not within a specific page
 */
function defaultsideBarView(){
	var sidebar = document.getElementById('template5');
	var aside = getSideBar();
	html = sidebar.innerHTML;
	aside.innerHTML = html;
}

function defaultheaderView(){
	var header = document.getElementById('template6');
	var head= getHeader();
	head.innerHTML = header.innerHTML;
}

function RenderView(id){
	removeClass('active');
	var flare;
	document.getElementById(id).className='active';
	
	switch(id) {
    case 'nav-option-group':
        flare = Group_flare;
        break;
    case 'nav-option-collector':
        flare = EC_flare;
        break;
    case 'nav-option-type':
    	flare = Type_flare;
    	break;
    default:
        default ErrorHandler('400');
	}
		
	loadVisioView(flare, 'visio');
}



