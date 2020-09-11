/*\
created: 20200902162043469
title: $:/plugins/huntsfromshadow/SF_RPG_Manager/widgets/action-rawtext-trap-import.js
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
  var RawTextTrapImport = function(parseTreeNode, options) {
    this.initialise(parseTreeNode, options);
    this.loadKeywordList();
  };
    
  /* "Inherits" from the Widget base "class" in order to get all
   * the basic widget functionality.
   */
  RawTextTrapImport.prototype = new Widget();
  
  /* Renders this widget into the DOM. */
  RawTextTrapImport.prototype.render = function(parent,nextSibling) {
    this.computeAttributes();
    this.execute();
  };
  
  /* Computes the internal state of this widget. */
  RawTextTrapImport.prototype.execute = function() {
    this.trapname = this.getAttribute("$trapname");
    this.rawblock = this.getAttribute("$rawblock");
    this.fieldtarget = this.getAttribute("$fieldtarget");
  };  
    
  /* Selectively refreshes this widget if needed and returns
   * true if either this widget itself or one of its children
   * needs to be re-rendered.
   */
  RawTextTrapImport.prototype.refresh = function(changedTiddlers) {
    var changedAttributes = this.computeAttributes();
    if($tw.utils.count(changedAttributes) > 0) {
      this.refreshSelf();
      return true;
    }
    return this.refreshChildren(changedTiddlers);  
  };
  
  RawTextTrapImport.prototype.saveField = function(fieldName, fieldValue) {
    if(fieldValue === undefined) {
      fieldValue = this.emptyFieldText();
    }  
    this.wiki.setText(this.fieldtarget, fieldName, undefined, fieldValue.trim(), {});  
  };
  
  RawTextTrapImport.prototype.emptyFieldText = function() {
    if(this.debugMode == true) {
      return "DEBUG NOPE";
    }
    else {
      return "";
    }
  };
    
  RawTextTrapImport.prototype.extractKeywords = function(rb) {  
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
      val = val.replace(/\n/gi, " ");
  
      //console.log(elem[0]);
      //console.log(val);
  
      this.saveField(elem[0], val);
    });
  };  
  
  RawTextTrapImport.prototype.invokeAction = function(triggeringWidget,event) {
    //First we need to grab the config to know if we are in Debug Mode
    var tid = this.wiki.getTiddler("$:/plugins/huntsfromshadow/SF_RPG_Manager/config/DebugEmptyImport");
      
    if(tid !== undefined && tid.fields.text == "true") {
      this.debugMode = true;
    }
    else {
      this.debugMode = false;
    }
  
    //Handle any data cleanup
    var rb = this.rawblock.replace(/−/gi, "-");
    //var rb = this.rawblock.replace("—", "-");
  
    //First lets handle all the data that can be keword grabbed
    this.extractKeywords(rb);
        
    return true;
  };
  
  RawTextTrapImport.prototype.loadKeywordList = function() {  
    this.keyword_list = [
      ["trap_name", "(.*) CR (?:1\\/8|1\\/6|1\\/4|1\\/3|1\\/2|\\d{1,2})"],      
      ["trap_cr", ".* CR (1\\/8|1\\/6|1\\/4|1\\/3|1\\/2|\\d{1,2})"],
      ["trap_xp", "XP ([\\d,]*)"],
      ["trap_type", "Type ([^;]*);"],
      ["trap_perception", "Perception ([^;]*);"],
      ["trap_disable", "Disable([\\s|\\S]*)Trigger"],
      ["trap_trigger", "Trigger ([^;]*);"],
      ["trap_reset", "Reset ([^;]*);?Effect"],
      ["trap_effect", "Effect ([\\s|\\S]*)"]
    ];
  }
  
  /* Finally exports the widget constructor. */
  exports["action-sf-rawtext-trap-import"] = RawTextTrapImport;
  
  })();