
/*
 * Checking the theme property to set the backGroundImage appropriately 
 */
if(Ti.App.Properties.getString("theme") == "black")
{
	$.winNucCalc.backgroundImage="/images/radiologyBackgroundInverted.jpg";
	
	$.examChosenLabel.setColor("white");
	$.adminActivityLabel.setColor("white");
	$.resultLabel.setColor("white");
	// $.effectDoseLabel.setColor("white");
}	
else
{
	$.winNucCalc.backgroundImage="/images/radiologyBackground.jpg";
	
	$.examChosenLabel.setColor("black");
	$.adminActivityLabel.setColor("black");
	$.resultLabel.setColor("black");
	// $.effectDoseLabel.setColor("black");
}

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
			// $.effectDoseTextfield.value=examData[i].meanEffectiveDose;
			$.resultLabel.text="Effective Dose: " + examData[i].meanEffectiveDose + "mSv";
				
			$.adminActivityTextfield.addEventListener('click', function(evt) {
				$.adminActivityTextfield.value=examData[i].meanAdministeredActivity;
			});
			$.adminActivityTextfield.addEventListener('change', function(evt) {
				var newValue = $.adminActivityTextfield.getValue();
				var newDose = newValue*examData[i].effectiveDosePerAdministeredActivity;
				$.resultLabel.text="Effective Dose: " + newDose + "mSv";
				// $.effectDoseTextfield.value=newDose;
			});
		}
	});
	dialog.show();
}

function closeWindow() {
	$.win.close();
}
