/*\
created: 20200831203137836
title: $:/plugins/huntsfromshadow/SF_RPG_Manager/widgets/action-sf-tmp-npc.js
type: application/javascript
modified: 20200831203201836
tags: 
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
    ["npc_defensive_abilities", "Defensive Abilities (.*);"],
    ["npc_dr", "DR (.*);"],  
    ["npc_immunities", "Immunities (.*)\\n"],
    ["npc_weaknesses", "Weaknesses (.*)\\n"],
    ["npc_speed", "Speed (.*)\\n"],
    ["npc_melee", "Melee (.*)\\n"],
    ["npc_multiattack", "Multiattack (.*)\\n"],
    //["npc_sla_cl", "Spell-Like Abilities \\(CL (\\d{1,2})(?:st|nd|rd|th)\\)\\n"],
    //["npc_sla", "Spell-Like Abilities \\(CL \\d{1,2}(?:st|nd|rd|th)\\)\\n(.*)STATISTICS\\n", "s"],    
    ["npc_space", "Space (.*);"],
    ["npc_reach", "Reach (.*)\\n"],
    ["npc_str", "Str ([+|-]\\d{1,2});"],
    ["npc_dex", "Dex ([+|-]\\d{1,2});"],
    ["npc_con", "Con ([+|-]\\d{1,2});"],
    ["npc_int", "Int ([+|-]\\d{1,2});"],
    ["npc_wis", "Wis ([+|-]\\d{1,2});"],
    ["npc_cha", "Cha ([+|-]\\d{1,2})"],
    ["npc_skills", "Skills (.*)"],
    ["npc_languages", "Languages (.*)\\n"],
    ["npc_other_abilities", "Other Abilities (.*)\\n"],
    ["npc_enviornment", "Environment (.*)\\n"],
    ["npc_organization", "Organization (.*)\\n"],
    //["npc_special_abilities", "SPECIAL ABILITIES\\n(.*)", "s"]
  ];

  //Extract Data
  var rb = this.rawblock.replace("−", "-");

  var extracted_data = [];
  import_array.forEach(elem => {
    var re;
    if(elem.length == 2) {
      re = new RegExp(elem[1]);
    }
    else {
      //It's 3    
      re = new RegExp(elem[1], elem[2]);
    }
    re = re.exec(rb);
        
    if( re != null )
    {      
      extracted_data[elem[0]] = re[1];
    }
    else {
      extracted_data[elem[0]] = "NOPE";
    }
  });

  
  for (const [key, value] of Object.entries(extracted_data)) {
    console.log(key + "->" + value);
    this.wiki.setText("NPCImportWS", key, undefined, value, {});
  }
  
  

  return true;
};

/* Finally exports the widget constructor. */
exports["action-sf-tmp-npc"] = SfTmpNpcWidget;

})();