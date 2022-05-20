var score = 0;
var gameOver = false;
class Block {
	constructor(y,x) {
		this.checkLine = function() {
			let arr = copyArr(placedBlocks.coords[0])
			let sortedArr = arr.sort();
			let t = 0;
			let c = sortedArr[0];
			console.log(arr);
			for (let i = 0; i < sortedArr.length; i++) {
				if (sortedArr[i] == c) {
					t++;
					//alert(t);
				}
				else {
					//alert('new');
					c = sortedArr[i];
					t = 0;
				}
				if (t == 10) {
					score += 1000;
					$('#score').html('Score: ' + score);
				}
			}
		}
		this.checkLeftRight = function() {
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
		this.checkStop = function() {
			let end = false;
			let yValsTried = [];
			if (this.coords[0][this.coords[0].length-1] >= 570) {
				return true;
			}
			//iterate through all individual blocks in the current piece sorted by y position
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
		this.fill = function() {
			if (this.colors == null) {
				ctx.fillStyle = this.color;
			}
			for (let i = 0; i < this.coords[0].length; i++) {
				if (this.colors != null) {
					ctx.fillStyle = this.colors[i];
				}
				ctx.fillRect(this.coords[1][i],this.coords[0][i],30,30);
			}
		}
		this.fall = function() {
			let next = this.checkStop();
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
		this.move = function(xChange,yChange,bypass) {
			let stop = false;
			if ((yChange != 0 && ! this.checkStop()) || (xChange != 0 && ! this.checkLeftRight()) || bypass) {
				for (let i = 0; i < this.coords[0].length; i++) {
					this.coords[1][i] += xChange;
					this.coords[0][i] += yChange;
				}
			}
			this.fill();
		}
		this.destroy = function() {
			this.coords = [[],[]];
			this.fill();
		}
	}
}
class IBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'aqua';
		this.coords = [[y,y,y,y],[x,x+30,x+60,x+90]];
	}
}
class TBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'purple';
		this.coords = [[y,y+30,y+30,y+30],[x+30,x,x+30,x+60]];
	}
}
class LBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'orange';
		this.coords = [[y,y+30,y+30,y+30],[x+60,x,x+30,x+60]];
	}
}
class JBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'blue';
		this.coords = [[y,y+30,y+30,y+30],[x,x,x+30,x+60]];
	}
}
class OBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'yellow';
		this.coords = [[y,y,y+30,y+30],[x,x+30,x,x+30]];
	}
}
class SBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'green';
		this.coords = [[y,y,y+30,y+30],[x+30,x+60,x,x+30]];
	}
}
class ZBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'red';
		this.coords = [[y,y,y+30,y+30],[x,x+30,x+30,x+60]];
	}
}
const numBlocks = 7;
var c = document.getElementById("game");
var ctx = c.getContext("2d");
var newBlock = false;
var newGroup = function() {
	let arr = [];
	let used = [];
	for (let i = 0; i < numBlocks; i++) {
		let move = false;
		let choice;
		while (!move){
			choice = Math.floor(Math.random() * numBlocks);
			if (!used.includes(choice)) {
				move = true;
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
		}
	}
	return arr;
}
var placedBlocks = new Block;
var group;
placedBlocks.coords = [
	[],
	[]
]
placedBlocks.colors = [];
var currentBlock;
var time = 0;
var move = true;
var groupIndex = 0;
let h = window.setInterval(() => {
	move = true;
	if (newBlock) {
		groupIndex++;
		if (groupIndex == numBlocks) {
			groupIndex = 0;
			group = newGroup();
			//console.log(currentBlock);
		}
		if (!gameOver) {
			currentBlock = group[groupIndex];
		}
		for (let i in currentBlock.coords[0]) {
			if (placedBlocks.coords[0].includes(currentBlock.coords[0][i]) && placedBlocks.coords[1].includes(currentBlock.coords[1][i])) {
				window.clearInterval(h);
				gameOver = true;
				var loseAudio = document.getElementById("loseAudio");
				themeAudio.pause();
				themeAudio.currentTime = 0;
				loseAudio.play();
				loseAudio.addEventListener("ended", e => {
					var endResultsAudio = document.getElementById("endResultsAudio");
					endResultsAudio.play();
					endResultsAudio.addEventListener("ended", function() {
						this.currentTime = 0;
						this.play();
					}, false);
				})
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
}, 500);
//up,down,left,right
var keysDown = [false,false,false,false];
$('#start').on('click', () => {
	group = newGroup();
	currentBlock = group[groupIndex];
	//console.log(currentBlock);
	setImage();
});
document.body.addEventListener("keydown", e => {
	if (e.key == "ArrowRight") {
		let a = copyArr(currentBlock.coords[1]).sort();
		if (a[a.length-1]<270) {
			currentBlock.move(30,0,false);
		}
	}
	if (e.key == "ArrowLeft") {
		let a = copyArr(currentBlock.coords[1]).sort();
		if (a[0]>0) {
			currentBlock.move(-30,0,false);
		}
	}
	if (e.key == "ArrowDown") {
		currentBlock.move(0,30,false);
	}
	if (e.key == " ") { 
		//570
		while (currentBlock.coords[0][currentBlock.coords[0].length-1] < 570) {
			if (! currentBlock.checkStop()) {
				for (let i = 0; i < currentBlock.coords[0].length; i++) {
					currentBlock.coords[0][i] += 30;
				}
			}
			else {
				break;
			}
		}
	}
})
function background() {
	let img = new Image();
	img.src = 'grid.png';
	img.onload = () => {
	  ctx.drawImage(img,0,0,300,600);
	}
}
function render(c){
	//c.clearRect(0,0,600,600)
	background();
	placedBlocks.fill();
}
var then = 0;
function setImage(){
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");
	var now = Date.now();
	var delta = now-then;
	render(ctx);
	update(delta/1000);
  
	then = now;
  
	requestAnimationFrame(setImage);
}
addEventListener("keydown", e => {
	
})
function update(modifier) {
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

function copyArr(arr) {
	let f = [];
	for (let i = 0; i < arr.length; i++) {
		f.push(arr[i]);
	}
	return f;
}