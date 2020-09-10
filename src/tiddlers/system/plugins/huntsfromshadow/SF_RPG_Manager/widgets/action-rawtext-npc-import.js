/*\
created: 20200902162043469
title: $:/plugins/huntsfromshadow/SF_RPG_Manager/widgets/action-rawtext-npc-import.js
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
var RawTextNPCImport = function(parseTreeNode, options) {
  this.initialise(parseTreeNode, options);
  this.loadKeywordList();
};
  
/* "Inherits" from the Widget base "class" in order to get all
 * the basic widget functionality.
 */
RawTextNPCImport.prototype = new Widget();

/* Renders this widget into the DOM. */
RawTextNPCImport.prototype.render = function(parent,nextSibling) {
  this.computeAttributes();
  this.execute();
};

/* Computes the internal state of this widget. */
RawTextNPCImport.prototype.execute = function() {
  this.npcname = this.getAttribute("$npcname");
  this.rawblock = this.getAttribute("$rawblock");
  this.fieldtarget = this.getAttribute("$fieldtarget");
};  
  
/* Selectively refreshes this widget if needed and returns
 * true if either this widget itself or one of its children
 * needs to be re-rendered.
 */
RawTextNPCImport.prototype.refresh = function(changedTiddlers) {
  var changedAttributes = this.computeAttributes();
	if($tw.utils.count(changedAttributes) > 0) {
		this.refreshSelf();
		return true;
	}
  return this.refreshChildren(changedTiddlers);  
};

RawTextNPCImport.prototype.saveField = function(fieldName, fieldValue) {
  if(fieldValue === undefined) {
    fieldValue = this.emptyFieldText();
  }  
  this.wiki.setText(this.fieldtarget, fieldName, undefined, fieldValue.trim(), {});  
};

RawTextNPCImport.prototype.emptyFieldText = function() {
  if(this.debugMode == true) {
    return "DEBUG NOPE";
  }
  else {
    return "";
  }
};

RawTextNPCImport.prototype.handleGenderRaceGraft = function(rb) {

  //Get just that line
  var ex = /XP [\d,]*[ \n](?:(.*)[ \n])?(?:LG|NG|CG|LN|N|CN|LE|NE|CE)/.exec(rb);
  //console.log(ex);

  if(ex[1] === undefined) {
    this.saveField("npc_gender", this.emptyFieldText());
    this.saveField("npc_race", this.emptyFieldText());
    this.saveField("npc_graftclass", this.emptyFieldText());
  }
  else {
    //As this is a very flexible line we are just going to split it.
    var l = ex[1];
    l = l.replace("\n", "");
    l = l.split(" ");
    
    this.saveField("npc_gender", l[0]);
    this.saveField("npc_race", l[1]);
    this.saveField("npc_graftclass", l[2]);
  }
};

RawTextNPCImport.prototype.handleTypeSubtype = function(rb) {
  //Get the line
  var ex = 
    /(?:LG|NG|CG|LN|N|CN|LE|NE|CE) (?:Fine|Diminutive|Tiny|Small|Medium|Large|Huge|Gargantuan|Colossal) (.*)/.exec(rb);
  
  var l = /(.*) (\(.*\))/.exec(ex[1]);  
  this.saveField("npc_type", l[1]);
  this.saveField("npc_subtype", l[2]);
}

RawTextNPCImport.prototype.extractKeywords = function(rb) {  
  this.keyword_list.forEach(elem => {
    var re = null;

    re = new RegExp(elem[1], "i");
    re = re.exec(rb);
    
    //console.log("---------");
    //console.log(re);

    if( re == null )
    {
      var val = this.emptyFieldText();      
    }
    else {
      var val = re[1];
    }

    //Do a \n cleanup
    val = val.replace("\n", " ");

    //console.log(elem[0]);
    //console.log(val);

    this.saveField(elem[0], val);
  });
};

RawTextNPCImport.prototype.handleSLA = function(rb) {
  var ex =
    /Spell-Like Abilities (.*)STATISTICS/s.exec(rb);

  if(ex == null) {
    this.saveField("npc_sla", this.emptyFieldText());   
  }
  else {    
    var fullstr = ex[1];

    var finalstr = "";

    var c =
      /(\(.*\))/.exec(fullstr);
    var cl_block = null;
    cl_block = c[1];
    fullstr = fullstr.replace(cl_block, "");
    fullstr = fullstr.trim();

    finalstr = finalstr + cl_block;

    c =
      /(Constant—.*)/.exec(fullstr);
    var con_line = null;
    if(c != null) {
      con_line = c[1];
      fullstr = fullstr.replace(con_line, "");
      fullstr = fullstr.trim();      
    }
  
    c = 
      /(At will—.*)/.exec(fullstr);
    var at_will_line = null;
    if(c != null) {
      at_will_line = c[1];
      fullstr = fullstr.replace(at_will_line, "");
      fullstr = fullstr.trim();
    }

    fullstr = fullstr.replace("\n", "|");
    finalstr = finalstr + "|" + fullstr;

    if(con_line != null) {
      finalstr = finalstr + "|" + con_line;
    }

    if(at_will_line != null) {
      finalstr = finalstr + "|" + at_will_line;
    }
    
    this.saveField("npc_sla", finalstr);
  }
};

RawTextNPCImport.prototype.handleOtherAbilities = function(rb) {

  var c = /Other Abilities (.*)Gear/s.exec(rb);

  if(c != null) {
    var othera = c[1];
    othera = othera.replace("\r", " ");
    this.saveField("npc_other_abilities", othera);
  }
};

RawTextNPCImport.prototype.handleGear = function(rb) {
  var c = /Gear (.*)ECOLOGY/s.exec(rb);

  if(c != null) {
    var othera = c[1];
    othera = othera.replace("\r", " ");
    this.saveField("npc_gear", othera);
  }
};

RawTextNPCImport.prototype.handleSpecialAbilities = function(rb) {
  var c = /SPECIAL ABILITIES(.*)/is.exec(rb);  
  if(c != null) {
    var s = c[1];
    s = s.replace("\n", " ");
    this.saveField("npc_special_abilities", s);
  }
  else {
    this.saveField("npc_special_abilities", this.emptyFieldText());
  }
};


RawTextNPCImport.prototype.invokeAction = function(triggeringWidget,event) {
  //First we need to grab the config to know if we are in Debug Mode
  var tid = this.wiki.getTiddler("$:/plugins/huntsfromshadow/SF_RPG_Manager/config/DebugEmptyImport");
    
  if(tid !== undefined && tid.fields.text == "true") {
    this.debugMode = true;
  }
  else {
    this.debugMode = false;
  }

  //Handle any data cleanup
  var rb = this.rawblock.replace("−", "-");
  //var rb = this.rawblock.replace("—", "-");

  //First lets handle all the data that can be keword grabbed
  this.extractKeywords(rb);
  
  //Now their are somethings that are way too complicated for keywords.
  this.handleGenderRaceGraft(rb);
  this.handleTypeSubtype(rb);
  this.handleSLA(rb);
  this.handleOtherAbilities(rb);
  this.handleGear(rb);
  this.handleSpecialAbilities(rb);

  return true;
};

RawTextNPCImport.prototype.loadKeywordList = function() {  
  this.keyword_list = [
    //Identity Block
    ["npc_name", "(.*) CR (?:1\\/8|1\\/6|1\\/4|1\\/3|1\\/2|\\d{1,2})"],
    ["npc_cr", ".* CR (1\\/8|1\\/6|1\\/4|1\\/3|1\\/2|\\d{1,2})"],
    ["npc_xp", "XP ([\\d,]*)"],
      //gender, race, graft will need to be in custom function
    ["npc_alignment", "\\b(LG|NG|CG|LN|N|CN|LE|NE|CE)\\b"],
    ["npc_size", "\\b(Fine|Diminutive|Tiny|Small|Medium|Large|Huge|Gargantuan|Colossal)\\b"],
      //type and subtype will need to be in custom function      
    ["npc_init", "Init ([+|-]\\d{1,2});"],
    ["npc_senses", "Senses ([^;]*);"],
    ["npc_perception", "Perception ([+|-]\\d{1,2})"],
    ["npc_aura", "Aura (.*)"],

    //Defense Block
    ["npc_hp", "HP (\\d{1,3})"],
    ["npc_rp", "RP (\\d{1,2})"],
    ["npc_eac", "EAC (\\d{1,2});"],
    ["npc_kac", "KAC (\\d{1,2})\n"],
    ["npc_fort", "Fort ([+|-]\\d{1,2});"],
    ["npc_ref", "Ref ([+|-]\\d{1,2});"],
    ["npc_will", "Will[ \\n]?([^;\\n]*)"],
    ["npc_defensive_abilities", "Defensive Abilities ([^;]*);"],
    ["npc_dr", "DR ([^;]*);"],  
    ["npc_immunities", "Immunities[ |\\n]([^;]*?)(?:;|Weaknesses)"],
    ["npc_sr", "\\bSR\\b (.*)"],
    ["npc_weaknesses", "Weaknesses ((?:\\s|\\S)*)OFFENSE"],

    //Offense Block
    ["npc_speed", "Speed (.*)\\n"],
    ["npc_melee", "Melee (.*)\\n"],
    ["npc_multiattack", "Multiattack (.*)\\n"],
    ["npc_ranged", "Ranged (.*)"],
    ["npc_space", "Space (.*);"],
    ["npc_reach", "Reach (.*)\\n"],    
    ["npc_offensive_abilities", "Offensive Abilities (.*)"],    
      //SLAs have to be their own custom function

    //Statistics Block
    ["npc_str", "Str ([+|-]\\d{1,2});"],
    ["npc_dex", "Dex ([+|-]\\d{1,2});"],
    ["npc_con", "Con ([^;]*);"],
    ["npc_int", "Int ([+|-]\\d{1,2});"],
    ["npc_wis", "Wis ([+|-]\\d{1,2});"],
    ["npc_cha", "Cha ([+|-]\\d{1,2})"],
    ["npc_skills", "Skills ((?:.|\n)*)Languages"],
    ["npc_feats", "Feats (.*)"],
    ["npc_languages", "Languages (.*)\\n"],
    ["npc_other_abilities", "Other Abilities (.*)[ \n](?:Special Abilities|Gear|ECOLOGY|TACTICS)"],
    ["npc_gear", "Gear(.*)"],

    //Ecology Block
    ["npc_enviornment", "Environment (.*)\\n"],
    ["npc_organization", "Organization (.*)\\n"],

    //Special Abilities Block is it's own breakout
  ];
}



/* Finally exports the widget constructor. */
exports["action-sf-rawtext-npc-import"] = RawTextNPCImport;

})();