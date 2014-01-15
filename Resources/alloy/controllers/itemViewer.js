function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "itemViewer";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        color: "white",
        title: "Items",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    var __alloyId4 = [];
    $.__views.scrollableView = Ti.UI.createScrollableView({
        bottom: 20,
        width: "100%",
        height: "100%",
        color: "white",
        views: __alloyId4,
        id: "scrollableView",
        showPagingControl: "true"
    });
    $.__views.win.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info(args.title);
    var items = Alloy.Globals.radiologyDB.items(args.title);
    Ti.API.info(JSON.stringify(items));
    $.win.title = args.title;
    var viewsArray = [];
    for (var i in items) {
        var view = Ti.UI.createView();
        view.add(Ti.UI.createLabel({
            text: items[i],
            color: "white"
        }));
        viewsArray.push(view);
    }
    $.scrollableView.setViews(viewsArray);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;