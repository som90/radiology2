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
        font: {
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        hasChild: true,
        id: "newRow"
    });
    $.__views.newRow && $.addTopLevelView($.__views.newRow);
    $.__views.label = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            textAlign: "left",
            width: "95%",
            height: Ti.UI.SIZE,
            color: "black"
        });
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
            left: "10dp",
            right: "10dp",
            top: "15dp"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: "30dp",
            right: "30dp",
            top: "25dp",
            font: {
                fontSize: "30dp"
            }
        });
        _.extend(o, {
            id: "label"
        });
        return o;
    }());
    $.__views.newRow.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.newRow.name = args.title;
    $.label.text = args.title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;