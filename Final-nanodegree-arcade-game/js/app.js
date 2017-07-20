var allEnemies = [];
// Enemies our player must avoid
var Enemy = function( x , y , speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x  += this.speed * dt;
    if (this.x > 505){
      this.x = 0;
    }

    checkCollisions(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function( x , y , speed){
  this.x=x;
  this.y=y;
  this.speed=speed;
  this.sprite="images/char-boy.png";
};
//update()
Player.prototype.update = function(){

}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel);

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
};

//displayScoreLevel
var displayScoreLevel = function( score , level){
  var canvas = document.getElementsByTagName('canvas');
   var firstCanvasTag = canvas[0];
   scoreLevelDiv.innerHTML = 'Score: ' + score + ' / ' + 'Level: ' + level;
   document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var checkCollisions = function(anEnemy){
  //target
  if (player.y + 63 <= 0) {
       player.x = 202.5;
       player.y = 390;
       console.log('ya you made it!');

       ctx.fillStyle = 'yellow';
       ctx.fillRect(0, 0, 505, 53);

        score += 1;
        gameLevel += 1;
        console.log('current score: ' + score + ', current level: ' + gameLevel);
        increaseDifficulty(score);
   }

  //collision between enemy and player
  if (player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
    console.log("collision");
    player.x = 202.5;
    player.y = 390;
  }
 // boundary for player
 if (player.y > 390 ) {
       player.y = 390;
   }
   if (player.x > 402.5) {
       player.x = 402.5;
   }
   if (player.x < 2.5) {
       player.x = 2.5;
   }
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;
    //new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
    }
};

var player = new Player(202.5, 390, 50);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});
