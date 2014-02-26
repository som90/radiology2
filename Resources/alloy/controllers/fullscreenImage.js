function Controller() {
    function closeWindow() {
        $.win.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "fullscreenImage";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        navBarHidden: true,
        backgroundColor: "#8000",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.fullSizeImageView = Ti.UI.createImageView({
        top: 5,
        bottom: "60dp",
        id: "fullSizeImageView"
    });
    $.__views.win.add($.__views.fullSizeImageView);
    closeWindow ? $.__views.fullSizeImageView.addEventListener("click", closeWindow) : __defers["$.__views.fullSizeImageView!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.fullSizeImageView.image = args.image;
    __defers["$.__views.fullSizeImageView!click!closeWindow"] && $.__views.fullSizeImageView.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;