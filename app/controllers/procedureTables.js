function selectProcedure(){
	$.procedureOptions.show();
};

function addProcedure(option){		
	if (option.index==0) {
		$.procedureChoiceTextfield.value="Radiography";
	}
	else if (option.index==1) {
		$.procedureChoiceTextfield.value="CT";
	}
	else if (option.index==2) {
		$.procedureChoiceTextfield.value="Interventional Radiology";
	}
	else if (option.index==3) {
		$.procedureChoiceTextfield.value="Dental Radiography";
	}
	else if (option.index==4) {
		$.procedureChoiceTextfield.value="Nuclear Medicine";
	}
	else{
		//'Cancel' was chosen - Do nothing
	}
}
	
function selectBodypart(){		
	var areaChosen = $.procedureChoiceTextfield.getValue();
	var optionsArray = [];
	
	var bodyparts = Alloy.Globals.radiologyDB.getExams(areaChosen);
		
	for (var i in bodyparts){
		optionsArray.push(bodyparts[i].bodypart);
	}
	// Push cancel button to end of the array of options
	optionsArray.push("Cancel");
		
	// Create the optionDialog with the array of options
	var dialog = Ti.UI.createOptionDialog({
	   	options: optionsArray,
    	title: 'Choose a bodypart(/exam)'
	});	
	
	dialog.addEventListener('click', function(evt)
		{
			var examChosen = optionsArray[evt.index];
		    var examData = Alloy.Globals.radiologyDB.getExamData(areaChosen, examChosen);
		    
		    //Set the textfield to what was chosen
			$.bodypartChoiceTextfield.value=examChosen;
	
		    if(examChosen=="Cancel") {
		    	return;
		    }
			for (var i in examData){
				$.label2.text="\n \nAverage Effective Dose (mSv): \n"+examData[i].meanEffectiveDose;
				$.label3.text="\n \nValues Reported in Literature (mSv): \n"+examData[i].rangesReported;
			}
			
		});
		dialog.show(); 
}