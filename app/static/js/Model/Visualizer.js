

function loadVisioView(flare, element){
	var margin = 0,
    diameter = 500;
	
	var color = d3.scale.linear()
	    .domain([-1, 5])
	    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
	    .interpolate(d3.interpolateHcl);
	
	var pack = d3.layout.pack()
	    .padding(2)
	    .size([diameter - margin, diameter - margin])
	    .value(function(d) { return d.event_rate; })
	var element = '#'+element;
	var svg = d3.select(element).append("svg")
	    .attr("width", diameter)
	    .attr("height", diameter)
	  .append("g")
	    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
	
	 var root = flare; //add this line
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
	    	processed = 100;
	    	console.log("Done building the model");
	    	clearInterval(id);
	    	callback();
	    	return;
	    }
	  }
}

