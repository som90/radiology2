
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
	
function selectBodyPart(){
	$.bodyPart.show();
};
	
function addBodypart(option){
	if (option.index==0) {
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

function changeFontLarge(){
	// var itemViewer = Alloy.createController('itemViewer');
	// itemViewer.resetClass(itemViewer.label, '', {color:"green"});
	//itemViewer.getView().open();
	
	var xhr = Titanium.Network.createHTTPClient({
						onload: function() {
							// first, grab a "handle" to the file where you'll store the downloaded data
							var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tester.jpg');
							f.write(this.responseData); // write to the file
							Ti.App.fireEvent('image_downloaded', {filepath:f.nativePath});
						},
						timeout: 10000
					});
					var item="slide9.jpg";
					xhr.open('GET','http://cs1.ucc.ie/~som6/bin/FYP/prototype/images/' + item);
					xhr.send();

						Ti.App.addEventListener('image_downloaded', function(e) {
							// you don't have to fire an event like this, but perhaps multiple components will
							// want to know when the image has been downloaded and saved
							$.testImage.image = e.filepath; 
							alert(e.filepath);
							Ti.API.info(e.filepath);
					});
					
}

function selectProcedure(){
	$.procedureOptions.show();
};

function addProcedure(option){	
	var areaChosen;
	var optionsArray = [];
	
	if (option.index==0) {
		areaChosen = "Radiography";
		
		var examArea = Alloy.Globals.radiologyDB.getExams(areaChosen);
		
		for (var i in examArea){
			optionsArray.push(examArea[i].bodypart);
		}
	}	
	else if (option.index==1) {
		areaChosen = "CT";
		
		var examArea = Alloy.Globals.radiologyDB.getExams(areaChosen);
		
		for (var i in examArea){
			optionsArray.push(examArea[i].bodypart);
		}
	}	
	else if (option.index==2) {
		areaChosen = "Interventional Radiology";
		
		var examArea = Alloy.Globals.radiologyDB.getExams(areaChosen);
		
		for (var i in examArea){
			optionsArray.push(examArea[i].bodypart);
		}
	}	
	else if (option.index==3) {
		areaChosen = "Dental Radiography";
		
		var examArea = Alloy.Globals.radiologyDB.getExams(areaChosen);
		
		for (var i in examArea){
			optionsArray.push(examArea[i].bodypart);
		}
	}		
	else if (option.index==4) {
		areaChosen = "Nuclear Medicine";
		
		var examArea = Alloy.Globals.radiologyDB.getExams(areaChosen);
		
		for (var i in examArea){
			optionsArray.push(examArea[i].bodypart);
		}
	}
	else{
		//'Cancel' was chosen - Do nothing
		return;
	}
	
	// Set title for chosen option
	$.procedureChoice.text=areaChosen;
	// Push cancel button to end of the array of options
	optionsArray.push("Cancel");	
	// Create the optionDialog with the array of options
	var dialog = Ti.UI.createOptionDialog({
	   	options: optionsArray,
    	title: 'Pick an examination'
	});	
	// Show the optionDialog
	//dialog.show();
//} //Remove this if using the eventlistener
	
	dialog.addEventListener('click', function(evt)
		{
			var examChosen = optionsArray[evt.index];
		    var examData = Alloy.Globals.radiologyDB.getExamData(areaChosen, examChosen);
		    
		    if(examChosen=="Cancel") {
		    	return;
		    }
		    
		    $.label1.text=null;
			$.label2.text=null;
			$.label3.text=null;					
			
			if(areaChosen=="Nuclear Medicine") {
				for (var i in examData){								
					$.label1.text="\n Examination/Investigation Chosen: \n"+examChosen;
					$.label2.text="\n \n Administered Activity (MBq)";
					$.aaTextfield.value=examData[i].meanAdministeredActivity + " (*Average value - click to edit)";
					$.aaTextfield.show();
					$.label3.text="\n \n Effective Dose (mSv): \n"+examData[i].meanEffectiveDose;
					
					$.aaTextfield.addEventListener('click', function(evt) {
						$.aaTextfield.value=examData[i].meanAdministeredActivity;
					});
					$.aaTextfield.addEventListener('change', function(evt) {
						var newValue = $.aaTextfield.getValue();
						Ti.API.info(newValue);
						var newDose = newValue*examData[i].effectiveDosePerAdministeredActivity;
	
						$.label3.text="\n \n Effective Dose (mSv): \n"+newDose;
					});
				}
			}
			else{
				$.aaTextfield.hide();
				for (var i in examData){
					$.label1.text="\n Examination/Investigation Chosen: \n"+examChosen;
					$.label2.text="\n \n Average Effective Dose (mSv): \n"+examData[i].meanEffectiveDose;
					$.label3.text="\n \n Values Reported in Literature (mSv): \n"+examData[i].rangesReported;
				}
			}
		});
		dialog.show(); 
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

	


