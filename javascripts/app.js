"use strict";

/*
  Test code to generate a human player and an orc player
 */
var warrior = new Gauntlet.Combatants.Human();
// warrior.setWeapon(new Gauntlet.WarAxe());
// warrior.generateClass();  // This will be used for "Surprise me" option
// console.log(warrior.toString());

var orc = new Gauntlet.Combatants.Orc();
orc.generateClass();
orc.setWeapon(new Gauntlet.BroadSword());
console.log(orc.toString());

/*
  Test code to generate a spell
 */
var spell = new Gauntlet.SpellBook.Sphere();
console.log("spell: ", spell.toString());


$(document).ready(function() {
  /*
    Show the initial view that accepts player name
   */
  $("#player-setup").show();

  // Display Name
  $("#nameChoice").on("click", function() {
    warrior.name = $("#player-name").val();
    $("#battleName").append(warrior.name);
  })

  $("#classChoice").on("click", function() {
    var humanClass = this.id

    switch(humanClass) {
      case "Warrior":
        warrior.setClass(new Warrior());
        break;
      case "Valkyrie":  
        warrior.setClass(new Valkyrie());
        break;
      case "Berserker":  
        warrior.setClass(new Berserker());
        break;
      case "Monk":  
        warrior.setClass(new Monk());
        break;
      case "Wizard":  
        warrior.setClass(new Wizard());
        break;
      case "Sorcerer":  
        warrior.setClass(new Sorcerer());
        break;
      case "Conjurer":  
        warrior.setClass(new Conjurer());
        break;    
        console.log("Player", warrior)      
    }
  })
  
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

});