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
                $.resultLabel.text = "Effective Dose: " + examData[i].meanEffectiveDose + "mSv";
                $.adminActivityTextfield.addEventListener("click", function() {
                    $.adminActivityTextfield.value = examData[i].meanAdministeredActivity;
                });
                $.adminActivityTextfield.addEventListener("change", function() {
                    var newValue = $.adminActivityTextfield.getValue();
                    var newDose = newValue * examData[i].effectiveDosePerAdministeredActivity;
                    $.resultLabel.text = "Effective Dose: " + newDose + "mSv";
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
    $.__views.winNucCalc = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        id: "winNucCalc",
        title: "Nuclear Medicine Calculator",
        layout: "vertical"
    });
    $.__views.winNucCalc && $.addTopLevelView($.__views.winNucCalc);
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
    $.__views.winNucCalc.add($.__views.examChosenLabel);
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
    $.__views.winNucCalc.add($.__views.examChosenTextfield);
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
    $.__views.winNucCalc.add($.__views.adminActivityLabel);
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
    $.__views.winNucCalc.add($.__views.adminActivityTextfield);
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
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: "7%",
            font: {
                fontWeight: "bold",
                fontSize: "15dp"
            },
            textAlign: "center"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            top: "7%",
            font: {
                fontWeight: "bold",
                fontSize: "25dp"
            },
            textAlign: "center"
        });
        _.extend(o, {
            id: "resultLabel"
        });
        return o;
    }());
    $.__views.winNucCalc.add($.__views.resultLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if ("black" == Ti.App.Properties.getString("theme")) {
        $.winNucCalc.backgroundImage = "/images/radiologyBackgroundInverted.jpg";
        $.examChosenLabel.setColor("white");
        $.adminActivityLabel.setColor("white");
        $.resultLabel.setColor("white");
    } else {
        $.winNucCalc.backgroundImage = "/images/radiologyBackground.jpg";
        $.examChosenLabel.setColor("black");
        $.adminActivityLabel.setColor("black");
        $.resultLabel.setColor("black");
    }
    __defers["$.__views.examChosenTextfield!click!nuclearMedicine"] && $.__views.examChosenTextfield.addEventListener("click", nuclearMedicine);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;