
/*
 * Check to see what font class is needed
 */
if(Ti.App.Properties.getString("fontClass") == "largeFont")
{
	if(Ti.App.Properties.getBool("isTablet"))
	{
		$.label.setFont({fontSize:"45dp"});
		$.heading.setFont({fontSize:"45dp"});
	}
	else
	{
		$.label.setFont({fontSize:"22dp"});
		$.heading.setFont({fontSize:"22dp"});
	}
}
else
{
	if(Ti.App.Properties.getBool("isTablet"))
	{
		$.label.setFont({fontSize:"30dp"});
		$.heading.setFont({fontSize:"30dp"});
	}
	else
	{
		$.label.setFont({fontSize:"15dp"});
		$.heading.setFont({fontSize:"15dp"});
	}
}
if(Ti.App.Properties.getString("theme") == "black")
{
	$.heading.setColor("black");
	$.label.setColor("white");
}

else
{
	$.heading.setColor("white");
	$.label.setColor("black");
}

var args = arguments[0] || {};

$.heading.text = args.object.heading; 

$.label.text=args.object.item;