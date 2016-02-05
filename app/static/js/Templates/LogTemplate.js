


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

function LogSourceTableTemplate(name){
	//gets the html for the page from index.html
	var template = document.getElementById('template7').innerHTML;
	var tpl= '';
	//uses hogan to compile the html
	textile = Hogan.compile(template);
	context = { 'name' : name};
	tpl = textile.render(context);
	
	return tpl;

}

function LogSourceRowTemplate(arr){
	//gets the html for the page from index.html
	var template = document.getElementById('template8').innerHTML;
	var tpl= '';
	//uses hogan to compile the html
	for (var key in arr) {
		context = { 'item' : key, 'value': arr[key]};
		textile = Hogan.compile(template);
		tpl += textile.render(context);
	}
	
	return tpl;

}

function BubbleTemplate(id, type){
	//gets the html for the page from index.html
	var template = document.getElementById('template9').innerHTML;
	var tpl;
	//uses hogan to compile the html
	textile = Hogan.compile(template);
	context = { 'id' : id, 'type': type};
	tpl = textile.render(context);
	return tpl;
}

function ChartTemplate(name){
	//gets the html for the page from index.html
	var template = document.getElementById('template10').innerHTML;
	var tpl= '';
	//uses hogan to compile the html
	textile = Hogan.compile(template);
	context = { 'name' : name};
	tpl = textile.render(context);
	
	return tpl;

}


