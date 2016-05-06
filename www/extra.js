// extra //////////////////////////////////////////////////////

var counter = 0;

var page = tabris.create("Page", {
  title: "Miss Bechtold",
  topLevel: true
});

var tabFolder = new tabris.TabFolder({
  layoutData: {left: 0, top: 0, right: 0, bottom: 0},
  paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
}).appendTo(page);


var createImageView = function(scaleMode) {
  new tabris.ImageView({
    layoutData: {centerX: 0, centerY: 0, width: 300, height: 300},
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