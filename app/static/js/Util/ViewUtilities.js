/**
 * Holds all of the getter and setter methods for the views and page rendering
 */

/**
 * Toggle the visibility of a div by id
 */
function toggle_visibility(id , element) {
       var e = document.getElementById(id);
       if(e.style.display == 'block'){
          e.style.display = 'none';
       }else{
          e.style.display = 'block';
       }
}

function renderInputListener(){
	 var e = document.getElementById('manual_interval');
	 $('#manual_interval').on('change textInput input', function () {
		 changeInterval(this.value)
	  });
	 
}


/**
 * clears all of div's on the page 
 */
function clearPageElements(){
	 clearHeader();
	 clearContent();
	 clearSummary();
	 clearDetail();
	 clearError();
}

function getConsoleIP(){
	
}


/**
 * clearHeader clears the header on the page 
 */
function clearHeader(){
	var header = document.getElementById("default-header");
	header.innerHTML = '';
	
}

function clearError(){
	var error = document.getElementById('Error');
	error.innerHTML = '';
}


/**
 * clearContainer clears the container on the page 
 */
function clearDetail(){
	var detail = document.getElementById("Details");
	detail.innerHTML = '';
	
}

/**
 * clearContainer clears the container on the page 
 */
function clearContent(){
	var container = document.getElementById("Content");
	container.innerHTML = '';
	
}


/**
 * clearSection clears the Section on the page 
 */
function clearSummary(){
	var container = document.getElementById("Summary");
	container.innerHTML = '';
	
}

/**
 * Get Html Elements
 * ----------------------
 */

/**
 * getContainer gets the information within the container
 */
function getContent(){
	var container = document.getElementById("Content");
	return container;
}

function getDashSummary(){
	var summary = document.getElementById("Summary");
	return summary;
}

function getHeader(){
	var header = document.getElementById("default-header");
	return header
}

function getDetail(){
	var details = document.getElementById("Details");
	return details;
}

function getError(){
	var details = document.getElementById("Error");
	return details;
}


function getTimelineElements(){
	var timeline = document.getElementById("Timeline");
	return timeline;
}

function getBubbleElement(){
	var bubble = document.getElementById("template9");
	return bubble;
}

function getLogSourceTable(){
	var table = document.getElementById("template7");
	return table;
}

/** Function to get the great grand parent of the starting node
 * @param, start_point, the starting point node
 */
function getGreatGrandParentElement(start_point){
	return start_point.parentNode.parentNode.parentNode;
	
}

/** function to get the grand parent of a starting node
 * @param, start_point, the starting point node
 */
function getGrandParentElement(start_point){
	return start_point.parentNode.parentNode;
	
}

function removeClass(class_name){
	var list= document.getElementsByClassName(class_name);
	for (var i=0; i<list.length;i++){
		list[i].className='';
	}
}

