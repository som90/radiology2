function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "viewWithImage";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.viewWithImage = Ti.UI.createView({
        layout: "vertical",
        id: "viewWithImage"
    });
    $.__views.viewWithImage && $.addTopLevelView($.__views.viewWithImage);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        text: "Heading Here",
        id: "__alloyId2"
    });
    $.__views.viewWithImage.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        text: "Text Here",
        id: "__alloyId3"
    });
    $.__views.viewWithImage.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createImageView({
        image: "/images/barca.jpg",
        id: "__alloyId4"
    });
    $.__views.viewWithImage.add($.__views.__alloyId4);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;