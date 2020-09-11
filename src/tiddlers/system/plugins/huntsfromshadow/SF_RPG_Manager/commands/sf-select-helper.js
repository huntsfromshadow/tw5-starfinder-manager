/*\
created: 20200911191553330
title: $:/plugins/huntsfromshadow/SF_RPG_Manager/commands/sf-select-helper.js
type: application/javascript
modified: 20200911191651949
tags: 
module-type: macro
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/* Tells TiddlyWiki the name of our macro through the export mechanism. */
exports.name = "sf-select-helper";

/* Lists of macro parameters; leave this array empty if you need none, or
 * want all supplied macro call parameters to be passed to the run() method.
 */
exports.params = [
  { name: "fieldLabel" },
  { name: "targetTiddler" }, 
  { name: "targetField" },
  { name: "options" },
  { name: "multiple", default: "no"},
  { name: "table", default: "yes"}
];

function returnMultipleVal(val) {
  let v = val.trim();
  if(v.toLowerCase() == "yes") {
    return " multiple ";
  }
  else {
    return "";
  }
}

function handleOptions(opts) {
  var retval = "";
  retval = retval + "<option></option>";
  opts.forEach(element => {
    retval = retval + "<option>" + element + "</option>";
  });

  return retval;
}

/* Executes (runs) our macro when it requires evaluation; returns a string
 * value.
 */
exports.run = function(fieldLabel, targetTiddler, targetField, options, multiple, table) {
  console.log(targetTiddler);
  console.log(targetField);
  console.log(options);
  console.log(multiple);
  console.log(table);

  var opts_array = options.split(" ");
  var retval = "";

  if(table.toLowerCase() == "yes") {
    return `
    <tr>
      <td><b>${fieldLabel}</b></td>
      <td>
        <$select tiddler="${targetTiddler}" field="${targetField}" ${returnMultipleVal(multiple)}>
        ${handleOptions(opts_array)}
        </$select>
      </td>
    </tr>
    `;
  }
  else {
    return "IMPLEMENT TABLE NO"
  }
};

})();


/*<tr>
    <td>Melee Type</td>
    <td>
        <$select tiddler="$:/plugins/huntsfromshadow/SF_RPG_Manager/variables/Var-CreateItem-Worksheet" field="item_melee_type">
            <option>Basic</option>
            <option>Advanced</option>
        </$select>
    </td>
</tr>*/