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
		
		html = '';
		html = DonutTemplate('Log Source Groups");
		content.innerHTML = html;
	}
	catch(err){
		ErrorHandler('400');
		console.log(err);
	}
	
}


