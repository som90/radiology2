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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "nucCalculator";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.nucCalculator = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        title: "Nuclear Medicine Calculator",
        layout: "vertical",
        id: "nucCalculator"
    });
    $.__views.nucCalculator && $.addTopLevelView($.__views.nucCalculator);
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
            id: "examChosenLabel"
        });
        return o;
    }());
    $.__views.nucCalculator.add($.__views.examChosenLabel);
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
        editable: "false"
    });
    $.__views.nucCalculator.add($.__views.examChosenTextfield);
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
            id: "adminActivityLabel"
        });
        return o;
    }());
    $.__views.nucCalculator.add($.__views.adminActivityLabel);
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
        id: "adminActivityTextfield"
    });
    $.__views.nucCalculator.add($.__views.adminActivityTextfield);
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
            id: "effectDoseLabel"
        });
        return o;
    }());
    $.__views.nucCalculator.add($.__views.effectDoseLabel);
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
        editable: "false"
    });
    $.__views.nucCalculator.add($.__views.effectDoseTextfield);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.examChosenTextfield!click!nuclearMedicine"] && $.__views.examChosenTextfield.addEventListener("click", nuclearMedicine);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;