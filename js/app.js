// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
 }
Enemy.prototype.x = 1;
Enemy.prototype.y = 75;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.speed = 0;
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    if ((this.x < screenWidth) && (this.x > 0)) {
        this.x = this.x + (this.speed * (1 + dt));
    } else {
        this.x = 0;
        this.x = this.x + (this.speed * (1 + dt));
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
}
var screenWidth = 505;
var screenHeight = 606;
var startingX = screenWidth/2 -50;
var startingY = screenHeight - 200;
Player.prototype.x = startingX;
Player.prototype.y = startingY;

// Draw method for player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.checkCollisions = function() {
    var len = allEnemies.length;
    for (var i = 0; i < len; i++) {
        if ((this.x > allEnemies[i].x) && (this.x <= allEnemies[i].x + 50)
            && (this.y > allEnemies[i].y - 50) && (this.y <= allEnemies[i].y + 50)) {
                this.x = startingX;           
              this.y = startingY;
           }
        }
    }

// Update method for player
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    this.checkCollisions();
    if (this.x < screenWidth && this.x > 0) {
        this.x = this.x;
    } else if (this.x < 0) {
        this.x = screenWidth;
    } else {
        this.x = 0;
        this.x = this.x;
    }
    if (this.y < 0) {
        this.y = 0;
    }
    if (this.y > startingY) {
        this.y = startingY;
    }
}

// Player handleInput() to move player
var step = 44;
Player.prototype.handleInput = function(dir) {
    if (dir == 'up') {   
        this.y = this.y - step;
    } 
    if (dir == 'down') {
        this.y = this.y + step;
    }
    if (dir == 'left') {
        this.x = this.x - step;
    }
    if (dir == 'right') {
        this.x = this.x + step;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var numEnemies = 4;
var speedEnhancer = 2.0;
var setEnemies = function() {
    for (var i = 0; i < numEnemies; i++) {
        var yOffset = 75;
        var xOffset = 50;
        var brickEdge = 175;
        allEnemies[i] = new Enemy();
        if (i >= 1) {
            if (allEnemies[i - 1].y > brickEdge) {
                allEnemies[i].y = yOffset;
                allEnemies[i].x = allEnemies[i - 1].x + xOffset; 
            } else {
                allEnemies[i].y = allEnemies[i - 1].y + yOffset;
            }
        } else {
            allEnemies[i].y = yOffset;
        }
    allEnemies[i].speed = Math.random() * speedEnhancer;
    }
}
// Place the player object in a variable called player
var player = new Player();
setEnemies();


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
