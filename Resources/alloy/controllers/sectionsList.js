function Controller() {
    function subsectionsWindow(event) {
        var addWindow = Alloy.createController("itemViewer", {
            title: event.row.name
        }).getView();
        Alloy.Globals.tabChapters.open(addWindow);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sectionsList";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        color: "white",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.table = Ti.UI.createTableView({
        top: "5px",
        backgroundColor: "transparent",
        minRowHeight: "44dp",
        color: "white",
        id: "table"
    });
    $.__views.win.add($.__views.table);
    subsectionsWindow ? $.__views.table.addEventListener("click", subsectionsWindow) : __defers["$.__views.table!click!subsectionsWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info("Page Title " + args.title);
    var sections = Alloy.Globals.radiologyDB.sections(args.title);
    $.win.title = args.title;
    for (var i in sections) $.table.appendRow(sections[i]);
    __defers["$.__views.table!click!subsectionsWindow"] && $.__views.table.addEventListener("click", subsectionsWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;