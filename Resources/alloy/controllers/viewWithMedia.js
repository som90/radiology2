function Controller() {
    function fullScreen() {
        var fullImage = Alloy.createController("fullscreenImage", {
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
    $.__views.scroll.add($.__views.heading);
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
    $.__views.scroll.add($.__views.label);
    $.__views.imageView = Ti.UI.createImageView({
        width: "80%",
        top: "10dp",
        id: "imageView"
    });
    $.__views.scroll.add($.__views.imageView);
    fullScreen ? $.__views.imageView.addEventListener("click", fullScreen) : __defers["$.__views.imageView!click!fullScreen"] = true;
    $.__views.videoPlayer = Ti.Media.createVideoPlayer({
        id: "videoPlayer",
        width: "60%",
        height: "60%",
        ns: Ti.Media,
        visible: "false",
        autoplay: "true"
    });
    $.__views.scroll.add($.__views.videoPlayer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.label = $.label;
    Alloy.Globals.heading = $.heading;
    if ("largeFont" == Ti.App.Properties.getString("fontClass")) if (Ti.App.Properties.getBool("isTablet")) {
        $.label.setFont({
            fontSize: "45dp"
        });
        $.heading.setFont({
            fontSize: "45dp"
        });
    } else {
        $.label.setFont({
            fontSize: "25dp"
        });
        $.heading.setFont({
            fontSize: "25dp"
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
    var args = arguments[0] || {};
    var imageName = args.object.item.replace(/file:\/(.*)Documents\//g, "");
    $.heading.text = args.object.heading;
    Ti.API.info(args.object.heading);
    if (-1 != args.object.item.indexOf("file:/")) if (false == Ti.Network.online) if (-1 != args.object.item.indexOf(".mov")) {
        Ti.API.info("this is a video");
        $.videoPlayer.url = "/images/media7.mov";
        $.videoPlayer.show();
    } else $.imageView.image = args.object.item; else if (-1 != args.object.item.indexOf(".mov")) {
        Ti.API.info("this is a video");
        $.videoPlayer.url = "/images/media7.mov";
        $.videoPlayer.show();
    } else {
        var xhr2 = Titanium.Network.createHTTPClient({
            onload: function() {
                var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageName);
                f.write(this.responseData);
                Ti.App.fireEvent("image_downloaded", {
                    filepath: f.nativePath
                });
            }
        });
        xhr2.open("GET", "http://cs1.ucc.ie/~som6/bin/FYP/prototype/images/" + imageName);
        xhr2.send();
        Ti.App.addEventListener("image_downloaded", function() {
            $.imageView.image = args.object.item;
        });
    } else $.label.text = args.object.item;
    __defers["$.__views.imageView!click!fullScreen"] && $.__views.imageView.addEventListener("click", fullScreen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;