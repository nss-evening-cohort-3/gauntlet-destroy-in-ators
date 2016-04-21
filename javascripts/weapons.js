var Gauntlet = (function (originalWeapon){

originalWeapon.Weapon = function() {
  this.name = "bare hands";
  this.damage = 1;
  this.hands = 2;

  this.toString = function() {
    return this.name;
  }
};

originalWeapon.Dagger = function() {
  this.name = "dagger";
  this.damage = 4;
  this.hands = 1;
};
orginalWeapon.Dagger.prototype = new originalWeapon.Weapon();

originalWeapon.BroadSword = function() {
  this.name = "broad sword";
  this.damage = 14;
  this.hands = 2;
};
originalWeapon.BroadSword.prototype = new originalWeapon.Weapon();

originalWeapon.WarAxe = function() {
  this.name = "war axe";
  this.damage = 18;
  this.hands = 2;
};
originalWeapon.WarAxe.prototype = new originalWeapon.Weapon();

return originalWeapon;

}) (Gauntlet || {})
