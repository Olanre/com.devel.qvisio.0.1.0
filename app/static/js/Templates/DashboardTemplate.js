function SummaryTemplate(name, number){
	//gets the html for the page from index.html
	var template = document.getElementById('template1').innerHTML;
	var tpl;
	//uses hogan to compile the html
	textile = Hogan.compile(template);
	context = { 'count' : number, 'name': name};
	tpl = textile.render(context);
	return tpl;
}

function HeaderTemplate(header){
	//gets the html for the page from index.html
	var template = document.getElementById('template2').innerHTML;
	var tpl;
	//uses hogan to compile the html
	textile = Hogan.compile(template);
	context = { 'header' : header};
	tpl = textile.render(context);
	return tpl;
}

function TimelineTemplate(){
	//gets the html for the page from index.html
	var template = document.getElementById('template3').innerHTML;
	var tpl;
	//uses hogan to compile the html
	textile = Hogan.compile(template);
	tpl = textile.render();
	return tpl;
}

function LeftTimelineTemplate(name, event_rate, time){
	//gets the html for the page from index.html
	var template = document.getElementById('template4').innerHTML;
	var tpl;
	//uses hogan to compile the html
	textile = Hogan.compile(template);
	context = { 'event_rate' : event_rate, 'name': name, 'time': time};
	tpl = textile.render(context);
	
	return tpl;
}

function RightTimelineTemplate(name, event_rate, time){
	//gets the html for the page from index.html
	var template = document.getElementById('template5').innerHTML;
	var tpl;
	//uses hogan to compile the html
	textile = Hogan.compile(template);
	context = { 'event_rate' : event_rate, 'name': name, 'time': time};
	tpl = textile.render(context);
	return tpl;
}

function DonutTemplate(name){
	//gets the html for the page from index.html
	var template = document.getElementById('template6').innerHTML;
	var tpl;
	//uses hogan to compile the html
	textile = Hogan.compile(template);
	context = { 'name' : name};
	tpl = textile.render(context);
	return tpl;
}