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
			
			id = key;
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
			key = item.id.id;
		    if(item.parent_id !== null) {
		    	collection = {"name" : item.name, "id" : key, "children" : item.logsources};
		        flare.children.push(item);
		    }
		});
		console.log( " Log source group flare is ");
		console.log(flare);
		return flare;
	}

}

function loadVisioView(flare, element){
	var margin = 20,
    diameter = 700;
	
	var color = d3.scale.linear()
	    .domain([-1, 5])
	    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
	    .interpolate(d3.interpolateHcl);
	
	var pack = d3.layout.pack()
	    .padding(2)
	    .count([diameter - margin, diameter - margin])
	    .value(function(d) { return d.event_rate; })
	
	var svg = d3.select(element).append("svg")
	    .attr("width", diameter)
	    .attr("height", diameter)
	  .append("g")
	    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
	
	 var root = JSON.parse( flare ); //add this line
	 console.log("Now performing D3 rendering");
	
	  var focus = root,
	      nodes = pack.nodes(root),
	      view;
	
	  var circle = svg.selectAll("circle")
	      .data(nodes)
	    .enter().append("circle")
	      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
	      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
	      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });
	
	  var text = svg.selectAll("text")
	      .data(nodes)
	    .enter().append("text")
	      .attr("class", "label")
	      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
	      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
	      .text(function(d) { return d.name });
	
	  var node = svg.selectAll("circle,text");
	
	  d3.select(element)
	      .style("background", color(-1))
	      .on("click", function() { zoom(root); });
	
	  zoomTo([root.x, root.y, root.r * 2 + margin]);
	
	  function zoom(d) {
	    var focus0 = focus; focus = d;
	
	    var transition = d3.transition()
	        .duration(d3.event.altKey ? 7500 : 750)
	        .tween("zoom", function(d) {
	          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
	          return function(t) { zoomTo(i(t)); };
	        });
	
	    transition.selectAll("text")
	      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
	        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
	        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
	        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
	  }
	
	  function zoomTo(v) {
	    var k = diameter / v[2]; view = v;
	    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
	    circle.attr("r", function(d) { return d.r * k; });
	  }
}

//I can do better than this for loading but meh
function initVisio(filter, callback){
	processed = 0;
	getLogSource_by_Query(filter);
	var id = setInterval(frame, 200);
	  function frame() {
		  var filter
		  console.log(Error);
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

