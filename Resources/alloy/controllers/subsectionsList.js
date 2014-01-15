function Controller() {
    function itemsWindow(event) {
        var addWindow = Alloy.createController("itemViewer", {
            title: event.row.title
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
    $.__views.subsectionsList = Ti.UI.createTabGroup({
        id: "subsectionsList"
    });
    $.__views.win = Ti.UI.createWindow({
        title: "Home",
        id: "win"
    });
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.win.add($.__views.table);
    itemsWindow ? $.__views.table.addEventListener("click", itemsWindow) : __defers["$.__views.table!click!itemsWindow"] = true;
    $.__views.tabSubSections = Ti.UI.createTab({
        window: $.__views.win,
        id: "tabSubSections",
        title: "Subsections",
        icon: "KS_nav_ui.png"
    });
    $.__views.subsectionsList.addTab($.__views.tabSubSections);
    $.__views.__alloyId9 = Ti.UI.createWindow({
        title: "Tab 2",
        id: "__alloyId9"
    });
    $.__views.__alloyId10 = Ti.UI.createLabel({
        text: "I am Window 2",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.__alloyId9,
        title: "Tab 2",
        icon: "KS_nav_views.png",
        id: "__alloyId8"
    });
    $.__views.subsectionsList.addTab($.__views.__alloyId8);
    $.__views.subsectionsList && $.addTopLevelView($.__views.subsectionsList);
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