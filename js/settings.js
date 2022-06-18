const drawImg = (ctx,width,height,arr,square,color) => {
    let img = new Image();
	img.src = 'grid.png';
    console.log(arr);
	img.onload = () => {
	  ctx.drawImage(img,0,0,width*4,height*4);
      for (let i in arr) {
        for (let j in arr[i]) {
            if (arr[i][j]) {
                ctx.fillStyle = color;
                ctx.fillRect(j*square,i*square,square,square);
            }
        }
      }
	}
}
const reverseRotations = (currentArr) => {
    let finalArr = [[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]];
    for (let i in currentArr[0][0]) {
        finalArr[currentArr[0][0][i]/30][currentArr[0][1][i]/30] = true;
    }
    return finalArr;
}
var mapsArr = ["ArrowUp","ArrowLeft","ArrowRight","ArrowDown"," "]
var music = true;
var fx = true;
var level = 1;
var height = 600;
var width = 300;
window.onload = () => {
    $('#customSize').hide();
    $('#codeLabel').html('Tetris Collection Code: ' + localStorage.getItem('userCode'));
    let maps = document.getElementsByClassName("mapButton");
    var canMap = false;
    for (let i = 0; i < maps.length; i++) {
        maps[i].addEventListener("click", e => {
            document.getElementById(e.target.id).innerHTML = 'Awaiting Input...';
            canMap = parseInt(e.target.id.substr(1,1))+1;
            window.setTimeout(() => {
                canMap = false;
                if (mapsArr[e.target.id.substr(1,1)] != ' ') {
                    document.getElementById(e.target.id).innerHTML = mapsArr[e.target.id.substr(1,1)];
                }
                else {
                    document.getElementById(e.target.id).innerHTML = '[SPACEBAR]';
                }
            }, 5000);
        });
        maps[i].addEventListener("keydown", e => {
            e.preventDefault();
            if (canMap != false) {
                mapsArr[canMap-1] = e.key;
                if (e.key != ' ') {
                    document.getElementById('m'+(canMap-1)).innerHTML = e.key;
                }
                else {
                    document.getElementById('m'+(canMap-1)).innerHTML = '[SPACEBAR]';
                }
            }
        })
    }
    $('#customSelect').on('click',() => {
        let val = document.getElementById("customSelect").value;
        if (val == 'custom') {
            $('#customSize').show();
        }
        else {
            $('#customSize').hide();
        }
    });
    $('#musicToggle').on('click',()=>{
        if (music) {
            music = false;
            $('#musicToggle').html('Off');
        }
        else {
            music = true;
            $('#musicToggle').html('On');
        }
    })
    $('#fxToggle').on('click',()=>{
        if (fx) {
            fx = false;
            $('#fxToggle').html('Off');
        }
        else {
            fx = true;
            $('#fxToggle').html('On');
        }
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
    for (let i = 1; i < 26; i++) {
        let n = document.createElement("option")
        n.value = i;
        n.innerHTML = i;
        document.getElementsByTagName("select")[1].appendChild(n);
    }
    fetch('savedBlocks.json?nocache=' + new Date().getTime()).then(response => response.text()).then(text => {
        let data = JSON.parse(text);
        if (typeof data[localStorage.getItem('userCode')] !== 'undefined') {
            for (let i in data[localStorage.getItem('userCode')].blocks) {
                let newC = document.createElement("canvas");
                newC.className = "createdBlock";
                newC.id = "createdBlock" + i;
                newC.width = 60;
                newC.height = 60;
                let newRad = document.createElement("input");
                newRad.type = "checkbox";
                newRad.value = data[localStorage.getItem('userCode')].blockIDs[i];
                newRad.id = data[localStorage.getItem('userCode')].blockIDs[i];
                $('#yourBlocksContainer').append(newC);
                $('#yourBlocksContainer').append(newRad);
                $('#createdBlock' + i).attr('blockID',data[localStorage.getItem('userCode')].blockIDs[i]);
                $('#createdBlock' + i).on('click', e => {
                    let id = $('#'+e.target.id).attr('blockID');
                    let box = document.getElementById(id);
                    if (box.checked){
                        box.checked = false;
                    }
                    else {
                        box.checked = true;
                    }
                });
                drawImg(newC.getContext('2d'),150,300,reverseRotations(data[localStorage.getItem('userCode')].blocks[i]),15,'#'+data[localStorage.getItem('userCode')].colors[i]);
            }
        }
    });
}