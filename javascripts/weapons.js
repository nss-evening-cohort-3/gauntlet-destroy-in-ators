var Gauntlet = (function (originalWeapon){

orginalWeapon.Weapon = function() {
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
orginalWeapon.Dagger.prototype = new orginalWeapon.Weapon();

originalWeapon.BroadSword = function() {
  this.name = "broad sword";
  this.damage = 14;
  this.hands = 2;
};
orginalWeapon.BroadSword.prototype = new orginalWeapon.Weapon();

orginalWeapon.WarAxe = function() {
  this.name = "war axe";
  this.damage = 18;
  this.hands = 2;
};
orginalWeapon.WarAxe.prototype = new orginalWeapon.Weapon();

return originalWeapon;

}) (Gauntlet || {})
