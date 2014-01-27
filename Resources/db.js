var database = function() {};

module.exports = database;

database.prototype.init = function(name) {
    this.name = name;
    var db = Ti.Database.open(this.name);
    var sql = "CREATE TABLE IF NOT EXISTS 'radiology' ( 'itemID' VARCHAR PRIMARY KEY, 'chapterTitle' VARCHAR, 'sectionTitle' VARCHAR, 'subsectionTitle' VARCHAR, 'item' TEXT, 'reference' VARCHAR);";
    Ti.API.info(sql);
    db.execute(sql);
    db.close();
    db = null;
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