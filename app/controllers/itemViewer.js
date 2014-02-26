

/* Accessing arguments that are passed through
 * 
 */

var args = arguments[0] || {}; //Put arguments into args, or empty object (if errors)
//var subsections = Alloy.Globals.radiologyDB.subsections(args.title);
var items = Alloy.Globals.radiologyDB.items(args.title);

Ti.API.info(JSON.stringify(items));

$.win.title=args.title;

function checkForImages(items){
	for( var i in items ){    
		//going through items[], checking the 'key' item....
		if(items[i].item.indexOf("/images/") != -1) {
			return true;
		}
	}
	return false;
};

 

var viewsArray = [];

if(checkForImages(items) == true) {
	for( var i in items ){
		viewsArray.push(Alloy.createController("viewWithMedia", {object:items[i]}).getView());
	}
}
else { //There are no images in this section
	for( var i in items ){
		viewsArray.push(Alloy.createController("viewWithNoMedia", {object:items[i]}).getView());
	}
}

$.scrollableView.setViews(viewsArray);


