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
  if (field == "NOPE") {
    return txt;
  }
  else {
    return "";
  }
}

function genderRaceClassBlock(tid) {
  //Figure out what is present
  if(
    tid.fields.npc_gender !== "NOPE" ||
    tld.fields.npc_race !== "NOPE" ||
    tld.fields.npc_class !== "NOPE" ) {
    
    return `
    <p class="no_tb_margin">
      ${txtOrEmpty(tid.fields.npc_gender, "{{!!npc_gender}}")} 
      ${txtOrEmpty(tid.fields.npc_race, "{{!!npc_race}}")} 
      ${txtOrEmpty(tid.fields.npc_class, "{{!!npc_class}}")}        
    </p>`;
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
  <p class="no_tb_margin">
    <b>XP {{!!npc_xp}}</b>
  </p>
  ${genderRaceClassBlock(tid)}
  <p class="no_tb_margin">
    {{!!npc_alignment}} {{!!npc_size}} {{!!npc_type}} {{!!npc_subtype}}
  </p>  
  <p class="no_tb_margin hang_indent">
      <b>Init</b> {{!!npc_init}}; 
      ${txtOrEmpty(tid.fields.npc_senses, "<b>Senses</b> {{!!npc_senses}};")}
       <b>Perception</b> {{!!npc_perception}}
  </p>
  <p class="no_tb_margin section_underline" id="defense_hp_row">
      <b>DEFENSE</b> 
      <span id="hp"><b>HP</b> {{!!npc_hp}}</span>
  </p>
  <p class="no_tb_margin">
      <b>EAC</b> {{!!npc_eac}}; <b>KAC</b> {{!!npc_kac}}
  </p>
  <p class="no_tb_margin">
      <b>Fort</b> {{!!npc_fort}}; <b>Ref</b> {{!!npc_ref}}; <b>Will</b> {{!!npc_will}}
  </p>
  ${defensiveAbilitiesImmunitiesBlock(tid)}
  ${weaknessesBlock(tid)}
  <p class="no_tb_margin section_underline">
      <b>OFFENSIVE</b>
  </p>
  <p class="no_tb_margin">
      <b>Speed</b> {{!!npc_speed}}
  </p>    
  <p class="no_tb_margin">
      <b>Melee</b> {{!!npc_melee}}
  </p>
        
  <p class="no_tb_margin">
      <b>Ranged</b> {{!!npc_ranged}}
  </p>
    
  <p class="no_tb_margin">
      <b>Space</b> {{!!npc_space}}; <b>Reach</b> {{!!npc_reach}}
  </p>
		
  <p class="no_tb_margin">
      <b>Offensive Abilities</b> {{!!npc_offensive_abilities}}
  </p>  
  <p class="no_tb_margin section_underline">
      <b>STATISTICS</b>
  </p>
  <p class="no_tb_margin">
      <b>Str</b> {{!!npc_str}};
      <b>Dex</b> {{!!npc_dex}};
      <b>Con</b> {{!!npc_con}};
      <b>Int</b> {{!!npc_int}};
      <b>Wis</b> {{!!npc_wis}};
      <b>Cha</b> {{!!npc_cha}}
  </p>
  <p class="no_tb_margin">
      <b>Skills</b> {{!!npc_skills}}
  </p>
  <p class="no_tb_margin">
      <b>Languages</b> {{!!npc_languages}}
  </p>
  <p class="no_tb_margin section_underline">
      <b>SPECIAL ABILITIES</b>
  </p>    
    
</div>`;

  return outval;


};

})();
