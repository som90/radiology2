function Controller() {
    function chooseProcedure() {
        $.procedureOptions.show();
    }
    function addProcedure(option) {
        if (0 == option.index) radiography(); else if (1 == option.index) ct(); else if (2 == option.index) interventional(); else if (3 == option.index) dental(); else {
            if (4 != option.index) return;
            nuclear();
        }
    }
    function radiography() {
        $.instructionLabel.hide();
        var tableDataArray = [];
        $.procedureTable.setData(tableDataArray);
        $.procedureLabel.setText("Radiography");
        var exams = Alloy.Globals.radiologyDB.getExams("Radiography");
        Ti.API.info(JSON.stringify(exams));
        tableDataArray.push(createRow("Examination", "Mean Effective Dose\n(mSv)", "Ranges Reported\n(mSv)", true));
        for (var i in exams) tableDataArray.push(createRow(exams[i].bodypart, exams[i].meanEffectiveDose, exams[i].rangesReported, false));
        $.procedureTable.setData(tableDataArray);
        $.procedureTable.show();
        tableDataArray = null;
    }
    function ct() {
        $.instructionLabel.hide();
        var tableDataArray = [];
        $.procedureTable.setData(tableDataArray);
        $.procedureLabel.setText("CT - Computed Tomography");
        var exams = Alloy.Globals.radiologyDB.getExams("CT");
        Ti.API.info(JSON.stringify(exams));
        tableDataArray.push(createRow("Examination", "Mean Effective Dose\n(mSv)", "Ranges Reported\n(mSv)", true));
        for (var i in exams) tableDataArray.push(createRow(exams[i].bodypart, exams[i].meanEffectiveDose, exams[i].rangesReported, false));
        $.procedureTable.setData(tableDataArray);
        $.procedureTable.show();
        tableDataArray = null;
    }
    function interventional() {
        $.instructionLabel.hide();
        var tableDataArray = [];
        $.procedureTable.setData(tableDataArray);
        $.procedureLabel.setText("Interventional Radiology");
        var exams = Alloy.Globals.radiologyDB.getExams("Interventional Radiology");
        Ti.API.info(JSON.stringify(exams));
        tableDataArray.push(createRow("Examination", "Mean Effective Dose\n(mSv)", "Ranges Reported\n(mSv)", true));
        for (var i in exams) tableDataArray.push(createRow(exams[i].bodypart, exams[i].meanEffectiveDose, exams[i].rangesReported, false));
        $.procedureTable.setData(tableDataArray);
        $.procedureTable.show();
        tableDataArray = null;
    }
    function dental() {
        $.instructionLabel.hide();
        var tableDataArray = [];
        $.procedureTable.setData(tableDataArray);
        $.procedureLabel.setText("Dental Radiography");
        var exams = Alloy.Globals.radiologyDB.getExams("Dental Radiography");
        Ti.API.info(JSON.stringify(exams));
        tableDataArray.push(createRow("Examination", "Mean Effective Dose\n(mSv)", "Ranges Reported\n(mSv)", true));
        for (var i in exams) tableDataArray.push(createRow(exams[i].bodypart, exams[i].meanEffectiveDose, exams[i].rangesReported, false));
        $.procedureTable.setData(tableDataArray);
        $.procedureTable.show();
        tableDataArray = null;
    }
    function nuclear() {
        $.instructionLabel.hide();
        var tableDataArray = [];
        $.procedureTable.setData(tableDataArray);
        $.procedureLabel.setText("Nuclear Medicine");
        var exams = Alloy.Globals.radiologyDB.getExams("Nuclear Medicine");
        Ti.API.info(JSON.stringify(exams));
        tableDataArray.push(createRow("Examination", "Mean Effective Dose\n(mSv)", "Administered Activity\n(MBq)", true));
        for (var i in exams) tableDataArray.push(createRow(exams[i].bodypart, exams[i].meanEffectiveDose, exams[i].meanAdministeredActivity, false));
        $.procedureTable.setData(tableDataArray);
        $.procedureTable.show();
        tableDataArray = null;
    }
    function createRow(exam, aed, vrl, Header) {
        var tableRow = Ti.UI.createTableViewRow({
            height: "50dp"
        });
        var examView = Ti.UI.createView({
            left: 0,
            width: "50%"
        });
        var aedView = Ti.UI.createView({
            left: "50%",
            width: "25%"
        });
        var vrlView = Ti.UI.createView({
            right: 0,
            width: "25%"
        });
        if (Header) {
            examView.add(Ti.UI.createLabel({
                color: "red",
                font: {
                    fontWeight: "bold"
                },
                text: exam
            }));
            aedView.add(Ti.UI.createLabel({
                color: "red",
                font: {
                    fontWeight: "bold"
                },
                text: aed
            }));
            vrlView.add(Ti.UI.createLabel({
                color: "red",
                font: {
                    fontWeight: "bold"
                },
                text: vrl
            }));
        } else {
            examView.add(Ti.UI.createLabel({
                color: "black",
                text: exam
            }));
            aedView.add(Ti.UI.createLabel({
                color: "black",
                text: aed
            }));
            vrlView.add(Ti.UI.createLabel({
                color: "black",
                text: vrl
            }));
        }
        tableRow.add(examView);
        tableRow.add(aedView);
        tableRow.add(vrlView);
        examView = aedView = vrlView = null;
        return tableRow;
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
        id: "procedureTables"
    });
    $.__views.procedureTables && $.addTopLevelView($.__views.procedureTables);
    $.__views.procedureLabel = Ti.UI.createLabel(function() {
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
        Alloy.isTablet && _.extend(o, {
            top: 20,
            font: {
                fontWeight: "bold",
                fontSize: "22dp"
            }
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: 10,
            left: "35%",
            font: {
                fontWeight: "bold",
                fontSize: "15dp"
            }
        });
        _.extend(o, {
            id: "procedureLabel"
        });
        return o;
    }());
    $.__views.procedureTables.add($.__views.procedureLabel);
    $.__views.procedureButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            top: 20,
            left: 10,
            height: 50,
            width: "22%",
            backgroundColor: "#d3d3d3",
            borderColor: "black",
            borderRadius: 15,
            color: "black"
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: 10,
            left: 10,
            height: 25,
            width: "27%",
            backgroundColor: "#d3d3d3",
            borderColor: "black",
            borderRadius: 15,
            color: "black"
        });
        _.extend(o, {
            title: "Procedures",
            id: "procedureButton"
        });
        return o;
    }());
    $.__views.procedureTables.add($.__views.procedureButton);
    chooseProcedure ? $.__views.procedureButton.addEventListener("click", chooseProcedure) : __defers["$.__views.procedureButton!click!chooseProcedure"] = true;
    var __alloyId22 = [];
    __alloyId22.push("Radiography");
    __alloyId22.push("CT");
    __alloyId22.push("Interventional Radiology");
    __alloyId22.push("Dental Radiography");
    __alloyId22.push("Nuclear Medicine");
    __alloyId22.push("Cancel");
    $.__views.procedureOptions = Ti.UI.createOptionDialog({
        options: __alloyId22,
        id: "procedureOptions",
        title: "Select Investigation/Procedure:"
    });
    addProcedure ? $.__views.procedureOptions.addEventListener("click", addProcedure) : __defers["$.__views.procedureOptions!click!addProcedure"] = true;
    $.__views.instructionLabel = Ti.UI.createLabel(function() {
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
            top: "40%",
            text: "Choose a procedure",
            id: "instructionLabel"
        });
        return o;
    }());
    $.__views.procedureTables.add($.__views.instructionLabel);
    $.__views.procedureTable = Ti.UI.createTableView(function() {
        var o = {};
        _.extend(o, {
            top: "5px",
            backgroundColor: "transparent",
            minRowHeight: "50dp"
        });
        Alloy.isTablet && _.extend(o, {
            top: "7%"
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: "10%"
        });
        _.extend(o, {
            id: "procedureTable",
            visible: "false"
        });
        return o;
    }());
    $.__views.procedureTables.add($.__views.procedureTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.procedureButton!click!chooseProcedure"] && $.__views.procedureButton.addEventListener("click", chooseProcedure);
    __defers["$.__views.procedureOptions!click!addProcedure"] && $.__views.procedureOptions.addEventListener("click", addProcedure);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;