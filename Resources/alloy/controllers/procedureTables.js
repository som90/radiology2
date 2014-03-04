function Controller() {
    function selectProcedure() {
        $.procedureOptions.show();
    }
    function addProcedure(option) {
        0 == option.index ? $.procedureChoiceTextfield.value = "Radiography" : 1 == option.index ? $.procedureChoiceTextfield.value = "CT" : 2 == option.index ? $.procedureChoiceTextfield.value = "Interventional Radiology" : 3 == option.index ? $.procedureChoiceTextfield.value = "Dental Radiography" : 4 == option.index && ($.procedureChoiceTextfield.value = "Nuclear Medicine");
    }
    function selectBodypart() {
        var areaChosen = $.procedureChoiceTextfield.getValue();
        var optionsArray = [];
        var bodyparts = Alloy.Globals.radiologyDB.getExams(areaChosen);
        for (var i in bodyparts) optionsArray.push(bodyparts[i].bodypart);
        optionsArray.push("Cancel");
        var dialog = Ti.UI.createOptionDialog({
            options: optionsArray,
            title: "Choose a bodypart(/exam)"
        });
        dialog.addEventListener("click", function(evt) {
            var examChosen = optionsArray[evt.index];
            var examData = Alloy.Globals.radiologyDB.getExamData(areaChosen, examChosen);
            $.bodypartChoiceTextfield.value = examChosen;
            if ("Cancel" == examChosen) return;
            for (var i in examData) {
                $.label2.text = "\n \nAverage Effective Dose (mSv): \n" + examData[i].meanEffectiveDose;
                $.label3.text = "\n \nValues Reported in Literature (mSv): \n" + examData[i].rangesReported;
            }
        });
        dialog.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "procedureTables";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.procedureTables = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        title: "Procedure Tables",
        layout: "vertical",
        id: "procedureTables"
    });
    $.__views.procedureTables && $.addTopLevelView($.__views.procedureTables);
    $.__views.procedureChoiceLabel = Ti.UI.createLabel(function() {
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
            text: "Choose a procedure:",
            id: "procedureChoiceLabel"
        });
        return o;
    }());
    $.__views.procedureTables.add($.__views.procedureChoiceLabel);
    $.__views.procedureChoiceTextfield = Ti.UI.createTextField({
        height: "45dp",
        width: "95%",
        tintColor: "red",
        opacity: ".4",
        top: 2,
        bottom: 5,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "10px",
        id: "procedureChoiceTextfield",
        editable: "false"
    });
    $.__views.procedureTables.add($.__views.procedureChoiceTextfield);
    selectProcedure ? $.__views.procedureChoiceTextfield.addEventListener("click", selectProcedure) : __defers["$.__views.procedureChoiceTextfield!click!selectProcedure"] = true;
    var __alloyId25 = [];
    __alloyId25.push("Radiography");
    __alloyId25.push("CT");
    __alloyId25.push("Interventional Radiology");
    __alloyId25.push("Dental Radiography");
    __alloyId25.push("Nuclear Medicine");
    __alloyId25.push("Cancel");
    $.__views.procedureOptions = Ti.UI.createOptionDialog({
        options: __alloyId25,
        id: "procedureOptions",
        title: "Select Investigation/Procedure:"
    });
    addProcedure ? $.__views.procedureOptions.addEventListener("click", addProcedure) : __defers["$.__views.procedureOptions!click!addProcedure"] = true;
    $.__views.bodypartChoiceLabel = Ti.UI.createLabel(function() {
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
            text: "Choose a bodypart(/exam):",
            id: "bodypartChoiceLabel"
        });
        return o;
    }());
    $.__views.procedureTables.add($.__views.bodypartChoiceLabel);
    $.__views.bodypartChoiceTextfield = Ti.UI.createTextField({
        height: "45dp",
        width: "95%",
        tintColor: "red",
        opacity: ".4",
        top: 2,
        bottom: 5,
        textAlign: "center",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "10px",
        id: "bodypartChoiceTextfield",
        editable: "false"
    });
    $.__views.procedureTables.add($.__views.bodypartChoiceTextfield);
    selectBodypart ? $.__views.bodypartChoiceTextfield.addEventListener("click", selectBodypart) : __defers["$.__views.bodypartChoiceTextfield!click!selectBodypart"] = true;
    $.__views.label1 = Ti.UI.createLabel(function() {
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
            id: "label1"
        });
        return o;
    }());
    $.__views.procedureTables.add($.__views.label1);
    $.__views.label2 = Ti.UI.createLabel(function() {
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
            id: "label2"
        });
        return o;
    }());
    $.__views.procedureTables.add($.__views.label2);
    $.__views.label3 = Ti.UI.createLabel(function() {
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
            id: "label3"
        });
        return o;
    }());
    $.__views.procedureTables.add($.__views.label3);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.procedureChoiceTextfield!click!selectProcedure"] && $.__views.procedureChoiceTextfield.addEventListener("click", selectProcedure);
    __defers["$.__views.procedureOptions!click!addProcedure"] && $.__views.procedureOptions.addEventListener("click", addProcedure);
    __defers["$.__views.bodypartChoiceTextfield!click!selectBodypart"] && $.__views.bodypartChoiceTextfield.addEventListener("click", selectBodypart);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;