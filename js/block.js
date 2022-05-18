var score = 0;
class Block {
	constructor(y,x) {
		this.checkLine = function() {
			let arr = [];
			for (let i = 0; i < this.coords[0].length; i++) {
				arr.push(this.coords[0][i]);
			}
			let sortedArr = arr.sort();
			let t = 0;
			let c = sortedArr[0];
			for (let i = 0; i < sortedArr.length; i++) {
				if (sortedArr[i] == c) {
					t++;
				}
				else {
					c = sortedArr[i];
					t = 0;
				}
				if (t == 10) {
					score += 1000;
					$('#score').html('Score: ' + score);
				}
			}
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
			let next = false;
			if (this.coords[0][this.coords[0].length-1] <= 540) {
				if (1 == 1) {
					for (let i = 0; i < this.coords[0].length; i++) {
						let iO = placedBlocks.coords[0].indexOf(this.coords[0][i]+60);
						if (iO != -1) {
							let iO2 = placedBlocks.coords[1].indexOf(this.coords[1][i]);
							if (placedBlocks.coords[0][iO2] == this.coords[0][i]+60) {
								next = true;
							}
						}
						this.coords[0][i] += 30;
					}
				}
			}
			else {
				next = true;
			}
			if (next){
				let placed = false;
				for (let j = 0; j < this.coords[0].length; j++) {
					for (let i = 0; i < placedBlocks.coords[0].length;i++) {
						if (placedBlocks.coords[0][i] < this.coords[0][this.coords[0].length]) {
							placed = true;
							placedBlocks.coords[0].splice(i-1,0,this.coords[0][j]);
							placedBlocks.coords[1].splice(i-1,0,this.coords[1][j]);
						}
					}
				}
				if (!placed) {
					placed = true;
					for (let j = 0; j < this.coords[0].length; j++) {
						placedBlocks.coords[0].push(this.coords[0][j]);
						placedBlocks.coords[1].push(this.coords[1][j]);
						placedBlocks.colors.push(this.color);
					}
				}
				//console.log(placedBlocks);
				placedBlocks.fill();
				placedBlocks.checkLine();
				newBlock = true;
			}
			this.fill();
		}
		this.move = function(xChange,yChange) {
			let stop = false;
			if (yChange != 0) {
				if (placedBlocks.coords[0].includes(currentBlock.coords[0][currentBlock.coords[0].length-1]+30)) {
					let arr1 = [];
					let arr2 = [];
					//Goes through all x values of current block and adds their lowest y value to arr1
					for (let i = 0; i < currentBlock.coords[1].length; i++) {
						let insert = true;
						for (let j = 0; j < arr1.length; j++) {
							if (arr1[j][0] == currentBlock.coords[1][i] && currentBlock.coords[1][i] > arr1[j][1]) {
								arr1[j][1] = currentBlock.coords[1][i];
							}
						}
						if (insert) {
							arr1.push([currentBlock.coords[1][i],currentBlock.coords[0][i]]);
						}
					}
					//Goes through all x values of placed blocks and adds their highest y value to arr1
					for (let i = 0; i < placedBlocks.coords[0].length; i++) {
						let insert = true;
						for (let j = 0; j < arr2.length; j++) {
							if (arr2[j][0] == placedBlocks.coords[1][i] && placedBlocks.coords[1][i] < arr2[j][1]) {
								arr2[j][1] = placedBlocks.coords[1][i];
							}
						}
						if (insert) {
							arr2.push([placedBlocks.coords[1][i],placedBlocks.coords[0][i]]);
						}
					}
					for (let i in arr2) {
						for (let j in arr1) {
							if (arr1[j][0] == arr2[i][0] && (arr1[j][1] + 30) == arr2[i][1]) {
								stop = true;
							}
						}
					}
				}
			}
			if (this.coords[0][this.coords[0].length-1] <= 540 && ! stop) {
				for (let i = 0; i < this.coords[0].length; i++) {
					this.coords[1][i] += xChange;
					this.coords[0][i] += yChange;
				}
			}
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
			console.log(currentBlock);
		}
		currentBlock = group[groupIndex];
		for (let i in currentBlock.coords[0]) {
			console.log(currentBlock.coords);
			console.log(placedBlocks.coords);
			if (placedBlocks.coords[0].includes(currentBlock.coords[0][i]) && placedBlocks.coords[1].includes(currentBlock.coords[1][i])) {
				window.clearInterval(h);
				var loseAudio = document.getElementById("loseAudio");
				audio.muted = true;
				loseAudio.play();
				loseAudio.onpause(() => {
					var endResults = document.getElementById("endResults");
					endResults.play();
				})
				for (let k = 0; k < 20; k++) {
					for (let j in placedBlocks) {
						//alert('You Lose.');
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
	console.log(currentBlock);
	setImage();
});
document.body.addEventListener("keydown", e => {
	if (e.key == "ArrowRight") {
		let a = copyArr(currentBlock.coords[1]).sort();
		if (a[a.length-1]<270) {
			currentBlock.move(30,0);
		}
	}
	if (e.key == "ArrowLeft") {
		let a = copyArr(currentBlock.coords[1]).sort();
		if (a[0]>0) {
			currentBlock.move(-30,0);
		}
	}
	if (e.key == "ArrowDown") {
		currentBlock.move(0,30);
	}
	if (e.key == " ") { 
		//570
		while (currentBlock.coords[0][currentBlock.coords[0].length-1] < 570) {
			let s = false;
			for (let i = 0; i < currentBlock.coords[0].length; i++) {
				if (placedBlocks.coords[1].includes(currentBlock.coords[1][i])) {
					s = true;
					break;
				}
				currentBlock.coords[0][i] += 30;
			}
			if (s) {
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