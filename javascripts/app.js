"use strict";

$(document).ready(function() {

/*
  Test code to generate a human player and an orc player
 */
var warrior = new Gauntlet.Combatants.Human();
Gauntlet.setPlayers(warrior);

var orc = new Gauntlet.Combatants.Orc();
orc.generateClass();
orc.setWeapon(new Gauntlet.BroadSword());
Gauntlet.setPlayers(orc);

// var spell = new Gauntlet.SpellBook.Sphere();

  /*
    Show the initial view that accepts player name
   */
  $("#player-setup").show();

  // Display Name
  $("#nameChoice").on("click", function() {
    warrior.name = $("#player-name").val();
    // $("#battleName").append(warrior.name);
  });

  $(".classChoice").on("click", function() {
    var humanClass = this.id;
     if (humanClass === "Surprise") {
      warrior.generateClass();
    }
    else {
      warrior.setClass(humanClass);
    }
  });

  $(".weaponClass").on("click", function() {
    var pickWeapon = this.id;
    warrior.setWeapon(pickWeapon);

    if (pickWeapon === "dagger") {
      warrior.setWeapon(new Gauntlet.Dagger());
    }else if (pickWeapon === "broadSword") {
      warrior.setWeapon(new Gauntlet.BroadSword());
    }else if (pickWeapon === "warAxe") {
      warrior.setWeapon(new Gauntlet.WarAxe());
    }else if (pickWeapon === "theseHands"){
      warrior.setWeapon(new Gauntlet.Weapon());
    }else if (pickWeapon === "Sphere") {
      warrior.setWeapon(new Gauntlet.SpellBook.Sphere());
    }
    console.log("weapon", warrior);
  });
  
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
        console.log("warrior",warrior );
        if(warrior.class === null){
          alert("You Must Select A Path");
          moveAlong = false;}else
          {moveAlong = true;}
        break;
      case "card--battleground":
        moveAlong = ($("#player-name").val() !== "");
        Gauntlet.updateBattlefieldDOM({"attackString": "Let the battle Begin", "healthString": ""});
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

  $("#attack-button").click(function(e) {
    var domStrings = Gauntlet.weaponAttack(true);
  });

  $("#give-up-btn").click(function(e) {
    Gauntlet.giveUp();
  });


});