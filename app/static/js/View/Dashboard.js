function buildDefaultDashboard(){
	clearPageElements();
	var header, summary, content;
	var html = '';
	var logsources = [];
	var timeline, logsource, element, bool;
	try {
	//check for empty files
		header = getHeader();
		summary = getDashSummary();
		content = getContent();
		
		html = HeaderTemplate("Dashboard");
		header.innerHTML = html;
		console.log("event Storage string is " + log_source_string);
		
		html = '';
		html = html + SummaryTemplate("Log Source Groups", Group_flare.children.length);
		html = html + SummaryTemplate("Log Source Types", Type_flare.children.length);
		html = html + SummaryTemplate("Event Collectors", EC_flare.children.length);
		summary.innerHTML = html;
		
		content.innerHTML = getTimeline();
		timeline = getTimelineElements();
		//here?
		console.log("Here?");
		logsources = log_source_string.split(",");
		logsources = logsources.splice(0,10);
		console.log("This array hold a reference to eventStorage is now" + logsources);
		html = '';
		bool = 1;
		for(var i = 0; i < logsources.length; i++){
			logsourceid = logsources[i];
			var element = getLastEvent(logsourceid);
			if( bool == 1){
				html += LeftTimelineTemplate(element.name, element.rate, element.time);
				bool = 0;
			}else{
				html += RightTimelineTemplate(element.name, element.rate, element.time);
				bool = 1;
			}
			
		}
		timeline.innerHTML = html;
	}
	catch(err){
		ErrorHandler('400');
		console.log(err);
	}
		
}

function getTimeline(){
	var html = '';
	var template;
	
	
	try {
		template = TimelineTemplate();
		html = template;
		return template;
	}
	catch(err){
		ErrorHandler('400');
		console.log(err);
	}
}