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
const createRotations = () => {
    let finalArr = [[],[]];
    for (let i in currentArr) {
        for (let j in currentArr[i]) {
            if (currentArr[i][j]) {
                finalArr[0].push(i*30);
                finalArr[1].push(j*30);
            }
        }
    }
    for (let i in currentArr) {
        for (let j in currentArr[i]) {
            if (currentArr[i][j]) {
                finalArr[0].push(i*30);
                finalArr[1].push(j*30);
            }
        }
    }
    for (let i in currentArr) {
        for (let j in currentArr[i]) {
            if (currentArr[i][j]) {
                finalArr[0].push(i*30);
                finalArr[1].push(j*30);
            }
        }
    }
    for (let i in currentArr) {
        for (let j in currentArr[i]) {
            if (currentArr[i][j]) {
                finalArr[0].push(i*30);
                finalArr[1].push(j*30);
            }
        }
    }
    
}

var ec = document.getElementById("edit");
var eCtx = ec.getContext("2d");
var currentArr = [[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]];
const drawImg = () => {
    let img = new Image();
	img.src = 'grid.png';
	img.onload = () => {
	  eCtx.drawImage(img,0,0,300,600);
      for (let i in currentArr) {
        for (let j in currentArr[i]) {
            if (currentArr[i][j]) {
                eCtx.fillStyle = 'red';
                eCtx.fillRect(j*30,i*30,30,30);
            }
        }
      }
	}
}
$('#create').on('click', () => {
    let editorAudio = document.getElementById("editorAudio");
    editorAudio.addEventListener("ended", function() {
        this.currentTime = 0;
        this.play();
    }, false);
    editorAudio.play();
    $('#codeLabel').html('Code: ' + localStorage.getItem('userCode'));
    drawImg();
});
$('#edit').on('click', e => {
    e.preventDefault();
    let rect = ec.getBoundingClientRect();
    let x = Math.floor((e.clientX-rect.left)/30);
    let y = Math.floor((e.clientY-rect.top)/30)
    if (currentArr[y][x] == false) {
        currentArr[y][x] = true;
        eCtx.fillStyle = 'red';
        eCtx.fillRect(x*30,y*30,30,30);
    }
    else {
        currentArr[y][x] = false;
        drawImg();
    }
})
$('#saveBlock').on('click', e => {
    fetch('savedBlocks.json').then(response => response.text()).then(text => {
        let data = JSON.parse(text);
        let rotationsArr = createRotations(currentArr);
        if (!localStorage.getItem('userCode') || localStorage.getItem('userCode') == '') {
            alert('Please enter a code or generate a new code.');
        }
        if (!data[localStorage.getItem('userCode')]) {
            let newObj = {
                "blockIDs": [Math.floor(Math.random() * 899999 + 100000)],
                "blocks": [currentArr]
            }
            data[localStorage.getItem('userCode')] = newObj;
        }
        else {
            data[localStorage.getItem('userCode')].blockIDs.push(currentArr);
        }
        fetch('update.php?w=' + JSON.stringify(data));
    })
})
$('#genCode').on('click', e => {
    let newCode = Math.floor(Math.random() * 899999 + 100000);
    $('#codeLabel').html('Code: ' + newCode);
    localStorage.setItem('userCode',newCode);
})
$('#submitCode').on('click', e => {
    $('#codeLabel').html('Code: ' + $('#userCode').val());
    localStorage.setItem('userCode',$('#userCode').val());
})