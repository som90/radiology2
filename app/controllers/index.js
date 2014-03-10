
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
		
		var curTimestamp = getTimestamp();
		//Need to set an app property to the current date, that is, the date that the content was last updated. Each time the content gets updated this will be updated.
		Ti.App.Properties.setString("lastUpdatedTimestamp", curTimestamp);
		//Also need to set an app property for the fontSize to be initialized at Medium.
		Ti.App.Properties.setString("fontClass", "medFont");
		//Also need to set an app property for the fontSize to be initialized at Medium.
		Ti.App.Properties.setString("theme", "white");
		
		//The following is a check to see if the device is handheld or tablet
		var deviceHeight = Ti.Platform.displayCaps.platformHeight;
        var deviceWidth = Ti.Platform.displayCaps.platformWidth;
        if(deviceHeight > 899 || deviceHeight > 899)
        {
        	Ti.App.Properties.setBool("isTablet", true);
        }
        else
        {
        	Ti.App.Properties.setBool("isTablet", false);
        }
	}
}
	
else	// every other time the app is opened it should just use whatever is in the localDB.
{
	 //Checking the theme property to set the backGroundImage appropriately
	checkTheme();
	
	$.index.open();
	var tableData = Alloy.Globals.radiologyDB.getCachedData("radiology");
	$.table.setData(tableData);
	
	// Check to see if any updates are needed.
	checkIfUpdateIsNeeded();
	
	//Also need to reset the app property for the fontSize back to Medium as per default.
	Ti.App.Properties.setString("fontClass", "medFont");
	
	//The following is a check to see if the device is handheld or tablet
	var deviceHeight = Ti.Platform.displayCaps.platformHeight;
    var deviceWidth = Ti.Platform.displayCaps.platformWidth;
    if(deviceHeight > 899 || deviceHeight > 899)
    {
    	Ti.App.Properties.setBool("isTablet", true);
    }
    else
    {
    	Ti.App.Properties.setBool("isTablet", false);
    }
}

/*
 * Android seems to fire 'focus' every time you press a button within the tab, which is slowing it down
 * So quicker to only fire once you are not in the tab, which happens less often.
 */
if(Ti.Platform.name == "android") {
	$.tabChapters.addEventListener('blur', checkIfUpdateIsNeeded);
}
else {
	$.tabChapters.addEventListener('focus', checkIfUpdateIsNeeded);
}

/*
 * Checking the theme property to set the backGroundImage appropriately 
 */	
function checkTheme() {
	if(Ti.App.Properties.getString("theme") == "black")
	{
		$.winHome.backgroundImage="/images/radiologyBackgroundInverted.jpg";
		$.winPreferences.backgroundImage="/images/radiologyBackgroundInverted.jpg";
		$.winTools.backgroundImage="/images/radiologyBackgroundInverted.jpg";
		$.winInfo.backgroundImage="/images/radiologyBackgroundInverted.jpg";
		
		$.appTitle.setColor("white");
		$.version.setColor("white");
		$.aboutHeading.setColor("white");
		$.aboutInfo.setColor("white");
		$.copyright.setColor("white");
	}
		
	else
	{
		$.winHome.backgroundImage="/images/radiologyBackground.jpg";
		$.winPreferences.backgroundImage="/images/radiologyBackground.jpg";
		$.winTools.backgroundImage="/images/radiologyBackground.jpg";
		$.winInfo.backgroundImage="/images/radiologyBackground.jpg";
		
		$.appTitle.setColor("black");
		$.version.setColor("black");
		$.aboutHeading.setColor("black");
		$.aboutInfo.setColor("black");
		$.copyright.setColor("black");
	}
}	

function checkIfUpdateIsNeeded() {
	Ti.API.info("hit it");
	//Before we check if the update is needed we need to update all the lastUpdated fields from the Server
	//Alloy.Globals.radiologyDB.updateLastUpdated("radiology");
	//Now we can check the localDB for stale information
	var isNeeded = Alloy.Globals.radiologyDB.checkUpdates("radiology",Ti.App.Properties.getString("lastUpdatedTimestamp"));
	
	if (isNeeded) {
		alert("eLEARNING MADEEASY NOTIFICATION: \nThere has been updates made to the content. Please go to the updates page to download.");
		
		$.tabUpdates.setIcon("KS_nav_views_notification.png");
	}
}
	
function makeUpdates(){		
	//passing the function in so we can access on the next page
	Alloy.Globals.radiologyDB.update("radiology", updateChapters);
	
	var curTimestamp = getTimestamp();
	//Need to update the timestamp property so we know when we last updated content
	Ti.App.Properties.setString("lastUpdatedTimestamp", curTimestamp);	
	
	//Open the home page again
	var index = Alloy.createController('index');
	index.getView();
	alert("Content has been updated");
	$.tabUpdates.setIcon("KS_nav_views.png");
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

/*
 * The following block of code just enables us to get the time in the correct format throughout the app.
 */
function getTimestamp() {
	var d=new Date();
	var year = d.getFullYear();
	var month = d.getMonth()+1;	
		if (month < 10) 
		{
			month = "0" + month;
		}
	var date = d.getDate();
		if (date < 10) 
		{
			date = "0" + date;
		}
	var hours = d.getHours();
		if (hours < 10) 
		{
			hours = "0" + hours;
		}
	var minutes = d.getMinutes();
		if (minutes < 10) 
		{
			minutes = "0" + minutes;
		}
	var seconds = d.getSeconds();
		if (seconds < 10) 
		{
			seconds = "0" + seconds;
		}
	var curTimestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
	return curTimestamp;
}


// Open new window with list of sections
function sectionsWindow(event){
	var addWindow = Alloy.createController("sectionsList", {title: event.row.name}).getView();
	Alloy.Globals.tabChapters.open( addWindow );
};
	
function ctCalculator(){
	var ctCalc = Alloy.createController("ctCalculator").getView();
	$.tools.open(ctCalc);
};
function nucCalculator(){
	var nucCalc = Alloy.createController("nucCalculator").getView();
	$.tools.open(nucCalc);
};

function procedures(){
	var procedures = Alloy.createController("procedureTables").getView();
	$.tools.open(procedures);
}

function switchFonts(){
	
	if ($.fontSwitch.value)
	{
		Ti.App.Properties.setString("fontClass", "largeFont");
	}
	else 
	{
		Ti.App.Properties.setString("fontClass", "medFont");
	}
}

function themeSwitch(){
	
	if(Ti.App.Properties.getString("theme") =="white") {
		//make it black
		Ti.App.Properties.setString("theme", "black");
	}
	else {
		//make it white
		Ti.App.Properties.setString("theme", "white");
	}
	//Open the home page again
	var index = Alloy.createController('index');
	index.getView();
	
	// if ($.themeSwitch.value)
	// {
		// Ti.App.Properties.setString("theme", "black");
		// $.winHome.backgroundImage="/images/radiologyBackgroundInverted.jpg";
		// $.winPreferences.backgroundImage="/images/radiologyBackgroundInverted.jpg";
		// $.winTools.backgroundImage="/images/radiologyBackgroundInverted.jpg";
		// $.winInfo.backgroundImage="/images/radiologyBackgroundInverted.jpg";
// 		
		// Alloy.Globals.tableRowLabel.setColor("white");
	// }
	// else 
	// {
		// Ti.App.Properties.setString("theme", "white");
		// $.winHome.backgroundImage="/images/radiologyBackground.jpg";
		// $.winPreferences.backgroundImage="/images/radiologyBackground.jpg";
		// $.winTools.backgroundImage="/images/radiologyBackground.jpg";
		// $.winInfo.backgroundImage="/images/radiologyBackground.jpg";
// 		
		// Alloy.Globals.tableRowLabel.setColor("white");
	// }
}

function donate(){
	alert("Please hand the smiling gentleman beside you €10 immediately.");
}
	


	
