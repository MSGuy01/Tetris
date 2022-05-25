var ec = document.getElementById("edit");
var eCtx = ec.getContext("2d");
var currentArr = [[],[]];
$('#create').on('click', () => {
    let editorAudio = document.getElementById("editorAudio");
    editorAudio.addEventListener("ended", function() {
        this.currentTime = 0;
        this.play();
    }, false);
    editorAudio.play();
    let img = new Image();
	img.src = 'grid.png';
	img.onload = () => {
	  eCtx.drawImage(img,0,0,300,600);
	}
});
$('#edit').on('click', e => {
    let rect = ec.getBoundingClientRect();
    let x = Math.floor((e.clientX-rect.left)/30);
    let y = Math.floor((e.clientY-rect.top)/30)
    eCtx.fillStyle = 'red';
    eCtx.fillRect(x*30,y*30,30,30);
    for (let i in currentArr[0]) {
        if (currentArr[0][i] > y*30) {
            currentArr[0].splice(i-1,0,'hi');
        }
    }
})