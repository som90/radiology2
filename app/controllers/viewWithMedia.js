
var args = arguments[0] || {};

$.heading.text = args.object.heading; 

if(args.object.item.indexOf("/images/") != -1) { //Checking if the item is a url
	$.imageView.image=args.object.item; 
}
else {
	//$.label.text=args.item;
	$.label.text=args.object.item;
}

function testfunction() {
	alert("test");
}
