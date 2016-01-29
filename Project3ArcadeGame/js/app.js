/*
Game by: William Sisson 1/2016
Project 3 - Udacity Front End Developer Nanodegree
"Frogger Clone Game"
*/

//Generates a random number for speeds, starting points, etc.
var randomNumber = function (number1, number2) {
    return Math.floor(Math.random() * (number1 - number2) + number2);

};

// Enemies our player must avoid
var Enemy = function (id) {
    //Give each enemy a random starting x-axis position 
    this.x = randomNumber(50, 5);
    this.row = Math.floor(Math.random() * 3) + 1;
    this.id = id;

    switch (id) {
        case 1:
            this.y = 60;
            break;
        case 2:
            this.y = 140;
            break;
        case 3:
            this.y = 220;
            break;
    }

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var movement = randomNumber(200, 15);
    this.x += dt * movement;

    //Reset enemy positon
    if (this.x > 550) {
        this.resetPosition();
    }

    // check for a player collision
    if (this.row === player.row && this.collidedOnXAxis(this.x)) {
        player.y = 400;
        player.x = 205;
        player.row = 0;
        player.life--;
    }
};

// Function checks to see if player collides with enemy
Enemy.prototype.collidedOnXAxis = function (enemyXPosition) {
        var collided = false;
        var half = 50;
        var enemyRightXPosition = enemyXPosition + half;
        var enemyLeftXPosition = enemyXPosition - half;
        var playerRightXPosition = player.x + half;
        var playerLefttXPosition = player.x - half;
        if (enemyXPosition === player.x) {
            collided = true;
        }
        else if (playerRightXPosition > enemyLeftXPosition && playerLefttXPosition < enemyRightXPosition) {
            console.log(playerRightXPosition + "," + enemyLeftXPosition + "," + playerLefttXPosition + "," + enemyRightXPosition);
            collided = true;
        } else if (playerLefttXPosition < enemyRightXPosition && (playerRightXPosition > enemyRightXPosition)) {
            collided = true;
        }
        return collided;
};


//Resets Enemy's x-axis position to a random value. 
Enemy.prototype.resetPosition = function () {
    this.x = randomNumber(this.id * 75, this.id * 5);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player object
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.life = 3;
    this.row = 0;
};

// Player update
Player.prototype.update = function () {
    if (this.x > 442) {
        this.x = 5;
        this.y = this.y + 5;
    }
    if (this.x < 0) {
        this.x = 440;
    }
    
    // scoring update
    if (this.y < 0) {
        this.score = this.score + 500;
    }
    if (this.y > 400 || this.y < 0) {

        this.y = 400;
    }
};

//Render function draws objects on canvas
Player.prototype.render = function () {
    ctx.font = "18px Helvetica";
    ctx.clearRect(450, 10, 250, 25);
    ctx.fillText(this.score, 450, 30, 250);
    var imageObj = new Image();
    imageObj.src = 'images/diamond.png';
    ctx.clearRect(0, 0, 170, 50);

    for (i = 0; i < this.life; i++) {
        ctx.drawImage(imageObj, (i) * 45, 0, 50, 50);
    }

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.life < 1) {
        this.x = 3 * 101;
        this.y = 5 * 83;
        this.endGame();
    }

};

// End Game if lives are at 0
Player.prototype.endGame = function () {
    ctx.font = "25px Verdana";
    ctx.fillStyle = '#000';

    ctx.fillText("Sorry You Lose", 150, 295);
    ctx.drawImage(Resources.get('images/grass-block.png'), 3 * 101, 5 * 83);

};

// Function receives the keyboard input with the keyCode parameter 
// and decides if it is an arrow key
Player.prototype.handleInput = function (keyCode) {
    var xDelta = 50;
    var yDelta = 83;

    switch (keyCode) {
        case "left":
            this.x -= xDelta;
            if (this.x < 3) {
                this.x = 405;
            }
            break;

        case "right":
            this.x += xDelta;
            if (this.x > 415) {
                this.x = 3;
            }
            break;

        case "down":
            this.y += yDelta;
            break;

        case "up":
            this.y -= yDelta;
            break;
    }

    if (this.y < 317 && this.y > 68) {
        this.row = (this.y - 83) % 3;
    } else if (this.y === 68) {
        this.row = 3;
    } else {
        this.row = 0;
    }
    this.update();
};

//Instantiate enemies and player objects.
var allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3)];
var player = new Player(200, 400);

// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function a(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (player.life < 1) {
        document.removeEventListener("keyup", a);
    } else {
        player.handleInput(allowedKeys[e.keyCode]);
    }

});