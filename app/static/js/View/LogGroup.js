function rendeLogGroupView(){
	clearPageElements();
	var header, summary, content;
	var html = '';
	var timeline, logsource, element, bool;
	try {
	//check for empty files
		header = getHeader();
		summary = getDashSummary();
		content = getContent();
		
		html = HeaderTemplate("Log Source Groups");
		header.innerHTML = html;
		buildDonutJSON(Group_flare, "morris-donut-chart");
		
		html = '';
		html = DonutTemplate('Log Source Groups");
		summary.innerHTML = html;
	}
	catch(err){
		ErrorHandler('400');
		console.log(err);
	}
	
}

function renderContent(id){
	clearPageElements();
	var content;
	var html = '';
	try {
		
		html = '';
		for(var i = 0 ; i< Group_flare.length; i++){
			if(Group_flare[i].id == id){
				startBuble(Group_flare[i].children, "Content")
			}
		}
		
		content.innerHTML = html;
	}
	catch(err){
		ErrorHandler('400');
		console.log(err);
	}
}


