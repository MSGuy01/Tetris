var c = document.getElementById("game");
var ctx = c.getContext("2d");
var bl = 30;
class Block {
	constructor(y,x) {
		this.fill = function() {
			Grid();
			ctx.fillStyle = this.color;
			for (let i = 0; i < this.coords[0].length; i++) {
				ctx.fillRect(this.coords[1][i],this.coords[0][i],30,30);
			}
		}
		this.fall = function() {
			for (let i = 0; i < this.coords[0].length; i++) {
				this.coords[0][i] += 30;
			}
			this.fill();
		}
		this.move = function(xChange,yChange) {
			for (let i = 0; i < this.coords[0].length; i++) {
				this.coords[1][i] += xChange;
				this.coords[0][i] += yChange;
			}
			this.fill();
		}
	}
}
class IBlock extends Block{
	constructor(y,x) {
		super(y,x);
		this.color = 'blue';
		this.coords = [[y,y+30,y+60,y+90],[x,x,x,x]];
	}
}
var i;
$('#start').on('click', () => {
	i = new IBlock(1,1);
	i.fill();
});
document.body.addEventListener("keydown", e => {
	if (e.key == "ArrowRight") {
		i.move(30,0);
	}
	if (e.key == "ArrowLeft") {
		i.move(-30,0);
	}
	if (e.key == "ArrowUp") {
		i.move(0,-30);
	}
	if (e.key == "ArrowDown") {
		i.move(0,30);
	}
})