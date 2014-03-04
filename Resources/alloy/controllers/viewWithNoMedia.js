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
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "white",
            font: {
                fontWeight: "bold",
                fontSize: "15dp"
            },
            textAlign: "center"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
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
    var args = arguments[0] || {};
    $.heading.text = args.object.heading;
    $.label.text = args.object.item;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;