
function Grid(red) {
	var c = document.getElementById("game");
	var ctx = c.getContext("2d");
	ctx.fillStyle = 'gray';
	ctx.fillRect(0,0,game.width,game.height);
	var l = game.width / 2;
	for (var i = 0; i < game.width; i += game.width / 10) {
		//gridPositions.push([]);
		for (var j = 0; j < game.height; j += game.height / 20) {
			if (red) {
				fillStyle = 'red';
			}
			ctx.rect(i, j, l, l);
			if (red) {
				ctx.fill();
			}
			ctx.stroke();
		}
	}
}
