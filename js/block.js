var c = document.getElementById("game");
var ctx = c.getContext("2d");
var bl = 30;
class Block {
	constructor() {
		this.y = 0;
		this.fill = function() {
			ctx.fillStyle = 'red';
			ctx.fillRect(0, y, bl, bl);
		}
		this.fall = function() {
			window.setInterval(() => {
				y += 30;
				this.fill();
			}, 100);
		}
	}
}
$('#start').on('click', () => {
	const b = new Block();
	b.fill();
	b.fall();
});
