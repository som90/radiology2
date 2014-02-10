function Controller() {
    function checkForUpdates() {
        Alloy.Globals.radiologyDB.update("radiology", updateChapters);
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
    function selectBodyPart() {
        $.bodyPart.show();
    }
    function addBodypart(option) {
        Ti.API.info(option.index);
        0 == option.index ? $.bodyPartTextfield.value = "Head" : 1 == option.index ? $.bodyPartTextfield.value = "Neck" : 2 == option.index ? $.bodyPartTextfield.value = "Chest" : 3 == option.index ? $.bodyPartTextfield.value = "Abdomen" : 4 == option.index && ($.bodyPartTextfield.value = "Pelvis");
    }
    function selectAgeRange() {
        $.ageRange.show();
    }
    function addAgeRange(option) {
        Ti.API.info(option.index);
        0 == option.index ? $.ageRangeTextfield.value = "Less than 1 year" : 1 == option.index ? $.ageRangeTextfield.value = "1-5 years" : 2 == option.index ? $.ageRangeTextfield.value = "5-10 years" : 3 == option.index ? $.ageRangeTextfield.value = "10-18 years" : 4 == option.index && ($.ageRangeTextfield.value = "18+ years");
    }
    function calculateDosage() {
        var dlp = $.dlpValue.getValue();
        var part = $.bodyPartTextfield.getValue();
        $.ageRangeTextfield.getValue();
        var conversionFactor;
        conversionFactor = "Head" == part ? .023 : "Neck" == part ? .0054 : "Chest" == part ? .017 : "Abdomen" == part ? .015 : .019;
        $.resultLabel.text = "Estimated Dosage \n (DLP x Conversion Factor for body part): \n " + dlp * conversionFactor;
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
        minRowHeight: "44dp",
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
    $.__views.__alloyId3 = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        title: "CT Dosage Calculator",
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.__alloyId4 = Ti.UI.createLabel({
        top: 5,
        color: "black",
        text: "Dose length product value (DLP):",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.dlpValue = Ti.UI.createTextField({
        height: "34dp",
        width: "95%",
        tintColor: "red",
        opacity: ".4",
        top: 2,
        bottom: 5,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "10px",
        id: "dlpValue"
    });
    $.__views.__alloyId3.add($.__views.dlpValue);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        top: 5,
        color: "black",
        text: "Scanned body part:",
        id: "__alloyId5"
    });
    $.__views.__alloyId3.add($.__views.__alloyId5);
    $.__views.bodyPartTextfield = Ti.UI.createTextField({
        height: "34dp",
        width: "95%",
        tintColor: "red",
        opacity: ".4",
        top: 2,
        bottom: 5,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "10px",
        id: "bodyPartTextfield",
        editable: "false"
    });
    $.__views.__alloyId3.add($.__views.bodyPartTextfield);
    selectBodyPart ? $.__views.bodyPartTextfield.addEventListener("click", selectBodyPart) : __defers["$.__views.bodyPartTextfield!click!selectBodyPart"] = true;
    var __alloyId7 = [];
    __alloyId7.push("Head");
    __alloyId7.push("Neck");
    __alloyId7.push("Chest");
    __alloyId7.push("Abdomen");
    __alloyId7.push("Pelvis");
    __alloyId7.push("Cancel");
    $.__views.bodyPart = Ti.UI.createOptionDialog({
        options: __alloyId7,
        id: "bodyPart",
        title: "Select Body Part:"
    });
    addBodypart ? $.__views.bodyPart.addEventListener("click", addBodypart) : __defers["$.__views.bodyPart!click!addBodypart"] = true;
    $.__views.__alloyId14 = Ti.UI.createLabel({
        top: 5,
        color: "black",
        text: "Patient age range:",
        id: "__alloyId14"
    });
    $.__views.__alloyId3.add($.__views.__alloyId14);
    $.__views.ageRangeTextfield = Ti.UI.createTextField({
        height: "34dp",
        width: "95%",
        tintColor: "red",
        opacity: ".4",
        top: 2,
        bottom: 5,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "10px",
        id: "ageRangeTextfield",
        editable: "false"
    });
    $.__views.__alloyId3.add($.__views.ageRangeTextfield);
    selectAgeRange ? $.__views.ageRangeTextfield.addEventListener("click", selectAgeRange) : __defers["$.__views.ageRangeTextfield!click!selectAgeRange"] = true;
    var __alloyId16 = [];
    __alloyId16.push("Less than 1 year");
    __alloyId16.push("1-5 years");
    __alloyId16.push("5-10 years");
    __alloyId16.push("10-18 years");
    __alloyId16.push("18+ years");
    __alloyId16.push("Cancel");
    $.__views.ageRange = Ti.UI.createOptionDialog({
        options: __alloyId16,
        id: "ageRange",
        title: "Select Patient Age Range:"
    });
    addAgeRange ? $.__views.ageRange.addEventListener("click", addAgeRange) : __defers["$.__views.ageRange!click!addAgeRange"] = true;
    $.__views.__alloyId23 = Ti.UI.createButton({
        top: 5,
        width: "60dp",
        title: "Submit",
        id: "__alloyId23"
    });
    $.__views.__alloyId3.add($.__views.__alloyId23);
    calculateDosage ? $.__views.__alloyId23.addEventListener("click", calculateDosage) : __defers["$.__views.__alloyId23!click!calculateDosage"] = true;
    $.__views.resultLabel = Ti.UI.createLabel({
        top: 20,
        color: "black",
        font: {
            fontWeight: "bold",
            fontSize: "16dp",
            fontFamily: "Constantia"
        },
        textAlign: "center",
        id: "resultLabel"
    });
    $.__views.__alloyId3.add($.__views.resultLabel);
    $.__views.__alloyId2 = Ti.UI.createTab({
        window: $.__views.__alloyId3,
        title: "CT Dosage Calculator",
        icon: "KS_nav_views.png",
        id: "__alloyId2"
    });
    $.__views.index.addTab($.__views.__alloyId2);
    $.__views.__alloyId25 = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        title: "Info",
        id: "__alloyId25"
    });
    $.__views.__alloyId26 = Ti.UI.createLabel({
        top: 5,
        color: "black",
        text: "Information about how to use the app.",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.__alloyId24 = Ti.UI.createTab({
        window: $.__views.__alloyId25,
        title: "Info",
        icon: "KS_nav_views.png",
        id: "__alloyId24"
    });
    $.__views.index.addTab($.__views.__alloyId24);
    $.__views.__alloyId28 = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        title: "Updates",
        id: "__alloyId28"
    });
    $.__views.__alloyId29 = Ti.UI.createButton({
        top: 5,
        width: "60dp",
        title: "Check for updates",
        id: "__alloyId29"
    });
    $.__views.__alloyId28.add($.__views.__alloyId29);
    checkForUpdates ? $.__views.__alloyId29.addEventListener("click", checkForUpdates) : __defers["$.__views.__alloyId29!click!checkForUpdates"] = true;
    $.__views.__alloyId27 = Ti.UI.createTab({
        window: $.__views.__alloyId28,
        title: "Updates",
        icon: "KS_nav_views.png",
        id: "__alloyId27"
    });
    $.__views.index.addTab($.__views.__alloyId27);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.tabChapters = $.tabChapters;
    if (Ti.App.Properties.hasProperty("firstTime")) {
        $.index.open();
        $.table.setData(Alloy.Globals.radiologyDB.chapters());
    } else {
        alert("firstTime");
        $.index.open();
        Alloy.Globals.radiologyDB.init("radiology", loadChapters);
        Ti.App.Properties.setBool("firstTime", false);
    }
    __defers["$.__views.table!click!sectionsWindow"] && $.__views.table.addEventListener("click", sectionsWindow);
    __defers["$.__views.bodyPartTextfield!click!selectBodyPart"] && $.__views.bodyPartTextfield.addEventListener("click", selectBodyPart);
    __defers["$.__views.bodyPart!click!addBodypart"] && $.__views.bodyPart.addEventListener("click", addBodypart);
    __defers["$.__views.ageRangeTextfield!click!selectAgeRange"] && $.__views.ageRangeTextfield.addEventListener("click", selectAgeRange);
    __defers["$.__views.ageRange!click!addAgeRange"] && $.__views.ageRange.addEventListener("click", addAgeRange);
    __defers["$.__views.__alloyId23!click!calculateDosage"] && $.__views.__alloyId23.addEventListener("click", calculateDosage);
    __defers["$.__views.__alloyId29!click!checkForUpdates"] && $.__views.__alloyId29.addEventListener("click", checkForUpdates);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;