

/* Accessing arguments that are passed through
 * 
 */

var args = arguments[0] || {}; //Put arguments into args, or empty object (if errors)
Ti.API.info(args.title);
var items = Alloy.Globals.radiologyDB.items(args.title);
Ti.API.info(JSON.stringify(items));

$.win.title=args.title;


/* for (var i in items) 
 {
		 $.table.appendRow(items[i]);
 }*/
 

var viewsArray = [];

for( var i in items ){

    var view = Ti.UI.createView();

    view.add(Ti.UI.createLabel({text: items[i], color:"white"}));

    viewsArray.push(view);

}

$.scrollableView.setViews(viewsArray);