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
window.onload = () => {
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