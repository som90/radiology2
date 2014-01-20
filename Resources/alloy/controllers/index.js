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
        backgroundImage: "http://www.fashiongonerogue.com/wp-content/uploads/2013/04/dream-angels-2013-candice-swaanepoel-push-up-bra-victorias-secret-hi-res.jpg",
        title: "Home",
        id: "win"
    });
    $.__views.table = Ti.UI.createTableView({
        backgroundColor: "transparent",
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
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    Alloy.Globals.tabChapters = $.tabChapters;
    var chapters = Alloy.Globals.radiologyDB.chapters();
    for (var i in chapters) $.table.appendRow(chapters[i]);
    __defers["$.__views.table!click!sectionsWindow"] && $.__views.table.addEventListener("click", sectionsWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;