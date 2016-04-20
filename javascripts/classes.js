/*
  TODO: Modularize this code with IIFE or Browserify
 */
var Gauntlet = (function(gauntletClass) {

  gauntletClass.GuildHall = {};

  /*
    Base function for a player, or enemy, class (profession)
   */
  gauntletClass.GuildHall.PlayerClass = function() {
    this.name = "Beggar";
    this.healthBonus = 0;
    this.strengthBonus = 0;
    this.intelligenceBonus = 0;
    this.magical = false;

    this.toString = function() {
      return this.name;
    }
  };

  /*
      FIGHTER CLASSES
        - Warrior
        - Valkyrie
        - Berserker
        - Monk
   */
  gauntletClass.GuildHall.Fighter = function() {
    this.healthBonus = 20;
    this.strengthBonus = 10;
  };
  gauntletClass.GuildHall.Fighter.prototype = new Gauntlet.GuildHall.PlayerClass();


  gauntletClass.GuildHall.Warrior = function() {
    this.name = "Warrior";
    this.healthBonus = this.healthBonus + 25;
    this.strengthBonus = this.strengthBonus + 30;
  };
  Gauntlet.GuildHall.Warrior.prototype = new Gauntlet.GuildHall.Fighter();


  gauntletClass.GuildHall.Valkyrie = function() {
    this.name = "Valkyrie";
    this.healthBonus = this.healthBonus + 20;
    this.strengthBonus = this.strengthBonus + 10;
  };
  gauntletClass.GuildHall.Valkyrie.prototype = new Gauntlet.GuildHall.Fighter();


  gauntletClass.GuildHall.Berserker = function() {
    this.name = "Berserker";
    this.healthBonus = this.healthBonus + 35;
    this.strengthBonus = this.strengthBonus + 20;
  };
  gauntletClass.GuildHall.Berserker.prototype = new Gauntlet.GuildHall.Fighter();


  gauntletClass.GuildHall.Monk = function() {
    this.name = "Monk";
    this.healthBonus = this.healthBonus + 10;
    this.strengthBonus = this.strengthBonus + 40;
  };
  gauntletClass.GuildHall.Monk.prototype = new Gauntlet.GuildHall.Fighter();


  /*
      MAGICAL CLASSES
        - Shaman
        - Wizard
        - Conujurer
        - Sorcerer
   */
  gauntletClass.GuildHall.Mage = function() {
    this.name = "Mage";
    this.magical = true;
    this.healthBonus = this.healthBonus - 10;
    this.strengthBonus = this.strengthBonus - 20;
    this.intelligenceBonus = this.intelligenceBonus + 20;
  };
  gauntletClass.GuildHall.Mage.prototype = new Gauntlet.GuildHall.PlayerClass();


  gauntletClass.GuildHall.Shaman = function() {
    this.name = "Shaman";
    this.healthBonus = this.healthBonus + 5;
    this.strengthBonus = this.strengthBonus - 10;
    this.intelligenceBonus = this.intelligenceBonus + 20;
  };
  gauntletClass.GuildHall.Shaman.prototype = new Gauntlet.GuildHall.Mage();


  gauntletClass.GuildHall.Wizard = function() {
    this.name = "Wizard";
    this.healthBonus = this.healthBonus - 15;
    this.strengthBonus = this.strengthBonus - 25;
    this.intelligenceBonus = this.intelligenceBonus + 40;
  };
  gauntletClass.GuildHall.Wizard.prototype = new Gauntlet.GuildHall.Mage();


  gauntletClass.GuildHall.Conjurer = function() {
    this.name = "Conjurer";
    this.strengthBonus = this.strengthBonus - 10;
    this.intelligenceBonus = this.intelligenceBonus + 10;
  };
  gauntletClass.GuildHall.Conjurer.prototype = new Gauntlet.GuildHall.Mage();


  gauntletClass.GuildHall.Sorcerer = function() {
    this.name = "Sorcerer";
    this.healthBonus = this.healthBonus - 5;
    this.strengthBonus = this.strengthBonus - 20;
    this.intelligenceBonus = this.intelligenceBonus + 30;
  };
  gauntletClass.GuildHall.Sorcerer.prototype = new Gauntlet.GuildHall.Mage();

  return gauntletClass;

}(Gauntlet || {}))
