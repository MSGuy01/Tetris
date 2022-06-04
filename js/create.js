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
const rotateArr = (arr) => { 
    let finalArr = arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
    for (let i in finalArr) {
        finalArr[i].reverse();
    }
    return finalArr;
}
const reverseRotations = (currentArr) => {
    let finalArr = [[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]];
    for (let i in currentArr[0][0]) {
        //alert(currentArr[0][0][i]/30 + " , " + currentArr[0][1][i]/30);
        finalArr[currentArr[0][0][i]/30][currentArr[0][1][i]/30] = true;
    }
    //alert(finalArr);
    return finalArr;
}
const createRotations = (currentArr) => {
    let finalArr = [[[],[]]];
    for (let i in currentArr) {
        for (let j in currentArr[i]) {
            if (currentArr[i][j]) {
                finalArr[0][0].push(i*30);
                finalArr[0][1].push(j*30);
            }
        }
    }
    finalArr.push([[],[]]);
    currentArr = rotateArr(currentArr);
    for (let i in currentArr) {
        for (let j in currentArr[i]) {
            if (currentArr[i][j]) {
                finalArr[1][0].push(i*30);
                finalArr[1][1].push(j*30);
            }
        }
    }
    finalArr.push([[],[]]);
    currentArr = rotateArr(currentArr);
    for (let i in currentArr) {
        for (let j in currentArr[i]) {
            if (currentArr[i][j]) {
                finalArr[2][0].push(i*30);
                finalArr[2][1].push(j*30);
            }
        }
    }
    finalArr.push([[],[]]);
    currentArr = rotateArr(currentArr);
    for (let i in currentArr) {
        for (let j in currentArr[i]) {
            if (currentArr[i][j]) {
                finalArr[3][0].push(i*30);
                finalArr[3][1].push(j*30);
            }
        }
    }
    console.log(finalArr);
    return finalArr;
}

var ec = document.getElementById("edit");
var eCtx = ec.getContext("2d");
var currentArr = [[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]];
const drawImg = (ctx,width,height,arr,square) => {
    let img = new Image();
	img.src = 'grid.png';
    console.log(arr);
	img.onload = () => {
	  ctx.drawImage(img,0,0,width,height);
      for (let i in arr) {
        for (let j in arr[i]) {
            if (arr[i][j]) {
                ctx.fillStyle = 'red';
                ctx.fillRect(j*square,i*square,square,square);
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
    drawImg(eCtx,300,600,currentArr,30);
    fetch('savedBlocks.json?nocache=' + new Date().getTime()).then(response => response.text()).then(text => {
        let data = JSON.parse(text);
        for (let i in data[localStorage.getItem('userCode')].blocks) {
            let newC = document.createElement("canvas");
            newC.className = "createdBlock";
            newC.width = 60;
            newC.height = 60;
            $('#yourBlocksContainer').append(newC);
            drawImg(newC.getContext('2d'),150,300,reverseRotations(data[localStorage.getItem('userCode')].blocks[i]),15);
        }
    });
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
        drawImg(eCtx,300,600,currentArr,30);
    }
})
$('#saveBlock').on('click', e => {
    fetch('savedBlocks.json?nocache=' + new Date().getTime()).then(response => response.text()).then(text => {
        let data = JSON.parse(text);
        let rotationsArr = createRotations(currentArr);
        if (!localStorage.getItem('userCode') || localStorage.getItem('userCode') == '') {
            alert('Please enter a code or generate a new code.');
        }
        else {
            let newBlockId = Math.floor(Math.random() * 899999 + 100000);
            if (!data[localStorage.getItem('userCode')]) {
                let newObj = {
                    "blockIDs": [newBlockId],
                    "blocks": [rotationsArr]
                }
                data[localStorage.getItem('userCode')] = newObj;
            }
            else {
                data[localStorage.getItem('userCode')].blocks.push(rotationsArr);
                data[localStorage.getItem('userCode')].blockIDs.push(newBlockId);
            }
            fetch('update.php?w=' + JSON.stringify(data)).then(() => {
                alert('Block successfully saved!');
                window.location.href = 'index.html?page=edit';
            })
        }
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