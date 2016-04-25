"use strict";

var Gauntlet = (function(originalAttacks){

  originalAttacks.weaponAttack = function(attackButtonClicked) {

    var players = Gauntlet.getPlayers();
    var currentAttacker = players[Object.keys(players)[1]]; // Monster
    var currentEnemy = players[Object.keys(players)[0]]; // Human

// Contains the attack string .attackString and the health string .healthString
    var reportStrings = {};

// Checks to see if the human clicked the attack button and makes the appropriate switch
// of the attacker/enemy variables
    if (attackButtonClicked) {
      currentAttacker = players[Object.keys(players)[0]]; // Human
      currentEnemy = players[Object.keys(players)[1]]; // Monster
    }

// Sets the overallDamage and damageMutiplier to null
    let damageMultiplier = 0;

// Randomly picks a limb that the attack hits (for damage scaling)
    let randomLimb = currentEnemy.limbs[Math.round(Math.random() * (currentEnemy.limbs.length - 1))];
    switch (randomLimb) {
    case "head":
      damageMultiplier = 0.8 ;
      break;
    case "neck":
      damageMultiplier = 1;
      break;
    case "arm":
      damageMultiplier = 0.4;
      break;
    case "leg":
      damageMultiplier = 0.3;
      break;
    case "torso":
      damageMultiplier = 0.6;
      break;
    }

// Sets the overall weapon damage depending on where the enemy is hit
    let overallDamage = Math.floor(currentAttacker.weapon.damage * damageMultiplier);

// Reduces the overall health of the enemy after the attack calculation is completed
    currentEnemy.health = currentEnemy.health - overallDamage;

// Checks to see if the health of the enemy is at or below 0 and changes the reporting string acordingly.
    if (currentEnemy.health <= 0) {
      reportStrings.attackString = `${currentAttacker.species} ${currentAttacker.class.name} hits ${currentEnemy.species} ${currentEnemy.class.name} in the ${randomLimb} for ${overallDamage} points of damage!<br>`;
      reportStrings.attackString += `${currentEnemy.species} ${currentEnemy.class.name} has died!`;
      reportStrings.healthString = `No Health is Left! You are dead. Winner, winner chicken dinner! ` + `${currentAttacker.class.name}`; 
      currentEnemy.health = 0;
      $("#attack-button").attr("disabled", "disabled"); 
      $("#attack-button").off();
      $("#give-up-btn").attr("disabled", "disabled"); 
      $("#give-up-btn").off();

    } else {

      reportStrings.attackString = `${currentAttacker.species} ${currentAttacker.class.name} hits ${currentEnemy.species} ${currentEnemy.class.name} in the ${randomLimb} for ${overallDamage} points of damage!`;
      reportStrings.healthString = `${currentEnemy.species} ${currentEnemy.class.name} has ${currentEnemy.health} hit points remaining`;
    }

    Gauntlet.updateBattlefieldDOM(reportStrings, attackButtonClicked);

    clearTimeout();

    if (attackButtonClicked && (currentEnemy.health > 0)) {
      setTimeout(function() { 
        Gauntlet.weaponAttack(false);
      }, 2000);
    }

  };

// This updates the battlefield stats for both players on the DOM.
  originalAttacks.updateBattlefieldDOM = function(sentReportStrings, sentAttackButtonClicked) {

    let players = Gauntlet.getPlayers();

    let human = players[Object.keys(players)[0]];
    let monster = players[Object.keys(players)[1]];
    let humanPic = "human.png";
    let monsterPic = "orc.png";

    console.log(human.health, monster.health);

    if (human.health === 0) {
      humanPic = "human-loser.png";
      monsterPic = "orc-winner.png";
      sentAttackButtonClicked = null;
    } else if (monster.health === 0) {
      humanPic = "human-winner.png";
      monsterPic = "orc-loser.png";
      sentAttackButtonClicked = null;
    }

    if (sentAttackButtonClicked === true) {
      humanPic = "human-attack.png";
      monsterPic = "orc-hit.png";
    } else if (sentAttackButtonClicked === false) {
      humanPic = "human-hit.png";
      monsterPic = "orc-attack.png";
    }

    $(".human-picture-holder").html(`<img class="human-picture" src="img/${humanPic}" alt="Human Picture">`);
    $(".orc-picture-holder").html(`<img class="orc-picture" src="img/${monsterPic}" alt="Orc Picture">`);

    $("#attack-text").html(`${sentReportStrings.attackString} <br> ${sentReportStrings.healthString}`);

    $("#human-data").html(`
      <p>Player: ${human.species} ${human.class.name} </p>
      <p>Health: ${human.health}`);
    
    $("#monster-data").html(`
      <p>Player: ${monster.species} ${monster.class.name} </p>
      <p>Health: ${monster.health}`);
  };

  // This is what happens when you give up!
  originalAttacks.giveUp = function() {

    let players = Gauntlet.getPlayers();
    let human = players[Object.keys(players)[0]];

// Sets human's health to zero
    human.health = 0;

// Disables the attack and GiveUp buttons
    $("#attack-button").attr("disabled", "disabled"); 
    $("#attack-button").off();
    $("#give-up-btn").attr("disabled", "disabled"); 
    $("#give-up-btn").off();

// Contains the attack string .attackString and the health string .healthString
    var reportStrings = {};

    reportStrings.attackString = `You Gave Up Fool!`;
    reportStrings.attackString += `There is no giving up on the battlefield!`;
    reportStrings.healthString = `You are dead! The Orc is the winner`; 

//Updates the DOM
    Gauntlet.updateBattlefieldDOM(reportStrings, null);

  };

// Spell attack function
  originalAttacks.spellAttack = function() {

  };

  return originalAttacks;

})(Gauntlet || {});
