function Controller() {
    function itemsWindow(event) {
        var addWindow = Alloy.createController("itemViewer", {
            title: event.row.name
        }).getView();
        Alloy.Globals.tabChapters.open(addWindow);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "subsectionsList";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.table = Ti.UI.createTableView({
        top: "5px",
        backgroundColor: "transparent",
        minRowHeight: "50dp",
        id: "table"
    });
    $.__views.win.add($.__views.table);
    itemsWindow ? $.__views.table.addEventListener("click", itemsWindow) : __defers["$.__views.table!click!itemsWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info(args.title);
    var subsections = Alloy.Globals.radiologyDB.subsections(args.title);
    Ti.API.info(JSON.stringify(subsections));
    $.win.title = args.title;
    for (var i in subsections) $.table.appendRow(subsections[i]);
    __defers["$.__views.table!click!itemsWindow"] && $.__views.table.addEventListener("click", itemsWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;