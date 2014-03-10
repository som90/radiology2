
Alloy.Globals.tableRowLabel = $.label;

if(Ti.App.Properties.getString("theme") == "black")
{
	$.label.setColor("white");
}
	
else
{
	$.label.setColor("black");
}

var args = arguments[0] || {}; //Put arguments into args, or empty object (if errors)

$.newRow.name = args.title;
$.label.text = args.title;