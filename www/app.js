// Globals ////////////////////////////////////////////////////////

var radioButtons = ["Bluetooth", "HTTP"];
var urlInput = 0;
var urlTextView = 0;

// Global UI style elements ///////////////////////////////////////

tabris.ui.set("background", "red");

// First Page /////////////////////////////////////////////////////

var page = tabris.create("Page", {
  title: "Main",
  topLevel: true
});


var textView = tabris.create("TextView", {
	font: "18px",
	layoutData: {centerX: 0, top: 10},
	text: "Fetch data via Bluetooth or HTTP-Request"
}).appendTo(page);


// Radio Buttons for either Bluetooth or HTTP-Request
radioButtons.forEach(function(title){
	new tabris.RadioButton({
		layoutData: {left: 10, top: "prev() 10"},
		text: title		
	}).on("change:selection", function(widget){
      
      if(widget.get("text") == "Bluetooth"){ // Bluetooth
                
        if(urlInput){
          urlInput.dispose();
        }
        if(urlTextView){
          urlTextView.dispose();
        }
        
      }
      else{ // HTTP
        
        // show url input field
        if(urlInput){
          urlInput.dispose();
        }
        urlInput = new tabris.TextInput({
 			layoutData: {top: "prev() 10", left: 10, right: "10%"},
  			message: "Enter URL and confirm"
		}).on("accept", function(widget, text){
          
          	// delete old textview if existent
          	if(urlTextView){
              urlTextView.dispose();
            }
          
		  	var xhr = new tabris.XMLHttpRequest();
          	xhr.onreadystatechange = function() {
		    if (xhr.readyState === xhr.DONE) {
              
		      //urlTextView = new tabris.TextView({
		      //  layoutData: {left: 20, right: 20, top: "prev() 10"},
		      //  text: JSON.parse(xhr.responseText)[1].join(", ")
		      //}).appendTo(page);
              
		      urlTextView = tabris.create("TextView", {
		        layoutData: {left: 20, right: 20, top: "prev() 10"},
		        text: JSON.parse(xhr.responseText)[1].join(", ")
		      }).appendTo(page);
		    }
		  };
		  xhr.open("GET", "http://en.wiktionary.org/w/api.php?action=opensearch&search=mobile&limit=100");
		  xhr.send();
        }).appendTo(page);
        
      }
    }).appendTo(page);
});
 
page.open();

// Second Page ////////////////////////////////////////////////////

// Functions //////////////////////////////////////////////////////

// Timers /////////////////////////////////////////////////////////
      
      
      
      
      
      