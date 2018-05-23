// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';

    //Enemies speed - Math.random() based on:
    https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        //
        this.speed = Math.floor((Math.random() * 200) + 100);
};
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  if (this.x <= 505) {
      this.x = this.x + this.speed * dt;
  } else {
      this.x = -2;
  }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

    var own = this;

    if (this.direction === 'left' && this.x > 0) {
        this.x = this.x - 80;
    }
    if (this.direction === 'right' && this.x < 400) {
        this.x = this.x + 80;
    }
    if (this.direction === 'up' && this.y > 0) {
        this.y = this.y - 80;
    }
    if (this.direction === 'down' && this.y < 400) {
        this.y = this.y + 80;
    }

    this.direction = null;

    allEnemies.forEach(function(enemy) {
        if (own.x >= enemy.x - 35 && own.x <= enemy.x + 35) {
            if (own.y >= enemy.y - 35 && own.y <= enemy.y + 35) {
                own.reset();
            }
        }
    });
    if (this.y < 10) {
        this.reset();
    }

};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
    this.direction = e;
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
