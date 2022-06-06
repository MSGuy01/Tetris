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
    console.log(currentArr);
    let finalArr = [[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]];
    for (let i in currentArr[0][0]) {
        //alert(currentArr[0][0][i]/30 + " , " + currentArr[0][1][i]/30);
        finalArr[currentArr[0][0][i]/30][currentArr[0][1][i]/30] = true;
    }
    //alert(finalArr);
    return finalArr;
}
const removeBlock = (arr) => {
    for (let i in arr) {
        for (let j in arr[i]) {
            arr[i][j] = false;
        }
    }
    return arr;
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
window.onload = () => {
    $('#delBlock').hide();
    if (localStorage.getItem('userCode') && localStorage.getItem('userCode') != '') {
        let formattedBody = encodeURIComponent(`My Tetris Collection Code: ${localStorage.getItem('userCode')}\nVisit https://msguy01.com/projects/tetrismaker to try them yourself!`);
        $('#share').attr('href','mailto:?subject=Check Out My Tetris Blocks!&body='+formattedBody);
    }
    localStorage.setItem('blockID','');
    let editorAudio = document.getElementById("editorAudio");
    editorAudio.addEventListener("ended", function() {
        this.currentTime = 0;
        this.play();
    }, false);
    editorAudio.play();
    $('#codeLabel').html('Tetris Collection Code: ' + localStorage.getItem('userCode'));
    drawImg(eCtx,300,600,currentArr,30);
    fetch('savedBlocks.json?nocache=' + new Date().getTime()).then(response => response.text()).then(text => {
        let data = JSON.parse(text);
        for (let i in data[localStorage.getItem('userCode')].blocks) {
            let newC = document.createElement("canvas");
            newC.className = "createdBlock";
            newC.id = "createdBlock" + i;
            newC.width = 60;
            newC.height = 60;
            $('#yourBlocksContainer').append(newC);
            $('#createdBlock' + i).attr('blockID',data[localStorage.getItem('userCode')].blockIDs[i]);
            $('#createdBlock' + i).on('click', e => {
                $('#delBlock').show();
                $('#currentBlockLabel').html('Current Block: ' + $('#'+e.target.id).attr('blockID'));
                localStorage.setItem('blockID',$('#'+e.target.id).attr('blockID'))
                let index = data[localStorage.getItem('userCode')].blockIDs.indexOf($('#'+e.target.id).attr('blockID'));
                let blockToShow = data[localStorage.getItem('userCode')].blocks[index];
                console.log('faewjio ' + blockToShow);
                currentArr = reverseRotations(blockToShow);
                drawImg(eCtx,300,600,currentArr,30);
            })
            drawImg(newC.getContext('2d'),150,300,reverseRotations(data[localStorage.getItem('userCode')].blocks[i]),15);
        }
    });
};
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
$('#newBlock').on('click', e => {
    currentArr = removeBlock(currentArr);
    localStorage.setItem('blockID','');
    drawImg(eCtx,300,600,currentArr,30);
    $('#delBlock').hide();
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
                if (localStorage.getItem('blockID') == '') {
                    data[localStorage.getItem('userCode')].blocks.push(rotationsArr);
                    data[localStorage.getItem('userCode')].blockIDs.push(newBlockId);
                }
                else {
                    let index = data[localStorage.getItem('userCode')].blockIDs.indexOf(localStorage.getItem('blockID'));
                    data[localStorage.getItem('userCode')].blocks[index] = rotationsArr;
                }
            }
            fetch('update.php?w=' + JSON.stringify(data)).then(() => {
                window.location.reload();
            })
        }
    })
})
$('#delBlock').on('click', e => {
    fetch('savedBlocks.json?nocache=' + new Date().getTime()).then(response => response.text()).then(text => {
        let data = JSON.parse(text);
        let index = data[localStorage.getItem('userCode')].blockIDs.indexOf(localStorage.getItem('blockID'));
        data[localStorage.getItem('userCode')].blocks.splice(index,1);
        currentArr = removeBlock(currentArr);
        localStorage.setItem('blockID','');
        fetch('update.php?w=' + JSON.stringify(data)).then(() => {
            window.location.reload();
        });
    });
})
$('#genCode').on('click', e => {
    let newCode = Math.floor(Math.random() * 899999 + 100000);
    localStorage.setItem('userCode',newCode);
    localStorage.setItem('blockID','');
    $('#share').attr('href','mailto:?subject=Check Out My Tetris Blocks!?body=My Code: '+newCode+'\nVisit https://msguy01.com/projects/tetrismaker to try them yourself!'+'<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatars0.githubusercontent.com%2Fu%2F47047931%3Fs%3D400%26v%3D4&f=1&nofb=1">');
    window.location.reload();
})
$('#submitCode').on('click', e => {
    fetch('savedBlocks.json?nocache=' + new Date().getTime()).then(response => response.text()).then(text => {
        let data = JSON.parse(text);
        if (data[$('#userCode').val()]) {
            $('#codeLabel').html('Tetris Collection Code: ' + $('#userCode').val());
            localStorage.setItem('userCode',$('#userCode').val());
            window.location.reload();
        }
        else {
            alert('That is not a valid code. Please enter a valid code or generate a new one.');
        }
    });
})