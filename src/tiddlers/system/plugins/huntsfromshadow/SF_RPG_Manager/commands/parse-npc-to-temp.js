/*\
created: 20200831202621064
title: $:/plugins/huntsfromshadow/SF_RPG_Manager/commands/parse-npc-to-temp.js
type: application/javascript
modified: 20200831202653352
tags: 
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
