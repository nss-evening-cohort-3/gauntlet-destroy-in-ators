/*
  TODO: Modularize this code with IIFE or Browserify
 */
var Gauntlet = (function(originalSpell){
originalSpell.SpellBook = {};


/*
  Base spell function that defines name, damage, damage type
 */
originalSpell.SpellBook.Spell = function() {
  this.name = "";
  this.damage = 0;

  this.damageTypes = ["lightning", "fire", "water", "earth", "mysticism"];
  this.type = "";

  this.toString = function() {
    return this.name + " of " + this.type + " for " + this.damage + " damage!";
  }
};

/*
  An elemental sphere that can be cast by a magical class
 */
originalSpell.SpellBook.Sphere = function() {
  this.name = "sphere";
  this.damage = Math.floor(Math.random() * 10 + 10);

  var random = Math.round(Math.random() * (this.damageTypes.length - 1));
  this.type = this.damageTypes[random];
};
originalSpell.SpellBook.Sphere.prototype = new originalSpell.SpellBook.Spell();
return originalSpell
})(Gauntlet || {})