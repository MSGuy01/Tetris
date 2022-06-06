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
window.onload = () => {
    let maps = document.getElementsByClassName("mapButton");
    var canMap = false;
    for (let i = 0; i < maps.length; i++) {
        maps[i].addEventListener("click", e => {
            document.getElementById(e.target.id).innerHTML = 'Awaiting Input...';
            canMap = parseInt(e.target.id.substr(1,1));
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
    }
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
    document.body.addEventListener("keydown", e => {
        e.preventDefault();
        if (canMap == 0 || canMap != false) {
            mapsArr[canMap] = e.key;
            if (e.key != ' ') {
                document.getElementById('m'+canMap).innerHTML = e.key;
            }
            else {
                document.getElementById('m'+canMap).innerHTML = '[SPACEBAR]';
            }
        }
    })
    for (let i = 1; i < 26; i++) {
        let n = document.createElement("option")
        n.value = i;
        n.innerHTML = i;
        document.getElementsByTagName("select")[1].appendChild(n);
    }
    fetch('savedBlocks.json?nocache=' + new Date().getTime()).then(response => response.text()).then(text => {
        let data = JSON.parse(text);
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
            drawImg(newC.getContext('2d'),150,300,reverseRotations(data[localStorage.getItem('userCode')].blocks[i]),15);
        }
    });
}