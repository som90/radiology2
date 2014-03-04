
//This creates a global reference to the Label so we can change the font
	Alloy.Globals.label = $.label;
	Alloy.Globals.heading = $.heading;
	
	
var args = arguments[0] || {};
//The following uses a regular expression to remove all text before the 'imageX.jpg' in the item. (i.e., the 'file:///var/mobile...')
var imageName = args.object.item.replace(/file:\/(.*)Documents\//g, "");

//Set the text of the heading to the value of the subsection
$.heading.text = args.object.heading; 
Ti.API.info(args.object.heading);

if(args.object.item.indexOf("file:/") != -1) { //Checking if the item is a url, i.e., an image
	
	if(Ti.Network.online==false) {
		$.imageView.image=args.object.item;	
	}
	else {
		var xhr2 = Titanium.Network.createHTTPClient({
			onload: function() {
				// first, grab a "handle" to the file where you'll store the downloaded data
				var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageName);
				f.write(this.responseData); // write to the file
				Ti.App.fireEvent('image_downloaded', {filepath:f.nativePath});
			},
			//timeout: 10000
		});
		xhr2.open('GET', 'http://cs1.ucc.ie/~som6/bin/FYP/prototype/images/'+imageName);
		xhr2.send();
				
			Ti.App.addEventListener('image_downloaded', function(e) {
			// happens only when the image has been downloaded and saved
			$.imageView.image=args.object.item;			
		});
	}				
}
else {
	//$.label.text=args.item;
	$.label.text=args.object.item;
}

function fullScreen() {
	var fullImage = Alloy.createController("fullscreenImage", {image : args.object.item }).getView();
	fullImage.open();
}
