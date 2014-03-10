function Controller() {
    function checkTheme() {
        if ("black" == Ti.App.Properties.getString("theme")) {
            $.winHome.backgroundImage = "/images/radiologyBackgroundInverted.jpg";
            $.winPreferences.backgroundImage = "/images/radiologyBackgroundInverted.jpg";
            $.winTools.backgroundImage = "/images/radiologyBackgroundInverted.jpg";
            $.winInfo.backgroundImage = "/images/radiologyBackgroundInverted.jpg";
            $.appTitle.setColor("white");
            $.version.setColor("white");
            $.aboutHeading.setColor("white");
            $.aboutInfo.setColor("white");
            $.copyright.setColor("white");
        } else {
            $.winHome.backgroundImage = "/images/radiologyBackground.jpg";
            $.winPreferences.backgroundImage = "/images/radiologyBackground.jpg";
            $.winTools.backgroundImage = "/images/radiologyBackground.jpg";
            $.winInfo.backgroundImage = "/images/radiologyBackground.jpg";
            $.appTitle.setColor("black");
            $.version.setColor("black");
            $.aboutHeading.setColor("black");
            $.aboutInfo.setColor("black");
            $.copyright.setColor("black");
        }
    }
    function checkIfUpdateIsNeeded() {
        Ti.API.info("hit it");
        var isNeeded = Alloy.Globals.radiologyDB.checkUpdates("radiology", Ti.App.Properties.getString("lastUpdatedTimestamp"));
        if (isNeeded) {
            alert("eLEARNING MADEEASY NOTIFICATION: \nThere has been updates made to the content. Please go to the updates page to download.");
            $.tabUpdates.setIcon("KS_nav_views_notification.png");
        }
    }
    function makeUpdates() {
        Alloy.Globals.radiologyDB.update("radiology", updateChapters);
        var curTimestamp = getTimestamp();
        Ti.App.Properties.setString("lastUpdatedTimestamp", curTimestamp);
        var index = Alloy.createController("index");
        index.getView();
        alert("Content has been updated");
        $.tabUpdates.setIcon("KS_nav_views.png");
    }
    function loadChapters() {
        var chapters = Alloy.Globals.radiologyDB.chapters();
        for (var i in chapters) $.table.appendRow(chapters[i]);
    }
    function updateChapters() {
        var chapters = Alloy.Globals.radiologyDB.chapters();
        for (var i in chapters) $.table.updateRow(i, chapters[i]);
    }
    function getTimestamp() {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        10 > month && (month = "0" + month);
        var date = d.getDate();
        10 > date && (date = "0" + date);
        var hours = d.getHours();
        10 > hours && (hours = "0" + hours);
        var minutes = d.getMinutes();
        10 > minutes && (minutes = "0" + minutes);
        var seconds = d.getSeconds();
        10 > seconds && (seconds = "0" + seconds);
        var curTimestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        return curTimestamp;
    }
    function sectionsWindow(event) {
        var addWindow = Alloy.createController("sectionsList", {
            title: event.row.name
        }).getView();
        Alloy.Globals.tabChapters.open(addWindow);
    }
    function ctCalculator() {
        var ctCalc = Alloy.createController("ctCalculator").getView();
        $.tools.open(ctCalc);
    }
    function nucCalculator() {
        var nucCalc = Alloy.createController("nucCalculator").getView();
        $.tools.open(nucCalc);
    }
    function procedures() {
        var procedures = Alloy.createController("procedureTables").getView();
        $.tools.open(procedures);
    }
    function switchFonts() {
        $.fontSwitch.value ? Ti.App.Properties.setString("fontClass", "largeFont") : Ti.App.Properties.setString("fontClass", "medFont");
    }
    function themeSwitch() {
        "white" == Ti.App.Properties.getString("theme") ? Ti.App.Properties.setString("theme", "black") : Ti.App.Properties.setString("theme", "white");
        var index = Alloy.createController("index");
        index.getView();
    }
    function donate() {
        alert("Please hand the smiling gentleman beside you €10 immediately.");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        apiName: "Ti.UI.TabGroup",
        id: "index",
        classes: []
    });
    $.__views.winHome = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        apiName: "Ti.UI.Window",
        id: "winHome",
        title: "eLearning Home",
        classes: []
    });
    $.__views.table = Ti.UI.createTableView({
        top: "5px",
        backgroundColor: "transparent",
        minRowHeight: "50dp",
        apiName: "Ti.UI.TableView",
        id: "table",
        classes: []
    });
    $.__views.winHome.add($.__views.table);
    sectionsWindow ? $.__views.table.addEventListener("click", sectionsWindow) : __defers["$.__views.table!click!sectionsWindow"] = true;
    $.__views.tabChapters = Ti.UI.createTab({
        window: $.__views.winHome,
        apiName: "Ti.UI.Tab",
        id: "tabChapters",
        title: "Home",
        icon: "KS_nav_ui.png",
        classes: []
    });
    $.__views.index.addTab($.__views.tabChapters);
    checkIfUpdateIsNeeded ? $.__views.tabChapters.addEventListener("click", checkIfUpdateIsNeeded) : __defers["$.__views.tabChapters!click!checkIfUpdateIsNeeded"] = true;
    $.__views.winTools = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        apiName: "Ti.UI.Window",
        id: "winTools",
        title: "Average Radiation Doses",
        classes: []
    });
    $.__views.proceduresImage = Ti.UI.createImageView({
        top: "0%",
        width: "90%",
        height: "35%",
        apiName: "Ti.UI.ImageView",
        id: "proceduresImage",
        image: "/images/procedures.png",
        classes: []
    });
    $.__views.winTools.add($.__views.proceduresImage);
    procedures ? $.__views.proceduresImage.addEventListener("click", procedures) : __defers["$.__views.proceduresImage!click!procedures"] = true;
    $.__views.ctImage = Ti.UI.createImageView({
        width: "50%",
        height: "40%",
        top: "40%",
        left: "0%",
        apiName: "Ti.UI.ImageView",
        id: "ctImage",
        image: "images/ctCalculator.png",
        classes: []
    });
    $.__views.winTools.add($.__views.ctImage);
    ctCalculator ? $.__views.ctImage.addEventListener("click", ctCalculator) : __defers["$.__views.ctImage!click!ctCalculator"] = true;
    $.__views.nuclearImage = Ti.UI.createImageView({
        width: "50%",
        height: "40%",
        top: "40%",
        right: "0%",
        apiName: "Ti.UI.ImageView",
        id: "nuclearImage",
        image: "/images/nuclearCalculator.png",
        classes: []
    });
    $.__views.winTools.add($.__views.nuclearImage);
    nucCalculator ? $.__views.nuclearImage.addEventListener("click", nucCalculator) : __defers["$.__views.nuclearImage!click!nucCalculator"] = true;
    $.__views.tools = Ti.UI.createTab({
        window: $.__views.winTools,
        apiName: "Ti.UI.Tab",
        title: "Tools",
        id: "tools",
        icon: "KS_nav_views_tools.png",
        classes: []
    });
    $.__views.index.addTab($.__views.tools);
    $.__views.winPreferences = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        apiName: "Ti.UI.Window",
        id: "winPreferences",
        title: "Preferences",
        layout: "vertical",
        classes: []
    });
    $.__views.updateButton = Ti.UI.createButton({
        top: "30%",
        width: "50%",
        title: "Check for updates",
        apiName: "Ti.UI.Button",
        id: "updateButton",
        classes: []
    });
    $.__views.winPreferences.add($.__views.updateButton);
    makeUpdates ? $.__views.updateButton.addEventListener("click", makeUpdates) : __defers["$.__views.updateButton!click!makeUpdates"] = true;
    $.__views.switchLabel = Ti.UI.createLabel(function() {
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
            top: "5%",
            text: "Enlarge Viewer Font",
            apiName: "Ti.UI.Label",
            id: "switchLabel",
            classes: []
        });
        return o;
    }());
    $.__views.winPreferences.add($.__views.switchLabel);
    $.__views.fontSwitch = Ti.UI.createSwitch({
        top: 10,
        width: "20%",
        apiName: "Ti.UI.Switch",
        id: "fontSwitch",
        value: "false",
        classes: []
    });
    $.__views.winPreferences.add($.__views.fontSwitch);
    switchFonts ? $.__views.fontSwitch.addEventListener("change", switchFonts) : __defers["$.__views.fontSwitch!change!switchFonts"] = true;
    $.__views.updateButton = Ti.UI.createButton({
        top: "30%",
        width: "50%",
        title: "Change Theme",
        apiName: "Ti.UI.Button",
        id: "updateButton",
        classes: []
    });
    $.__views.winPreferences.add($.__views.updateButton);
    themeSwitch ? $.__views.updateButton.addEventListener("click", themeSwitch) : __defers["$.__views.updateButton!click!themeSwitch"] = true;
    $.__views.tabUpdates = Ti.UI.createTab({
        window: $.__views.winPreferences,
        apiName: "Ti.UI.Tab",
        id: "tabUpdates",
        title: "Preferences",
        icon: "KS_nav_views_preferences.png",
        classes: []
    });
    $.__views.index.addTab($.__views.tabUpdates);
    $.__views.winInfo = Ti.UI.createWindow({
        backgroundImage: "/images/radiologyBackground.jpg",
        apiName: "Ti.UI.Window",
        id: "winInfo",
        title: "Info",
        layout: "vertical",
        classes: []
    });
    $.__views.appTitle = Ti.UI.createLabel(function() {
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
        Alloy.isTablet && _.extend(o, {
            top: "2%",
            font: {
                fontWeight: "bold",
                fontSize: "32dp",
                color: "blue"
            }
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: 7,
            font: {
                fontWeight: "bold"
            }
        });
        _.extend(o, {
            text: "eLearning MadeEasy - Radiology",
            apiName: "Ti.UI.Label",
            id: "appTitle",
            classes: []
        });
        return o;
    }());
    $.__views.winInfo.add($.__views.appTitle);
    $.__views.version = Ti.UI.createLabel(function() {
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
        Alloy.isTablet && _.extend(o, {
            top: 5,
            font: {
                fontWeight: "bold",
                fontSize: "16dp"
            }
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: 5,
            font: {
                fontWeight: "bold",
                fontSize: "8dp"
            }
        });
        _.extend(o, {
            text: "Version 1.0.0",
            apiName: "Ti.UI.Label",
            id: "version",
            classes: []
        });
        return o;
    }());
    $.__views.winInfo.add($.__views.version);
    $.__views.eLearningLogo = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            top: 20,
            width: "40%"
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: 7,
            width: "27%"
        });
        _.extend(o, {
            apiName: "Ti.UI.ImageView",
            id: "eLearningLogo",
            image: "/images/eLearningLogo.png",
            classes: []
        });
        return o;
    }());
    $.__views.winInfo.add($.__views.eLearningLogo);
    $.__views.aboutHeading = Ti.UI.createLabel(function() {
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
        Alloy.isTablet && _.extend(o, {
            top: 15,
            font: {
                fontWeight: "bold",
                fontSize: "30dp"
            }
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: 3,
            font: {
                fontWeight: "bold",
                fontSize: "13dp"
            }
        });
        _.extend(o, {
            text: "Welcome!",
            apiName: "Ti.UI.Label",
            id: "aboutHeading",
            classes: []
        });
        return o;
    }());
    $.__views.winInfo.add($.__views.aboutHeading);
    $.__views.aboutInfo = Ti.UI.createLabel(function() {
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
            top: 3,
            left: "5%",
            right: "5%",
            font: {
                fontSize: "11dp"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            top: 10,
            left: "5%",
            right: "5%",
            font: {
                fontSize: "24dp"
            }
        });
        _.extend(o, {
            text: "eLearning MadeEasy was developed as part of the Univerity College Cork 4th Year Computer Science Project. The aim of the work is to facilitate simple and convenient eLearning experiences. The flagship of the eLearning offerings was provided by Cork University Hospital Radiology Department, and is aimed at Radiology practitioners and students to provide a more interactive and dynamic learning experience. The app also contains some tools which can be used by practitioners to calculate various different metrics used within Radiology. \nThank you for taking the time to use the app and please feel free to offer feedback, areas for improvement and donate.",
            apiName: "Ti.UI.Label",
            id: "aboutInfo",
            classes: []
        });
        return o;
    }());
    $.__views.winInfo.add($.__views.aboutInfo);
    $.__views.donateImage = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            top: 15,
            height: "70dp",
            width: "25%"
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: 5,
            height: "40dp",
            width: "25%"
        });
        _.extend(o, {
            apiName: "Ti.UI.ImageView",
            id: "donateImage",
            image: "/images/donateButton.png",
            classes: []
        });
        return o;
    }());
    $.__views.winInfo.add($.__views.donateImage);
    donate ? $.__views.donateImage.addEventListener("click", donate) : __defers["$.__views.donateImage!click!donate"] = true;
    $.__views.copyright = Ti.UI.createLabel(function() {
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
        Alloy.isTablet && _.extend(o, {
            top: 50,
            font: {
                fontWeight: "bold",
                fontSize: "14dp"
            }
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: 5,
            font: {
                fontWeight: "bold",
                fontSize: "9dp"
            }
        });
        _.extend(o, {
            text: "Copyright © 2014 Stephen O'Mahony, University College Cork.",
            apiName: "Ti.UI.Label",
            id: "copyright",
            classes: []
        });
        return o;
    }());
    $.__views.winInfo.add($.__views.copyright);
    $.__views.__alloyId17 = Ti.UI.createTab({
        window: $.__views.winInfo,
        apiName: "Ti.UI.Tab",
        title: "Info",
        icon: "KS_nav_views_info.png",
        id: "__alloyId17",
        classes: []
    });
    $.__views.index.addTab($.__views.__alloyId17);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.tabChapters = $.tabChapters;
    if (Ti.App.Properties.hasProperty("firstTime")) {
        checkTheme();
        $.index.open();
        var tableData = Alloy.Globals.radiologyDB.getCachedData("radiology");
        $.table.setData(tableData);
        checkIfUpdateIsNeeded();
        Ti.App.Properties.setString("fontClass", "medFont");
        var deviceHeight = Ti.Platform.displayCaps.platformHeight;
        Ti.Platform.displayCaps.platformWidth;
        deviceHeight > 899 || deviceHeight > 899 ? Ti.App.Properties.setBool("isTablet", true) : Ti.App.Properties.setBool("isTablet", false);
    } else {
        $.index.open();
        if (false == Ti.Network.online) alert("Please connect to the internet to initialize the app."); else {
            Alloy.Globals.radiologyDB.initEbookData("radiology", loadChapters);
            Alloy.Globals.radiologyDB.initExamTables("radiology");
            Ti.App.Properties.setBool("firstTime", false);
            var curTimestamp = getTimestamp();
            Ti.App.Properties.setString("lastUpdatedTimestamp", curTimestamp);
            Ti.App.Properties.setString("fontClass", "medFont");
            Ti.App.Properties.setString("theme", "white");
            var deviceHeight = Ti.Platform.displayCaps.platformHeight;
            Ti.Platform.displayCaps.platformWidth;
            deviceHeight > 899 || deviceHeight > 899 ? Ti.App.Properties.setBool("isTablet", true) : Ti.App.Properties.setBool("isTablet", false);
        }
    }
    $.tabChapters.addEventListener("focus", checkIfUpdateIsNeeded);
    __defers["$.__views.table!click!sectionsWindow"] && $.__views.table.addEventListener("click", sectionsWindow);
    __defers["$.__views.tabChapters!click!checkIfUpdateIsNeeded"] && $.__views.tabChapters.addEventListener("click", checkIfUpdateIsNeeded);
    __defers["$.__views.proceduresImage!click!procedures"] && $.__views.proceduresImage.addEventListener("click", procedures);
    __defers["$.__views.ctImage!click!ctCalculator"] && $.__views.ctImage.addEventListener("click", ctCalculator);
    __defers["$.__views.nuclearImage!click!nucCalculator"] && $.__views.nuclearImage.addEventListener("click", nucCalculator);
    __defers["$.__views.updateButton!click!makeUpdates"] && $.__views.updateButton.addEventListener("click", makeUpdates);
    __defers["$.__views.fontSwitch!change!switchFonts"] && $.__views.fontSwitch.addEventListener("change", switchFonts);
    __defers["$.__views.updateButton!click!themeSwitch"] && $.__views.updateButton.addEventListener("click", themeSwitch);
    __defers["$.__views.donateImage!click!donate"] && $.__views.donateImage.addEventListener("click", donate);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;