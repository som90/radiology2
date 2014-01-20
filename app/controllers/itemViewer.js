

/* Accessing arguments that are passed through
 * 
 */

var args = arguments[0] || {}; //Put arguments into args, or empty object (if errors)
var items = Alloy.Globals.radiologyDB.items(args.title);

$.win.title=args.title;


/* for (var i in items) 
 {
		 $.table.appendRow(items[i]);
 }*/
 

var viewsArray = [];

for( var i in items ){

    var view = Ti.UI.createScrollView();
    
     if(items[i].indexOf("http://") != -1) { //Checking if the item is a url
    	view.add(Ti.UI.createLabel({text: items[i], id: 'text', color:"white"}));  	   	
		view.add((Ti.UI.createImageView({/*top:$.text.height,*/ left:20, width: 40, height: 60, image: items[i]})));
	}
	else {	
		view.add(Ti.UI.createLabel({text: items[i], id: 'text', color:"white"}));
	}
	//view.setBackgroundImage( String backgroundImage )

    viewsArray.push(view);

}

$.scrollableView.setViews(viewsArray);