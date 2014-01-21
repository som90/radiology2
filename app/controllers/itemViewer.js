

/* Accessing arguments that are passed through
 * 
 */

var args = arguments[0] || {}; //Put arguments into args, or empty object (if errors)
var items = Alloy.Globals.radiologyDB.items(args.title);

Ti.API.info(JSON.stringify(items));

$.win.title=args.title;

function checkForImages(items){
	for( var i in items ){    
		if(items[i].indexOf("http://") != -1) {
			return true;
		}
	}
	return false;
};

 

var viewsArray = [];

if(checkForImages(items) == true) {
	for( var i in items ){
		viewsArray.push(Alloy.createController("viewWithImage", {item:items[i]}).getView());
	}
}
else { //There are no images in this subheading
	for( var i in items ){
		var view = Ti.UI.createScrollView({layout:"vertical"}); //makes sure that the first thing add is on top, then under, etc.
   		view.add(Ti.UI.createLabel({text: items[i], top:5, color:"black"}));
   		
   		viewsArray.push(view);
	}
}

$.scrollableView.setViews(viewsArray);

//THIS WAS THE OLD CODE... MAY COME IN HANDY...
/*for( var i in items ){

    var view = Ti.UI.createScrollView({layout:"vertical"}); //makes sure that the first thing add is on top, then under, etc.
    
     if(items[i].indexOf("http://") != -1) { //Checking if the item is a url
    	//viewsArray.push(Alloy.createController("viewWithImage").getView());
    	//view.add(Ti.UI.createLabel({text: "Heading goes here", color:"white"})); 
    	view.add(Ti.UI.createLabel({text: items[i], top:5, color:"black"})); 	   	
		view.add((Ti.UI.createImageView({top:5, left:20, width: 40, height: 60, image: items[i]})));
	}
	else {	
		//view.add(Ti.UI.createLabel({text: "Heading goes here", color:"white"}));
		view.add(Ti.UI.createLabel({text: items[i], top:5, color:"black"}));
	}
	//view.setBackgroundImage( String backgroundImage )

    viewsArray.push(view);

}*/

