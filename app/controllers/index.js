
/*
 * Init
 */

$.index.open();
//This creates a global reference to the tab
Alloy.Globals.tabChapters = $.tabChapters;

var chapters = Alloy.Globals.radiologyDB.chapters();

for (var i in chapters) 
 {

		 $.table.appendRow(chapters[i]);
 }   


// Open new window with list of sections
	function sectionsWindow(event){
		var addWindow = Alloy.createController("sectionsList", {title: event.row.name}).getView();
		Alloy.Globals.tabChapters.open( addWindow );
		
		//The following works to add a new Window which allows to get down to subsections, but loses reversal
			//addWindow.open();
	};
	
	function selectBodyPart(){
		$.bodyPart.show();
	};
	
	function doSomething(option){
		if (option.index=0) {
			//add ID to textfield and set to "head, etc."
			//when writing to textfield use '.value'
			//likewise when reading from textField.
		}
	};
	


