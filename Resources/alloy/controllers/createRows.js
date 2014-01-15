function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "createRows";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.newRow = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        backgroundColor: "black",
        color: "white",
        font: {
            fontSize: 1,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        id: "newRow"
    });
    $.__views.newRow && $.addTopLevelView($.__views.newRow);
    $.__views.label = Ti.UI.createLabel({
        id: "label"
    });
    $.__views.newRow.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.newRow.title = args.title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;