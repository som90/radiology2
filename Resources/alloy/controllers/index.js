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
    function selectBodyPart() {
        $.bodyPart.show();
    }
    function addBodypart(option) {
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
    function changeFontLarge() {
        var xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "tester.jpg");
                f.write(this.responseData);
                Ti.App.fireEvent("image_downloaded", {
                    filepath: f.nativePath
                });
            },
            timeout: 1e4
        });
        var item = "slide9.jpg";
        xhr.open("GET", "http://cs1.ucc.ie/~som6/bin/FYP/prototype/images/" + item);
        xhr.send();
        Ti.App.addEventListener("image_downloaded", function(e) {
            $.testImage.image = e.filepath;
            alert(e.filepath);
            Ti.API.info(e.filepath);
        });
    }
    function selectProcedure() {
        $.procedureOptions.show();
    }
    function addProcedure(option) {
        var areaChosen;
        var optionsArray = [];
        if (0 == option.index) {
            areaChosen = "Radiography";
            var examArea = Alloy.Globals.radiologyDB.getExams(areaChosen);
            for (var i in examArea) optionsArray.push(examArea[i].bodypart);
        } else if (1 == option.index) {
            areaChosen = "CT";
            var examArea = Alloy.Globals.radiologyDB.getExams(areaChosen);
            for (var i in examArea) optionsArray.push(examArea[i].bodypart);
        } else if (2 == option.index) {
            areaChosen = "Interventional Radiology";
            var examArea = Alloy.Globals.radiologyDB.getExams(areaChosen);
            for (var i in examArea) optionsArray.push(examArea[i].bodypart);
        } else if (3 == option.index) {
            areaChosen = "Dental Radiography";
            var examArea = Alloy.Globals.radiologyDB.getExams(areaChosen);
            for (var i in examArea) optionsArray.push(examArea[i].bodypart);
        } else {
            if (4 != option.index) return;
            areaChosen = "Nuclear Medicine";
            var examArea = Alloy.Globals.radiologyDB.getExams(areaChosen);
            for (var i in examArea) optionsArray.push(examArea[i].bodypart);
        }
        $.procedureChoice.text = areaChosen;
        optionsArray.push("Cancel");
        var dialog = Ti.UI.createOptionDialog({
            options: optionsArray,
            title: "Pick an examination"
        });
        dialog.addEventListener("click", function(evt) {
            var examChosen = optionsArray[evt.index];
            var examData = Alloy.Globals.radiologyDB.getExamData(areaChosen, examChosen);
            if ("Cancel" == examChosen) return;
            $.label1.text = null;
            $.label2.text = null;
            $.label3.text = null;
            if ("Nuclear Medicine" == areaChosen) for (var i in examData) {
                $.label1.text = "\n Examination/Investigation Chosen: \n" + examChosen;
                $.label2.text = "\n \n Administered Activity (MBq)";
                $.aaTextfield.value = examData[i].meanAdministeredActivity + " (*Average value - click to edit)";
                $.aaTextfield.show();
                $.label3.text = "\n \n Effective Dose (mSv): \n" + examData[i].meanEffectiveDose;
                $.aaTextfield.addEventListener("click", function() {
                    $.aaTextfield.value = examData[i].meanAdministeredActivity;
                });
                $.aaTextfield.addEventListener("change", function() {
                    var newValue = $.aaTextfield.getValue();
                    Ti.API.info(newValue);
                    var newDose = newValue * examData[i].effectiveDosePerAdministeredActivity;
                    $.label3.text = "\n \n Effective Dose (mSv): \n" + newDose;
                });
            } else {
                $.aaTextfield.hide();
                for (var i in examData) {
                    $.label1.text = "\n Examination/Investigation Chosen: \n" + examChosen;
                    $.label2.text = "\n \n Average Effective Dose (mSv): \n" + examData[i].meanEffectiveDose;
                    $.label3.text = "\n \n Values Reported in Literature (mSv): \n" + examData[i].rangesReported;
                }
            }
        });
        dialog.show();
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
    $.__views.__alloyId2 = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        title: "CT Dosage Calculator",
        layout: "vertical",
        id: "__alloyId2"
    });
    $.__views.__alloyId3 = Ti.UI.createLabel({
        top: 5,
        color: "black",
        text: "Dose length product value (DLP):",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
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
    $.__views.__alloyId2.add($.__views.dlpValue);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        top: 5,
        color: "black",
        text: "Scanned body part:",
        id: "__alloyId4"
    });
    $.__views.__alloyId2.add($.__views.__alloyId4);
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
    $.__views.__alloyId2.add($.__views.bodyPartTextfield);
    selectBodyPart ? $.__views.bodyPartTextfield.addEventListener("click", selectBodyPart) : __defers["$.__views.bodyPartTextfield!click!selectBodyPart"] = true;
    var __alloyId6 = [];
    __alloyId6.push("Head");
    __alloyId6.push("Neck");
    __alloyId6.push("Chest");
    __alloyId6.push("Abdomen");
    __alloyId6.push("Pelvis");
    __alloyId6.push("Cancel");
    $.__views.bodyPart = Ti.UI.createOptionDialog({
        options: __alloyId6,
        id: "bodyPart",
        title: "Select Body Part:"
    });
    addBodypart ? $.__views.bodyPart.addEventListener("click", addBodypart) : __defers["$.__views.bodyPart!click!addBodypart"] = true;
    $.__views.__alloyId13 = Ti.UI.createLabel({
        top: 5,
        color: "black",
        text: "Patient age range:",
        id: "__alloyId13"
    });
    $.__views.__alloyId2.add($.__views.__alloyId13);
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
    $.__views.__alloyId2.add($.__views.ageRangeTextfield);
    selectAgeRange ? $.__views.ageRangeTextfield.addEventListener("click", selectAgeRange) : __defers["$.__views.ageRangeTextfield!click!selectAgeRange"] = true;
    var __alloyId15 = [];
    __alloyId15.push("Less than 1 year");
    __alloyId15.push("1-5 years");
    __alloyId15.push("5-10 years");
    __alloyId15.push("10-18 years");
    __alloyId15.push("18+ years");
    __alloyId15.push("Cancel");
    $.__views.ageRange = Ti.UI.createOptionDialog({
        options: __alloyId15,
        id: "ageRange",
        title: "Select Patient Age Range:"
    });
    addAgeRange ? $.__views.ageRange.addEventListener("click", addAgeRange) : __defers["$.__views.ageRange!click!addAgeRange"] = true;
    $.__views.__alloyId22 = Ti.UI.createButton({
        top: 5,
        width: "50%",
        title: "Submit",
        id: "__alloyId22"
    });
    $.__views.__alloyId2.add($.__views.__alloyId22);
    calculateDosage ? $.__views.__alloyId22.addEventListener("click", calculateDosage) : __defers["$.__views.__alloyId22!click!calculateDosage"] = true;
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
    $.__views.__alloyId2.add($.__views.resultLabel);
    $.__views.__alloyId1 = Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "CT Dosage Calculator",
        icon: "KS_nav_views.png",
        id: "__alloyId1"
    });
    $.__views.index.addTab($.__views.__alloyId1);
    $.__views.__alloyId24 = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        title: "Info",
        id: "__alloyId24"
    });
    $.__views.__alloyId25 = Ti.UI.createLabel({
        top: 5,
        color: "black",
        text: "Information about how to use the app.",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
    $.__views.__alloyId23 = Ti.UI.createTab({
        window: $.__views.__alloyId24,
        title: "Info",
        icon: "KS_nav_views.png",
        id: "__alloyId23"
    });
    $.__views.index.addTab($.__views.__alloyId23);
    $.__views.__alloyId27 = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        title: "Preferences",
        id: "__alloyId27"
    });
    $.__views.largeFont = Ti.UI.createButton({
        top: 60,
        width: "50%",
        title: "Large Font",
        id: "largeFont"
    });
    $.__views.__alloyId27.add($.__views.largeFont);
    changeFontLarge ? $.__views.largeFont.addEventListener("click", changeFontLarge) : __defers["$.__views.largeFont!click!changeFontLarge"] = true;
    $.__views.__alloyId28 = Ti.UI.createButton({
        top: 5,
        width: "50%",
        title: "Check for updates",
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    checkForUpdates ? $.__views.__alloyId28.addEventListener("click", checkForUpdates) : __defers["$.__views.__alloyId28!click!checkForUpdates"] = true;
    $.__views.testImage = Ti.UI.createImageView({
        id: "testImage"
    });
    $.__views.__alloyId27.add($.__views.testImage);
    $.__views.__alloyId26 = Ti.UI.createTab({
        window: $.__views.__alloyId27,
        title: "Preferences",
        icon: "KS_nav_views.png",
        id: "__alloyId26"
    });
    $.__views.index.addTab($.__views.__alloyId26);
    $.__views.__alloyId29 = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        title: "Average Radiation Doses",
        layout: "vertical",
        id: "__alloyId29"
    });
    var __alloyId31 = [];
    __alloyId31.push("Radiography");
    __alloyId31.push("CT");
    __alloyId31.push("Interventional Radiology");
    __alloyId31.push("Dental Radiography");
    __alloyId31.push("Nuclear Medicine");
    __alloyId31.push("Cancel");
    $.__views.procedureOptions = Ti.UI.createOptionDialog({
        options: __alloyId31,
        id: "procedureOptions",
        title: "Select Investigation/Procedure:"
    });
    addProcedure ? $.__views.procedureOptions.addEventListener("click", addProcedure) : __defers["$.__views.procedureOptions!click!addProcedure"] = true;
    $.__views.procedureChoice = Ti.UI.createLabel({
        top: 5,
        color: "black",
        text: "Click here to select your procedure",
        id: "procedureChoice"
    });
    $.__views.__alloyId29.add($.__views.procedureChoice);
    selectProcedure ? $.__views.procedureChoice.addEventListener("click", selectProcedure) : __defers["$.__views.procedureChoice!click!selectProcedure"] = true;
    $.__views.label1 = Ti.UI.createLabel({
        top: 5,
        color: "black",
        id: "label1"
    });
    $.__views.__alloyId29.add($.__views.label1);
    $.__views.label2 = Ti.UI.createLabel({
        top: 5,
        color: "black",
        id: "label2"
    });
    $.__views.__alloyId29.add($.__views.label2);
    $.__views.aaTextfield = Ti.UI.createTextField({
        height: "34dp",
        width: "95%",
        tintColor: "red",
        opacity: ".4",
        top: 2,
        bottom: 5,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "10px",
        id: "aaTextfield",
        visible: "false"
    });
    $.__views.__alloyId29.add($.__views.aaTextfield);
    $.__views.label3 = Ti.UI.createLabel({
        top: 5,
        color: "black",
        id: "label3"
    });
    $.__views.__alloyId29.add($.__views.label3);
    $.__views.AvgRadDoses = Ti.UI.createTab({
        window: $.__views.__alloyId29,
        title: "Average Radiation Doses",
        id: "AvgRadDoses",
        icon: "KS_nav_views.png"
    });
    $.__views.index.addTab($.__views.AvgRadDoses);
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
    __defers["$.__views.bodyPartTextfield!click!selectBodyPart"] && $.__views.bodyPartTextfield.addEventListener("click", selectBodyPart);
    __defers["$.__views.bodyPart!click!addBodypart"] && $.__views.bodyPart.addEventListener("click", addBodypart);
    __defers["$.__views.ageRangeTextfield!click!selectAgeRange"] && $.__views.ageRangeTextfield.addEventListener("click", selectAgeRange);
    __defers["$.__views.ageRange!click!addAgeRange"] && $.__views.ageRange.addEventListener("click", addAgeRange);
    __defers["$.__views.__alloyId22!click!calculateDosage"] && $.__views.__alloyId22.addEventListener("click", calculateDosage);
    __defers["$.__views.largeFont!click!changeFontLarge"] && $.__views.largeFont.addEventListener("click", changeFontLarge);
    __defers["$.__views.__alloyId28!click!checkForUpdates"] && $.__views.__alloyId28.addEventListener("click", checkForUpdates);
    __defers["$.__views.procedureOptions!click!addProcedure"] && $.__views.procedureOptions.addEventListener("click", addProcedure);
    __defers["$.__views.procedureChoice!click!selectProcedure"] && $.__views.procedureChoice.addEventListener("click", selectProcedure);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;