/*\
created: 20200808023328381
title: $:/plugins/huntsfromshadow/StarfinderManager/commands/sf-special-abilities-decode.js
type: application/javascript
modified: 20200808023450484
tags: 
module-type: macro
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/* Tells TiddlyWiki the name of our macro through the export mechanism. */
exports.name = "sf-spl-ab-decode";

/* Lists of macro parameters; leave this array empty if you need none, or
 * want all supplied macro call parameters to be passed to the run() method.
 */
exports.params = [
  [{name: "json_dat"}]
];

/* Executes (runs) our macro when it requires evaluation; returns a string
 * value.
 */
exports.run = function(foo, bar) {
  	if(json_dat == "") {
		return "";
	}

	try {
		var dat = JSON.parse(json_dat);
	}
	catch (e) {
		return "Invalid JSON";
	}
	var retval = "";
	dat.forEach(element => {
		retval = retval + 
			"<p class='no_tb_margin hang_indent'>" +
			"<b>" + element.name + " " + element.type + "</b> " +
			element.text + 
			"</p>\n";			
	});
	
	return retval;
};

})();
