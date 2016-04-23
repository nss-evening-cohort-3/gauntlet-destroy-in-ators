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
      reportStrings.healthString = `No Health is Left! You are dead`; 
      currentEnemy.health = 0;
      $("#attack-button").attr("disabled", "disabled"); 
      $("#attack-button").off();
    } else {

      reportStrings.attackString = `${currentAttacker.species} ${currentAttacker.class.name} hits ${currentEnemy.species} ${currentEnemy.class.name} in the ${randomLimb} for ${overallDamage} points of damage!`;
      reportStrings.healthString = `${currentEnemy.species} ${currentEnemy.class.name} has ${currentEnemy.health} hit points remaining`;
    }

    Gauntlet.updateBattlefieldDOM(reportStrings);

    // clearTimeout();

    if (attackButtonClicked && (currentEnemy.health > 0)) {
      setTimeout(function() { 
        Gauntlet.weaponAttack(false);
      }, 100);
    }

    return reportStrings;

  };

// This updates the battlefield stats for both players on the DOM.
  originalAttacks.updateBattlefieldDOM = function(sentReportStrings) {

    let players = Gauntlet.getPlayers();

    let human = players[Object.keys(players)[0]];
    let monster = players[Object.keys(players)[1]];

    $("#attack-text").html(`${sentReportStrings.attackString} <br> ${sentReportStrings.healthString}`);

    $("#human-data").html(`
      <p>Player: ${human.species} ${human.class.name} </p>
      <p>Health: ${human.health}`);
    
    $("#monster-data").html(`
      <p>Player: ${monster.species} ${monster.class.name} </p>
      <p>Health: ${monster.health}`);
  };

// Spell attack function
  originalAttacks.spellAttack = function() {

  };

  return originalAttacks;

})(Gauntlet || {});
