

/* Accessing arguments that are passed through
 * 
 */

var args = arguments[0] || {}; //Put arguments into args, or empty object (if errors)
Ti.API.info(args.title);
var subsections = Alloy.Globals.radiologyDB.subsections(args.title);
Ti.API.info(JSON.stringify(subsections));

$.win.title=args.title;

 for (var i in subsections) 
 {

		 $.table.appendRow(subsections[i]);
 }

// Open new window with the item
	function itemsWindow(event){
		var addWindow = Alloy.createController("itemViewer", {title: event.row.title}).getView();
		
		Alloy.Globals.tabChapters.open( addWindow );
	};