
/*
 * Init
 */

$.index.open();

//This creates a global reference to the tab
Alloy.Globals.tabChapters = $.tabChapters;
     
$.table.setData(Alloy.Globals.radiologyDB.chapters());


// Open new window with list of sections
	function sectionsWindow(event){
		var addWindow = Alloy.createController("sectionsList", {title: event.row.title}).getView();
		Alloy.Globals.tabChapters.open( addWindow );
		
		//The following works to add a new Window which allows to get down to subsections, but loses reversal
			//addWindow.open();
	};