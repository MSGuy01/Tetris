
function Grid(filled) {
	var c = document.getElementById("game");
	var ctx = c.getContext("2d");
	var l = game.width / 2;
	this.filled = filled;
	for (var i = 0; i < game.width; i += game.width / 10) {
		//gridPositions.push([]);
		for (var j = 0; j < game.height; j += game.height / 20) {
			ctx.rect(i, j, l, l);
			ctx.stroke();
		}
	}
}
