

/* Accessing arguments that are passed through
 * 
 */
var args = arguments[0] || {}; //Put arguments into args, or empty object (if errors)
Ti.API.info(args.title);
var sections = Alloy.Globals.radiologyDB.sections(args.title);
//Ti.API.info(JSON.stringify(sections));

$.win.title=args.title;

 for (var i in sections) 
 {

		 $.table.appendRow(sections[i]);
 }

// Open new window with list of subsections
	function subsectionsWindow(event){
		var addWindow = Alloy.createController("subsectionsList", {title: event.row.title}).getView();
		
		Alloy.Globals.tabChapters.open( addWindow );
	};