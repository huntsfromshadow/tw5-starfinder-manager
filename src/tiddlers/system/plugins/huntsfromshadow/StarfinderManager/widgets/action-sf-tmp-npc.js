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

  //Step 1 Lets break down the raw text
  let re = /^(.*) CR (\d{1,2})\n/;
  let val = re.exec(this.rawblock);

  let npc_name = val[1];
  let npc_cr = val[1];

  re = /XP ([\d,]*)\n/;
  val = re.exec(this.rawblock);
  let npc_xp = parseInt(val[1]);

  re = /(\bLG|\bNG|\bCG|\bLN|\bN|\bCN|\bLE|\bNE|\bCE) (\bFine|\bDiminutive|\bTiny|\bSmall|\bMedium|\bLarge|\bHuge|\bGargantuan|\bColossal) (.*) (\(.*\))\n/;
  val = re.exec(this.rawblock);
  let npc_alignment = val[1];
  let npc_size = val[2];
  let npc_type = val[3];

  re = /Init ([+\-]\d{1,2}); Senses (.*); Perception [+/-]\d{1,2}\n/;
  val = re.exec(this.rawblock);
  let npc_init = val[1];
  let npc_size = val[2];
  let npc_type = val[3];

  re = /DEFENSE HP (\d+)\n/;
  val = re.exec(this.rawblock);
  let npc_hp = val[1];

  re = /EAC (\d+); KAC (\d+)\n/;
  val = re.exec(this.rawblock);
  let npc_eac = val[1];
  let npc_kac = val[2];

  re = /Fort ([+/-]\d+); Ref ([+/-]\d+); Will ([+/-]\d+)\n/;
  val = re.exec(this.rawblock);
  let npc_fort = val[1];
  let npc_ref = val[2];
  let npc_will = val[3];

  re = /DR (.*); Immunities (.*)\n/;
  val = re.exec(this.rawblock);
  let npc_dr = val[1];
  let npc_immunities = val[2];

  re = /Speed (.*)\n/;
  val = re.exec(this.rawblock);
  let npc_speed = val[1];

  


  return true;
};

/* Finally exports the widget constructor. */
//exports.foo = FooWidget;
exports["action-sf-tmp-npc"] = SfTmpNpcWidget;

})();