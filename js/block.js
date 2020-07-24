function Block(type) {
	//TYPES: 1: I-BLOCK | 2: J-BLOCK | 3: L-BLOCK | 4: O-BLOCK | 5: S-BLOCK | 6: T-BLOCK | 7: Z-BLOCK
	var c = document.getElementById("game");
	var ctx = c.getContext("2d");
	var l = game.width / 2;
	var i = 0;
	var j = 5;

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
		}
	}

	var iBlock = function() {
		ctx.fillRect((game.width / 10) * j, i - 30, 30, 150);
	}
	var lBlock = function() {
		ctx.fillRect((game.width / 10) * j, i - 30, 30, 90);
		ctx.fillRect(((game.width / 10) * j) - 30, i + 30, 30, 30);
	}
	var jBlock = function() {
		ctx.fillRect((game.width / 10) * j, i - 30, 30, 90);
		ctx.fillRect(((game.width / 10) * j) + 30, i + 30, 30, 30);
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
		ctx.stroke();
	}

	document.addEventListener("keydown", function(event) {
	    if (event.keyCode == 37) {
	        //LEFT
	        console.log(j);
	        if (i < 510 && j > blockData[type].min) {
		        clearBlock();
		        j--;
		    }
	    }
	    else if (event.keyCode == 39) {
	        //RIGHT
	        console.log(j);
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
			var center = game.width / 4;
			ctx.fillStyle = 'lightblue';
			ctx.fillRect((game.width / 10) * j, i, 30, 120);
			ctx.stroke();
			ctx.fillStyle = 'gray';
			ctx.fillRect((game.width / 10) * j, i - 30, 30, 30);
			ctx.stroke();
			i += 30;
			if (i >= 510) {
				new Block(Math.floor(Math.random() * 3) + 1);
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
			var center = game.width / 4;
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
				new Block(Math.floor(Math.random() * 3) + 1);
				window.clearInterval(block);
			}

		}, 200);
	}

	//O BLOCK:
	else if (type == 4) {
		console.log("FOUR");
	}

	//S/Z BLOCKS:
	else if (type == 5 || type == 7) {
		console.log("FIVESEVEN");
	}

	//T BLOCKS:
	else if (type == 6) {
		console.log("SIX");
	}
	else{
		console.log("WHAT" + type);
	}
}
