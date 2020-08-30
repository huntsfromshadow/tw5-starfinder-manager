/*\
created: 20200830151140256
type: application/javascript
title: $:/plugins/huntsfromshadow/StarfinderManager/widgets/action-sf-tmp-npc.js
tags: 
modified: 20200830153228079
module-type: widget
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

/* Creates a new <$foo> widget. */
var SfTmpNpcWidget = function(parseTreeNode, options) {
  this.initialise(parseTreeNode, options);
};
  
/* "Inherits" from the Widget base "class" in order to get all
 * the basic widget functionality.
 */
SfTmpNpcWidget.prototype = new Widget();

SfTmpNpcWidget.prototype.render = function(parent,nextSibling) {
  this.computeAttributes();
  this.execute();
};

/* Computes the internal state of this widget. */
SfTmpNpcWidget.prototype.execute = function() {
  this.npcname = this.getAttribute("$npcname");
  this.rawblock = this.getAttribute("$rawblock");  
};  
  
/* Selectively refreshes this widget if needed and returns
 * true if either this widget itself or one of its children
 * needs to be re-rendered.
 */
SfTmpNpcWidget.prototype.refresh = function(changedTiddlers) {
  var changedAttributes = this.computeAttributes();
	if($tw.utils.count(changedAttributes) > 0) {
		this.refreshSelf();
		return true;
	}
  return this.refreshChildren(changedTiddlers);  
};

SfTmpNpcWidget.prototype.invokeAction = function(triggeringWidget,event) {
  console.log("Hey!");
  console.log(this.npcname);
  console.log(this.rawblock);
  return true;
};

/* Finally exports the widget constructor. */
//exports.foo = FooWidget;
exports["action-sf-tmp-npc"] = SfTmpNpcWidget;

})();