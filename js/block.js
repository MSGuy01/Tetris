function Block(type, gridData, src) {
	//TYPES: 1: I-BLOCK | 2: J-BLOCK | 3: L-BLOCK | 4: O-BLOCK | 5: S-BLOCK | 6: T-BLOCK | 7: Z-BLOCK
	console.log("*******************************************************************");
	var c = document.getElementById("game");
	var ctx = c.getContext("2d");
	var l = game.width / 2;
	var currentRow = 0;
	var currentColumn = 5;
	var dieNext = false;
	var blocksFilled = [];	
	var currentGridData = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
	for (var i = 0; i < gridData.length; i++) {
		for (var j = 0; j < gridData[i].length; j++) {
			currentGridData[i][j] = gridData[i][j];
		}
	}
	document.getElementById("stop").addEventListener("click", function() {
		window.clearInterval(block);
	});
	blockData = {
		1: {
			min: 0,
			max: 9
		},
		2: {
			min: 0,
			max: 8
		},
		3: {
			min: 1,
			max: 9 
		},
		4: {
			min: 0,
			max: 8
		},
		5: {
			min: 1,
			max: 8
		},
		6: {
			min: 1,
			max: 8
		},
		7: {
			min: 1,
			max: 8
		}
	}
	var iBlock = function() {
		ctx.fillRect((game.width / 10) * currentColumn, currentRow- 30, 30, 150);
	}
	var jBlock = function() {
		ctx.fillRect((game.width / 10) * currentColumn, currentRow- 30, 30, 90);
		ctx.fillRect(((game.width / 10) * currentColumn) + 30, currentRow+ 30, 30, 30);
	}
	var lBlock = function() {
		ctx.fillRect((game.width / 10) * currentColumn, currentRow- 30, 30, 90);
		ctx.fillRect(((game.width / 10) * currentColumn) - 30, currentRow+ 30, 30, 30);
	}
	var oBlock = function() {
		ctx.fillRect((game.width) / 10 * currentColumn, currentRow- 30, 60, 60);
	}
	var sBlock = function() {
		ctx.fillRect((game.width) / 10 * currentColumn, currentRow- 30, 30, 60);
		ctx.fillRect((game.width) / 10 * (currentColumn - 1), i, 30, 30);
		ctx.fillRect((game.width) / 10 * (currentColumn + 1), currentRow- 30, 30, 30);
	}
	var tBlock = function() {
		ctx.fillRect((game.width) / 10 * currentColumn, currentRow- 30, 30, 60);
		ctx.fillRect((game.width) / 10 * (currentColumn - 1), i, 30, 30);
		ctx.fillRect((game.width) / 10 * (currentColumn + 1), i, 30, 30);
	}
	var zBlock = function() {
		ctx.fillRect((game.width) / 10 * currentColumn, currentRow- 30, 30, 60);
		ctx.fillRect((game.width) / 10 * (currentColumn - 1), currentRow- 30, 30, 30);
		ctx.fillRect((game.width) / 10 * (currentColumn + 1), i, 30, 30);
	}
	var clearBlock = function() {
		ctx.fillStyle = 'gray';
		if (type == 1) {
		    iBlock();
		}
		else if (type == 2) {
		    jBlock();
		}
		else if (type == 3) {
			lBlock();
		}
		else if (type == 4) {
			oBlock();
		}
		else if (type == 5) {
			sBlock();
		}
		else if (type == 6) {
			tBlock();
		}
		else if (type == 7) {
			zBlock();
		}
		ctx.stroke();
	}

	document.addEventListener("keydown", function(event) {
	    if (event.keyCode == 37) {
	        //LEFT
	        if (currentRow< 510 && currentColumn > blockData[type].min) {
		        clearBlock();
		        currentColumn--;
		    }
	    }
	    else if (event.keyCode == 39) {
	        //RIGHT
	        if (currentRow< 510 && currentColumn < blockData[type].max) {
		        clearBlock();
		        currentColumn++;
		    }
	    }
	    else if (event.keyCode == 82) {
	    	//R (ROTATE)
	    }
	});
	var newBlock = function(thiscurrentColumn, thisBlocksFilled) {
		if (dieNext) {
			var audio = document.getElementById("theme");
			audio.pause();
			audio.currentTime = 0;
			var loseSound = document.getElementById("loseAudio");
			loseSound.play();
			loseSound.addEventListener("ended", function() {
				game.style.display = "none";
				document.getElementById("lose").style.display = "block";
				var loseAudio = new Audio("audio/end_results.mp3");
				loseAudio.play();
			});		
			dieNext = false;
		}
		else{
			//DIVIDE THIS BLOCKS FILLED AND ADD TO GRID DATA
			new Block(1, currentGridData, "newBlock");
		}
	}
	var clearBelow = function() {
		if (currentGridData[currentColumn][(currentRow/ 30) + 5] == 1) {
			return false;
		}
		return true;
	}
	//I BLOCK:
	if (type == 1) {
		var block = window.setInterval(function() {
			ctx.fillStyle = 'lightblue';
			ctx.fillRect((game.width / 10) * currentColumn, currentRow, 30, 120);
			ctx.stroke();
			ctx.fillStyle = 'gray';
			ctx.fillRect((game.width / 10) * currentColumn, currentRow - 30, 30, 30);
			ctx.stroke();
			for (var k = currentRow/30; k < (currentRow/30)+4; k++) {
				currentGridData[currentColumn][k] = 1;
				console.log(currentGridData[currentColumn][k]);
			}
			console.log("CURRENT GRID DATA");
			console.log(currentGridData);
			console.log(currentGridData[currentColumn]);
			if (clearBelow()) {
				currentRow += 30;
			}
			else{
				//TODO:SEEMS TO SAVE ONLY THE ROW FOR SOME ANNOYING REASON
				console.log("CURRENT GRID DATA");
				console.log(currentGridData[currentColumn]);
				newBlock(currentColumn, blocksFilled)
				window.clearInterval(block);
			}
			if (currentRow >= 510) {
				console.log("CURRENT GRID DATA");
				console.log(currentGridData);
				newBlock(currentColumn, blocksFilled)
				window.clearInterval(block);
			}
			for (var i = 0; i < gridData[currentColumn].length; i++) {
				currentGridData[currentColumn][i] = gridData[currentColumn][i];
			}
		}, 200);
	}

	//L/J BLOCKS:
	else if (type == 2 || type == 3) {
		var negative;
		var color;
		if (type == 3) {
			negative = -1;
			color = 'orange';
		}
		else {
			negative = 1
			color = 'blue';
		}
		var block = window.setInterval(function() {
			ctx.fillStyle = color;
			ctx.fillRect((game.width / 10) * currentColumn, i, 30, 90);
			ctx.fillRect(((game.width / 10) * currentColumn) + (negative * 30), currentRow + 60, 30, 30);
			ctx.stroke();
			ctx.fillStyle = 'gray';
			ctx.fillRect((game.width / 10) * currentColumn, currentRow- 30, 30, 30);
			ctx.fillRect(((game.width / 10) * currentColumn) + (negative * 30), currentRow+ 30, 30, 30);
			ctx.stroke();
			currentRow+= 30;
			if (currentRow>= 540) {
				newBlock();
				//new Block(Math.floor(Math.random() * 7) + 1);
				window.clearInterval(block);
			}

		}, 200);
	}

	//O BLOCK:
	else if (type == 4) {
		var block = window.setInterval(function() {
			ctx.fillStyle = 'yellow';
			ctx.fillRect((game.width) / 10 * currentColumn, i, 60, 60);
			ctx.stroke();
			ctx.fillStyle = 'gray';
			ctx.fillRect((game.width) / 10 * currentColumn, currentRow- 60, 60, 60);
			ctx.stroke();
			currentRow+= 30;
			if (currentRow>= 570) {
				newBlock();
				//new Block(Math.floor(Math.random() * 7) + 1);
				window.clearInterval(block);
			}
		}, 200);
	}

	//S/Z BLOCKS:
	else if (type == 5 || type == 7) {
		var addOn;
		var color;
		if (type == 5) {
			color = 'green';
			addOn = 30;
			addOn2 = 0;
		}
		else {
			color = 'red';
			addOn = 0;
			addOn2 = 30;
		}
		var block = window.setInterval(function() {
			ctx.fillStyle = color;
			ctx.fillRect((game.width) / 10 * currentColumn, i, 30, 60);
			ctx.fillRect((game.width) / 10 * (currentColumn - 1), currentRow+ addOn, 30, 30);
			ctx.fillRect((game.width) / 10 * (currentColumn + 1), i, 30, 30 + addOn2);
			ctx.stroke();
			ctx.fillStyle = 'gray';
			ctx.fillRect((game.width) / 10 * currentColumn, currentRow- 60, 30, 60);
			ctx.fillRect((game.width) / 10 * (currentColumn - 1), (currentRow+ addOn) - 30, 30, 30);
			ctx.fillRect((game.width) / 10 * (currentColumn + 1), currentRow- 30, 30, 30 + addOn2);
			ctx.stroke();
			currentRow+= 30;
			if (currentRow>= 570) {
				newBlock();
				//new Block(Math.floor(Math.random() * 7) + 1);
				window.clearInterval(block);
			}

		}, 200);
	}

	//T BLOCKS:
	else if (type == 6) {
		var block = window.setInterval(function() {
			ctx.fillStyle = 'purple';
			ctx.fillRect((game.width) / 10 * currentColumn, i, 30, 60);
			ctx.fillRect((game.width) / 10 * (currentColumn - 1), currentRow+ 30, 30, 30);
			ctx.fillRect((game.width) / 10 * (currentColumn + 1), currentRow+ 30, 30, 30);
			ctx.stroke();
			ctx.fillStyle = 'gray';
			ctx.fillRect((game.width) / 10 * currentColumn, currentRow- 60, 30, 60);
			ctx.fillRect((game.width) / 10 * (currentColumn - 1), i, 30, 30);
			ctx.fillRect((game.width) / 10 * (currentColumn + 1), i, 30, 30);
			ctx.stroke();
			currentRow+= 30;
			if (currentRow>= 570) {
				newBlock();
				//new Block(Math.floor(Math.random() * 7) + 1);
				window.clearInterval(block);
			}
		}, 200);
	}
}
