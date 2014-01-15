function Controller() {
    function sectionsWindow(event) {
        var addWindow = Alloy.createController("sectionsList", {
            title: event.row.title
        }).getView();
        Alloy.Globals.tabChapters.open(addWindow);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "black",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        title: "Home",
        id: "win"
    });
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.win.add($.__views.table);
    sectionsWindow ? $.__views.table.addEventListener("click", sectionsWindow) : __defers["$.__views.table!click!sectionsWindow"] = true;
    $.__views.tabChapters = Ti.UI.createTab({
        window: $.__views.win,
        id: "tabChapters",
        title: "Home",
        icon: "KS_nav_ui.png"
    });
    $.__views.index.addTab($.__views.tabChapters);
    $.__views.__alloyId2 = Ti.UI.createWindow({
        backgroundColor: "black",
        title: "Tab 2",
        id: "__alloyId2"
    });
    $.__views.__alloyId3 = Ti.UI.createLabel({
        text: "I am Window 2",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "Tab 2",
        icon: "KS_nav_views.png",
        id: "__alloyId1"
    });
    $.__views.index.addTab($.__views.__alloyId1);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    Alloy.Globals.tabChapters = $.tabChapters;
    $.table.setData(Alloy.Globals.radiologyDB.chapters());
    __defers["$.__views.table!click!sectionsWindow"] && $.__views.table.addEventListener("click", sectionsWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;