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
		buildDonutJSON(flare, "morris-donut-chart", type);
		
		html = '';
		html = DonutTemplate(type);
		summary.innerHTML = html;
	}
	catch(err){
		ErrorHandler('400');
		console.log(err);
	}
	
}

function renderContent(id, start, end, type){
	
	var content, flare, temp_arr;
	var html = '';
	clearChart();
	clearDetail();
	try {
		content = getContent();
		html = BubbleTemplate(id, type);
		flare = getFlareByType(type);
		temp_arr = flare.slice(start,end);
		for(var i = 0 ; i< temp_arr.length; i++){
			if(flare[i].id == id){
				startBubble(flare[i].children, "bubble-chart")
			}
		}
		
		content.innerHTML = html;
	}
	catch(err){
		ErrorHandler('400');
		console.log(err);
	}
}

function buildLogSourceTable(id){
	try{
	   var logsource = defaultStorage["LogSources"][id];
	   var rows = LogSourceRowTemplate(logsource);
	   var table_div = getLogSourceTable();
	   var logtemplate = LogSourceTableTemplate(logsource.name);
	   table_div.innerHTML = logtemplate;
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
	   var chart_div = getChart();
	   var arr = [];
	   var item = {};
	   chart_div.innerHTML = ChartTemplate(logsource.name);
	   events.forEach(function(entry) {
		    item.time = entry.time;
		    item.rate = entry.rate;
		    arr.push(item);
		});
	   startChart(arr, 'morris-chart', logsource.name);
	}
	catch(err){
		ErrorHandler('400');
		console.log(err);
	}
	   
}


