function Controller() {
    function nuclearMedicine() {
        var exams = Alloy.Globals.radiologyDB.getExams("Nuclear Medicine");
        var optionsArray = [];
        for (var i in exams) optionsArray.push(exams[i].bodypart);
        optionsArray.push("Cancel");
        var dialog = Ti.UI.createOptionDialog({
            options: optionsArray,
            title: "Pick an examination"
        });
        dialog.addEventListener("click", function(evt) {
            var examChosen = optionsArray[evt.index];
            var examData = Alloy.Globals.radiologyDB.getExamData("Nuclear Medicine", examChosen);
            for (var i in examData) {
                $.examChosenTextfield.value = examChosen;
                $.adminActivityTextfield.value = examData[i].meanAdministeredActivity + " (*Average value - click to edit)";
                $.effectDoseTextfield.value = examData[i].meanEffectiveDose;
                $.adminActivityTextfield.addEventListener("click", function() {
                    $.adminActivityTextfield.value = examData[i].meanAdministeredActivity;
                });
                $.adminActivityTextfield.addEventListener("change", function() {
                    var newValue = $.adminActivityTextfield.getValue();
                    var newDose = newValue * examData[i].effectiveDosePerAdministeredActivity;
                    $.effectDoseTextfield.value = newDose;
                });
            }
        });
        dialog.show();
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
        var dlp = $.dlpValueTextfield.getValue();
        var part = $.bodyPartTextfield.getValue();
        $.ageRangeTextfield.getValue();
        var conversionFactor;
        conversionFactor = "Head" == part ? .023 : "Neck" == part ? .0054 : "Chest" == part ? .017 : "Abdomen" == part ? .015 : .019;
        $.resultLabel.text = "Estimated Dosage= " + dlp * conversionFactor;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "calculator";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.calculator = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        title: "Calculators",
        layout: "vertical",
        id: "calculator"
    });
    $.__views.calculator && $.addTopLevelView($.__views.calculator);
    $.__views.dlpValueLabel = Ti.UI.createLabel(function() {
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
            top: "5%",
            text: "Dose length product value (DLP):",
            id: "dlpValueLabel",
            visible: "false"
        });
        return o;
    }());
    $.__views.calculator.add($.__views.dlpValueLabel);
    $.__views.dlpValueTextfield = Ti.UI.createTextField({
        height: "45dp",
        width: "95%",
        tintColor: "red",
        opacity: ".4",
        top: 2,
        bottom: 5,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "10px",
        visible: "false",
        id: "dlpValueTextfield"
    });
    $.__views.calculator.add($.__views.dlpValueTextfield);
    $.__views.bodypartLabel = Ti.UI.createLabel(function() {
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
            text: "Scanned body part:",
            id: "bodypartLabel",
            visible: "false"
        });
        return o;
    }());
    $.__views.calculator.add($.__views.bodypartLabel);
    $.__views.bodyPartTextfield = Ti.UI.createTextField({
        height: "45dp",
        width: "95%",
        tintColor: "red",
        opacity: ".4",
        top: 2,
        bottom: 5,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "10px",
        visible: "false",
        id: "bodyPartTextfield",
        editable: "false"
    });
    $.__views.calculator.add($.__views.bodyPartTextfield);
    selectBodyPart ? $.__views.bodyPartTextfield.addEventListener("click", selectBodyPart) : __defers["$.__views.bodyPartTextfield!click!selectBodyPart"] = true;
    var __alloyId1 = [];
    __alloyId1.push("Head");
    __alloyId1.push("Neck");
    __alloyId1.push("Chest");
    __alloyId1.push("Abdomen");
    __alloyId1.push("Pelvis");
    __alloyId1.push("Cancel");
    $.__views.bodyPart = Ti.UI.createOptionDialog({
        options: __alloyId1,
        id: "bodyPart",
        title: "Select Body Part:"
    });
    addBodypart ? $.__views.bodyPart.addEventListener("click", addBodypart) : __defers["$.__views.bodyPart!click!addBodypart"] = true;
    $.__views.ageRangeLabel = Ti.UI.createLabel(function() {
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
            text: "Patient age range:",
            id: "ageRangeLabel",
            visible: "false"
        });
        return o;
    }());
    $.__views.calculator.add($.__views.ageRangeLabel);
    $.__views.ageRangeTextfield = Ti.UI.createTextField({
        height: "45dp",
        width: "95%",
        tintColor: "red",
        opacity: ".4",
        top: 2,
        bottom: 5,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "10px",
        visible: "false",
        id: "ageRangeTextfield",
        editable: "false"
    });
    $.__views.calculator.add($.__views.ageRangeTextfield);
    selectAgeRange ? $.__views.ageRangeTextfield.addEventListener("click", selectAgeRange) : __defers["$.__views.ageRangeTextfield!click!selectAgeRange"] = true;
    var __alloyId9 = [];
    __alloyId9.push("Less than 1 year");
    __alloyId9.push("1-5 years");
    __alloyId9.push("5-10 years");
    __alloyId9.push("10-18 years");
    __alloyId9.push("18+ years");
    __alloyId9.push("Cancel");
    $.__views.ageRange = Ti.UI.createOptionDialog({
        options: __alloyId9,
        id: "ageRange",
        title: "Select Patient Age Range:"
    });
    addAgeRange ? $.__views.ageRange.addEventListener("click", addAgeRange) : __defers["$.__views.ageRange!click!addAgeRange"] = true;
    $.__views.ctCalcButton = Ti.UI.createButton({
        title: "Submit",
        id: "ctCalcButton",
        visible: "false"
    });
    $.__views.calculator.add($.__views.ctCalcButton);
    calculateDosage ? $.__views.ctCalcButton.addEventListener("click", calculateDosage) : __defers["$.__views.ctCalcButton!click!calculateDosage"] = true;
    $.__views.resultLabel = Ti.UI.createLabel(function() {
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
            id: "resultLabel"
        });
        return o;
    }());
    $.__views.calculator.add($.__views.resultLabel);
    $.__views.examChosenLabel = Ti.UI.createLabel(function() {
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
            top: "5%",
            text: "Examination/Investigation Chosen:",
            id: "examChosenLabel",
            visible: "false"
        });
        return o;
    }());
    $.__views.calculator.add($.__views.examChosenLabel);
    $.__views.examChosenTextfield = Ti.UI.createTextField({
        height: "45dp",
        width: "95%",
        tintColor: "red",
        opacity: ".4",
        top: 2,
        bottom: 5,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "10px",
        id: "examChosenTextfield",
        visible: "false",
        editable: "false"
    });
    $.__views.calculator.add($.__views.examChosenTextfield);
    nuclearMedicine ? $.__views.examChosenTextfield.addEventListener("click", nuclearMedicine) : __defers["$.__views.examChosenTextfield!click!nuclearMedicine"] = true;
    $.__views.adminActivityLabel = Ti.UI.createLabel(function() {
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
            text: "Administered Activity (MBq):",
            id: "adminActivityLabel",
            visible: "false"
        });
        return o;
    }());
    $.__views.calculator.add($.__views.adminActivityLabel);
    $.__views.adminActivityTextfield = Ti.UI.createTextField({
        height: "45dp",
        width: "95%",
        tintColor: "red",
        opacity: ".4",
        top: 2,
        bottom: 5,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "10px",
        id: "adminActivityTextfield",
        visible: "false"
    });
    $.__views.calculator.add($.__views.adminActivityTextfield);
    $.__views.effectDoseLabel = Ti.UI.createLabel(function() {
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
            text: "Effective Dose (mSv):",
            id: "effectDoseLabel",
            visible: "false"
        });
        return o;
    }());
    $.__views.calculator.add($.__views.effectDoseLabel);
    $.__views.effectDoseTextfield = Ti.UI.createTextField({
        height: "45dp",
        width: "95%",
        tintColor: "red",
        opacity: ".4",
        top: 2,
        bottom: 5,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "10px",
        id: "effectDoseTextfield",
        visible: "false",
        editable: "false"
    });
    $.__views.calculator.add($.__views.effectDoseTextfield);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    if ("ct" == args.calculator) {
        $.ctCalcButton.show();
        $.ageRangeLabel.show();
        $.ageRangeTextfield.show();
        $.bodypartLabel.show();
        $.bodyPartTextfield.show();
        $.dlpValueLabel.show();
        $.dlpValueTextfield.show();
    } else {
        $.examChosenLabel.show();
        $.examChosenTextfield.show();
        $.adminActivityLabel.show();
        $.adminActivityTextfield.show();
        $.effectDoseLabel.show();
        $.effectDoseTextfield.show();
    }
    __defers["$.__views.bodyPartTextfield!click!selectBodyPart"] && $.__views.bodyPartTextfield.addEventListener("click", selectBodyPart);
    __defers["$.__views.bodyPart!click!addBodypart"] && $.__views.bodyPart.addEventListener("click", addBodypart);
    __defers["$.__views.ageRangeTextfield!click!selectAgeRange"] && $.__views.ageRangeTextfield.addEventListener("click", selectAgeRange);
    __defers["$.__views.ageRange!click!addAgeRange"] && $.__views.ageRange.addEventListener("click", addAgeRange);
    __defers["$.__views.ctCalcButton!click!calculateDosage"] && $.__views.ctCalcButton.addEventListener("click", calculateDosage);
    __defers["$.__views.examChosenTextfield!click!nuclearMedicine"] && $.__views.examChosenTextfield.addEventListener("click", nuclearMedicine);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;