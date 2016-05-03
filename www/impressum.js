// Impressum //////////////////////////////////////////////////////

var page = tabris.create("Page", {
  title: "Impressum",
  topLevel: true
});

var textView = tabris.create("TextView", {
	font: "22px",
	layoutData: {left: 50, top: 20},
	text: "Autoren:\n\nPatrick Bechtold - B.Eng. \nPhilipp Leopold - B.Eng."
}).appendTo(page);

var textView2 = tabris.create("TextView", {
	font: "18px",
	layoutData: {left: 20, right: 20, top: [textView, 50]},
	text: "Beispielapplikation zur Kommunikation via Bluetooth- und HTTP-Verbindungen."
}).appendTo(page);

var textView3 = tabris.create("TextView", {
	font: "18px",
	layoutData: {left: 20, right: 20, top: [textView2, 50]},
	text: "Applikation erstellt mit dem TabrisJS-Framework."
}).appendTo(page);

var textView4 = tabris.create("TextView", {
	encoding: "ISO-8859-1",
	font: "18px",
	layoutData: {left: 20, right: 20, top: [textView3, 50]},
	text: "Copyright 2016 - Institut für Energieeffiziente Mobilität"
}).appendTo(page);


var createImageView = function(scaleMode) {
  new tabris.ImageView({
    layoutData: {centerX: 0, top: [textView4, 30], width: 300, height: 100},
    image: {src: "./images/IEEM.png"},
    background: "white",
    scaleMode: scaleMode
  }).appendTo(page);
};


createImageView("fit");