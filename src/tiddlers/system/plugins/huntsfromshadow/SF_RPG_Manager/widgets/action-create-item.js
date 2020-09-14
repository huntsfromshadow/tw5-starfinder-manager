/*\
created: 20200911160207071
type: application/javascript
title: $:/plugins/huntsfromshadow/SF_RPG_Manager/widgets/action-create-item.js
tags: 
modified: 20200911200506919
module-type: widget
\*/
(function(){

  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";
  
  var Widget = require("$:/core/modules/widgets/widget.js").widget;
  
  /* Creates a new <$foo> widget. */
  var ActionCreateItem = function(parseTreeNode, options) {
    this.initialise(parseTreeNode, options);    
  };
    
  /* "Inherits" from the Widget base "class" in order to get all
   * the basic widget functionality.
   */
  ActionCreateItem.prototype = new Widget();
  
  /* Renders this widget into the DOM. */
  ActionCreateItem.prototype.render = function(parent,nextSibling) {
    this.computeAttributes();
    this.execute();
  };
  
  /* Computes the internal state of this widget. */
  ActionCreateItem.prototype.execute = function() {
    this.worksheet = this.getAttribute("$worksheet");
    this.itemType = this.getAttribute("$itemType");
    this.itemGroup = this.getAttribute("$itemGroup");
    this.actionSaveTitle = this.getAttribute("$savetitle");
  };  
    
  /* Selectively refreshes this widget if needed and returns
   * true if either this widget itself or one of its children
   * needs to be re-rendered.
   */
  ActionCreateItem.prototype.refresh = function(changedTiddlers) {
    var changedAttributes = this.computeAttributes();
    if($tw.utils.count(changedAttributes) > 0) {
      this.refreshSelf();
      return true;
    }
    return this.refreshChildren(changedTiddlers);  
  };
  
  ActionCreateItem.prototype.saveField = function(fieldName, fieldValue) {
    if(fieldValue === undefined) {
      fieldValue = this.emptyFieldText();
    }  
    this.wiki.setText(this.fieldtarget, fieldName, undefined, fieldValue.trim(), {});  
  };
  
  ActionCreateItem.prototype.emptyFieldText = function() {
    if(this.debugMode == true) {
      return "DEBUG NOPE";
    }
    else {
      return "";
    }
  };

  ActionCreateItem.prototype.checkForEmpty = function(data) {
    if(data === undefined) {
      return this.emptyFieldText();
    }
    else {
      return data;
    }
  }

  ActionCreateItem.prototype.buildMelee = function(tid) {
    return {
      "Melee Type": this.checkForEmpty(tid.fields.item_melee_type),
      "Handness": this.checkForEmpty(tid.fields.item_handness),
      "Name": this.checkForEmpty(tid.fields.item_name),
      "Level(s)": this.checkForEmpty(tid.fields.item_level),
      "Price": this.checkForEmpty(tid.fields.item_price),
      "Damage": this.checkForEmpty(tid.fields.item_damage),
      "Critical": this.checkForEmpty(tid.fields.item_critical),
      "Bulk": this.checkForEmpty(tid.fields.item_bulk),
      "Special": this.checkForEmpty(tid.fields.item_special),
      "Other": ["\n", `''Other:'' ${this.checkForEmpty(tid.fields.item_other)}`, "\n"],
      "Source": this.checkForEmpty(tid.fields.item_source),
      };    
  };

  ActionCreateItem.prototype.buildRanged = function(tid) {
    return {
      "Melee Type": this.checkForEmpty(tid.fields.item_ranged_type),
      "Handness": this.checkForEmpty(tid.fields.item_handness),
      "Name": this.checkForEmpty(tid.fields.item_name),
      "Level(s)": this.checkForEmpty(tid.fields.item_level),
      "Price": this.checkForEmpty(tid.fields.item_price),
      "Damage": this.checkForEmpty(tid.fields.item_damage),
      "Range":this.checkForEmpty(tid.fields.item_range),      
      "Critical": this.checkForEmpty(tid.fields.item_critical),
      "Capacity": this.checkForEmpty(tid.fields.item_capacity),
      "Usage": this.checkForEmpty(tid.fields.item_usage),
      "Bulk": this.checkForEmpty(tid.fields.item_bulk),
      "Special": this.checkForEmpty(tid.fields.item_special),
      "Other": ["\n", `''Other:'' ${this.checkForEmpty(tid.fields.item_other)}`, "\n"],
      "Source": this.checkForEmpty(tid.fields.item_source),
      };
  };

  ActionCreateItem.prototype.buildAmmunition = function(tid) {
    return this.arrayGen( {
      "Ammunition Type": this.checkForEmpty(tid.fields.item_ammunition_type),     
      "Name": this.checkForEmpty(tid.fields.item_name),
      "Level(s)": this.checkForEmpty(tid.fields.item_level),
      "Price": this.checkForEmpty(tid.fields.item_price),
      "Charges/Cartridges": this.checkForEmpty(tid.fields.item_item_charges_cartridges),
      "Bulk": this.checkForEmpty(tid.fields.item_bulk),
      "Special": this.checkForEmpty(tid.fields.item_special),
      "Other": ["\n", `''Other:'' ${this.checkForEmpty(tid.fields.item_other)}`, "\n"],
      "Source": this.checkForEmpty(tid.fields.item_source),
      }
    )  
  };

  ActionCreateItem.prototype.buildSolarian = function(tid) {
    return {      
      "Name": this.checkForEmpty(tid.fields.item_name),
      "Level(s)": this.checkForEmpty(tid.fields.item_level),
      "Price": this.checkForEmpty(tid.fields.item_price),
      "Damage": this.checkForEmpty(tid.fields.item_damage),
      "Critical": this.checkForEmpty(tid.fields.item_critical),
      "Bulk": this.checkForEmpty(tid.fields.item_bulk),
      "Special": this.checkForEmpty(tid.fields.item_special),
      "Other": ["\n", `''Other:'' ${this.checkForEmpty(tid.fields.item_other)}`, "\n"],
      "Source": this.checkForEmpty(tid.fields.item_source),
      };    
  };

  ActionCreateItem.prototype.buildGrenade = function(tid) {
    return {
      "Name": this.checkForEmpty(tid.fields.item_name),
      "Level(s)": this.checkForEmpty(tid.fields.item_level),
      "Price": this.checkForEmpty(tid.fields.item_price),      
      "Range": this.checkForEmpty(tid.fields.item_range),     
      "Capacity": this.checkForEmpty(tid.fields.item_capacity), 
      "Bulk": this.checkForEmpty(tid.fields.item_bulk),
      "Special": this.checkForEmpty(tid.fields.item_special),
      "Other": ["\n", `''Other:'' ${this.checkForEmpty(tid.fields.item_other)}`, "\n"],
      "Source": this.checkForEmpty(tid.fields.item_source),
      }
  };

  ActionCreateItem.prototype.buildArmor = function(tid) {
    return {      
      "Name": this.checkForEmpty(tid.fields.item_name),
      "Price": this.checkForEmpty(tid.fields.item_price),
      "Category": this.checkForEmpty(tid.fields.item_category),
      "EAC Bonus": this.checkForEmpty(tid.fields.item_eac),
      "KAC Bonus": this.checkForEmpty(tid.fields.item_kac),
      "Maximum DEX Bonus": this.checkForEmpty(tid.fields.item_maximum_dex_bonus),
      "Armor Penalty Check": this.checkForEmpty(tid.fields.item_armor_check_penalty),
      "Speed Adjustment": this.checkForEmpty(tid.fields.item_speed_adjustment),
      "Upgrade Slots": this.checkForEmpty(tid.fields.item_upgrade_slots),
      "Bulk": this.checkForEmpty(tid.fields.item_bulk),      
      "Other": ["\n", `''Other:'' ${this.checkForEmpty(tid.fields.item_other)}`, "\n"],
      "Source": this.checkForEmpty(tid.fields.item_source),
    }
  };

  ActionCreateItem.prototype.buildText = function(arr) {
    var retval = "";

    retval = retval + '"""\n';
    for (var key in arr) {      
      var value = arr[key];
      if(Array.isArray(value)) {
        retval = retval + value.join("") + "\n";
      }
      else {
        retval = retval + `''${key}:'' ${value}\n`;
      }
      console.log("---");
      console.log(retval);
    }
    retval = retval + '"""\n';
    return retval;
  }
      
  ActionCreateItem.prototype.invokeAction = function(triggeringWidget,event) {
    //First we need to grab the config to know if we are in Debug Mode
    var tid = this.wiki.getTiddler("$:/plugins/huntsfromshadow/SF_RPG_Manager/config/DebugEmptyImport");
      
    if(tid !== undefined && tid.fields.text == "true") {
      this.debugMode = true;
    }
    else {
      this.debugMode = false;
    }

    var tid = this.wiki.getTiddler(this.worksheet);
  
    console.log(this.worksheet);
    console.log(tid);

    var title = this.wiki.getTiddlerText("$:/language/DefaultNewTiddlerTitle"), // Get the initial new-tiddler title
		            fields = {},
		            creationFields,
                modificationFields;
                
    creationFields = this.wiki.getCreationFields();
    modificationFields = this.wiki.getModificationFields();
    
    //var logger = new $tw.utils.Logger("text-slicer");
		//logger.alert("The plugin 'text-slicer' requires the 'sax' plugin to be installed");

    console.log(tid.fields);

    title = tid.fields.item_name;

    var itemArr = null;
    var tags = ["Item"]

    switch (this.itemType) {
      case "weapon":        
        switch(this.itemGroup) {
          case "melee":                    
            itemArr = this.buildMelee(tid);
            break;
          case "ranged":
            itemArr = this.buildRanged(tid);          
            break;
          case "ammunition":
            itemArr = this.buildAmmunition(tid);
            break;
          case "solarian":
            itemArr = this.buildSolarian(tid);
          case "grenade":
            itemArr = this.buildGrenade();
            break;
          default:
            itemArr = [];
            break;
        }
        break;
      case "armor":
        itemArr = this.buildArmor(tid);
        break;
      default:
        itemArr = [];
        break;
    }

    console.log(itemArr);

    var fTxt = this.buildText(itemArr);
    console.log(fTxt);
    
    var tiddler = this.wiki.addTiddler(
      new $tw.Tiddler(         
        creationFields,
        modificationFields,
        {          
          title: title,
          text: fTxt,
          tags: tags.join(" ")
        }  
      )
    );

    if(this.actionSaveTitle) {
      this.wiki.setTextReference(this.actionSaveTitle,title,this.getVariable("currentTiddler"));
    }

    return true;
  };
    
  /* Finally exports the widget constructor. */
  exports["action-sf-create-item"] = ActionCreateItem;
  
  })();