"use strict";

/*
  TODO: Modularize this code with IIFE or Browserify
 */
var Gauntlet = (function(originalGauntlet){

// Added private variable to store the created players
  var createdPlayers = {};

  originalGauntlet.Combatants = {};

  /*
    Define the base object for any player of Gauntlet,
    whether a human player or a monster.
   */
  originalGauntlet.Combatants.Player = function(name) {
    this.species = null;
    this.class = null;
    this.weapon = null;

    this.playerName = name || "unknown adventurer";
    this.health = Math.floor(Math.random() * 40 + 50);
    this.limbs = ["head", "neck", "arm", "leg", "torso"];
    this.skinColor = "gray";
    this.skinColors = [this.skinColor];
    this.strength = 90;
    this.intelligence = 90;

    this.toString = function() {
      var output = [this.playerName,
        ": a ",
        this.skinColor,
        " skinned ",
        this.species,
        " ",
        this.class,
        " with ",
        this.health,
        " health. ",
        (this.class.magical) ? "Able to cast " : " Wielding a ",
        this.weapon.toString(),
        "!"
      ].join("");
      return output;
    };
  };

  originalGauntlet.Combatants.Player.prototype.setWeapon = function(newWeapon) {
    this.weapon = newWeapon;
  };

  originalGauntlet.Combatants.Player.prototype.setClass = function(newClass) {    
    this.class = new originalGauntlet.GuildHall[newClass]();
    this.health += this.class.healthBonus;
    return this.class;
  };

  originalGauntlet.Combatants.Player.prototype.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new originalGauntlet.GuildHall[randomClass]();

    // Add the health bonus
    this.health += this.class.healthBonus;
    return this.class;
  };

  /*
    Define the base properties for a human in a 
    constructor function.
   */
  originalGauntlet.Combatants.Human = function() {
    var randomSkin;

    this.species = "Human";
    this.intelligence = this.intelligence + 20;

    this.skinColors.push("brown", "red", "white", "disease");
    randomSkin = Math.round(Math.random() * (this.skinColors.length-1));
    this.skinColor = this.skinColors[randomSkin];

    this.allowedClasses = ["Warrior", "Berserker", "Valkyrie", "Monk", "Wizard", "Sorcerer", "Conjurer", "Thief", "Ninja", "Assasin"];
  };
  originalGauntlet.Combatants.Human.prototype = new originalGauntlet.Combatants.Player();


  /*
    Define the base properties for a monster in a 
    constructor function.
   */
  originalGauntlet.Combatants.Monster = function() {
    this.health = this.health - 30;
    this.intelligence = this.intelligence -20;
    this.strength = this.strength + 30;
  };
  originalGauntlet.Combatants.Monster.prototype = new originalGauntlet.Combatants.Player();

// Allows access to the created players variable
  originalGauntlet.getPlayers = function() {
    return createdPlayers;
  };

// Adds players to the created players private variable
  originalGauntlet.setPlayers = function(newlyCreatedPlayer) {
    createdPlayers[newlyCreatedPlayer.species] = newlyCreatedPlayer;
  };


  return originalGauntlet;

})(Gauntlet || {});