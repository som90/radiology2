
/*
 * Init
 */

	//This creates a global reference to the tab
	Alloy.Globals.tabChapters = $.tabChapters;
		
	// Check for first time
	if( !Ti.App.Properties.hasProperty("firstTime") )
	{
		alert("firstTime");
		$.index.open();

		// Passing the loadChapters function in so we can access on the next page. The reason is so that the chapters will not be loaded before the Local DB has a chance to be populated by the call to the Server DB.
		Alloy.Globals.radiologyDB.init("radiology", loadChapters);
		
		Ti.App.Properties.setBool("firstTime", false);	
	}
	
	else	// every other time the app is opened it should just use whatever is in the localDB.
	{
		$.index.open();
		$.table.setData(Alloy.Globals.radiologyDB.chapters());
	}
	

function checkForUpdates(){		
	//passing the function in so we can access on the next page
	Alloy.Globals.radiologyDB.update("radiology", updateChapters);
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
	
	function selectBodyPart(){
		$.bodyPart.show();
	};
	
	function addBodypart(option){
		Ti.API.info(option.index);
		
		if (option.index==0) {
			//add ID to textfield and set to "head, etc."
			$.bodyPartTextfield.value="Head";
		}
		else if (option.index==1) {
			$.bodyPartTextfield.value="Neck";
		}
		else if (option.index==2) {
			$.bodyPartTextfield.value="Chest";
		}
		else if (option.index==3) {
			$.bodyPartTextfield.value="Abdomen";
		}
		else if (option.index==4) {
			$.bodyPartTextfield.value="Pelvis";
		}
		else{
			//'Cancel' was chosen - Do nothing
		}
	};
	
	function selectAgeRange(){
		$.ageRange.show();
	};
	
	function addAgeRange(option){
		Ti.API.info(option.index);
		
		if (option.index==0) {
			//add ID to textfield and set to "head, etc."
			$.ageRangeTextfield.value="Less than 1 year";
		}
		else if (option.index==1) {
			$.ageRangeTextfield.value="1-5 years";
		}
		else if (option.index==2) {
			$.ageRangeTextfield.value="5-10 years";
		}
		else if (option.index==3) {
			$.ageRangeTextfield.value="10-18 years";
		}
		else if (option.index==4) {
			$.ageRangeTextfield.value="18+ years";
		}
		else{
			//'Cancel' was chosen - Do nothing
		}
	};
	
	function calculateDosage(){
		
		var dlp = $.dlpValue.getValue();
		var part = $.bodyPartTextfield.getValue();
		var age = $.ageRangeTextfield.getValue();
		var conversionFactor;
		
		if (part=="Head"){
			conversionFactor = 0.023;
		}
		else if (part=="Neck"){
			conversionFactor = 0.0054;
		}
		else if (part=="Chest"){
			conversionFactor = 0.017;
		}
		else if (part=="Abdomen"){
			conversionFactor = 0.015;
		}
		else{ //i.e., pelvis
			conversionFactor = 0.019;
		}
		
		$.resultLabel.text="Estimated Dosage \n (DLP x Conversion Factor for body part): \n "+dlp*conversionFactor;
	}
	

	


