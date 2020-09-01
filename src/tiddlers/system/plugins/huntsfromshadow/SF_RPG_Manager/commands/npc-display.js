/*\
created: 20200901181119396
type: application/javascript
title: $:/plugins/huntsfromshadow/SF_RPG_Manager/commands/npc-display.js
tags: 
modified: 20200901182155203
module-type: macro
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/* Tells TiddlyWiki the name of our macro through the export mechanism. */
exports.name = "npc-display";

/* Lists of macro parameters; leave this array empty if you need none, or
 * want all supplied macro call parameters to be passed to the run() method.
 */
exports.params = [  ];

function txtOrEmpty(field, txt) {
  if (field != "NOPE") {
    return txt;
  }
  else {
    return "";
  }
}

function genderRaceClassBlock(tid) {
  //Figure out what is present
  if(
    tid.fields.npc_gender != "NOPE" ||
    tld.fields.npc_race != "NOPE" ||
    tld.fields.npc_class != "NOPE" ) {
    
  }
}

function defensiveAbilitiesImmunitiesBlock(tid) {
  console.log("in defense");
  var retval = "";

  if(tid.fields.npc_defensive_abilities != "NOPE") {
    retval = retval + "<b>Defensive Abilities</b> " + 
      txtOrEmpty(tid.fields.npc_defensive_abilities, "{{!!npc_defensive_abilities}}");
  }

  if(tid.fields.npc_immunities != "NOPE") {
    retval = retval + "<b>Immunities</b> " +
      txtOrEmpty(tid.fields.npc_immunities, "{{!npc_immunities}}");
  }
  
  if(retval != "") {
    retval = "<p class='no_tb_margin'>" + retval + "</p>";
  }  

  return retval;
}

function weaknessesBlock(tid) {
  console.log("In weakness");
  if(tid.fields.npc_weaknesses != "NOPE") {
    return `
      <p class="no_tb_margin">
        <b>Weaknesses</b> {{!!npc_weaknesses}}
      </p>`;
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

    if(tid.fields[ele] != "NOPE") {
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

  var retval = "";

  datalist.forEach(ele => {
    var fieldname = ele[0];
    var header = ele[1];
    var post = ele[2];
  
    if( tid.fields[fieldname] != "NOPE" ) {
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
  
  var tid = this.wiki.getTiddler(
      this.getVariable("currentTiddler") );
  
  console.log(tid);

  var outval = `
<div id='sf_character'>
  
  <p class="no_tb_margin" id="name_cr_row">
    <span>{{!!npc_name}}</span> 
    <span id="cr">CR {{!!npc_cr}}</span>
  </p>
  ${singleLineWithHeaders(tid, [["npc_xp", "<b>XP ", "</b>"]])}  
  ${singleLineNoHeaders(tid, ["npc_gender", "npc_race", "npc_class"] )}
  ${singleLineNoHeaders(tid, ["npc_alignment", "npc_size", 
    "npc_type", "npc_subtype"] )}
  ${singleLineWithHeaders(tid, [
    ["npc_init", "<b>Init</b> ", ";"],
    ["npc_senses", "<b>Senses</b>", ";"],
    ["npc_perception", "<b>Perception</b>", ""]], true)}  
  <p class="no_tb_margin section_underline" id="defense_hp_row">
      <b>DEFENSE</b> 
      <span id="hp"><b>HP</b> {{!!npc_hp}}</span>
  </p>
  ${singleLineWithHeaders(tid, [
    ["npc_eac", "<b>EAC</b> ", ";"],
    ["npc_kac", "<b>KAC</b>", ""]] )}  
  ${singleLineWithHeaders(tid, [
      ["npc_fort", "<b>Fort</b> ", ";"],
      ["npc_ref", "<b>Ref</b>", ";"], 
      ["npc_will", "<b>Will</b>", ""]])}
  <p class="no_tb_margin section_underline">
      <b>OFFENSE</b>
  </p>
  ${singleLineWithHeaders(tid, [
    ["npc_speed", "<b>Speed</b> ", ""] ])}
  ${singleLineWithHeaders(tid, [
    ["npc_melee", "<b>Melee</b> ", ""] ])}
  ${singleLineWithHeaders(tid, [
      ["npc_offensive_abilities", "<b>Offensive Abilities</b> ", ""] ])}     
  <p class="no_tb_margin section_underline">
      <b>STATISTICS</b>
  </p>
  ${singleLineWithHeaders(tid, [
    ["npc_str", "<b>Str</b> ", ";"],
    ["npc_dex", "<b>Dex</b>", ";"], 
    ["npc_con", "<b>Con</b>", ";"],
    ["npc_int", "<b>Int</b> ", ";"],
    ["npc_wis", "<b>Wis</b>", ";"], 
    ["npc_cha", "<b>Cha</b>", ""] ])}
  ${singleLineWithHeaders(tid, [
    ["npc_skills", "<b>Skills</b> ", ""] ], true)}
  ${singleLineWithHeaders(tid, [
    ["npc_feats", "<b>Feats</b> ", ""] ])}
  ${singleLineWithHeaders(tid, [
    ["npc_languages", "<b>Languages</b> ", ""] ])}
  ${singleLineWithHeaders(tid, [
    ["npc_other_abilities", "<b>Other Abilities</b> ", ""] ])}
  ${singleLineWithHeaders(tid, [
    ["npc_gear", "<b>Gear</b> ", ""] ], true)}      
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
