/*\
created: 20200830124026690
type: application/javascript
title: $:/plugins/huntsfromshadow/StarfinderManager/commands/parse-npc-to-temp.js
tags: 
modified: 20200830130231851
module-type: macro
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/* Tells TiddlyWiki the name of our macro through the export mechanism. */
exports.name = "parse-npc-to-temp";

/* Lists of macro parameters; leave this array empty if you need none, or
 * want all supplied macro call parameters to be passed to the run() method.
 */
exports.params = [
  { name: "foo", default: "" }, /* 1st parameter name */  
];

/* Executes (runs) our macro when it requires evaluation; returns a string
 * value.
 */
exports.run = function(foo, bar) {
	console.log("Here");
  var npc_name = this.wiki.getTiddlerText("$:/temp/NPCName");
  var npc_raw = this.wiki.getTiddlerText("$:/temp/NPCRawBlock");

  console.log(npc_name);
  console.log(npc_raw);

  alert("Ya");
  
  return foo + bar;
};

})();
