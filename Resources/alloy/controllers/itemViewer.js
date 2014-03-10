function Controller() {
    function checkForImages(items) {
        for (var i in items) if (-1 != items[i].item.indexOf("file:/")) return true;
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
        id: "win",
        display: "vertical"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    var __alloyId18 = [];
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView"
    });
    __alloyId18.push($.__views.scrollView);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        color: "black",
        backgroundImage: "/images/itemViewerBackground.jpg",
        views: __alloyId18,
        id: "scrollableView",
        width: "100%",
        height: "100%",
        showPagingControl: "true"
    });
    $.__views.win.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.scrollableView.backgroundImage = "black" == Ti.App.Properties.getString("theme") ? "/images/itemViewerBackgroundInverted.jpg" : "/images/itemViewerBackground.jpg";
    var args = arguments[0] || {};
    var items = Alloy.Globals.radiologyDB.items(args.title);
    Ti.API.info("THE ITEMS::::: " + JSON.stringify(items));
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