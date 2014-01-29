/*
 * Create Constructor
 */

var database = function(){};
module.exports = database;

/*
 * Init Function to setup Database
 */
database.prototype.init = function( name ){
	this.name = name;
	var db = Ti.Database.open( this.name );
	
	var sql = "CREATE TABLE IF NOT EXISTS 'radiology' ( 'itemID' VARCHAR PRIMARY KEY, 'chapterTitle' VARCHAR, 'sectionTitle' VARCHAR, 'subsectionTitle' VARCHAR, 'item' TEXT, 'reference' VARCHAR);";
	Ti.API.info(sql);
	db.execute(sql);
	
	db.close();
	db = null;
	
	
	//SO FAR THIS ONLY SPITS OUT THE DATA ON THE CONSOLE... NEED TO GET THIS TO BE INSERTED INTO LOCAL DB.
	var url = "http://cs1.ucc.ie/~som6/bin/FYP/prototype/test.php";
 	var client = Ti.Network.createHTTPClient({
 	    // function called when the response data is available
 	    onload : function(e) {
 	        //Ti.API.info("Received text: " + this.responseText);
 	        
 	        alert('success');
 	        
 	        var JSONdata = JSON.parse(this.responseText);

			for(var i in JSONdata.allRowsInDB){		//WITHIN THIS FOR LOOP WE CAN ACCESS ALL THE VALUES IN THE JSON
				Ti.API.info(JSONdata.allRowsInDB[i].chapterTitle);	
			}
 	    },
 	    // function called when an error occurs, including a timeout
 	    onerror : function(e) {
 	        Ti.API.debug(e.error);
 	        alert('error');
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