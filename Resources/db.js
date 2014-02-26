var database = function() {};

module.exports = database;

database.prototype.initEbookData = function(name, callback) {
    this.name = name;
    var db = Ti.Database.open(this.name);
    var sql = "CREATE TABLE IF NOT EXISTS 'radiology' ( 'itemID' VARCHAR PRIMARY KEY, 'chapterTitle' VARCHAR, 'sectionTitle' VARCHAR, 'subsectionTitle' VARCHAR, 'item' TEXT, 'reference' VARCHAR, 'lastUpdated' TEXT);";
    db.execute(sql);
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

database.prototype.initExamTables = function(name) {
    this.name = name;
    var db = Ti.Database.open(this.name);
    var sql = "CREATE TABLE IF NOT EXISTS 'examinations' ( 'area' VARCHAR, 'bodypart' VARCHAR, 'meanEffectiveDose' DECIMAL(5,3), 'rangesReported' VARCHAR, 'meanAdministeredActivity' VARCHAR, 'effectiveDosePerAdministeredActivity' VARCHAR);";
    db.execute(sql);
    var url = "http://cs1.ucc.ie/~som6/bin/FYP/prototype/examJsonData.php";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var JSONdata = JSON.parse(this.responseText);
            db.execute("BEGIN;");
            for (var i in JSONdata.allRowsInDB) {
                var area = JSONdata.allRowsInDB[i].area;
                var bodypart = JSONdata.allRowsInDB[i].bodypart;
                var meanEffectiveDose = JSONdata.allRowsInDB[i].meanEffectiveDose;
                var rangesReported = JSONdata.allRowsInDB[i].rangesReported;
                var meanAdministeredActivity = JSONdata.allRowsInDB[i].meanAdministeredActivity;
                var effectiveDosePerAdministeredActivity = JSONdata.allRowsInDB[i].effectiveDosePerAdministeredActivity;
                var sql = "INSERT INTO `examinations` (`area`, `bodypart`, `meanEffectiveDose`, `rangesReported`, `meanAdministeredActivity`, `effectiveDosePerAdministeredActivity`) VALUES ('" + area + "', '" + bodypart + "', '" + meanEffectiveDose + "', '" + rangesReported + "', '" + meanAdministeredActivity + "', '" + effectiveDosePerAdministeredActivity + "');";
                Ti.API.info(sql);
                db.execute(sql);
            }
            db.execute("COMMIT;");
            db.close();
            db = null;
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

database.prototype.getCachedData = function(name) {
    this.name = name;
    Ti.Database.open(this.name);
    var data = [];
    var chapters = Alloy.Globals.radiologyDB.chapters();
    for (var i in chapters) data.push(chapters[i]);
    return data;
};

database.prototype.update = function(name, callback) {
    this.name = name;
    var db = Ti.Database.open(this.name);
    if (false == Ti.Network.online) {
        alert("No internet connection! Close this window to keep working with cached data.");
        return;
    }
    var url = "http://cs1.ucc.ie/~som6/bin/FYP/prototype/jsonData.php";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var JSONdata = JSON.parse(this.responseText);
            var tempArray = [];
            var tempItem = [];
            db.execute("BEGIN;");
            for (var i in JSONdata.allRowsInDB) {
                var itemID = JSONdata.allRowsInDB[i].itemID;
                var chapterTitle = JSONdata.allRowsInDB[i].chapterTitle.replace(/'/g, "''");
                var sectionTitle = JSONdata.allRowsInDB[i].sectionTitle.replace(/'/g, "''");
                JSONdata.allRowsInDB[i].subsectionTitle.replace(/'/g, "''");
                var reference = JSONdata.allRowsInDB[i].reference.replace(/'/g, "''");
                var lastUpdated = JSONdata.allRowsInDB[i].lastUpdated;
                var item = JSONdata.allRowsInDB[i].item.replace(/'/g, "''");
                if (-1 != JSONdata.allRowsInDB[i].item.indexOf("images/")) {
                    item = item.replace(/images\//g, "");
                    tempItem.push(item);
                    tempArray.push("http://cs1.ucc.ie/~som6/bin/FYP/prototype/images/" + item);
                    var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, item);
                    item = f.nativePath;
                    Ti.API.info("Link stored in DB: " + item);
                }
                var sql = "UPDATE `radiology` SET `chapterTitle` = '" + chapterTitle + "', \n												`sectionTitle` = '" + sectionTitle + "',\n												`subsectionTitle` = '" + sectionTitle + "',\n												`item` = '" + item + "',\n												`reference` = '" + reference + "',\n												`lastUpdated` = '" + lastUpdated + "'\n											WHERE `itemID` = '" + itemID + "';";
                db.execute(sql);
            }
            db.execute("COMMIT;");
            db.close();
            db = null;
            for (var i in tempArray) {
                var xhr2 = Titanium.Network.createHTTPClient({
                    onload: function() {
                        var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, tempItem[i]);
                        f.write(this.responseData);
                        Ti.App.fireEvent("image_downloaded", {
                            filepath: f.nativePath
                        });
                        Ti.API.info("not sure: " + f.nativePath);
                    },
                    timeout: 1e4
                });
                xhr2.open("GET", tempArray[i]);
                xhr2.send();
                Ti.App.addEventListener("image_downloaded", function(e) {
                    Ti.API.info("WORKED!!! " + e.filepath);
                });
            }
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
    var results = db.execute("SELECT DISTINCT chapterTitle FROM radiology;");
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

database.prototype.getExams = function(area) {
    var db = Ti.Database.open(this.name);
    var sql = "SELECT * FROM examinations WHERE area='" + area + "' ORDER BY `bodypart`;";
    Ti.API.info(sql);
    var results = db.execute(sql);
    var rowsArray = [];
    while (results.isValidRow()) {
        rowsArray.push({
            bodypart: results.fieldByName("bodypart")
        });
        Ti.API.info(results.fieldByName("bodypart"));
        results.next();
    }
    db.close();
    db = null;
    return rowsArray;
};

database.prototype.getExamData = function(area, examination) {
    var db = Ti.Database.open(this.name);
    var sql = "SELECT * FROM examinations WHERE `area`='" + area + "' AND `bodypart` = '" + examination + "';";
    var results = db.execute(sql);
    var dataArray = [];
    while (results.isValidRow()) {
        dataArray.push({
            meanEffectiveDose: results.fieldByName("meanEffectiveDose"),
            rangesReported: results.fieldByName("rangesReported"),
            meanAdministeredActivity: results.fieldByName("meanAdministeredActivity"),
            effectiveDosePerAdministeredActivity: results.fieldByName("effectiveDosePerAdministeredActivity")
        });
        results.next();
    }
    db.close();
    db = null;
    return dataArray;
};