
function nuclearMedicine() {
	
	var exams = Alloy.Globals.radiologyDB.getExams("Nuclear Medicine");
	var optionsArray = [];    			
		    			
	for (var i in exams){
		optionsArray.push(exams[i].bodypart);
	}		
	// Push cancel button to end of the array of options
	optionsArray.push("Cancel");	
	
	// Create the optionDialog with the array of options
	var dialog = Ti.UI.createOptionDialog({
	   	options: optionsArray,
    	title: 'Pick an examination'
	});	

	dialog.addEventListener('click', function(evt) {
		var examChosen = optionsArray[evt.index];
		var examData = Alloy.Globals.radiologyDB.getExamData("Nuclear Medicine", examChosen);
			
		for (var i in examData){								
			$.examChosenTextfield.value=examChosen;
			$.adminActivityTextfield.value=examData[i].meanAdministeredActivity + " (*Average value - click to edit)";
			$.effectDoseTextfield.value=examData[i].meanEffectiveDose;
				
			$.adminActivityTextfield.addEventListener('click', function(evt) {
				$.adminActivityTextfield.value=examData[i].meanAdministeredActivity;
			});
			$.adminActivityTextfield.addEventListener('change', function(evt) {
				var newValue = $.adminActivityTextfield.getValue();
				var newDose = newValue*examData[i].effectiveDosePerAdministeredActivity;
				$.effectDoseTextfield.value=newDose;
			});
		}
	});
	dialog.show();
}

function closeWindow() {
	$.win.close();
}
