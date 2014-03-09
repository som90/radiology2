
function chooseProcedure(){
	$.procedureOptions.show();
}

function addProcedure(option){
	if (option.index==0) {
		//areaChosen = "Radiography";
		radiography();
		
	}	
	else if (option.index==1) {
		//areaChosen = "CT";
		ct();
	}	
	else if (option.index==2) {
		// areaChosen = "Interventional Radiology";
		
		interventional();
	}	
	else if (option.index==3) {
		// areaChosen = "Dental Radiography";
		
		dental();
	}		
	else if (option.index==4) {
		// areaChosen = "Nuclear Medicine";
		
		nuclear();
	}
	else{
		//'Cancel' was chosen - Do nothing
		return;
	}
}

function radiography(){
	$.instructionLabel.hide();
	var tableDataArray = [];
	$.procedureTable.setData(tableDataArray);
	$.procedureLabel.setText("Radiography");
	
	var exams = Alloy.Globals.radiologyDB.getExams("Radiography");
	Ti.API.info(JSON.stringify(exams));
	tableDataArray.push(createRow("Examination", "Mean Effective Dose\n(mSv)", "Ranges Reported\n(mSv)", true));
	for (var i in exams){
		tableDataArray.push(createRow(exams[i].bodypart, exams[i].meanEffectiveDose, exams[i].rangesReported, false));
	}
	
	$.procedureTable.setData(tableDataArray);
	$.procedureTable.show();
	
	// Resource Clean-Up
	tableDataArray = null;
}

function ct(){
	$.instructionLabel.hide();
	var tableDataArray = [];
	$.procedureTable.setData(tableDataArray);
	$.procedureLabel.setText("CT - Computed Tomography");
		
	var exams = Alloy.Globals.radiologyDB.getExams("CT");
	Ti.API.info(JSON.stringify(exams));
	tableDataArray.push(createRow("Examination", "Mean Effective Dose\n(mSv)", "Ranges Reported\n(mSv)", true));
	for (var i in exams){
		tableDataArray.push(createRow(exams[i].bodypart, exams[i].meanEffectiveDose, exams[i].rangesReported, false));
	}
	
	$.procedureTable.setData(tableDataArray);
	$.procedureTable.show();
	
	// Resource Clean-Up
	tableDataArray = null;
}

function interventional(){
	$.instructionLabel.hide();
	var tableDataArray = [];
	$.procedureTable.setData(tableDataArray);
	$.procedureLabel.setText("Interventional Radiology");
	
	var exams = Alloy.Globals.radiologyDB.getExams("Interventional Radiology");
	Ti.API.info(JSON.stringify(exams));
	tableDataArray.push(createRow("Examination", "Mean Effective Dose\n(mSv)", "Ranges Reported\n(mSv)", true));
	for (var i in exams){
		tableDataArray.push(createRow(exams[i].bodypart, exams[i].meanEffectiveDose, exams[i].rangesReported, false));
	}
	
	$.procedureTable.setData(tableDataArray);
	$.procedureTable.show();
	
	// Resource Clean-Up
	tableDataArray = null;
}

function dental(){
	$.instructionLabel.hide();
	var tableDataArray = [];
	$.procedureTable.setData(tableDataArray);
	$.procedureLabel.setText("Dental Radiography");
	
	var exams = Alloy.Globals.radiologyDB.getExams("Dental Radiography");
	Ti.API.info(JSON.stringify(exams));
	tableDataArray.push(createRow("Examination", "Mean Effective Dose\n(mSv)", "Ranges Reported\n(mSv)", true));
	for (var i in exams){
		tableDataArray.push(createRow(exams[i].bodypart, exams[i].meanEffectiveDose, exams[i].rangesReported, false));
	}
	
	$.procedureTable.setData(tableDataArray);
	$.procedureTable.show();
	
	// Resource Clean-Up
	tableDataArray = null;
}

function nuclear(){
	$.instructionLabel.hide();
	var tableDataArray = [];
	$.procedureTable.setData(tableDataArray);
	$.procedureLabel.setText("Nuclear Medicine");
	
	var exams = Alloy.Globals.radiologyDB.getExams("Nuclear Medicine");
	Ti.API.info(JSON.stringify(exams));
	tableDataArray.push(createRow("Examination", "Mean Effective Dose\n(mSv)", "Administered Activity\n(MBq)", true));
	for (var i in exams){
		tableDataArray.push(createRow(exams[i].bodypart, exams[i].meanEffectiveDose, exams[i].meanAdministeredActivity, false));
	}
	
	$.procedureTable.setData(tableDataArray);
	$.procedureTable.show();
	
	// Resource Clean-Up
	tableDataArray = null;
}
	// Function To Generate Table Row
function createRow(exam, aed, vrl, Header)
{
    // Create Table Row
    var tableRow = Ti.UI.createTableViewRow({ height: '50dp' });
 
    // Create Table Row Columns
    var examView   = Ti.UI.createView({ left : 0, width : "50%"});
    var aedView   = Ti.UI.createView({ left : "50%", width : "25%"});
    var vrlView  = Ti.UI.createView({ right : 0, width : "25%"});
 
    // Create Table Row Column Labels
    if(Header) {
	    examView.add(Ti.UI.createLabel({   color : "red", font : {fontWeight : "bold"}, text: exam   }));
	    aedView.add(Ti.UI.createLabel({   color : "red", font : {fontWeight : "bold"}, text: aed   }));
	    vrlView.add(Ti.UI.createLabel({  color : "red", font : {fontWeight : "bold"}, text: vrl   }));
	}
	else {
		examView.add(Ti.UI.createLabel({ color : "black", text: exam   }));
		aedView.add(Ti.UI.createLabel({ color : "black", text: aed   }));
	    vrlView.add(Ti.UI.createLabel({ color : "black", text: vrl   }));
	}
    // Add Columns To Table Row
    tableRow.add(examView);
    tableRow.add(aedView);
    tableRow.add(vrlView);
 
    // Resource Clean-Up
    examView = aedView = vrlView = null;
 
    // Finished
    return tableRow;
}







// function selectProcedure(){
	// $.procedureOptions.show();
// };
// 
// function addProcedure(option){		
	// if (option.index==0) {
		// $.procedureChoiceTextfield.value="Radiography";
	// }
	// else if (option.index==1) {
		// $.procedureChoiceTextfield.value="CT";
	// }
	// else if (option.index==2) {
		// $.procedureChoiceTextfield.value="Interventional Radiology";
	// }
	// else if (option.index==3) {
		// $.procedureChoiceTextfield.value="Dental Radiography";
	// }
	// else if (option.index==4) {
		// $.procedureChoiceTextfield.value="Nuclear Medicine";
	// }
	// else{
		// //'Cancel' was chosen - Do nothing
	// }
// }
// 	
// function selectBodypart(){		
	// var areaChosen = $.procedureChoiceTextfield.getValue();
	// var optionsArray = [];
// 	
	// var bodyparts = Alloy.Globals.radiologyDB.getExams(areaChosen);
// 		
	// for (var i in bodyparts){
		// optionsArray.push(bodyparts[i].bodypart);
	// }
	// // Push cancel button to end of the array of options
	// optionsArray.push("Cancel");
// 		
	// // Create the optionDialog with the array of options
	// var dialog = Ti.UI.createOptionDialog({
	   	// options: optionsArray,
    	// title: 'Choose a bodypart(/exam)'
	// });	
// 	
	// dialog.addEventListener('click', function(evt)
		// {
			// var examChosen = optionsArray[evt.index];
		    // var examData = Alloy.Globals.radiologyDB.getExamData(areaChosen, examChosen);
// 		    
		    // //Set the textfield to what was chosen
			// $.bodypartChoiceTextfield.value=examChosen;
// 	
		    // if(examChosen=="Cancel") {
		    	// return;
		    // }
			// for (var i in examData){
				// $.label2.text="\n \nAverage Effective Dose (mSv): \n"+examData[i].meanEffectiveDose;
				// $.label3.text="\n \nValues Reported in Literature (mSv): \n"+examData[i].rangesReported;
			// }
// 			
		// });
		// dialog.show(); 
// }
