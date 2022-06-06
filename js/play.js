class Block {
	/**
	 * Creates a Tetris game piece
	 * @param {number} y Starting y position of the piece
	 * @param {number} x Starting x position of the piece
	 */
	constructor(y,x) {
		this.canRotate = true;
		this.y = y;
		this.x = x;
		this.rotI = 0;
		
		/**
		 * Checks whether new completed lines are present in the Block object
		 */
		this.checkLine = function() {
			window.clearInterval(gameInterval);
			startInterval();
			let l = 0;
			for (let i = bottom; i > 0; i-=30) {
				let o = getOccurrence(placedBlocks.coords[0],i);
				if (o == width/30) {
					l++;
					let gv = getVals(placedBlocks.coords[0],i);
					for (let j in gv) {
						placedBlocks.coords[0].splice(gv[j],1);
						placedBlocks.coords[1].splice(gv[j],1);
						placedBlocks.colors.splice(gv[j],1);
					}
					for (let j in placedBlocks.coords[0]) {
						if (placedBlocks.coords[0][j] < i) {
							placedBlocks.coords[0][j]+=30;
						}
					}
					i+=30;
				}
				else if (o == 0) {
					break;
				}
			}
			linesCleared += l;
			score += scoring[l]*level;
			if (linesCleared != 0 && Math.floor(linesCleared/10) > (level-1) && level < 25) {
				level++;
				speed -= 20;
			}
			if (l == 4 && fx) {
				tetrisAudio.play();
			}
			else if (l > 0 && fx) {
				lineClearAudio.play();
			}
		}

		/**
		 * Checks whether you can move the Block object left or right
		 * @param {boolean} left True if the block is being moved left, false for right
		 * @returns {boolean} Whether the move is legal
		 */
		this.checkLeftRight = function(left) {
			let a = copyArr(currentBlock.coords[1]).sort();
			if ((a[a.length-1]>right && !left)|| (a[0] < 1 && left)) {
				return true;
			}
			let end = false;
			let xValsTried = [];
			for (let i = 0; i < this.coords[1].length; i++) {
				let iO = [];
				for (let j = 0; j < placedBlocks.coords[1].length; j++) {
					if (placedBlocks.coords[1][j] == this.coords[1][i]+30 || placedBlocks.coords[1][j] == this.coords[1][i]-30) {
						iO.push(placedBlocks.coords[0][j]);
					}
				}
				let br = false;
				if (! xValsTried.includes(this.coords[1][i])) {
					xValsTried.push(this.coords[1][i]);
				}
				else {
					continue;
				}
				if (iO.length != 0) {
					let toCheck = [];
					for (let j = 0; j < this.coords[1].length; j++) {
						if (this.coords[1][j] == this.coords[1][i]) {
							toCheck.push(this.coords[0][j]);
						}
					}
					for (let j = 0; j < iO.length; j++) {
						if (toCheck.includes(iO[j])) {
							end = true;
							br = true;
							break;
						}
					}
				}
				if (br) {
					break;
				}
			}
			return end;
		}

		this.checkRotation = function(arr) {
			for (let i in arr[0]) {
				if (arr[0][i] > bottom || arr[0][i] < 0) return false;
				for (let j in arr[1]) {
					if (i == 0 && (arr[1][j] > right+2 || arr[1][j] < 0)) return false;
					if (placedBlocks.coords[0].includes(arr[0][i]) && placedBlocks.coords[1].includes(arr[1][j])) {
						return false;
					}
				}
			}
			return true;
		}

		/**
		 * Checks whether the Block object should stop moving down
		 * @returns {boolean} Whether the block should stop moving down
		 */
		this.checkStop = function() {
			let end = false;
			let yValsTried = [];
			if (this.coords[0][this.coords[0].length-1] >= bottom) {
				return true;
			}
			//Iterate through all individual blocks in the current piece sorted by y position
			for (let i = 0; i < this.coords[0].length; i++) {
				let iO = [];
				//Find all placed blocks that are directly below the current individual block
				//And add those pieces' x values to the iO array.
				for (let j = 0; j < placedBlocks.coords[0].length; j++) {
					if (placedBlocks.coords[0][j] == this.coords[0][i]+30) {
						iO.push(placedBlocks.coords[1][j]);
					}
				}
				let br = false;
				//Skip the current block in the tetris piece if the y value has already been tried.
				if (! yValsTried.includes(this.coords[0][i])) {
					yValsTried.push(this.coords[0][i]);
				}
				else {
					continue;
				}
				if (iO.length != 0) {
					//Find all blocks in the current piece that should be checked
					//Because they have the same y value as the original piece being checked
					//And add those pieces' x values to the toCheck array
					let toCheck = [];
					for (let j = 0; j < this.coords[0].length; j++) {
						if (this.coords[0][j] == this.coords[0][i]) {
							toCheck.push(this.coords[1][j]);
						}
					}
					//Checks if the x values in toCheck have a match with the x values in iO
					//If so, the piece needs to stop.
					for (let j = 0; j < iO.length; j++) {
						if (toCheck.includes(iO[j])) {
							end = true;
							br = true;
							break;
						}
					}
				}
				if (br) {
					break;
				}
			}
			return end;
		}

		/**
		 * Draws and fills the Block object its specified color on the canvas
		 */
		this.fill = function() {
			if (this.colors == null) {
				ctx.fillStyle = this.color;
			}
			//If this is the placedblocks object, iterate through all colors and fill accordingly
			for (let i = 0; i < this.coords[0].length; i++) {
				if (this.colors != null) {
					ctx.fillStyle = this.colors[i];
				}
				ctx.fillRect(this.coords[1][i],this.coords[0][i],30,30);
			}
		}

		/**
		 * Moves the block down 1 row
		 */
		this.fall = function() {
			let next = this.checkStop();
			//If the block is done falling, add it to the placed blocks object
			if (next){
				for (let j = 0; j < this.coords[0].length; j++) {
					placedBlocks.coords[0].push(this.coords[0][j]);
					placedBlocks.coords[1].push(this.coords[1][j]);
					placedBlocks.colors.push(this.color);
				}
				placedBlocks.fill();
				placedBlocks.checkLine();
				newBlock = true;
			}
			else {
				this.move(0,30,false);
				this.fill();
			}
		}

		/**
		 * Moves the Block object a specified direction
		 * @param {number} xChange How much to move the block in the x direction
		 * @param {number} yChange HOw much to move the block in the y direction
		 * @param {boolean} bypass Whether to skip checking whether the move is legal
		 */
		this.move = function(xChange,yChange,bypass) {
			this.x += xChange;
			this.y += yChange;
			if ((yChange != 0 && ! this.checkStop()) || (xChange != 0 && ! this.checkLeftRight(xChange < 0)) || bypass) {
				for (let i = 0; i < this.coords[0].length; i++) {
					this.coords[1][i] += xChange;
					this.coords[0][i] += yChange;
				}
			}
			this.fill();
		}

		/**
		 * Rotates the Block object
		 */
		this.rotate = function() {
			if (this.canRotate) {
				this.setRotation(this.y,this.x);
				if (this.checkRotation(copyArr(this.rotations[this.rotI]))) {
					this.changeRotation(this.y,this.x);
				}
			}
		}

		/**
		 * Deletes a block
		 */
		this.destroy = function() {
			this.coords = [[],[]];
			this.fill();
		}
	}
}

/**
* Creates a new I block
* @param {number} y Starting y position of the piece
* @param {number} x Starting x position of the piece
*/
class IBlock extends Block{
	constructor(y,x) {
		//Call the superclass
		super(y,x);
		this.color = 'aqua';
		//Each rotation's coordinates
		this.rotations = [[[y+30,y+30,y+30,y+30],[x,x+30,x+60,x+90]], [[y,y+30,y+60,y+90],[x+60,x+60,x+60,x+60]], [[y+60,y+60,y+60,y+60],[x,x+30,x+60,x+90]], [[y,y+30,y+60,y+90],[x+30,x+30,x+30,x+30]]];
		//Sets up the variable containing the current coordinates of the block
		this.coords = this.rotations[this.rotI];
		/**
		 * Updates the position of the block's next rotations
		 * @param {number} y Current y position
		 * @param {number} x Current x position
		 */
		this.setRotation = function(y,x) {
			this.rotations = [[[y+30,y+30,y+30,y+30],[x,x+30,x+60,x+90]], [[y,y+30,y+60,y+90],[x+60,x+60,x+60,x+60]], [[y+60,y+60,y+60,y+60],[x,x+30,x+60,x+90]], [[y,y+30,y+60,y+90],[x+30,x+30,x+30,x+30]]];
		}
		/**
		 * Switches block to the next rotation
		 * @param {number} y Current y position
		 * @param {number} x Current x position
		 */
		this.changeRotation = function(y,x) {
			this.setRotation(y,x);
			this.coords = this.rotations[this.rotI];
			this.rotI++;
			if (this.rotI == this.rotations.length) {
				this.rotI = 0;
			}
		}
		//Initialize the block to the first rotation
		this.changeRotation(y,x);
	}
}

/**
* Creates a new T block
* @param {number} y Starting y position of the piece
* @param {number} x Starting x position of the piece
*/
class TBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'purple';
		this.rotations = [[[y,y+30,y+30,y+30],[x+30,x,x+30,x+60]], [[y,y+30,y+30,y+60],[x+30,x+30,x+60,x+30]], [[y+30,y+30,y+30,y+60],[x,x+30,x+60,x+30]], [[y,y+30,y+30,y+60],[x+30,x,x+30,x+30]]];
		this.coords = this.rotations[this.rotI];
		this.setRotation = function(y,x) {
			this.rotations = [[[y,y+30,y+30,y+30],[x+30,x,x+30,x+60]], [[y,y+30,y+30,y+60],[x+30,x+30,x+60,x+30]], [[y+30,y+30,y+30,y+60],[x,x+30,x+60,x+30]], [[y,y+30,y+30,y+60],[x+30,x,x+30,x+30]]];
		}
		this.changeRotation = function(y,x) {
			this.setRotation(y,x);
			this.coords = this.rotations[this.rotI];
			this.rotI++;
			if (this.rotI == this.rotations.length) {
				this.rotI = 0;
			}
		}
		this.changeRotation(y,x);
	}
}

/**
* Creates a new L block
* @param {number} y Starting y position of the piece
* @param {number} x Starting x position of the piece
*/
class LBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'orange';
		this.rotations = [[[y,y+30,y+30,y+30],[x+60,x,x+30,x+60]], [[y,y+30,y+60,y+60],[x+30,x+30,x+30,x+60]], [[y+30,y+30,y+30,y+60],[x,x+30,x+60,x]], [[y,y,y+30,y+60],[x,x+30,x+30,x+30]]];
		this.coords = this.rotations[this.rotI];
		this.setRotation = function(y,x) {
			this.rotations = [[[y,y+30,y+30,y+30],[x+60,x,x+30,x+60]], [[y,y+30,y+60,y+60],[x+30,x+30,x+30,x+60]], [[y+30,y+30,y+30,y+60],[x,x+30,x+60,x]], [[y,y,y+30,y+60],[x,x+30,x+30,x+30]]];
		}
		this.changeRotation = function(y,x) {
			this.setRotation(y,x);
			this.coords = this.rotations[this.rotI];
			this.rotI++;
			if (this.rotI == this.rotations.length) {
				this.rotI = 0;
			}
		}
		this.changeRotation(y,x);
	}
}

/**
* Creates a new J block
* @param {number} y Starting y position of the piece
* @param {number} x Starting x position of the piece
*/
class JBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'blue';
		this.rotations = [[[y,y+30,y+30,y+30],[x,x,x+30,x+60]], [[y,y,y+30,y+60],[x+30,x+60,x+30,x+30]], [[y+30,y+30,y+30,y+60],[x,x+30,x+60,x+60]], [[y,y+30,y+60,y+60],[x+30,x+30,x,x+30]]];
		this.coords = this.rotations[this.rotI];
		this.setRotation = function(y,x) {
			this.rotations = [[[y,y+30,y+30,y+30],[x,x,x+30,x+60]], [[y,y,y+30,y+60],[x,x+30,x,x]], [[y,y,y,y+30],[x,x+30,x+60,x+60]], [[y,y+30,y+60,y+60],[x+30,x+30,x,x+30]]];
		}
		this.changeRotation = function(y,x) {
			this.setRotation(y,x);
			this.coords = this.rotations[this.rotI];
			this.rotI++;
			if (this.rotI == this.rotations.length) {
				this.rotI = 0;
			}
		}
		this.changeRotation(y,x);
	}
}

/**
* Creates a new O block
* @param {number} y Starting y position of the piece
* @param {number} x Starting x position of the piece
*/
class OBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'yellow';
		this.coords = [[y,y,y+30,y+30],[x,x+30,x,x+30]];
		this.changeRotation = function(y,x) {
		}
	}
}

/**
* Creates a new S block
* @param {number} y Starting y position of the piece
* @param {number} x Starting x position of the piece
*/
class SBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'green';
		this.rotations = [[[y,y,y+30,y+30],[x+30,x+60,x,x+30]], [[y,y+30,y+30,y+60],[x+30,x+30,x+60,x+60]], [[y+30,y+30,y+60,y+60],[x+30,x+60,x,x+30]], [[y,y+30,y+30,y+60],[x,x,x+30,x+30]]];
		this.coords = this.rotations[this.rotI];
		this.setRotation = function(y,x) {
			this.rotations = [[[y,y,y+30,y+30],[x+30,x+60,x,x+30]], [[y,y+30,y+30,y+60],[x+30,x+30,x+60,x+60]], [[y+30,y+30,y+60,y+60],[x+30,x+60,x,x+30]], [[y,y+30,y+30,y+60],[x,x,x+30,x+30]]];
		}
		this.changeRotation = function(y,x) {
			this.setRotation(y,x);
			this.coords = this.rotations[this.rotI];
			this.rotI++;
			if (this.rotI == this.rotations.length) {
				this.rotI = 0;
			}
		}
		this.changeRotation(y,x);
	}
}

/**
* Creates a new Z block
* @param {number} y Starting y position of the piece
* @param {number} x Starting x position of the piece
*/
class ZBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'red';
		this.rotations = [[[y,y,y+30,y+30],[x,x+30,x+30,x+60]], [[y,y+30,y+30,y+60],[x+60,x+60,x+30,x+30]], [[y+30,y+30,y+60,y+60],[x,x+30,x+30,x+60]], [[y,y+30,y+30,y+60],[x+30,x+30,x,x]]];
		this.coords = this.rotations[this.rotI];
		this.setRotation = function(y,x) {
			this.rotations = [[[y,y,y+30,y+30],[x,x+30,x+30,x+60]], [[y,y+30,y+30,y+60],[x+60,x+60,x+30,x+30]], [[y+30,y+30,y+60,y+60],[x,x+30,x+30,x+60]], [[y,y+30,y+30,y+60],[x+30,x+30,x,x]]];
		}
		this.changeRotation = function(y,x) {
			this.setRotation(y,x);
			this.coords = this.rotations[this.rotI];
			this.rotI++;
			if (this.rotI == this.rotations.length) {
				this.rotI = 0;
			}
		}
		this.changeRotation(y,x);
	}
}

class CustomBlock extends Block{
	constructor(y,x,data,color) {
		super(y,x);
		this.color = color;
		this.rotations = [[[],[]],[[],[]],[[],[]],[[],[]]];
		for (let i in data) {
			for (let j in data[i]) {
				for (let k in data[i][j]) {
					if (j == 0) {
						this.rotations[i][j].push(y+data[i][j][k]);
					}
					else {
						this.rotations[i][j].push(x+data[i][j][k]);
					}
				}
			}
		}
		this.coords = this.rotations[this.rotI];
		this.setRotation = function(y,x) {
			this.rotations = [[[],[]],[[],[]],[[],[]],[[],[]]];
			for (let i in data) {
				for (let j in data[i]) {
					for (let k in data[i][j]) {
						if (j == 0) {
							this.rotations[i][j].push(y+data[i][j][k]);
						}
						else {
							this.rotations[i][j].push(x+data[i][j][k]);
						}
					}
				}
			}
		}
		this.changeRotation = function(y,x) {
			this.setRotation(y,x);
			this.coords = this.rotations[this.rotI];
			this.rotI++;
			if (this.rotI == this.rotations.length) {
				this.rotI = 0;
			}
		}
		this.changeRotation(y,x);
	}
}

//Define the canvas
const c = document.getElementById("game");
const ctx = c.getContext("2d");
//How many different types of tetris blocks there are available
var numBlocks = 7;
//How much each number of lines should be multiplied by when scoring
const scoring = [0,100,300,500,800];
//Audio
const dropAudio = document.getElementById("dropAudio");
const lineClearAudio = document.getElementById("lineClearAudio");
const tetrisAudio = document.getElementById("tetrisAudio");
//Up, down, left, right
var keysDown = [false,false,false,false];
//Master game interval
var gameInterval;
//Whether a new block should be created on this frame
var newBlock = false;
//Game stats
var score = 0;
//var level = 1;
var speed = 500;
var linesCleared = 0;
var bottom = 570;
var right = 269;
var gameOver = false;
//True if a block has already been moved in the current frame
var move = true;
//What position the current block is in the current group
var groupIndex = 0;
//Stores all the blocks in the current group
var group;
//Stores the block currently being played
var currentBlock;

var allData = [];
var dataa = [];
//Initialize the Block object storing all of the placed blocks
var placedBlocks = new Block;
placedBlocks.coords = [
	[],
	[]
]
placedBlocks.colors = [];


//FUNCTIONS

/**
 * Gets how many times a value appears in an array
 * 
 * @param {Array} array Array to search
 * @param {*} value Value to search for
 * @returns {number} Times value appears in array
 */
const getOccurrence = function(array, value) {
    return array.filter((v) => (v === value)).length;
}

/**
 * Gets all indices a value appears in an array (and anticipates each of these indices being deleted)
 * 
 * @param {Array} array Array to search
 * @param {*} value Value to search for
 * @returns {Array} Array containing all indices of value in array
 */
const getVals = function(array, value) {
	let finalArr = [];
	for (let i in array) {
		if (array[i] == value) {
			finalArr.push(i-finalArr.length);
		}
	}
	return finalArr;
}

/**
 * Creates a new set of random Tetris blocks
 * 
 * @returns {Array} New set of random Tetris blocks
 */
const newGroup = function() {
	let arr = [];
	let used = [];
	for (let i = 0; i < numBlocks; i++) {
		let blockWorks = false;
		let choice;
		while (!blockWorks){
			choice = Math.floor(Math.random() * numBlocks);
			if (!used.includes(choice)) {
				blockWorks = true;
			}
		}
		used.push(choice);
		switch (choice) {
			case 0:
				arr.push(new IBlock(0,90));
				break;
			case 1:
				arr.push(new LBlock(0,90));
				break;
			case 2:
				arr.push(new JBlock(0,90));
				break;
			case 3:
				arr.push(new OBlock(0,120));
				break;
			case 4:
				arr.push(new SBlock(0,90));
				break;
			case 5:
				arr.push(new TBlock(0,90));
				break;
			case 6:
				arr.push(new ZBlock(0,90));
				break;
			default:
				arr.push(new CustomBlock(0,0,allData[choice-7]),dataa[choice-7]);
				break;
		}
	}
	return arr;
}

/**
 * Creates a new Tetris game checker interval in order to update the speed
 */
const startInterval = function() {
	gameInterval = window.setInterval(() => {
		//Update the stat labels
		$('#level').html('Level: ' + level);
		$('#linesCleared').html('Lines Cleared: ' + linesCleared);
		$('#score').html('Score: ' + score);
		move = true;
		//If a new block should be created on this frame, move up in the group
		if (newBlock) {
			groupIndex++;
			//Create a new group if the old one has been used up
			if (groupIndex == numBlocks) {
				groupIndex = 0;
				group = newGroup();
			}
			if (!gameOver) {
				currentBlock = group[groupIndex];
			}
			//Check whether the game is over
			for (let i in currentBlock.coords[0]) {
				if (placedBlocks.coords[0].includes(currentBlock.coords[0][i]) && placedBlocks.coords[1].includes(currentBlock.coords[1][i])) {
					//If the game is over, clear the screen and play the lose audio
					window.clearInterval(gameInterval);
					gameOver = true;
					var loseAudio = document.getElementById("loseAudio");
					themeAudio.pause();
					themeAudio.currentTime = 0;
					if (music) {
						loseAudio.play();
						loseAudio.addEventListener("ended", e => {
							var endResultsAudio = document.getElementById("endResultsAudio");
							endResultsAudio.play();
							endResultsAudio.addEventListener("ended", function() {
								this.currentTime = 0;
								this.play();
							}, false);
						})
					}
					currentBlock.destroy();
					let j = 0;
					let clearScreen = window.setInterval(() => {
						j++;
						placedBlocks.move(0,240,true);
						if (j == 5) {
							window.clearInterval(clearScreen);
						}
					},100);
					for (let k = 0; k < 20; k++) {
						for (let j in placedBlocks) {
							placedBlocks.coords[0][j] += 30;
							placedBlocks.fill();
						}
					}
				}
			}
			newBlock = false;
		}
	}, speed);
}

/**
 * Draws the background of the game canvas
 */
const background = function() {
	let img = new Image();
	img.src = 'grid.png';
	img.onload = () => {
	  ctx.drawImage(img,0,0,1200,2400);
	}
}

/**
 * Renders the background and the currently placed blocks in the game
 */
const render = function(c){
	background();
	placedBlocks.fill();
}

/**
 * Constantly renders and updates the game canvas
 */
const setImage = function(){
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");
	render(ctx);
	update();
	requestAnimationFrame(setImage);
}

/**
 * Draws the necessary blocks to the game canvas
 */
const update = function() {
	if (move) {
		currentBlock.fall();
		move = false;
	}
	else {
		currentBlock.fill();
	}
	for (let i = 0; i < placedBlocks.length; i++) {
		placedBlocks[i].fill();
	}
}

/**
 * Creates a complete copy of an array
 * 
 * @param {Array} arr Array to copy
 * @returns {Array} Copied version of arr
 */
const copyArr = function(arr) {
	let f = [];
	for (let i = 0; i < arr.length; i++) {
		f.push(arr[i]);
	}
	return f;
}


//INITIALIZE GAME
$('#startGame').on('click', () => {
	level = $('#levelSelect').val();
	height = $('#heightIn').val(); 
	width = $('#widthIn').val();
	bottom -= (600-height);
	right -= (300-width);
	document.getElementById("game").height = height;
	document.getElementById("game").width = width;
	for (let i = 1; i < level; i++) {
		speed -= 20;
	}
	fetch('savedBlocks.json?nocache=' + new Date().getTime()).then(response => response.text()).then(text => {
        let data = JSON.parse(text);
		if (typeof data[localStorage.getItem('userCode')] !== 'undefined') {
			for (let i in data[localStorage.getItem('userCode')].blockIDs) {
				let id = data[localStorage.getItem('userCode')].blockIDs[i];
				let isChecked = document.getElementById(id).checked;
				if (isChecked) {
					numBlocks++;
					dataa.push('#'+data[localStorage.getItem('userCode')].colors[i]);
					allData.push(data[localStorage.getItem('userCode')].blocks[i]);
				}
			}
		}
		$('#settings').hide();
		$('#gameStuff').show();
		let themeAudio = document.getElementById('themeAudio');
		if (music) {
			themeAudio.play();
			themeAudio.addEventListener("ended", function() {
				this.currentTime = 0;
				this.play();
			}, false);
		}
		group = newGroup();
		currentBlock = group[groupIndex];
		setImage();
		startInterval();
	});
});


//EVENT HANDLERS
document.body.addEventListener("keydown", e => {
	if (e.key == mapsArr[2]) {
		currentBlock.move(30,0,false);
	}
	if (e.key == mapsArr[1]) {
		currentBlock.move(-30,0,false);
	}
	if (e.key == mapsArr[3]) {
		score += 1;
		currentBlock.move(0,30,false);
	}
	if (e.key == mapsArr[0]) {
		currentBlock.rotate();
	}
	if (e.key == mapsArr[4]) { 
		currentBlock.canRotate = false;
		if (fx) {
			dropAudio.play();
		}
		let toScore = 0;
		while (currentBlock.coords[0][currentBlock.coords[0].length-1] < bottom) {
			if (! currentBlock.checkStop()) {
				toScore += 2;
				for (let i = 0; i < currentBlock.coords[0].length; i++) {
					currentBlock.coords[0][i] += 30;
				}
			}
			else {
				score += toScore;
				break;
			}
		}
	}
})