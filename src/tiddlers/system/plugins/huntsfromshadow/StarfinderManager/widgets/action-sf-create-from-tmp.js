/*\
created: 20200830151140256
type: application/javascript
title: $:/plugins/huntsfromshadow/StarfinderManager/widgets/action-sf-create-from-temp.js
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
var SfCreateFromTmpWidget = function(parseTreeNode, options) {
  this.initialise(parseTreeNode, options);
};
  
/* "Inherits" from the Widget base "class" in order to get all
 * the basic widget functionality.
 */
SfCreateFromTmpWidget.prototype = new Widget();

SfCreateFromTmpWidget.prototype.render = function(parent,nextSibling) {
  this.computeAttributes();
  this.execute();
};

/* Computes the internal state of this widget. */
SfCreateFromTmpWidget.prototype.execute = function() {
  this.npcname = this.getAttribute("$npcname");
  this.rawblock = this.getAttribute("$rawblock");  
};  
  
/* Selectively refreshes this widget if needed and returns
 * true if either this widget itself or one of its children
 * needs to be re-rendered.
 */
SfCreateFromTmpWidget.prototype.refresh = function(changedTiddlers) {
  var changedAttributes = this.computeAttributes();
	if($tw.utils.count(changedAttributes) > 0) {
		this.refreshSelf();
		return true;
	}
  return this.refreshChildren(changedTiddlers);  
};

SfCreateFromTmpWidget.prototype.invokeAction = function(triggeringWidget,event) {
  var import_array = [
    ["npc_name", "(.*) CR \\d{1,2}\\n"],
    ["npc_cr", ".* CR (\\d{1,2})\\n"],
    ["npc_xp", "XP ([\\d,]*)\\n"],
    ["npc_alignment", "(LG|NG|CG|LN|N|CN|LE|NE|CE) (?:Fine|Diminutive|Tiny|Small|Medium|Large|Huge|Gargantuan|Colossal) .* \\(.*\\)\\n"],
    ["npc_size", "(?:LG|NG|CG|LN|N|CN|LE|NE|CE) (Fine|Diminutive|Tiny|Small|Medium|Large|Huge|Gargantuan|Colossal) .* \\(.*\\)"],
    ["npc_type", "(?:LG|NG|CG|LN|N|CN|LE|NE|CE) (?:Fine|Diminutive|Tiny|Small|Medium|Large|Huge|Gargantuan|Colossal) (.*) \\(.*\\)"],
    ["npc_subtype", "(?:LG|NG|CG|LN|N|CN|LE|NE|CE) (?:Fine|Diminutive|Tiny|Small|Medium|Large|Huge|Gargantuan|Colossal) .* (\\(.*\\))"],
    ["npc_init", "Init ([+|-]\\d{1,2});"],
    ["npc_senses", "Senses (.*);"],
    ["npc_perception", "Perception ([+|-]\\d{1,2})"],
    ["npc_hp", "HP (\\d{1,3})\\n"],
    ["npc_eac", "EAC (\\d{1,2});"],
    ["npc_kac", "KAC (\\d{1,2})\n"],
    ["npc_fort", "Fort ([+|-]\\d{1,2});"],
    ["npc_ref", "Ref ([+|-]\\d{1,2});"],
    ["npc_will", "Will ([+|-]\\d{1,2})"],
    ["npc_dr", "DR (.*);"],
    ["npc_immunities", "Immunities (.*)\\n"],
    ["npc_speed", "Speed (.*)\\n"],
    ["npc_multiattack", "Multiattack (.*)\\n"],
    ["npc_space", "Space (.*);"],
    ["npc_reach", "Reach (.*)\\n"],
    ["npc_str", "Str ([+|-]\\d{1,2});"],
    ["npc_dex", "Dex ([+|-]\\d{1,2});"],
    ["npc_con", "Con ([+|-]\\d{1,2});"],
    ["npc_int", "Int ([+|-]\\d{1,2});"],
    ["npc_wis", "Wis ([+|-]\\d{1,2});"],
    ["npc_cha", "Cha ([+|-]\\d{1,2})"],
    ["npc_skills", "Skills (.*)"],
  ];

  //Extract Data
  var rb = this.rawblock.replace("−", "-");

  var extracted_data = [];
  import_array.forEach(elem => {
    //console.log(elem[1]);
    var re = new RegExp(elem[1]);
    re = re.exec(rb);
    
    //console.log("Result");
    //console.log(re);

    if( re != null )
    {
      //console.log(re[1]);
      extracted_data[elem[0]] = re[1];
    }
    else {
      extracted_data[elem[0]] = "NOPE";
    }
  });

  //Time to Update Tiddler
  //Does the import tiddler exist
  var tid = this.wiki.getTiddler("NPCImportWS");
  
  if(tid === undefined) {
    var fields = {};
    var creationFields = this.wiki.getCreationFields();
    var modificationFields = this.wiki.getModificationFields();      

    this.wiki.addTiddler({
      title: "NPCImportWS",
      type: "text/vnd.tiddlywiki",
      text: "SF NPC Import",
      tags: [],
      "test": "test"});
  }
  else {
    console.log(tid);
  }
  
  this.wiki.setText("NPCImportWS", "blah1", undefined, "blah12", {});


  for (const [key, value] of Object.entries(extracted_data)) {
    this.wiki.setText("NPCImportWS", key, undefined, value, {});
  }

  return true;
};

/* Finally exports the widget constructor. */
//exports.foo = FooWidget;
exports["action-sf-create-from-temp"] = SfCreateFromTmpWidget;

})();