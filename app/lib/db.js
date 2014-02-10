/*
 * Create Constructor
 */

var database = function(){};
module.exports = database;

/*
 * Init Function to setup Database
 */
database.prototype.init = function( name, callback){
	this.name = name;
	var db = Ti.Database.open( this.name );
	
	var sql = "CREATE TABLE IF NOT EXISTS 'radiology' ( 'itemID' VARCHAR PRIMARY KEY, 'chapterTitle' VARCHAR, 'sectionTitle' VARCHAR, 'subsectionTitle' VARCHAR, 'item' TEXT, 'reference' VARCHAR, 'lastUpdated' TEXT);";
	Ti.API.info(sql);
	db.execute(sql);
	
	if(Ti.Network.online==false) {
		alert("This app can only be run for the first time while connected to the Internet. Please install again and reopen with an Internet Connection.");
		return
	}
	
	// Accessing the Server file which hosts a printout of all the Data in the Server in JSON format.
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
				if (JSONdata.allRowsInDB[i].item.indexOf("images/") != -1) {
					item = "/" + JSONdata.allRowsInDB[i].item;
				}
				var reference = JSONdata.allRowsInDB[i].reference.replace(/'/g, "''");
				var lastUpdated = JSONdata.allRowsInDB[i].lastUpdated;

				var sql = "INSERT INTO `radiology` (`itemID`, `chapterTitle`, `sectionTitle`, `subsectionTitle`, `item`, `reference`, `lastUpdated`) VALUES ('"+itemID+"', '"+chapterTitle+"', '"+sectionTitle+"', '"+subsectionTitle+"', '"+item+"', '"+reference+"', '"+lastUpdated+"');";

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


database.prototype.update = function( name, callback){
	this.name = name;
	var db = Ti.Database.open( this.name );
	
	if(Ti.Network.online==false) {
		alert("No internet connection! Click close to keep working with cached data.");
		return;
	}
	
	var url = "http://cs1.ucc.ie/~som6/bin/FYP/prototype/jsonData.php";
 	var client = Ti.Network.createHTTPClient({
 	    
 	    // Once the response text becomes available, the below will run. 
 	    onload : function(e) {
 	        
 	        var JSONdata = JSON.parse(this.responseText);
		
			//keeps the SQL statement in memory, and commits to the DB afterwards, to speed up thigs
			db.execute("BEGIN;");
			
			for(var i in JSONdata.allRowsInDB){		// Loop through the JSON data to access each row in the ServerDB
				
				//The following 5 regular expression replacements just ensure that any apostrophes in the ServerDB get escaped before
				// they are entered into the localDB
				var itemID = JSONdata.allRowsInDB[i].itemID;
				var chapterTitle = JSONdata.allRowsInDB[i].chapterTitle.replace(/'/g, "''");
				var sectionTitle = JSONdata.allRowsInDB[i].sectionTitle.replace(/'/g, "''");
				var subsectionTitle = JSONdata.allRowsInDB[i].subsectionTitle.replace(/'/g, "''");
				var item = JSONdata.allRowsInDB[i].item.replace(/'/g, "''");
				if (JSONdata.allRowsInDB[i].item.indexOf("images/") != -1) {
					item = "/" + JSONdata.allRowsInDB[i].item;
				}
				var reference = JSONdata.allRowsInDB[i].reference.replace(/'/g, "''");
				var lastUpdated = JSONdata.allRowsInDB[i].lastUpdated;

				//var sql = "INSERT INTO `radiology` (`itemID`, `chapterTitle`, `sectionTitle`, `subsectionTitle`, `item`, `reference`) VALUES ('"+JSONdata.allRowsInDB[i].itemID+"', '"+JSONdata.allRowsInDB[i].chapterTitle+"', '"+JSONdata.allRowsInDB[i].sectionTitle+"', '"+JSONdata.allRowsInDB[i].subsectionTitle+"', '"+JSONdata.allRowsInDB[i].item+"', '"+JSONdata.allRowsInDB[i].reference+"');";
				var sql = "UPDATE `radiology` SET `chapterTitle` = '" + chapterTitle + "', 
												`sectionTitle` = '" + sectionTitle + "',
												`subsectionTitle` = '" + sectionTitle + "',
												`item` = '" + item + "',
												`reference` = '" + reference + "',
												`lastUpdated` = '" + lastUpdated + "'
											WHERE `itemID` = '" + itemID + "';"; 
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