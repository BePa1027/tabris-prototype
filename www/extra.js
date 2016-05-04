// Sexy //////////////////////////////////////////////////////

var counter = 0;

var page = tabris.create("Page", {
  title: "Miss Leopold",
  topLevel: true
});

var textView = tabris.create("TextView", {
	font: "30px",
	layoutData: {left: 50, top: 30},
	text: "wooooot"
}).appendTo(page);



var createImageView = function(scaleMode) {
  new tabris.ImageView({
    layoutData: {centerX: 0, top: [textView, 30], width: 300, height: 300},
    image: {src: "./images/hihi.png"},
    background: "white",
    scaleMode: scaleMode
  }).appendTo(page);
};

setInterval(function(){
	if(counter == 0){
		page.set("background", "blue");
		counter++;
	}
	else if(counter == 1){
		page.set("background", "green");
		counter++;
	}
	else if(counter == 2){
		page.set("background", "red");
		counter++;
	}
	else{
		page.set("background", "yellow");
		counter = 0;
	}
},50);


createImageView("fit");