function Controller() {
    function checkForImages(items) {
        for (var i in items) if (-1 != items[i].item.indexOf("/images/")) return true;
        return false;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "itemViewer";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        color: "white",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    var __alloyId29 = [];
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView"
    });
    __alloyId29.push($.__views.scrollView);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        color: "black",
        backgroundImage: "/images/itemViewerBackground.jpg",
        views: __alloyId29,
        id: "scrollableView",
        width: "100%",
        height: "100%",
        showPagingControl: "true"
    });
    $.__views.win.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var items = Alloy.Globals.radiologyDB.items(args.title);
    Ti.API.info(JSON.stringify(items));
    $.win.title = args.title;
    var viewsArray = [];
    if (true == checkForImages(items)) for (var i in items) viewsArray.push(Alloy.createController("viewWithMedia", {
        object: items[i]
    }).getView()); else for (var i in items) viewsArray.push(Alloy.createController("viewWithNoMedia", {
        object: items[i]
    }).getView());
    $.scrollableView.setViews(viewsArray);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;