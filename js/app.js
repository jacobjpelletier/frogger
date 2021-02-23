const tileHeight = 84;
const tileWidth = 101;

// Enemies our player must avoid
// Using Es6's class functionality
// See step 3 of step-wise guide.
class Enemy{
    constructor(lane) {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.speed = (200*(Math.random()*2.5));
        this.x = 0;
        this.y = ((lane*tileHeight)+42)-84; //-84 needed to keep the bugs out of the grass

    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += (this.speed * dt);
        if (this.x > 504) {
            this.x = 0;
        }
    }
    // Draw the enemy on the screen, required method for game
    render(){
        // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player{

    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 202;
        this.y = 380;
    }

    render(){
        // Draw the player on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(direction) {
        switch (direction) {
            case 'left':
                if (this.x > 0) {
                    this.x -= tileWidth;
                    this.update();
                    break;
                }
                if (this.x === 0) {
                    this.update();
                    break;
                }
            case 'right':
                if (this.x < 404) {
                    this.x += tileWidth;
                    this.update();
                    break;
                }
                if (this.x === 404) {
                    this.update();
                    break;
                }
            case 'up':
                if (this.y > 0) {
                    this.y -= tileHeight;
                    this.update();
                    // win condition
                    if (this.y < 0) {
                        alert("Nice Job! Resetting. . .")
                        setTimeout(() => {
                            this.reset();}, 100);
                    }
                    break;
                }
            case 'down':
                if (this.y < 318) {
                    this.y += tileHeight;
                    this.update();
                    break;
                }
                this.update();
                break;
            default:
                break;
        }
    }

    reset() {
        this.x = 202;
        this.y = 380;
    }

    update(dt) {
        for (const enemy of allEnemies){
            const enemyX = Math.round(enemy.x);
            const enemyY = Math.round(enemy.y);
            const playerX = Math.round(player.x);
            const playerY = Math.round(player.y);
            const differenceX = Math.abs(playerX - enemyX);
            const differenceY = Math.abs(playerY - enemyY);
            if (differenceX < 51 && differenceY < 42) {
                alert("You got hit! Restarting. . .");
                setTimeout(() => {
                    this.reset();}, 5);
            }
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3), new Enemy(4)];
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// comment out for step 2 uncomment for step 4
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        // passing
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
