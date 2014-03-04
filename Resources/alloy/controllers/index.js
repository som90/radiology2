function Controller() {
    function checkForUpdates() {
        Alloy.Globals.radiologyDB.update("radiology", updateChapters);
        var index = Alloy.createController("index");
        index.getView().open();
    }
    function loadChapters() {
        var chapters = Alloy.Globals.radiologyDB.chapters();
        for (var i in chapters) $.table.appendRow(chapters[i]);
    }
    function updateChapters() {
        var chapters = Alloy.Globals.radiologyDB.chapters();
        for (var i in chapters) $.table.updateRow(i, chapters[i]);
    }
    function sectionsWindow(event) {
        var addWindow = Alloy.createController("sectionsList", {
            title: event.row.name
        }).getView();
        Alloy.Globals.tabChapters.open(addWindow);
    }
    function ctCalculator() {
        var calc = Alloy.createController("calculator", {
            calculator: "ct"
        }).getView();
        $.tools.open(calc);
    }
    function nucCalculator() {
        var calc = Alloy.createController("calculator", {
            calculator: "nuclear"
        }).getView();
        $.tools.open(calc);
    }
    function procedures() {
        var procedures = Alloy.createController("procedureTables").getView();
        $.tools.open(procedures);
    }
    function changeFontLarge() {
        alert("Feature not yet supported.");
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
        title: "Home",
        id: "win"
    });
    $.__views.table = Ti.UI.createTableView({
        top: "5px",
        backgroundColor: "transparent",
        minRowHeight: "50dp",
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
    $.__views.__alloyId18 = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        title: "Info",
        id: "__alloyId18"
    });
    $.__views.__alloyId19 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "black",
            font: {
                fontSize: "15dp"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "black",
            font: {
                fontSize: "25dp"
            }
        });
        _.extend(o, {
            text: "Information about how to use the app.",
            id: "__alloyId19"
        });
        return o;
    }());
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.__alloyId17 = Ti.UI.createTab({
        window: $.__views.__alloyId18,
        title: "Info",
        icon: "KS_nav_views.png",
        id: "__alloyId17"
    });
    $.__views.index.addTab($.__views.__alloyId17);
    $.__views.win = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        id: "win",
        title: "Preferences",
        layout: "vertical"
    });
    $.__views.largeFont = Ti.UI.createButton({
        top: 5,
        width: "50%",
        title: "Change Font",
        id: "largeFont"
    });
    $.__views.win.add($.__views.largeFont);
    changeFontLarge ? $.__views.largeFont.addEventListener("click", changeFontLarge) : __defers["$.__views.largeFont!click!changeFontLarge"] = true;
    $.__views.__alloyId21 = Ti.UI.createButton({
        top: 5,
        width: "50%",
        title: "Check for updates",
        id: "__alloyId21"
    });
    $.__views.win.add($.__views.__alloyId21);
    checkForUpdates ? $.__views.__alloyId21.addEventListener("click", checkForUpdates) : __defers["$.__views.__alloyId21!click!checkForUpdates"] = true;
    $.__views.__alloyId20 = Ti.UI.createTab({
        window: $.__views.win,
        title: "Preferences",
        icon: "KS_nav_views.png",
        id: "__alloyId20"
    });
    $.__views.index.addTab($.__views.__alloyId20);
    $.__views.__alloyId22 = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        title: "Average Radiation Doses",
        id: "__alloyId22"
    });
    $.__views.proceduresImage = Ti.UI.createImageView({
        top: "0%",
        width: "100%",
        height: "40%",
        opacity: ".8",
        id: "proceduresImage",
        image: "/images/procedures.jpg"
    });
    $.__views.__alloyId22.add($.__views.proceduresImage);
    procedures ? $.__views.proceduresImage.addEventListener("click", procedures) : __defers["$.__views.proceduresImage!click!procedures"] = true;
    $.__views.ctImage = Ti.UI.createImageView({
        width: "50%",
        height: "60%",
        top: "40%",
        left: "0%",
        opacity: ".8",
        id: "ctImage",
        image: "images/ctCalculator.jpg"
    });
    $.__views.__alloyId22.add($.__views.ctImage);
    ctCalculator ? $.__views.ctImage.addEventListener("click", ctCalculator) : __defers["$.__views.ctImage!click!ctCalculator"] = true;
    $.__views.nuclearImage = Ti.UI.createImageView({
        width: "50%",
        height: "60%",
        top: "40%",
        right: "0%",
        opacity: ".8",
        id: "nuclearImage",
        image: "/images/nuclearCalculator.jpg"
    });
    $.__views.__alloyId22.add($.__views.nuclearImage);
    nucCalculator ? $.__views.nuclearImage.addEventListener("click", nucCalculator) : __defers["$.__views.nuclearImage!click!nucCalculator"] = true;
    $.__views.tools = Ti.UI.createTab({
        window: $.__views.__alloyId22,
        title: "Tools",
        id: "tools",
        icon: "KS_nav_views.png"
    });
    $.__views.index.addTab($.__views.tools);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.tabChapters = $.tabChapters;
    if (Ti.App.Properties.hasProperty("firstTime")) {
        $.index.open();
        var tableData = Alloy.Globals.radiologyDB.getCachedData("radiology");
        $.table.setData(tableData);
    } else {
        $.index.open();
        if (false == Ti.Network.online) alert("Please connect to the internet to initialize the app."); else {
            Alloy.Globals.radiologyDB.initEbookData("radiology", loadChapters);
            Alloy.Globals.radiologyDB.initExamTables("radiology");
            Ti.App.Properties.setBool("firstTime", false);
        }
    }
    __defers["$.__views.table!click!sectionsWindow"] && $.__views.table.addEventListener("click", sectionsWindow);
    __defers["$.__views.largeFont!click!changeFontLarge"] && $.__views.largeFont.addEventListener("click", changeFontLarge);
    __defers["$.__views.__alloyId21!click!checkForUpdates"] && $.__views.__alloyId21.addEventListener("click", checkForUpdates);
    __defers["$.__views.proceduresImage!click!procedures"] && $.__views.proceduresImage.addEventListener("click", procedures);
    __defers["$.__views.ctImage!click!ctCalculator"] && $.__views.ctImage.addEventListener("click", ctCalculator);
    __defers["$.__views.nuclearImage!click!nucCalculator"] && $.__views.nuclearImage.addEventListener("click", nucCalculator);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;