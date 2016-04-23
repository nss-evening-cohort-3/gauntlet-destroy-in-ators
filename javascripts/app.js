"use strict";

$(document).ready(function() {

/*
  Test code to generate a human player and an orc player
 */
var warrior = new Gauntlet.Combatants.Human();
// warrior.setWeapon(new Gauntlet.WarAxe());
// warrior.generateClass();  // This will be used for "Surprise me" option
// console.log(warrior.toString());

warrior.setWeapon(new Gauntlet.WarAxe());
warrior.generateClass();  // This will be used for "Surprise me" option
console.log(warrior.toString());
Gauntlet.setPlayers(warrior);

var orc = new Gauntlet.Combatants.Orc();
orc.generateClass();
orc.setWeapon(new Gauntlet.BroadSword());
console.log(orc.toString());
Gauntlet.setPlayers(orc);


/*
  Test code to generate a spell
 */
var spell = new Gauntlet.SpellBook.Sphere();
console.log("spell: ", spell.toString());

  /*
    Show the initial view that accepts player name
   */
  $("#player-setup").show();

  // Display Name
  $("#nameChoice").on("click", function() {
    warrior.name = $("#player-name").val();
    $("#battleName").append(warrior.name);
  })

  $(".classChoice").on("click", function() {
    var humanClass = this.id

    switch(humanClass) {
      case "warrior":
        warrior.setClass(new Warrior());
        break;
      case "valkyrie":  
        warrior.setClass(new Valkyrie());
        break;
      case "berserker":  
        warrior.setClass(new Berserker());
        break;
      case "monk":  
        warrior.setClass(new Monk());
        break;
      case "wizard":  
        warrior.setClass(new Wizard());
        break;
      case "sorcerer":  
        warrior.setClass(new Sorcerer());
        break;
      case "conjurer":  
        warrior.setClass(new Conjurer());
        break;    
        console.log("Player", warrior)      
    }
  })

  $(".weaponClass").on("click", function() {
    var pickWeapon = this.id

    switch(pickWeapon) {
      case "dagger":
        warrior.setWeapon(new Dagger());
        break;
      case "broadSword":
        warrior.setWeapon(new BroadSword());
        break;
      case "warAxe":
        warrior.setWeapon(new WarAxe());
        break;
    }
  })

  $
  
  /*
    When any button with card__link class is clicked,
    move on to the next view.
   */
  $(".card__link").click(function(e) {
    var nextCard = $(this).attr("next");
    var moveAlong = false;

    switch (nextCard) {
      case "card--class":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--weapon":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--battleground":
        moveAlong = ($("#player-name").val() !== "");
        Gauntlet.updateBattlefieldDOM({"attackString": "Let the battle Begin", "healthString": ""});
        break;
      case "give_up":
        alert("You gave up fool!");
    }

    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
    }
  });

  /*
    When the back button clicked, move back a view
   */
  $(".card__back").click(function(e) {
    var previousCard = $(this).attr("previous");
    $(".card").hide();
    $("." + previousCard).show();
  });

  $("#attack-button").click(function(e) {
    var domStrings = Gauntlet.weaponAttack(true);
    Gauntlet.updateBattlefieldDOM(domStrings);
  });



});