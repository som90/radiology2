/*
 * Create Constructor
 */

var database = function(){};
module.exports = database;

/*
 * Init Function to setup Database
 */
database.prototype.initEbookData = function( name, callback){
	this.name = name;
	var db = Ti.Database.open( this.name );
	
	var sql = "CREATE TABLE IF NOT EXISTS 'radiology' ( 'itemID' VARCHAR PRIMARY KEY, 'chapterTitle' VARCHAR, 'sectionTitle' VARCHAR, 'subsectionTitle' VARCHAR, 'item' TEXT, 'reference' VARCHAR, 'lastUpdated' TEXT);";
	db.execute(sql);
	
	// Accessing the Server file which hosts a printout of all the eBook data in the Server in JSON format.
	var url = "http://cs1.ucc.ie/~som6/bin/FYP/prototype/jsonData.php";
 	var client = Ti.Network.createHTTPClient({
 	    
 	    // Once the response text becomes available, the below will run. 
 	    onload : function(e) {
 	        
 	        var JSONdata = JSON.parse(this.responseText);
		
			//keeps the SQL statement in memory, and commits to the DB afterwards, to speed things up a bit 
			db.execute("BEGIN;");
			
			for(var i in JSONdata.allRowsInDB){		// Loop through the JSON data to access each row in the ServerDB
				
				//The following 5 regular expression replacements just ensure that any apostrophes in the ServerDB get escaped before
				// they are entered into the localDB
				var itemID = JSONdata.allRowsInDB[i].itemID;
				var chapterTitle = JSONdata.allRowsInDB[i].chapterTitle.replace(/'/g, "''");
				var sectionTitle = JSONdata.allRowsInDB[i].sectionTitle.replace(/'/g, "''");
				var subsectionTitle = JSONdata.allRowsInDB[i].subsectionTitle.replace(/'/g, "''");
				var item = JSONdata.allRowsInDB[i].item.replace(/'/g, "''");
				//var reference = JSONdata.allRowsInDB[i].reference.replace(/'/g, "''"); //REMOVED DUE TO SOME NULL POINTER ISSUES. REDUNDANT IN ANY CASE, MAY BE USEFUL LATER
				var lastUpdated = JSONdata.allRowsInDB[i].lastUpdated;
				
				if (JSONdata.allRowsInDB[i].item.indexOf("images/") != -1) {
					//item = "/" + JSONdata.allRowsInDB[i].item;
					item=item.replace(/images\//g, "");
					//Storing the link to the file stored locally (happening below) in the local DB.
					//This will store "file:///Users/som90/Library/Application%20Support/iPhone%20Simulator/7.0/Applications/6D767690-3FE3-4A3E-BFDA-68ECC51432B9/Documents/slideX.jpg" in the DB
					var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, item);
					item = f.nativePath;
				}
				

				var sql = "INSERT INTO `radiology` (`itemID`, `chapterTitle`, `sectionTitle`, `subsectionTitle`, `item`, `reference`, `lastUpdated`) VALUES ('"+itemID+"', '"+chapterTitle+"', '"+sectionTitle+"', '"+subsectionTitle+"', '"+item+"', '', '"+lastUpdated+"');";

				Ti.API.info(sql);
				db.execute(sql);
			}
			
			//Commits the sql to the db.
			db.execute("COMMIT;");
			
			db.close();
			db = null;
			
			//this will load the table AFTER the db has been populated.
			callback.call(this);
 	    },
 	    // function called when an error occurs, including a timeout
 	    onerror : function(e) {
 	        Ti.API.debug(e.error);
 	        alert('error in loading content from Server');
 	    },
 	    timeout : 5000  // in milliseconds
 	});
 	// Prepare the connection.
 	client.open("POST", url);
 	// Send the request.
 	client.send();
 };


database.prototype.initExamTables = function( name){
	this.name = name;
	var db = Ti.Database.open( this.name );
	
	var sql = "CREATE TABLE IF NOT EXISTS 'examinations' ( 'area' VARCHAR, 'bodypart' VARCHAR, 'meanEffectiveDose' DECIMAL(5,3), 'rangesReported' VARCHAR, 'meanAdministeredActivity' VARCHAR, 'effectiveDosePerAdministeredActivity' VARCHAR);";
	db.execute(sql);

 	// Need to do the same to initialize the 'examinations' table in the local DB.
	var url = "http://cs1.ucc.ie/~som6/bin/FYP/prototype/examJsonData.php";
 	var client = Ti.Network.createHTTPClient({
 	    
 	    // Once the response text becomes available, the below will run. 
 	    onload : function(e) {
 	        
 	        var JSONdata = JSON.parse(this.responseText);
		
			//keeps the SQL statement in memory, and commits to the DB afterwards, to speed things up a bit 
			db.execute("BEGIN;");
			
			for(var i in JSONdata.allRowsInDB){		// Loop through the JSON data to access each row in the ServerDB
				
				//The following 5 regular expression replacements just ensure that any apostrophes in the ServerDB get escaped before
				// they are entered into the localDB
				var area = JSONdata.allRowsInDB[i].area;
				var bodypart = JSONdata.allRowsInDB[i].bodypart;
				var meanEffectiveDose = JSONdata.allRowsInDB[i].meanEffectiveDose;
				var rangesReported = JSONdata.allRowsInDB[i].rangesReported;
				var meanAdministeredActivity = JSONdata.allRowsInDB[i].meanAdministeredActivity;
				var effectiveDosePerAdministeredActivity = JSONdata.allRowsInDB[i].effectiveDosePerAdministeredActivity;

				var sql = "INSERT INTO `examinations` (`area`, `bodypart`, `meanEffectiveDose`, `rangesReported`, `meanAdministeredActivity`, `effectiveDosePerAdministeredActivity`) VALUES ('"+area+"', '"+bodypart+"', '"+meanEffectiveDose+"', '"+rangesReported+"', '"+meanAdministeredActivity+"', '"+effectiveDosePerAdministeredActivity+"');";

				Ti.API.info(sql);
				db.execute(sql);
			}
			
			//Commits the sql to the db.
			db.execute("COMMIT;");
			
			db.close();
			db = null;
 	    },
 	    // function called when an error occurs, including a timeout
 	    onerror : function(e) {
 	        Ti.API.debug(e.error);
 	        alert('error in loading content from Server');
 	    },
 	    timeout : 5000  // in milliseconds
 	});
 	// Prepare the connection.
 	client.open("POST", url);
 	// Send the request.
 	client.send();
};

database.prototype.getCachedData = function( name){
	this.name = name;
	var db = Ti.Database.open( this.name );
	var data = [];
	
	var chapters = Alloy.Globals.radiologyDB.chapters();

	for (var i in chapters) 
 	{
		data.push(chapters[i])
 	}
 	
 	return data;
}


database.prototype.update = function( name, callback){
	this.name = name;
	var db = Ti.Database.open( this.name );
	
	if(Ti.Network.online==false) {
		alert("No internet connection! Close this window to keep working with cached data.");
		return;
	}
	
	var url = "http://cs1.ucc.ie/~som6/bin/FYP/prototype/jsonData.php";
 	var client = Ti.Network.createHTTPClient({
 	    
 	    // Once the response text becomes available, the below will run. 
 	    onload : function(e) {
 	        
 	        var JSONdata = JSON.parse(this.responseText);
			var tempArray = [];			//this array is for saving the URL to all the images on the Server so that after the link to the image is stored in the localDB, we can store the images themselves locally
			var tempItem = [];			//for saving each item name, i.e., slide10.jpg, etc.

			//keeps the SQL statement in memory, and commits to the DB afterwards, to speed up thigs
			db.execute("BEGIN;");
			for(var i in JSONdata.allRowsInDB){		// Loop through the JSON data to access each row in the ServerDB
				
				//The following 7 regular expression replacements just ensure that any apostrophes in the ServerDB get escaped before
				// they are entered into the localDB.
				var itemID = JSONdata.allRowsInDB[i].itemID;
				var chapterTitle = JSONdata.allRowsInDB[i].chapterTitle.replace(/'/g, "''");
				var sectionTitle = JSONdata.allRowsInDB[i].sectionTitle.replace(/'/g, "''");
				var subsectionTitle = JSONdata.allRowsInDB[i].subsectionTitle.replace(/'/g, "''");
				//var reference = JSONdata.allRowsInDB[i].reference.replace(/'/g, "''"); //REMOVED DUE TO SOME NULL POINTER ISSUES. REDUNDANT IN ANY CASE, MAY BE USEFUL LATER
				var lastUpdated = JSONdata.allRowsInDB[i].lastUpdated;
				
				var item = JSONdata.allRowsInDB[i].item.replace(/'/g, "''");
								
				if (JSONdata.allRowsInDB[i].item.indexOf("images/") != -1) {
					//item = "/" + JSONdata.allRowsInDB[i].item;
					item=item.replace(/images\//g, "");
					tempItem.push(item);
					tempArray.push("http://cs1.ucc.ie/~som6/bin/FYP/prototype/images/"+item);
					//Storing the link to the file stored locally (happening below) in the local DB.
					//This will store "file:///Users/som90/Library/Application%20Support/iPhone%20Simulator/7.0/Applications/6D767690-3FE3-4A3E-BFDA-68ECC51432B9/Documents/slideX.jpg" in the DB
					var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, item);
					item = f.nativePath;
				}
				
					var sql = "UPDATE `radiology` SET `chapterTitle` = '" + chapterTitle + "', 
												`sectionTitle` = '" + sectionTitle + "',
												`subsectionTitle` = '" + subsectionTitle + "',
												`item` = '" + item + "',
												`lastUpdated` = '" + lastUpdated + "'
											WHERE `itemID` = '" + itemID + "';"; 
					db.execute(sql);
			}
			
			//Commits the sql to the db.
			db.execute("COMMIT;");
			
			db.close();
			db = null;
			

			//this will load the table AFTER the db has been populated.
			callback.call(this);
 	    },
 	    // function called when an error occurs, including a timeout
 	    onerror : function(e) {
 	        Ti.API.debug(e.error);
 	        alert('error in loading content from Server');
 	    },
 	    timeout : 5000  // in milliseconds
 	});
 	// Prepare the connection.
 	client.open("POST", url);
 	// Send the request.
 	client.send();
};



/*
 * Function to return all chapters from the database
 */
database.prototype.chapters = function(){
	var db = Ti.Database.open( this.name );
	
	var results = db.execute("SELECT DISTINCT chapterTitle FROM radiology;");
	
	var chapters = [];
	while( results.isValidRow() ){
		//create a new controller and passing in ID and title
		//creates a tableViewRow and passes in this so instead of chapters returning an object it returns an array of rows which you can pass straight to the table
		//this creates the row for us.
		chapters.push( Alloy.createController("createRows",{title: results.fieldByName("chapterTitle")}).getView() );
		
		results.next();
	}
	
	db.close();
	db = null;
	return chapters;
};

database.prototype.sections = function(chapter){
	var db = Ti.Database.open( this.name );
	
	var results = db.execute("SELECT DISTINCT sectionTitle FROM radiology WHERE chapterTitle='"+chapter+"';");
	
	var sections = [];
	while( results.isValidRow() ){
		
		sections.push( Alloy.createController("createRows",{title: results.fieldByName("sectionTitle")}).getView() );
		
		results.next();
	}
	
	db.close();
	db = null;
	return sections;
};

/*database.prototype.subsections = function(section){
	var db = Ti.Database.open( this.name );
	
	var results = db.execute("SELECT DISTINCT subsectionTitle FROM radiology WHERE sectionTitle='"+section+"';");
	
	var subsections = [];
	while( results.isValidRow() ){
		
		subsections.push(results.fieldByName("subsectionTitle") );
		
		results.next();
	}
	
	db.close();
	db = null;
	return subsections;
};*/

database.prototype.items = function(section){
	var db = Ti.Database.open( this.name );
	
	var results = db.execute("SELECT item, subsectionTitle FROM radiology WHERE sectionTitle='"+section+"';");
	

	var itemsArray = [];
	while(results.isValidRow()){

    	itemsArray.push({heading: results.fieldByName("subsectionTitle"), item: results.fieldByName("item")});

	    results.next();
	}

	db.close();
	db = null;
	return itemsArray;
};

database.prototype.getExams = function(area){
	var db = Ti.Database.open( this.name );
	var sql = "SELECT * FROM examinations WHERE area='"+area+"' ORDER BY `bodypart`;";
	Ti.API.info(sql);
	var results = db.execute(sql);
	
	var rowsArray = [];
	while(results.isValidRow()){

    	rowsArray.push({bodypart: results.fieldByName("bodypart")});
		Ti.API.info(results.fieldByName("bodypart"));
		
	    results.next();
	}
	
	db.close();
	db = null;
	return rowsArray;
};

database.prototype.getExamData = function(area, examination){
	var db = Ti.Database.open( this.name );
	var sql = "SELECT * FROM examinations WHERE `area`='"+area+"' AND `bodypart` = '"+examination+"';";
	var results = db.execute(sql);
	
	var dataArray = [];
	while(results.isValidRow()){
		dataArray.push({meanEffectiveDose: results.fieldByName("meanEffectiveDose"), rangesReported: results.fieldByName("rangesReported"), meanAdministeredActivity: results.fieldByName("meanAdministeredActivity"), effectiveDosePerAdministeredActivity: results.fieldByName("effectiveDosePerAdministeredActivity")});		
	    results.next();
	}
	
	db.close();
	db = null;
	return dataArray;
};