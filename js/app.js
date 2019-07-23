// resources: https://www.youtube.com/watch?v=XEVnMgYblGc&t=1351s (guided me through the project)

// Enemies our player must avoid
var Enemy = function(x, y, s) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.s = s; // speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + (this.s * dt);
  // if enemy goes off the board, then it resets the enemy with a diff speed
  if (this.x > 505) {
    this.x = -150;
    let newSpeed = Math.floor(((Math.random()*5)*100));
    this.s = newSpeed;
  }
  // if enemy bug touches player, the player is reset
  let bugLeft = this.x - 50;
  let bugRight = this.x + 50;
  let bugUp = this.y - 50;
  let bugDown = this.y + 50;
  if (bugLeft < player.x && bugRight > player.x && bugUp < player.y && bugDown > player.y) {
    player.reset();
    alert('You have been hit!');
    console.log('You have been hit!');
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 202;
  this.y = 404;
  this.h = 101; // horizontal steps of player
  this.v = 90; // vertical steps of player
};

// resets player to original position
Player.prototype.reset = function() {
  this.x = 202;
  this.y = 404;
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// moves player depending on key
Player.prototype.handleInput = function(key) {
  if (key == 'left') {
    // console.log('pressed left!');
    if (this.x >= this.h) {
      this.x -= this.h;
    }
    else {
      this.x = this.x; // player won't move left off the board
    }
  }
  else if (key == 'right') {
    if (this.x <= this.h*3) {
      // console.log('pressed right!');
      this.x += this.h;
    }
    else {
      this.x = this.x; // player won't move right off the board
    }
  }
  else if (key == 'up') {
    // console.log('pressed up!');
    this.y -= this.v;
    if (this.y < 0) {
      this.reset();
      alert('You win!');
    }
  }
  else if (key == 'down') {
    // console.log('pressed down!');
    if (this.y <= this.v*4) {
      this.y += this.v;
    }
    else {
      this.y = this.y; // player won't move off the top of the board
    }
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let enemy1 = new Enemy(-100, 60, Math.floor((Math.random()*5)*100));
let enemy2 = new Enemy(-100, 140, Math.floor((Math.random()*5)*100));
let enemy3 = new Enemy(-100, 220,Math.floor((Math.random()*5)*100));

let allEnemies = [enemy1, enemy2, enemy3];

let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  // console.log(allowedKeys[e.keyCode]);
  player.handleInput(allowedKeys[e.keyCode]);
});
