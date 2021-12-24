// Game States
// "WIN" - Player robot has defeated all enemy bots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerInfo = {
  name: prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      alert("Refilling player's health by 20 for 0 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
        alert("You do not have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      alert("Refilling player's health by 20 for 0 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
        alert("You do not have enough money!");
    }
  },
};

// function to generate a random numeric value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};
//  WELCOME
alert("Welcome to the fight " + playerInfo.name + "!!!");

// ENEMY INFO OBJECT
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
  },
];

// This creates a function called "fight"
var fight = function (enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    console.log(
      playerInfo.name +
        " " +
        playerInfo.health +
        " ==== " +
        enemy.name +
        " " +
        enemy.health
    );
    // ask player if they'd like to fight or run
    var promptFight = prompt(
      "Would you like to FIGHT or SKIP this battle?  Enter 'FIGHT' or 'SKIP' to choose"
    );

    // if player chooses to skip, then skip
    if (
      promptFight === "skip" ||
      promptFight === "SKIP" ||
      promptFight === "Skip"
    ) {
      // confirm player wants to skip
      var confirmSkip = confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        alert(
          playerInfo.name + " has decided to skip the fight. Goodbye!"
        );
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
    }
    //If player chooses to fight, then fight
    else if (
      promptFight === "fight" ||
      promptFight === "FIGHT" ||
      promptFight === "Fight"
    ) {
      // generate random damage based on players attack power
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack + 1);
      console.log(playerInfo.attack + " >>> " + damage);
      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      enemy.health = Math.max(0, enemy.health - damage);

      if (damage > playerInfo.attack) {
        console.log("====CRITICAL HIT====");
      }

      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          " for " +
          damage +
          " damage. " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining."
      );

      // Check enemy's health
      if (enemy.health <= 0) {
        alert(enemy.name + " has died!");
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
        // leave while() loop since enemy is dead
        break;
      } else {
        alert(
          enemy.name + " still has " + enemy.health + " health left."
        );
      }

      var damage = randomNumber(enemy.attack - 3, enemy.attack + 1);
      console.log(enemy.attack + " >>> " + damage);
      // remove player's health by subtracting the amount set in the enemyInfo.attack variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);

      if (damage > enemy.attack) {
        console.log("====CRITICAL HIT====");
      }

      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          " for " +
          damage +
          " damage. " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );

      // Check player's health
      if (playerInfo.health <= 0) {
        alert(playerInfo.name + " has died!");
        break;
      } else {
        alert(
          playerInfo.name + " still has " + playerInfo.health + " health left."
        );
      }
    } else {
      alert("You need to choose a valid option. Try again!");
    }
  }
};

// function to start a new game
var startGame = function () {
  // reset player stats
  playerInfo.reset();
  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      alert("Welcome to Robot Gladiators! Round " + (i + 1));

      var pickedEnemyObj = enemyInfo[i];

      pickedEnemyObj.health = randomNumber(40, 60);

      console.log(
        playerInfo.name +
          " H-" +
          playerInfo.health +
          " A-" +
          playerInfo.attack +
          " ===VS.=== " +
          pickedEnemyObj.name +
          " H-" +
          pickedEnemyObj.health +
          " A-" +
          pickedEnemyObj.attack
      );

      fight(pickedEnemyObj);
      // if we are not at the last enemy of the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = confirm(
          "The fight is over, visit the store before the next round?"
        );
        // if yes then take them to the store
        if (storeConfirm) {
          shop();
        }
      }
    } else {
      alert("You have lost your robot in battle! GAME OVER!!!");
      break;
    }
  }
  endGame();
};

// function to end the entire game
var endGame = function () {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    alert(
      "Great job, you've survived the game! You now have a score of " +
        playerInfo.money +
        "."
    );
  } else {
    alert("You've lost your robot in battle.");
  }
  // ask player if they's like to play again
  var playAgainConfirm = confirm("Would you like to play again?");
  if (playAgainConfirm) {
    // restart the game
    startGame();
  } else {
    alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function () {
  // ask player what they would like to do
  var shopOptionPrompt = prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store?  Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
    case "Refill":
      playerInfo.refillHealth();
      break;
    case "UPGRADE":
    case "upgrade":
    case "Upgrade":
      playerInfo.upgradeAttack();
      break;
    case "LEAVE":
    case "leave":
    case "Leave":
      alert("You Left");
      break;
  }
};

startGame();
