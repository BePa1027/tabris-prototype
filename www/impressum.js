// Impressum //////////////////////////////////////////////////////

var createImageView = function(scaleMode) {
  new tabris.ImageView({
    layoutData: {centerX:0, bottom: 10, width: 250, height: 100},
    image: {src: "images/IEEM.jpg"},
    background: "#aaaaaa",
    scaleMode: scaleMode
  }).appendTo(page);
};