var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var db = require("db");

var radiologyDB = new db();

Alloy.Globals.radiologyDB = radiologyDB;

Alloy.createController("index");