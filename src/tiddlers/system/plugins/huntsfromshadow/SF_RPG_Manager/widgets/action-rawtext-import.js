/*\
created: 20200902162043469
title: $:/plugins/huntsfromshadow/SF_RPG_Manager/widgets/action-rawtext-import.js
type: application/javascript
modified: 20200902162100908
tags: 
module-type: widget
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

/* Creates a new <$foo> widget. */
var RawTextImport = function(parseTreeNode, options) {
  this.initialise(parseTreeNode, options);
};
  
/* "Inherits" from the Widget base "class" in order to get all
 * the basic widget functionality.
 */
RawTextImport.prototype = new Widget();

/* Renders this widget into the DOM. */
RawTextImport.prototype.render = function(parent,nextSibling) {
  this.computeAttributes();
  this.execute();
};

/* Computes the internal state of this widget. */
RawTextImport.prototype.execute = function() {
  this.npcname = this.getAttribute("$npcname");
  this.rawblock = this.getAttribute("$rawblock"); 
};  
  
/* Selectively refreshes this widget if needed and returns
 * true if either this widget itself or one of its children
 * needs to be re-rendered.
 */
RawTextImport.prototype.refresh = function(changedTiddlers) {
  var changedAttributes = this.computeAttributes();
	if($tw.utils.count(changedAttributes) > 0) {
		this.refreshSelf();
		return true;
	}
  return this.refreshChildren(changedTiddlers);  
};

RawTextImport.prototype.handleIdentityBlock = function(rb) {
  //Pull out just the identity block
  var ex = /(.*)DEFENSE HP \d{1,3}/s.exec(rb);

  //Okay lets break up the identity block
  var r = new RegExp(
    "(?<namecr>.* CR (?:\\d|1\\/2)[\\n ])" +
    "(?<xp>XP \\d*[\\n ])" + 
    "(?<grc>.*[\\n ])?" + 
    "(?<asts>(?:LG|NG|CG|LN|N|CN|LE|NE|CE) .* \\(.*\\)[\\n ])" +
    "(?<isp>Init .* Perception .*\\n)" );
  var lines_match = r.exec(ex[1]);

  console.log(lines_match);

};

RawTextImport.prototype.invokeAction = function(triggeringWidget,event) {
  console.log("Here");

  //Handle any data cleanup
  var rb = this.rawblock.replace("−", "-");

  this.handleIdentityBlock(rb);



  return true;
};

/* Finally exports the widget constructor. */
exports["action-sf-rawtext-import"] = RawTextImport;

})();