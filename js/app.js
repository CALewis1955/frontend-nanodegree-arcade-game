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
    if (this.x < 500) {
        this.x = this.x + this.speed;
    } else {
        this.x = 0;
        this.x = this.x + this.speed;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.

var allEnemies = [];
var numEnemies = 4;
for (var i = 0; i < numEnemies; i++) {
    var yOffset = 75;
    var xOffset = 50;
    var speedEnhancer = 2.5;
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
// Place all enemy objects in an array called allEnemies
/*
var allEnemies = [];
allEnemies.push(chris);
allEnemies.push(kim);
allEnemies.push(jack); 
*/
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
