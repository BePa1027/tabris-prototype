
// Global UI elements _____________________________________________________________________________________________

tabris.ui.set("background", "red");
var composite = 0;
var statusText = 0;
var dataScrollView = 0;
var MARGIN = 10;


var page = tabris.create("Page", {   // First Page 
  title: "Data Acquisition",
  Layout: "",
  topLevel: true
});

var tabFolder = new tabris.TabFolder({  // tab folder
  layoutData: {left: 0, top: 0, right: 0, bottom: 0},
  background: "red",
  textColor: "white",
  elevation: 4,
  paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
}).appendTo(page);

// Tabs __________________________________________________________________________________________________________________

var http_tab = new tabris.Tab({  // HTTP Tab
	title: "HTTP",
	image: "images/at.png",
	background: "white"
}).appendTo(tabFolder);

var bluetooth_tab = new tabris.Tab({ // Bluetooth Tab
	title: "Bluetooth",
	image: "images/bluetooth.png",
	background: "white"
}).appendTo(tabFolder);

// HTTP functionality ____________________________________________________________________________________________________
urlInput = new tabris.TextInput({  // show url input field
	layoutData: {top: 10, left: 10, right: 10},
	message: "Enter URL and confirm",
	text: "http://192.168.43.126:8888/db.json"
}).on("accept", function(widget, address){
	
	if(dataScrollView){ 			// dispose existing UI-elements (scrollView, Buttons...)
		dataScrollView.dispose();
		dataScrollView = 0;
	}
	if(composite){
		composite.dispose();
	}
	if(statusText){
		statusText.dispose();
	}

	var xhr = new tabris.XMLHttpRequest();  // create XMLHttpRequest
	
	statusText = tabris.create("TextView",{
		layoutData: {left: 2 * MARGIN, right: 2 * MARGIN, top: [urlInput, MARGIN]},
		text: "",
		alignment: "center"
	}).appendTo(http_tab);
	
	xhr.onreadystatechange = function() {
					
		if (xhr.readyState === 4) { // ready for receiving response
			if(xhr.status === 200){	// success case, respone received
				displayData(xhr.responseText, urlInput); // call the display fcn
			
			} else { // error case
				statusText.set("text", "URL invalid: " + xhr.status); 
			}
		}else{
			statusText.set("text", "Data request..."); 
		}
	};			

	xhr.open("GET", address);
	
	xhr.send();
}).appendTo(http_tab);

// Bluetooth functionality _______________________________________________________________________________________________
bleEnableButton = tabris.create("Button", {
	text: "Enable Bluetooth",
	textColor: "white",
	background: "red",
	layoutData: {left: 10, top: 10}
}).on("select", function(){
	
	var initParams = {
		"request": true,
		"statusReceiver": false,
		"restoreKey" : "bluetoothleplugin"
	};
	
	bluetoothle.initialize(function(success){
		;
	}, function(error){
		;
	}, initParams);
	
	bluetoothle.enable(function(success){
		;
	}, function(error){
		;
	});
	
	
}).appendTo(bluetooth_tab);

bleDisableButton = tabris.create("Button", {
	text: "Disable Bluetooth",
	textColor: "white",
	background: "red",
	layoutData: {right: 10, top: 10}
}).on("select", function(){
	
	bluetoothle.disable(function(success){
		;
	}, function(error){
		;
	});
	
}).appendTo(bluetooth_tab);

bleScanButton = tabris.create("Button", {
	text: "Scan for BLE Devices",
	textColor: "white",
	background: "red",
	layoutData: {centerX: 0, top: [bleEnableButton, 20]}
}).on("select", function(){
	
	// var scanParams = {
		// "services": [
			// "180D",
			// "180F"
		// ],
		// "allowDuplicates": true,
		// "scanMode": bluetoothle.SCAN_MODE_LOW_LATENCY,
		// "matchMode": bluetoothle.MATCH_MODE_AGGRESSIVE,
		// "matchNum": bluetoothle.MATCH_NUM_MAX_ADVERTISEMENT,
		// "callbackType": bluetoothle.CALLBACK_TYPE_ALL_MATCHES
	// };
	var scanParams = {
		"services": [
			"180D",
			"180F"
		],
		"scanMode": bluetoothle.SCAN_MODE_LOW_LATENCY,
		"callbackType": bluetoothle.CALLBACK_TYPE_ALL_MATCHES
	};
	
	bluetoothle.startScan(function(success){
			console.log(success.status);
		}, function(error){
			console.log(error.status);
			throw new Error("Initialize / Enable Bluetooth first!");
		}, scanParams);
	
	setTimeout(function(){
		bluetoothle.stopScan(function(success){
			console.log(success.status);
		}, function(error){
			console.log(error.status);
		});
	}, 6000);
	
	
}).appendTo(bluetooth_tab);

// actions on tab change
tabFolder.on("change:selection", function(widget, tab) {
	if(tab.name == "HTTP"){
    	
	}
	else{ // bluetooth case
	  
	}
});

page.open();


var displayData=function(responseData, topWidgetObject){  // Data Management
	// create a variable to save the received object data
	var receivedData = JSON.parse(responseData);
	var stringData = "";
	// parse the received data 
	receivedData.forEach(function(s, i, o){
		stringData = stringData + receivedData[i].firstName + "\n" + receivedData[i].age + "\n\n";
	})

	composite = new tabris.Composite({
		  layoutData: {left: MARGIN, bottom: MARGIN, right: MARGIN},
		//  transform: {translationZ: 2},
		  background: "white"
	}).appendTo(http_tab);

	var drawButton = new tabris.Button({
		text: "Draw graph",
		textColor: "white",
		background: "red",
		layoutData: {left: MARGIN, centerY: 0}
	}).appendTo(composite);

	var chartPicker = new tabris.Picker({
		layoutData: {right: MARGIN, centerY: 0},
		textColor: "black",
		items: ["Bar", "Line", "Radar"] // "PolarArea", "Pie", "Doughnut"
	}).appendTo(composite);
	
	if(topWidgetObject) // 
	{
		// create a scrollview if the received data exceeds the display size
		dataScrollView = tabris.create("ScrollView", {
			left: MARGIN, right: MARGIN, top: [topWidgetObject, MARGIN], bottom: [composite, 2 * MARGIN],
			direction: "vertical",
			background: "white"
		}).appendTo(http_tab);
	}else{
		// create a scrollview if the received data exceeds the display size
		dataScrollView = tabris.create("ScrollView", {
			left: MARGIN, right: MARGIN, top: MARGIN, bottom: [composite, 2 * MARGIN],
			direction: "vertical",
			background: "white"
		}).appendTo(http_tab);	
	}
	
	var responseText = tabris.create("TextView", {
		layoutData: {left: 2 * MARGIN, right: 2 * MARGIN, top: [dataScrollView, 2 * MARGIN]},
		text: stringData
	}).appendTo(dataScrollView);

	drawButton.on("select", function(){
		// create a chart, offering the received data 
		createChart(receivedData, chartPicker.get("selection"));
	});
}

function createChart(receivedData, chartType){  // Chart
	var Chart = require("./node_modules/chart.js/Chart.min.js");	
	
	var visuPage = new tabris.Page({title: "Data Visualization"});  	// create a non-toplevel page for data visualization
	
	var labels = [];
    var yData =[];
	
	receivedData.forEach(function(s,i,o){ 
		labels[i] = receivedData[i].firstName;
		yData[i] = receivedData[i].age;
	})
	
	// chart data according to chart.js
	var chartData = {
		labels: labels,
		datasets: [
		{
			label: "My first bar chart",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: yData
		}
		]
	};
	
	// create a canvas and submit its data to the chart.js-constructor to create a chart
	var canvas = new tabris.Canvas({
		layoutData: { left: MARGIN, top: MARGIN, right: MARGIN, bottom: MARGIN }
	}).on("resize", function(canvas, bounds) {
		// get the size of the canvas context
		var ctx = canvas.getContext("2d", bounds.width, bounds.height);
		
		// wraparound to scale with native pixels
		ctx.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
		
		// create the chart using the chart.js-constructor
		new Chart(ctx)[chartType](chartData, {
			animation: true,
			showScale: true,
			showTooltips: false,
			scaleShowLabels: true
		});
	}).appendTo(visuPage);

	visuPage.open();
}
