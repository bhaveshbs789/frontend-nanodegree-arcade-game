// Enemies our player must avoid
/*var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = Math.random() * x;
    this.y = y + 55;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    // this.speed = Math.floor((Math.random) * 200);
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < (this.step * 5)){
    	this.x += this.speed * dt; // 
    } else {
    	this.x = -this.step; // the -this.step for setting the bug off-screen by one step ie 101px
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};*/

class Enemy {
	constructor(x,y,speed){
		this.x = Math.random() * x;
    	this.y = y + 55;
    	this.sprite = 'images/enemy-bug.png';
    	this.step = 101;
    	this.speed = speed;
	}

	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	update(dt){
		if(this.x < (this.step * 5)){
    		this.x += this.speed * dt; // 
    	} else {
    		this.x = -this.step; // the -this.step for setting the bug off-screen by one step ie 101px
   		}
	}
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
	constructor(){
		this.sprite = 'images/char-boy.png';
		this.step = 101; // canvas width is 505 and 5 blocks horizontally , so each block is 101 px wide ( refernec from Engine.js file )
		this.jump = 83; // canvas height is 606 and 6 blocks, so each bock would be 83 px tall ( refernec from Engine.js file )
		this.startX = this.step * 2;
		// this.startY = (this.jump * 5) - 20;		
		this.startY = (this.jump * 4) + 55;	//  the 55 is the same y value as that for the enemy
		this.x = this.startX; // initial location co-ordinates x and y
		this.y = this.startY; // initial location co-ordinates x and y
		this.winStatus = false; // Win status set to false initially
	}

	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	// @param {string} input
	handleInput(input){
		switch(input){
			case 'left':
				if(this.x > 0){
					this.x -= this.step; // the if condition to check if the x coordinate is greater than 0, then only move left
				}				
				break;
			case 'right':
				if(this.x < (this.step) * 4){
					this.x += this.step;
				}				
				break;
			case 'up':
				if(this.y > this.jump){
					this.y -= this.jump;
				}				
				break;
			case 'down':
				if(this.y < (this.jump) * 4){
					this.y += this.jump;
				}				
				break;
		}
	}

	// update method
	update(){
		for(let enemy of allEnemies){
			//console.log(enemy);
			if(this.y == enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)){
			// if(this.y == enemy.y){
				// console.log("Same row CRASH!!");
				// console.log(this.y + ' : y co-ordinate of player');
				// console.log(enemy.y + ' : y co-ordinate of enemy');
				//alert('CRASH!!!!');
				//alert('Enemy position : ' + enemy.x + ' Player Position : ' + this.x);
				// console.log(enemy);
				// console.log(this.x + ' ' + this.y)
				// call reset 
				//alert('collision!');
				this.reset();
			}
			//console.log(this.y, enemy.y);
			if(this.y == 55){
				// console.log("Win");
				this.winStatus = true;
			}
		}
	}

	reset(){
		this.x = this.startX;
		this.y = this.startY;
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let bugSpeed = Math.floor(Math.random() * 400);
let bug1Speed = Math.floor(Math.random() * 500);
let bug2Speed = Math.floor(Math.random() * 800);

const player = new Hero();
const bug = new Enemy(-101, 0, bugSpeed);
const bug1 = new Enemy(-101, 83, bug1Speed);
const bug2 = new Enemy((-101 * 2.5),(83 * 2),bug2Speed);

const allEnemies = [];
allEnemies.push(bug);
allEnemies.push(bug1);
allEnemies.push(bug2);
//console.log(allEnemies);

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
