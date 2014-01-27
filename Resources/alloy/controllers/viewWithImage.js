function Controller() {
    function testfunction() {
        alert("test");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "viewWithImage";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.viewWithImage = Ti.UI.createScrollView({
        layout: "vertical",
        id: "viewWithImage"
    });
    $.__views.viewWithImage && $.addTopLevelView($.__views.viewWithImage);
    $.__views.heading = Ti.UI.createLabel({
        left: 8,
        right: 8,
        top: 8,
        id: "heading"
    });
    $.__views.viewWithImage.add($.__views.heading);
    $.__views.label = Ti.UI.createLabel({
        left: 8,
        right: 8,
        top: 8,
        id: "label"
    });
    $.__views.viewWithImage.add($.__views.label);
    $.__views.imageView = Ti.UI.createImageView({
        width: "300dp",
        id: "imageView"
    });
    $.__views.viewWithImage.add($.__views.imageView);
    testfunction ? $.__views.imageView.addEventListener("click", testfunction) : __defers["$.__views.imageView!click!testfunction"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.heading.text = args.object.heading;
    -1 != args.object.item.indexOf("/images/") ? $.imageView.image = args.object.item : $.label.text = args.object.item;
    __defers["$.__views.imageView!click!testfunction"] && $.__views.imageView.addEventListener("click", testfunction);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;