function Controller() {
    function subsectionsWindow(event) {
        var addWindow = Alloy.createController("subsectionsList", {
            title: event.row.title
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
    $.__views.sectionsList = Ti.UI.createTabGroup({
        id: "sectionsList"
    });
    $.__views.win = Ti.UI.createWindow({
        title: "Home",
        id: "win"
    });
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.win.add($.__views.table);
    subsectionsWindow ? $.__views.table.addEventListener("click", subsectionsWindow) : __defers["$.__views.table!click!subsectionsWindow"] = true;
    $.__views.tabSections = Ti.UI.createTab({
        window: $.__views.win,
        id: "tabSections",
        title: "Sections",
        icon: "KS_nav_ui.png"
    });
    $.__views.sectionsList.addTab($.__views.tabSections);
    $.__views.__alloyId6 = Ti.UI.createWindow({
        title: "Tab 2",
        id: "__alloyId6"
    });
    $.__views.__alloyId7 = Ti.UI.createLabel({
        text: "I am Window 2",
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.__alloyId5 = Ti.UI.createTab({
        window: $.__views.__alloyId6,
        title: "Tab 2",
        icon: "KS_nav_views.png",
        id: "__alloyId5"
    });
    $.__views.sectionsList.addTab($.__views.__alloyId5);
    $.__views.sectionsList && $.addTopLevelView($.__views.sectionsList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info(args.title);
    var sections = Alloy.Globals.radiologyDB.sections(args.title);
    $.win.title = args.title;
    for (var i in sections) $.table.appendRow(sections[i]);
    __defers["$.__views.table!click!subsectionsWindow"] && $.__views.table.addEventListener("click", subsectionsWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;