// Impressum //////////////////////////////////////////////////////

var page = tabris.create("Page", {
  title: "Miss Leopold",
  topLevel: true
});

var textView = tabris.create("TextView", {
	font: "30px",
	layoutData: {left: 50, top: 30},
	text: "Biatchhhh"
}).appendTo(page);



var createImageView = function(scaleMode) {
  new tabris.ImageView({
    layoutData: {centerX: 0, top: [textView, 30], width: 300, height: 300},
    image: {src: "./images/biatch.png"},
    background: "white",
    scaleMode: scaleMode
  }).appendTo(page);
};


createImageView("fit");