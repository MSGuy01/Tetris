function Block(type, gridData) {
	//TYPES: 1: I-BLOCK | 2: J-BLOCK | 3: L-BLOCK | 4: O-BLOCK | 5: S-BLOCK | 6: T-BLOCK | 7: Z-BLOCK
	var c = document.getElementById("game");
	var ctx = c.getContext("2d");
	var l = game.width / 2;
	var i = 0;
	var j = 5;
	var dieNext = false;

	console.log("NEW BLOCK: " + type);

	this.gridData = gridData;

	if (gridData[j][i] == 1) {
		dieNext = true;
	}

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
	var newBlock = function() {
		console.log("DIE");	
		if (dieNext) {
			game.style.display = "none";
			var audio = document.getElementById("theme");
			audio.pause();
			audio.currentTime = 0;
			var loseAudio = new Audio("audio/end_results.mp3");
			loseAudio.play();
			document.getElementById("lose").style.display = "block";		
			dieNext = false;
		}
		else{
			new Block(1, gridData);
		}
	}
	var iBlock = function() {
		ctx.fillRect((game.width / 10) * j, i - 30, 30, 150);
	}
	var jBlock = function() {
		ctx.fillRect((game.width / 10) * j, i - 30, 30, 90);
		ctx.fillRect(((game.width / 10) * j) + 30, i + 30, 30, 30);
	}
	var lBlock = function() {
		ctx.fillRect((game.width / 10) * j, i - 30, 30, 90);
		ctx.fillRect(((game.width / 10) * j) - 30, i + 30, 30, 30);
	}
	var oBlock = function() {
		ctx.fillRect((game.width) / 10 * j, i - 30, 60, 60);
	}
	var sBlock = function() {
		ctx.fillRect((game.width) / 10 * j, i - 30, 30, 60);
		ctx.fillRect((game.width) / 10 * (j - 1), i, 30, 30);
		ctx.fillRect((game.width) / 10 * (j + 1), i - 30, 30, 30);
	}
	var tBlock = function() {
		ctx.fillRect((game.width) / 10 * j, i - 30, 30, 60);
		ctx.fillRect((game.width) / 10 * (j - 1), i, 30, 30);
		ctx.fillRect((game.width) / 10 * (j + 1), i, 30, 30);
	}
	var zBlock = function() {
		ctx.fillRect((game.width) / 10 * j, i - 30, 30, 60);
		ctx.fillRect((game.width) / 10 * (j - 1), i - 30, 30, 30);
		ctx.fillRect((game.width) / 10 * (j + 1), i, 30, 30);
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
	        if (i < 510 && j > blockData[type].min) {
		        clearBlock();
		        j--;
		    }
	    }
	    else if (event.keyCode == 39) {
	        //RIGHT
	        if (i < 510 && j < blockData[type].max) {
		        clearBlock();
		        j++;
		    }
	    }
	    else if (event.keyCode == 82) {
	    	//R (ROTATE)
	    }
	});

	//I BLOCK:
	if (type == 1) {
		var block = window.setInterval(function() {
			ctx.fillStyle = 'lightblue';
			ctx.fillRect((game.width / 10) * j, i, 30, 120);
			ctx.stroke();
			ctx.fillStyle = 'gray';
			ctx.fillRect((game.width / 10) * j, i - 30, 30, 30);
			ctx.stroke();
			if (gridData[j][(i/30) + 4] == 0) {
				i += 30;
			}
			else{
				i /= 30;
				gridData[j][i] = 1;
				gridData[j][i + 1] = 1;
				gridData[j][i + 2] = 1;
				gridData[j][i + 3] = 1;
				console.log("HIFIHIHIHI");
				newBlock();
				//new Block(Math.floor(Math.random() * 3) + 1, gridData);
				window.clearInterval(block);
			}
			console.log("AAAAAAAAAAAAA");
			if (i >= 510) {
				i /= 30;
				gridData[j][i] = 1;
				gridData[j][i + 1] = 1;
				gridData[j][i + 2] = 1;
				gridData[j][i + 3] = 1;
				console.log("HIFIHIHIHI");
				newBlock();
				//new Block(Math.floor(Math.random() * 3) + 1, gridData);
				window.clearInterval(block);
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
			ctx.fillRect((game.width / 10) * j, i, 30, 90);
			ctx.fillRect(((game.width / 10) * j) + (negative * 30), i + 60, 30, 30);
			ctx.stroke();
			ctx.fillStyle = 'gray';
			ctx.fillRect((game.width / 10) * j, i - 30, 30, 30);
			ctx.fillRect(((game.width / 10) * j) + (negative * 30), i + 30, 30, 30);
			ctx.stroke();
			i += 30;
			if (i >= 540) {
				new Block(Math.floor(Math.random() * 7) + 1);
				window.clearInterval(block);
			}

		}, 200);
	}

	//O BLOCK:
	else if (type == 4) {
		var block = window.setInterval(function() {
			ctx.fillStyle = 'yellow';
			ctx.fillRect((game.width) / 10 * j, i, 60, 60);
			ctx.stroke();
			ctx.fillStyle = 'gray';
			ctx.fillRect((game.width) / 10 * j, i - 60, 60, 60);
			ctx.stroke();
			i += 30;
			if (i >= 570) {
				new Block(Math.floor(Math.random() * 7) + 1);
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
			ctx.fillRect((game.width) / 10 * j, i, 30, 60);
			ctx.fillRect((game.width) / 10 * (j - 1), i + addOn, 30, 30);
			ctx.fillRect((game.width) / 10 * (j + 1), i, 30, 30 + addOn2);
			ctx.stroke();
			ctx.fillStyle = 'gray';
			ctx.fillRect((game.width) / 10 * j, i - 60, 30, 60);
			ctx.fillRect((game.width) / 10 * (j - 1), (i + addOn) - 30, 30, 30);
			ctx.fillRect((game.width) / 10 * (j + 1), i - 30, 30, 30 + addOn2);
			ctx.stroke();
			i += 30;
			if (i >= 570) {
				new Block(Math.floor(Math.random() * 7) + 1);
				window.clearInterval(block);
			}

		}, 200);
	}

	//T BLOCKS:
	else if (type == 6) {
		var block = window.setInterval(function() {
			ctx.fillStyle = 'purple';
			ctx.fillRect((game.width) / 10 * j, i, 30, 60);
			ctx.fillRect((game.width) / 10 * (j - 1), i + 30, 30, 30);
			ctx.fillRect((game.width) / 10 * (j + 1), i + 30, 30, 30);
			ctx.stroke();
			ctx.fillStyle = 'gray';
			ctx.fillRect((game.width) / 10 * j, i - 60, 30, 60);
			ctx.fillRect((game.width) / 10 * (j - 1), i, 30, 30);
			ctx.fillRect((game.width) / 10 * (j + 1), i, 30, 30);
			ctx.stroke();
			i += 30;
			console.log()
			if (i >= 570) {
				new Block(Math.floor(Math.random() * 7) + 1);
				window.clearInterval(block);
			}
		}, 200);
	}
}
