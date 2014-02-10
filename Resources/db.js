var database = function() {};

module.exports = database;

database.prototype.init = function(name, callback) {
    this.name = name;
    var db = Ti.Database.open(this.name);
    var sql = "CREATE TABLE IF NOT EXISTS 'radiology' ( 'itemID' VARCHAR PRIMARY KEY, 'chapterTitle' VARCHAR, 'sectionTitle' VARCHAR, 'subsectionTitle' VARCHAR, 'item' TEXT, 'reference' VARCHAR, 'lastUpdated' TEXT);";
    Ti.API.info(sql);
    db.execute(sql);
    if (false == Ti.Network.online) {
        alert("This app can only be run for the first time while connected to the Internet. Please install again and reopen with an Internet Connection.");
        return;
    }
    var url = "http://cs1.ucc.ie/~som6/bin/FYP/prototype/jsonData.php";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var JSONdata = JSON.parse(this.responseText);
            db.execute("BEGIN;");
            for (var i in JSONdata.allRowsInDB) {
                var itemID = JSONdata.allRowsInDB[i].itemID;
                var chapterTitle = JSONdata.allRowsInDB[i].chapterTitle.replace(/'/g, "''");
                var sectionTitle = JSONdata.allRowsInDB[i].sectionTitle.replace(/'/g, "''");
                var subsectionTitle = JSONdata.allRowsInDB[i].subsectionTitle.replace(/'/g, "''");
                var item = JSONdata.allRowsInDB[i].item.replace(/'/g, "''");
                -1 != JSONdata.allRowsInDB[i].item.indexOf("images/") && (item = "/" + JSONdata.allRowsInDB[i].item);
                var reference = JSONdata.allRowsInDB[i].reference.replace(/'/g, "''");
                var lastUpdated = JSONdata.allRowsInDB[i].lastUpdated;
                var sql = "INSERT INTO `radiology` (`itemID`, `chapterTitle`, `sectionTitle`, `subsectionTitle`, `item`, `reference`, `lastUpdated`) VALUES ('" + itemID + "', '" + chapterTitle + "', '" + sectionTitle + "', '" + subsectionTitle + "', '" + item + "', '" + reference + "', '" + lastUpdated + "');";
                Ti.API.info(sql);
                db.execute(sql);
            }
            db.execute("COMMIT;");
            db.close();
            db = null;
            callback.call(this);
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            alert("error in loading content from Server");
        },
        timeout: 5e3
    });
    client.open("POST", url);
    client.send();
};

database.prototype.update = function(name, callback) {
    this.name = name;
    var db = Ti.Database.open(this.name);
    if (false == Ti.Network.online) {
        alert("No internet connection! Click close to keep working with cached data.");
        return;
    }
    var url = "http://cs1.ucc.ie/~som6/bin/FYP/prototype/jsonData.php";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var JSONdata = JSON.parse(this.responseText);
            db.execute("BEGIN;");
            for (var i in JSONdata.allRowsInDB) {
                var itemID = JSONdata.allRowsInDB[i].itemID;
                var chapterTitle = JSONdata.allRowsInDB[i].chapterTitle.replace(/'/g, "''");
                var sectionTitle = JSONdata.allRowsInDB[i].sectionTitle.replace(/'/g, "''");
                JSONdata.allRowsInDB[i].subsectionTitle.replace(/'/g, "''");
                var item = JSONdata.allRowsInDB[i].item.replace(/'/g, "''");
                -1 != JSONdata.allRowsInDB[i].item.indexOf("images/") && (item = "/" + JSONdata.allRowsInDB[i].item);
                var reference = JSONdata.allRowsInDB[i].reference.replace(/'/g, "''");
                var lastUpdated = JSONdata.allRowsInDB[i].lastUpdated;
                var sql = "UPDATE `radiology` SET `chapterTitle` = '" + chapterTitle + "', \n												`sectionTitle` = '" + sectionTitle + "',\n												`subsectionTitle` = '" + sectionTitle + "',\n												`item` = '" + item + "',\n												`reference` = '" + reference + "',\n												`lastUpdated` = '" + lastUpdated + "'\n											WHERE `itemID` = '" + itemID + "';";
                Ti.API.info(sql);
                db.execute(sql);
            }
            db.execute("COMMIT;");
            db.close();
            db = null;
            callback.call(this);
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            alert("error in loading content from Server");
        },
        timeout: 5e3
    });
    client.open("POST", url);
    client.send();
};

database.prototype.chapters = function() {
    var db = Ti.Database.open(this.name);
    var sql = "SELECT DISTINCT `chapterTitle` FROM radiology;";
    var results = db.execute(sql);
    Ti.API.info(sql);
    Ti.API.info(results);
    alert(results);
    var chapters = [];
    while (results.isValidRow()) {
        chapters.push(Alloy.createController("createRows", {
            title: results.fieldByName("chapterTitle")
        }).getView());
        results.next();
    }
    db.close();
    db = null;
    return chapters;
};

database.prototype.sections = function(chapter) {
    var db = Ti.Database.open(this.name);
    var results = db.execute("SELECT DISTINCT sectionTitle FROM radiology WHERE chapterTitle='" + chapter + "';");
    var sections = [];
    while (results.isValidRow()) {
        sections.push(Alloy.createController("createRows", {
            title: results.fieldByName("sectionTitle")
        }).getView());
        results.next();
    }
    db.close();
    db = null;
    return sections;
};

database.prototype.items = function(section) {
    var db = Ti.Database.open(this.name);
    var results = db.execute("SELECT item, subsectionTitle FROM radiology WHERE sectionTitle='" + section + "';");
    var itemsArray = [];
    while (results.isValidRow()) {
        itemsArray.push({
            heading: results.fieldByName("subsectionTitle"),
            item: results.fieldByName("item")
        });
        results.next();
    }
    db.close();
    db = null;
    return itemsArray;
};