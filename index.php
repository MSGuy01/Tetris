<!DOCTYPE html>
<html>
	<head>
		<title>Tetris</title>
		<style>
			html{
				background-color: lightgray;
				font-family: sans-serif;
			}
			canvas{
				background-color: gray;
			}
			#lose{
				color: red;
				font-size: 100px;
			}
		</style>
	</head>
	<body>
		<audio src="audio/theme.mp3" id="theme"></audio>
		<h3 align="center"><button id="start">Start Game</button></h3>
		<h1 align="center" style="display: none" id="lose">You Lose!</h1>
		<h3 align="center"><canvas height="600" width="300" id="game"></canvas></h3>
		<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
		<script src="js/grid.js"></script>
		<script src="js/block.js"></script>
		<script>
			start.addEventListener("click", function() {
				start.style.display = "none";
				var audio = document.getElementById("theme");
				audio.addEventListener("ended", function() {
				    this.currentTime = 0;
				    this.play();
				}, false);
				audio.play();
				let tetrisGrid = new Grid(false);
				var grid = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
				console.log(grid);
				//new Block(Math.floor(Math.random() * 7) + 1, grid);
				new Block(1, grid);
			});
		</script>
	</body>
</html>