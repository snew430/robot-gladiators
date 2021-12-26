// Game States
// "WIN" - Player robot has defeated all enemy bots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// RANDOM NUMBER GENERATOR WITH MIN AND MAX VALUES
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

// GET NAME FUNCTION
var getPlayerName = function () {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
};

// PLAYER INFO OBJECT
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },

  // REFILL HEALTH
  refillHealth: function () {
    if (this.money >= 7) {
      alert(
        "Refilling player's health by 20 for 7 dollars. You now have " +
          playerInfo.money +
          " dollars left."
      );
      this.health += 20;
      this.money -= 7;
    } else {
      alert("You do not have enough money!");
    }
  },

  // UPGRADE ATTACK
  upgradeAttack: function () {
    if (this.money >= 7) {
      alert(
        "Refilling player's health by 20 for 7 dollars. You now have " +
          playerInfo.money +
          " dollars left."
      );
      this.attack += 6;
      this.money -= 7;
    } else {
      alert("You do not have enough money!");
    }
  },
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

// FIGHT OR SKIP FUNCTION
var fightOrSkip = function () {
  var promptFight = prompt(
    "Would you like to FIGHT or SKIP this battle?  Enter 'FIGHT' or 'SKIP' to choose"
  );
  promptFight = promptFight.toLowerCase();

  if (promptFight === "skip") {
    var confirmSkip = confirm("Are you sure you'd like to quit?");
    if (confirmSkip) {
      alert(playerInfo.name + " has decided to skip this fight.  Goodbye!");
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      return true;
    }
  } else if (promptFight === "fight") {
    return false;
  } else {
    alert("You need to provide a valid answer! Please try again...");
    return fightOrSkip();
  }
};

// FIGHT FUNCTION
var fight = function (enemy) {
  // Keep track of who goes first
  var isPlayerTurn = true;
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      if (fightOrSkip()) {
        break;
      }
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
        alert(enemy.name + " still has " + enemy.health + " health left.");
      }
    } else {
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
    }
    isPlayerTurn = !isPlayerTurn;
  }
};

// START GAME FUNCTION
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

// END GAME FUNCTION
var endGame = function () {
  alert("The game has now ended.  Let's see how you did!");
  var highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  }
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(
      playerInfo.name + " now has the high score of " + playerInfo.money + "!"
    );
  } else {
    alert(
      playerInfo.name +
        " did not beat the high score of " +
        highScore +
        ". Maybe next time!"
    );
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

// SHOP FUNCTION
var shop = function () {
  // ask player what they would like to do
  var shopOptionPrompt = prompt(
    "You currently have " +
      playerInfo.money +
      " dollars. Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store?  Enter 1 to REFILL, 2 for UPGRADE, or 3 to LEAVE"
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      alert("You left the store");
      break;
    default:
      alert("You did not pick a valid option. Try again");
      shop();
      break;
  }
};

startGame();
