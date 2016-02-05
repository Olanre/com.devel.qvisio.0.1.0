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


