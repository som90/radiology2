
//This creates a global reference to the Label so we can change the font
	Alloy.Globals.label = $.label;
	Alloy.Globals.heading = $.heading;
	
	
var args = arguments[0] || {};

$.heading.text = args.object.heading; 

if(args.object.item.indexOf("/images/") != -1) { //Checking if the item is a url
	$.imageView.image=args.object.item; 
}
else {
	//$.label.text=args.item;
	$.label.text=args.object.item;
}

function fullScreen() {
	var fullImage = Alloy.createController("fullScreenImage", {image : args.object.item }).getView();
	fullImage.open();

}
