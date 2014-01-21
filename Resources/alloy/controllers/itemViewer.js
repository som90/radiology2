function Controller() {
    function checkForImages(items) {
        for (var i in items) if (-1 != items[i].indexOf("http://")) return true;
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
    var __alloyId7 = [];
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView"
    });
    __alloyId7.push($.__views.scrollView);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        color: "black",
        views: __alloyId7,
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
    if (true == checkForImages(items)) for (var i in items) viewsArray.push(Alloy.createController("viewWithImage", {
        item: items[i]
    }).getView()); else for (var i in items) {
        var view = Ti.UI.createScrollView({
            layout: "vertical"
        });
        view.add(Ti.UI.createLabel({
            text: items[i],
            top: 5,
            color: "black"
        }));
        viewsArray.push(view);
    }
    $.scrollableView.setViews(viewsArray);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;