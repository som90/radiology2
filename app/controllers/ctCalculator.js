
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
	var dlp = $.dlpValueTextfield.getValue();
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
	
	$.resultLabel.text="Estimated Dosage= "+dlp*conversionFactor;
}

function closeWindow() {
	$.win.close();
}
