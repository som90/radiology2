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
        display: "vertical",
        id: "viewWithNoMedia"
    });
    $.__views.viewWithNoMedia && $.addTopLevelView($.__views.viewWithNoMedia);
    $.__views.heading = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "black",
            font: {
                fontSize: "15dp"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "black",
            font: {
                fontSize: "25dp"
            }
        });
        _.extend(o, {
            font: {
                fontWeight: "bold"
            }
        });
        Alloy.isHandheld && _.extend(o, {
            left: "10dp",
            right: "10dp",
            top: "15dp",
            color: "white",
            font: {
                fontWeight: "bold",
                fontSize: "15dp"
            },
            textAlign: "center"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: "30dp",
            right: "30dp",
            top: "25dp",
            color: "white",
            font: {
                fontWeight: "bold",
                fontSize: "30dp"
            },
            textAlign: "center"
        });
        _.extend(o, {
            id: "heading"
        });
        return o;
    }());
    $.__views.viewWithNoMedia.add($.__views.heading);
    $.__views.label = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "black",
            font: {
                fontSize: "15dp"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "black",
            font: {
                fontSize: "25dp"
            }
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            left: "10dp",
            right: "10dp",
            top: "15dp"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: "30dp",
            right: "30dp",
            top: "25dp",
            font: {
                fontSize: "30dp"
            }
        });
        _.extend(o, {
            id: "label"
        });
        return o;
    }());
    $.__views.viewWithNoMedia.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if ("largeFont" == Ti.App.Properties.getString("fontClass")) if (Ti.App.Properties.getBool("isTablet")) {
        $.label.setFont({
            fontSize: "45dp"
        });
        $.heading.setFont({
            fontSize: "45dp"
        });
    } else {
        $.label.setFont({
            fontSize: "22dp"
        });
        $.heading.setFont({
            fontSize: "22dp"
        });
    } else if (Ti.App.Properties.getBool("isTablet")) {
        $.label.setFont({
            fontSize: "30dp"
        });
        $.heading.setFont({
            fontSize: "30dp"
        });
    } else {
        $.label.setFont({
            fontSize: "15dp"
        });
        $.heading.setFont({
            fontSize: "15dp"
        });
    }
    if ("black" == Ti.App.Properties.getString("theme")) {
        $.heading.setColor("black");
        $.label.setColor("white");
    } else {
        $.heading.setColor("white");
        $.label.setColor("black");
    }
    var args = arguments[0] || {};
    $.heading.text = args.object.heading;
    $.label.text = args.object.item;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;