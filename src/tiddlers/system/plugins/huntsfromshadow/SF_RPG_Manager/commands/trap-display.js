/*\
created: 20200901181119396
type: application/javascript
title: $:/plugins/huntsfromshadow/SF_RPG_Manager/commands/trap-display.js
tags: 
modified: 20200901182155203
module-type: macro
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/* Tells TiddlyWiki the name of our macro through the export mechanism. */
exports.name = "trap-display";

/* Lists of macro parameters; leave this array empty if you need none, or
 * want all supplied macro call parameters to be passed to the run() method.
 */
exports.params = [  ];

var npcDebugTxt = "DEBUG NOPE";
var sectionUnderlineColor = "Black";

function txtOrEmpty(field, txt) {
  if (field != npcDebugTxt) {
    return txt;
  }
  else {
    return "";
  }
}

//Format of datalist
//[ field name, ...]
function singleLineNoHeaders(tid, datalist) {
  var retval = "";
  datalist.forEach(ele => {
    var fname = ele;

    if(tid.fields[ele] != npcDebugTxt) {
      retval = retval + "{{!!" + ele + "}} ";
    }
  });

  if(retval != "") {
    retval = '<p class="no_tb_margin">' + retval + "</p>";
  }

  return retval;
}

//Format of datalist
/* [
[ fieldname, header, post ]
]*/
function singleLineWithHeaders(tid, datalist, hang=false) {

  console.log(tid);
  console.log(datalist);

  var retval = "";

  datalist.forEach(ele => {
    var fieldname = ele[0];
    var header = ele[1];
    var post = ele[2];
  
    if( (tid.fields[fieldname] != npcDebugTxt)
        && (tid.fields[fieldname] != "") ) {
      retval = retval + " " + header + "{{!!" + 
        fieldname + "}}" + post;
    }
  });
  
  if(retval != "") {
    if(hang == false) {
      retval = '<p class="no_tb_margin">' + retval + "</p>";
    }
    else {
      retval = '<p class="no_tb_margin hang_indent">' + retval + "</p>";      
    }
  }

  return retval;
}

/* Executes (runs) our macro when it requires evaluation; returns a string
 * value.
 */
exports.run = function() {
  tid = this.wiki.getTiddler("$:/plugins/huntsfromshadow/SF_RPG_Manager/config/StarblockSectionUnderlineColor");
  if(tid === undefined) {    
    sectionUnderlineColor = "Black";
  }
  else {
    sectionUnderlineColor = tid.fields.text;
  }

  var tid = this.wiki.getTiddler("$:/plugins/huntsfromshadow/SF_RPG_Manager/config/DebugEmptyImport");
      
  var tid = this.wiki.getTiddler(
      this.getVariable("currentTiddler") );
  
  console.log(tid);

  var outval = `
<div id='sf_character'>
  
  <p class="no_tb_margin" id="name_cr_row">
    <span>{{!!trap_name}}</span> 
    <span id="cr">CR {{!!trap_cr}}</span>
  </p>
  ${singleLineWithHeaders(tid, [["trap_xp", "<b>XP ", "</b>"]])}  
  ${singleLineWithHeaders(tid, [
    ["trap_type", "<b>Type</b> ", ";"],
    ["trap_perception", "<b>Perception</b> ", ";"],
    ["trap_disable", "<b>Disable</b> ", ";"],
  ], true)}  
  ${singleLineWithHeaders(tid, [
    ["trap_trigger", "<b>Trigger</b> ", ";"],
    ["trap_reset", "<b>Reset</b> ", ";"],    
  ])}    
  ${singleLineWithHeaders(tid, [
    ["trap_effect", "<b>Effect</b> ", ""]], true)}  
</div>`;

  return outval;

  //Hold some data
  //<p class="no_tb_margin">
  //    <b>Ranged</b> {{!!npc_ranged}}
  //</p>
  /*

  <p class="no_tb_margin">
    <b>XP {{!!npc_xp}}</b>
  </p>

  ${defensiveAbilitiesImmunitiesBlock(tid)}
  ${weaknessesBlock(tid)}

  <p class="no_tb_margin">
      <b>Space</b> {{!!npc_space}}; <b>Reach</b> {{!!npc_reach}}
  </p>

      <p class="no_tb_margin section_underline">
      <b>SPECIAL ABILITIES</b>
  </p>    
        

  */

};

})();
