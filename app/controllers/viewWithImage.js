
var args = arguments[0] || {};

$.label.text=args.item;

if(args.item.indexOf("http://") != -1) { //Checking if the item is a url
	$.imageView.image=args.item;    
}


function testfunction() {
	alert("test");
}
