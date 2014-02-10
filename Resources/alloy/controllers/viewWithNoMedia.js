function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "viewWithNoMedia";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.viewWithNoMedia = Ti.UI.createScrollView({
        layout: "vertical",
        id: "viewWithNoMedia"
    });
    $.__views.viewWithNoMedia && $.addTopLevelView($.__views.viewWithNoMedia);
    $.__views.heading = Ti.UI.createLabel({
        top: 8,
        color: "white",
        left: 8,
        right: 8,
        font: {
            fontWeight: "bold"
        },
        textAlign: "center",
        height: "40dp",
        id: "heading"
    });
    $.__views.viewWithNoMedia.add($.__views.heading);
    $.__views.label = Ti.UI.createLabel({
        top: 8,
        color: "black",
        left: 8,
        right: 8,
        id: "label"
    });
    $.__views.viewWithNoMedia.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.heading.text = args.object.heading;
    $.label.text = args.object.item;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;