function renderLogView(type, flare){
	clearPageElements();
	var header, summary, content;
	var html = '';
	var timeline, logsource, element, bool;
	try {
	//check for empty files
		header = getHeader();
		summary = getDashSummary();
		
		html = HeaderTemplate(type);
		header.innerHTML = html;
		html = '';
		html = DonutTemplate(type);
		summary.innerHTML = html;
		buildDonutJSON(flare.children, "morris-donut", type, renderContent);
		
	}
	catch(err){
		ErrorHandler('400');
		console.log(err);
	}
	
}

function renderContent(id, start, end, type){
	
	var content, flare, name;
	var temp_arr = [];
	var html = '';
	//clearChart();
	clearDetail();
	try {
		content = getContent();
		html = SecondDonutTemplate(id, type, name);
		content.innerHTML = html;
		flare = getFlareByType(type).children;
		
		for(var i = 0 ; i< flare.length; i++){
			
			if(flare[i].id == id){
				name = flare[i].name;
				
				temp_arr = flare[i].children;
				temp_arr = temp_arr.slice(start,end);
				//console.log("Should be rendering");
				console.log(temp_arr);
				buildDonutJSON(temp_arr, "bubble-chart", type, buildLogSourceTable)
				
				
				break;
				
			}
		}
		
		
	}
	catch(err){
		ErrorHandler('400');
		console.log(err);
	}
}

function buildLogSourceTable(id, start, end, type){
	try{
	   var logsource = defaultStorage["LogSources"][id];
	   console.log(logsource);
	   var rows = LogSourceRowTemplate(logsource);
	   var table_div = getDetail();
	   var logtemplate = LogSourceTableTemplate(logsource.name);
	   table_div.innerHTML = logtemplate;
	   buildLogChart(id);
	   var insert = document.getElementById('details_go_here');
	   insert.innerHTML = rows;
	   
	}
	catch(err){
		ErrorHandler('400');
		console.log(err);
	} 
}

function buildLogChart(id){
	try{
	   var logsource = defaultStorage["LogSources"][id];
	   var events = eventStorage['event_rate'][id];
	   //var chart_div = getChart();
	   var arr = [];
	   var item = {};
	  
	   //chart_div.innerHTML = ChartTemplate(logsource.name);
	   events.forEach(function(entry) {
		    item.time = entry.time;
		    item.rate = entry.rate;
		    arr.push(item);
		});
	   console.log(arr);
	   startChart(arr, 'morris-chart', logsource.name);
	}
	catch(err){
		ErrorHandler('400');
		console.log(err);
	}
	   
}


