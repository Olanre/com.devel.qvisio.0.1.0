var console_ip;
//global Error variable
var Error;




function fillGauge(id, value){
	var config1 = liquidFillGaugeDefaultSettings();
    config1.circleThickness = 0.2;
    config1.textVertPosition = 0.2;
    config1.waveAnimateTime = 1000;
    var gauge2= loadLiquidFillGauge(id, value, config1);
}


function loadApp(){
	//declare console ip
	var value = getValueById('console_ip');
 	 console_ip = 'https://' + value;
	//state of processing our API calls (from start to finsh)
 	var processed = 0;

 	//on page start
 	initVisio('LAST 60 MINUTES', function () {
 	    clearLoader();
 	    defaultsideBarView();
 	    defaultheaderView();
 	});
}
function clearLoader () {
	    console.log("Finished loading model");
	    $(".se-pre-con").fadeOut("fast");;
	}



/**
 * displays the sidebar when not within a specific page
 */
function defaultsideBarView(){
	var sidebar = document.getElementById('template5');
	var aside = getSideBar();
	html = sidebar.innerHTML;
	aside.innerHTML = html;
}

function defaultheaderView(){
	var header = document.getElementById('template6');
	var head= getHeader();
	head.innerHTML = header.innerHTML;
}