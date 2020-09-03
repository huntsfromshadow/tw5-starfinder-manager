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
  this.fieldtarget = this.getAttribute("$fieldtarget");
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

RawTextImport.prototype.saveField = function(fieldName, fieldValue) {
  if(fieldValue === undefined) {
    fieldValue = "NOPE";
  }
  else {  
    this.wiki.setText(this.fieldtarget, fieldName, undefined, fieldValue.trim(), {});
  }
}

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

  var l = null;
  var m = null;
  //Okay lets handle line at a time
  //Name Line
  l = lines_match.groups.namecr;
  m = /(.*) CR (.*)\n?/.exec(l);  
  this.saveField("npc_name", m[1]);
  this.saveField("npc_cr", m[2]);

  // XP Line
  l = lines_match.groups.xp;
  m = /XP (.*)\n?/.exec(l);
  this.saveField("npc_xp", m[1]);

  //Gender, Race, class
  if( lines_match.groups.grc !== undefined) {
    l = lines_match.groups.grc;
    m = /(.*) (.*) (.*)\n?/.exec(l);
    this.saveField("npc_gender", m[1]);
    this.saveField("npc_race", m[2]);
    this.saveField("npc_class", m[3]);
  } else {
    this.saveField("npc_gender", "");
    this.saveField("npc_race", "");
    this.saveField("npc_class", "");
  }

  //Alignment, Size, Type, Subtype
  l = lines_match.groups.asts;
  r = "(?<alignment>LG|NG|CG|LN|N|CN|LE|NE|CE) " +
      "(?<size>Fine|Diminutive|Tiny|Small|Medium|Large|Huge|Gargantuan|Colossal) " +
      "(?<type>.*?) ?(?<subtype>\\(.*\\))?[\\n ]";
  var rx = new RegExp(r);
  m = rx.exec(l);
  this.saveField("npc_alignment", m.groups.alignment);
  this.saveField("npc_size", m.groups.size);
  this.saveField("npc_type", m.groups.type);
  this.saveField("npc_subtype", m.groups.subtype);

  //Init, Senses, Perception
  l = lines_match.groups.isp;
  m = /Init (?<init>.*?); (?:Senses (?<senses>.*); )?Perception (?<perception>.*)[\n ]/.exec(l);
  this.saveField("npc_init", m.groups.init);
  this.saveField("npc_senses", m.groups.senses);
  this.saveField("npc_perception", m.groups.perception);
};

RawTextImport.prototype.handleDefenseBlock = function(rb) {
  //Pull out just the Defense block
  var ex = /(DEFENSE.*)OFFENSE/s.exec(rb);  
  
  //Okay lets break up the defense block
  var r = new RegExp(
    "(?<hp>HP .*)[\\n ]" + 
    "(?<acs>EAC .* KAC .*)[\\n ]" +
    "(?<saves>Fort.*)[\\n ]"
  );

  var lines_match = r.exec(ex[1]);

  var l = null;
  var m = null;
  
  //Okay lets handle the hp line
  l = lines_match.groups.hp;
  m = /HP \d{1,3}/.exec(l);
  this.saveField('npc_hp', m[1]);

  //Lets handle the ACs line
  l = lines_match.groups.acs;  
  m = /EAC (.*); KAC (.*)/.exec(l);  
  this.saveField('npc_eac', m[1]);
  this.saveField('npc_kac', m[2]);

  //Lets handle the save's line
  l = lines_match.groups.saves;
  console.log(l);
  m = /Fort ([+|-]\d{1,2}); Ref ([+|-]\d{1,2}); Will ([+|-]\d{1,2})/.exec(l);
  console.log(m);
  this.saveField('npc_fort', m[1]);
  this.saveField('npc_ref', m[2]);
  this.saveField('npc_will', m[3]);
};

RawTextImport.prototype.invokeAction = function(triggeringWidget,event) {
  console.log("Here");

  //Handle any data cleanup
  var rb = this.rawblock.replace("−", "-");

  this.handleIdentityBlock(rb);
  this.handleDefenseBlock(rb);
  //Offense block

  return true;
};

/* Finally exports the widget constructor. */
exports["action-sf-rawtext-import"] = RawTextImport;

})();