
/*
 * Init
 */

//This creates a global reference to the tab
Alloy.Globals.tabChapters = $.tabChapters;
		
// Check to see if this is the first time the app has been run
if( !Ti.App.Properties.hasProperty("firstTime") )
{
	$.index.open();
	
	// 'init' will return false if there 
	if(Ti.Network.online==false) {
		alert("Please connect to the internet to initialize the app.");
	}
	else {
		// Passing the loadChapters function in so we can access on the next page. The reason is so that the chapters will not be loaded before the Local DB has a chance to be populated by the call to the Server DB.
		Alloy.Globals.radiologyDB.initEbookData("radiology", loadChapters);
		Alloy.Globals.radiologyDB.initExamTables("radiology");
		Ti.App.Properties.setBool("firstTime", false);	
	}
}
	
else	// every other time the app is opened it should just use whatever is in the localDB.
{
	$.index.open();
	var tableData = Alloy.Globals.radiologyDB.getCachedData("radiology");
	$.table.setData(tableData);
}
	
function checkForUpdates(){		
	//passing the function in so we can access on the next page
	Alloy.Globals.radiologyDB.update("radiology", updateChapters);
	var index = Alloy.createController('index');
	index.getView().open();
}
	
function loadChapters() {
	var chapters = Alloy.Globals.radiologyDB.chapters();

	for (var i in chapters) 
 	{

		$.table.appendRow(chapters[i]);
 	}
 }
 
function updateChapters() {
	var chapters = Alloy.Globals.radiologyDB.chapters();

	for (var i in chapters) 
 	{
		$.table.updateRow(i, chapters[i]);
 	}
}   


// Open new window with list of sections
function sectionsWindow(event){
	var addWindow = Alloy.createController("sectionsList", {title: event.row.name}).getView();
	Alloy.Globals.tabChapters.open( addWindow );
};
	
function ctCalculator(){
	var calc = Alloy.createController("calculator", {calculator : "ct" }).getView();
	$.tools.open(calc);
};
function nucCalculator(){
	var calc = Alloy.createController("calculator", {calculator : "nuclear" }).getView();
	$.tools.open(calc);
};

function procedures(){
	var procedures = Alloy.createController("procedureTables").getView();
	$.tools.open(procedures);
}

function changeFontLarge(){
	// var itemViewer = Alloy.createController('itemViewer');
	// itemViewer.resetClass(itemViewer.label, '', {color:"green"});
	//itemViewer.getView().open();
	alert("Feature not yet supported.");		
}



	
	// // Function To Generate Table Row
// function createRow(exam, aed, vrl, Header)
// {
    // // Create Table Row
    // var tableRow = Ti.UI.createTableViewRow({ height: '100dp' });
//  
    // // Create Table Row Columns
    // var examView   = Ti.UI.createView({ left : 0, width : "40%"});
    // var aedView   = Ti.UI.createView({ left : "40%", width : "25%"});
    // var vrlView  = Ti.UI.createView({ right : 0, width : "25%"});
//  
    // // Create Table Row Column Labels
    // if(Header) {
	    // examView.add(Ti.UI.createLabel({   color : "red", textAlign: "left", fontWeight : "bold", text: exam   }));
	    // aedView.add(Ti.UI.createLabel({   color : "red", textAlign: "center", fontWeight : "bold", text: aed   }));
	    // vrlView.add(Ti.UI.createLabel({  color : "red", textAlign: "center", fontWeight : "bold", text: vrl   }));
	// }
	// else {
		// examView.add(Ti.UI.createLabel({ textAlign: "left", text: exam   }));
		// aedView.add(Ti.UI.createLabel({ textAlign: "center", text: aed   }));
	    // vrlView.add(Ti.UI.createLabel({ textAlign: "center", text: vrl   }));
	// }
    // // Add Columns To Table Row
    // tableRow.add(examView);
    // tableRow.add(aedView);
    // tableRow.add(vrlView);
//  
    // // Resource Clean-Up
    // examView = aedView = vrlView = null;
//  
    // // Finished
    // return tableRow;
// }

	


