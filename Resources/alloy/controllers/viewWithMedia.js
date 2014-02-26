function Controller() {
    function fullScreen() {
        var fullImage = Alloy.createController("fullScreenImage", {
            image: args.object.item
        }).getView();
        fullImage.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "viewWithMedia";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.scroll = Ti.UI.createScrollView({
        layout: "vertical",
        id: "scroll"
    });
    $.__views.scroll && $.addTopLevelView($.__views.scroll);
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
    $.__views.scroll.add($.__views.heading);
    $.__views.label = Ti.UI.createLabel({
        top: 8,
        color: "black",
        left: 8,
        right: 8,
        id: "label"
    });
    $.__views.scroll.add($.__views.label);
    $.__views.imageView = Ti.UI.createImageView({
        width: "300dp",
        id: "imageView"
    });
    $.__views.scroll.add($.__views.imageView);
    fullScreen ? $.__views.imageView.addEventListener("click", fullScreen) : __defers["$.__views.imageView!click!fullScreen"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.label = $.label;
    Alloy.Globals.heading = $.heading;
    var args = arguments[0] || {};
    $.heading.text = args.object.heading;
    -1 != args.object.item.indexOf("/images/") ? $.imageView.image = args.object.item : $.label.text = args.object.item;
    __defers["$.__views.imageView!click!fullScreen"] && $.__views.imageView.addEventListener("click", fullScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;