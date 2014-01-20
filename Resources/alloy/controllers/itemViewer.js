function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "itemViewer";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    var __alloyId1 = [];
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView"
    });
    __alloyId1.push($.__views.scrollView);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        color: "black",
        views: __alloyId1,
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
    $.win.title = args.title;
    var viewsArray = [];
    for (var i in items) {
        var view = Ti.UI.createScrollView();
        if (-1 != items[i].indexOf("http://")) {
            view.add(Ti.UI.createLabel({
                text: items[i],
                id: "text",
                color: "white"
            }));
            var labSize1 = $.text.size;
            Ti.API.info(labSize1);
            view.add(Ti.UI.createImageView({
                left: 20,
                width: 40,
                height: 60,
                image: items[i]
            }));
        } else view.add(Ti.UI.createLabel({
            text: items[i],
            id: "text",
            color: "white"
        }));
        viewsArray.push(view);
    }
    $.scrollableView.setViews(viewsArray);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;