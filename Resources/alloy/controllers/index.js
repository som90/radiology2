function Controller() {
    function sectionsWindow(event) {
        var addWindow = Alloy.createController("sectionsList", {
            title: event.row.name
        }).getView();
        Alloy.Globals.tabChapters.open(addWindow);
    }
    function selectBodyPart() {
        $.bodyPart.show();
    }
    function doSomething(option) {
        option.index = 0;
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
        backgroundImage: "/images/radiologyBackground.jpg",
        color: "white",
        title: "Home",
        id: "win"
    });
    $.__views.table = Ti.UI.createTableView({
        top: "5px",
        backgroundColor: "transparent",
        minRowHeight: "44dp",
        color: "white",
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
        backgroundImage: "/images/radiologyBackground.jpg",
        color: "white",
        title: "CT Dosage Calculator",
        layout: "vertical",
        id: "__alloyId2"
    });
    $.__views.__alloyId3 = Ti.UI.createLabel({
        text: "Dose length product value (DLP):",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createTextField({
        height: "44dp",
        width: "95%",
        backgroundColor: "white",
        bottom: 5,
        id: "__alloyId4"
    });
    $.__views.__alloyId2.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        text: "Scanned body part:",
        id: "__alloyId5"
    });
    $.__views.__alloyId2.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createTextField({
        height: "44dp",
        width: "95%",
        backgroundColor: "white",
        bottom: 5,
        editable: "false",
        id: "__alloyId6"
    });
    $.__views.__alloyId2.add($.__views.__alloyId6);
    selectBodyPart ? $.__views.__alloyId6.addEventListener("click", selectBodyPart) : __defers["$.__views.__alloyId6!click!selectBodyPart"] = true;
    var __alloyId8 = [];
    __alloyId8.push("Head");
    __alloyId8.push("Arm");
    __alloyId8.push("Cancel");
    $.__views.bodyPart = Ti.UI.createOptionDialog({
        options: __alloyId8,
        id: "bodyPart",
        title: "Select Body Part:"
    });
    doSomething ? $.__views.bodyPart.addEventListener("click", doSomething) : __defers["$.__views.bodyPart!click!doSomething"] = true;
    $.__views.__alloyId12 = Ti.UI.createLabel({
        text: "Patient age range:",
        id: "__alloyId12"
    });
    $.__views.__alloyId2.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createTextField({
        height: "44dp",
        width: "95%",
        backgroundColor: "white",
        bottom: 5,
        editable: "false",
        id: "__alloyId13"
    });
    $.__views.__alloyId2.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createButton({
        title: "Submit",
        id: "__alloyId14"
    });
    $.__views.__alloyId2.add($.__views.__alloyId14);
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "CT Dosage Calculator",
        icon: "KS_nav_views.png",
        id: "__alloyId1"
    });
    $.__views.index.addTab($.__views.__alloyId1);
    $.__views.__alloyId16 = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        color: "white",
        title: "About",
        id: "__alloyId16"
    });
    $.__views.__alloyId17 = Ti.UI.createLabel({
        text: "This is where we will have some information about the app and about CUH Radiology Department.",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId15 = Ti.UI.createTab({
        window: $.__views.__alloyId16,
        title: "About",
        icon: "KS_nav_views.png",
        id: "__alloyId15"
    });
    $.__views.index.addTab($.__views.__alloyId15);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    Alloy.Globals.tabChapters = $.tabChapters;
    var chapters = Alloy.Globals.radiologyDB.chapters();
    for (var i in chapters) $.table.appendRow(chapters[i]);
    __defers["$.__views.table!click!sectionsWindow"] && $.__views.table.addEventListener("click", sectionsWindow);
    __defers["$.__views.__alloyId6!click!selectBodyPart"] && $.__views.__alloyId6.addEventListener("click", selectBodyPart);
    __defers["$.__views.bodyPart!click!doSomething"] && $.__views.bodyPart.addEventListener("click", doSomething);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;