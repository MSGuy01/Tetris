const generateBlocks = () => {
    let possible = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',1,2,3,4,5,6,7,8,9,0];
    let code = '';
    for (let i = 0; i < 16; i++) {
        let choice = Math.floor(Math.random() * possible.length);
        if (typeof(possible[choice]) == 'string') {
            if (Math.floor(Math.random() * 2) == 1) {
                code += possible[choice];
            }
            else {
                code += possible[choice].toUpperCase();
            }
        }
        else {
            code += possible[choice];
        }
    }
    return code;
}

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
            currentArr[0].splice(i-1,0,y*30);
            currentArr[1].splice(i-1,0,x*30);
        }
    }
})
$('#submitCode').on('click', e => {
    $('#codeLabel').html('Code: ' + $('#userCode').val());
    localStorage.setItem('userCode',$('#userCode').val());
})