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

var npcDebugTxt = "DEBUG NOPE";

function txtOrEmpty(field, txt) {
  if (field != npcDebugTxt) {
    return txt;
  }
  else {
    return "";
  }
}

function genderRaceClassBlock(tid) {
  //Figure out what is present
  if(
    tid.fields.npc_gender != npcDebugTxt ||
    tld.fields.npc_race != npcDebugTxt ||
    tld.fields.npc_class != npcDebugTxt ) {
    
  }
}

function defensiveAbilitiesImmunitiesBlock(tid) {  
  var retval = "";

  if(tid.fields.npc_defensive_abilities != npcDebugTxt) {
    retval = retval + "<b>Defensive Abilities</b> " + 
      txtOrEmpty(tid.fields.npc_defensive_abilities, "{{!!npc_defensive_abilities}}");
  }

  if(tid.fields.npc_immunities != npcDebugTxt) {
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
  if(tid.fields.npc_weaknesses != npcDebugTxt) {
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

function spellLikeAbility(tid) {
  var retval = "";

  
  if(
    (tid.fields.npc_sla !== undefined) &&
    (tid.fields.npc_sla !== npcDebugTxt) &&
    (tid.fields.npc_sla !== "") ) {
    var d = tid.fields.npc_sla;
    d = d.split("|");

    var val = `
    <p class="no_tb_margin hang_indent">
      <b>Spell-Like Abilities</b> (CL ${d[0]})<br/>
    `;

    var dat = tid.fields.npc_sla;

    var la = dat.split("|");
    la.shift();

    la.forEach(element => {
      val = val + element + "<br />";
    });
    val = val + "</p>";

    retval = val;
  }

  return retval;
  
}

function defenseHeader(tid) {
  var retval = `
  <p class="no_tb_margin section_underline" id="defense_hp_row">
  <b>DEFENSE</b> 
  <span id="hp"><b>HP</b> {{!!npc_hp}} `;

  if(tid.fields.npc_rp !== undefined &&
      tid.fields.npc_rp != npcDebugTxt && 
      tid.fields.npc_rp != "" ) {
    retval = retval + "&nbsp;<b>RP</b> {{!!npc_rp}}";
  }

  retval = retval + "</span></p>";
  return retval;
}

function ecologySection(tid) {
  var retval = "";

  if(tid.fields.npc_enviornment !== undefined) {
    retval = retval + `<p class="no_tb_margin section_underline">
    <b>Ecology</b>
      </p>`;

    retval = retval + singleLineWithHeaders(tid, [
      ["npc_enviornment", "<b>Enviornment</b> ", ""]
    ]);    
    retval = retval + singleLineWithHeaders(tid, [
      ["npc_organization", "<b>Organization</b> ", ""]
    ]);        
  }

  return retval;
}

function specialAbilities(tid) {
  var retval = "";
  if(tid.fields.npc_special_abilities !== undefined) {
    retval = retval + '<p class="no_tb_margin section_underline" id="defense_hp_row"><b>DEFENSE</b></p>';

    retval = retval + "{{!!npc_special_abilities}}";
  }

  return retval;
}

/* Executes (runs) our macro when it requires evaluation; returns a string
 * value.
 */
exports.run = function() {
  var tid = this.wiki.getTiddler("$:/plugins/huntsfromshadow/SF_RPG_Manager/config/DebugEmptyImport");
      
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
    ["npc_senses", "<b>Senses</b> ", ";"],
    ["npc_perception", "<b>Perception</b> ", ""]], true)}  
  ${singleLineWithHeaders(tid, [["npc_aura", "<b>Aura</b> ", ""]])}
  ${defenseHeader(tid)}
  ${singleLineWithHeaders(tid, [
    ["npc_eac", "<b>EAC</b> ", ";"],
    ["npc_kac", "<b>KAC</b> ", ""]] )}  
  ${singleLineWithHeaders(tid, [
      ["npc_fort", "<b>Fort</b> ", ";"],
      ["npc_ref", "<b>Ref</b>", ";"], 
      ["npc_will", "<b>Will</b>", ""]])}
  ${singleLineWithHeaders(tid, [
    ["npc_dr", "<b>DR</b> ", ";"],
    ["npc_immunities", "<b>Immunities</b> ", ";"],
    ["npc_sr", "<b>SR</b> ", ""]
  ])}
  ${singleLineWithHeaders(tid, [
    ["npc_weaknesses", "<b>Weaknesses</b> ", ";"],
  ])}
  <p class="no_tb_margin section_underline">
      <b>OFFENSE</b>
  </p>
  ${singleLineWithHeaders(tid, [
    ["npc_speed", "<b>Speed</b> ", ""] ])}
  ${singleLineWithHeaders(tid, [
    ["npc_melee", "<b>Melee</b> ", ""] ])}
  ${singleLineWithHeaders(tid, [
    ["npc_multiattack", "<b>Multiattack</b> ", ""] ])}    
  ${singleLineWithHeaders(tid, [
      ["npc_ranged", "<b>Ranged</b> ", ""] ])}  
  ${singleLineWithHeaders(tid, [
        ["npc_space", "<b>Space</b> ", ""],
        ["npc_reach", "<b>Reach</b> ", ""] ])}  
  ${singleLineWithHeaders(tid, [
      ["npc_offensive_abilities", "<b>Offensive Abilities</b> ", ""] ])}     
  ${spellLikeAbility(tid)}
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
  ${ecologySection(tid)}
  ${specialAbilities(tid)}
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
