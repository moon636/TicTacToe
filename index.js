const playButton = document.getElementById("play-btn-id")
const gameBox = document.getElementById("game-box-id")
const gameBoxBorder = document.getElementById("game-box-border-id")

const box1 = document.getElementById("box-1-id")
const box2 = document.getElementById("box-2-id")
const box3 = document.getElementById("box-3-id")
const box4 = document.getElementById("box-4-id")
const box5 = document.getElementById("box-5-id")
const box6 = document.getElementById("box-6-id")
const box7 = document.getElementById("box-7-id")
const box8 = document.getElementById("box-8-id")
const box9 = document.getElementById("box-9-id")

const boxList = [box1,box2,box3,box4,box5,box6,box7,box8,box9]

const boxImg1 = document.getElementById("box-img-1-id")
const boxImg2 = document.getElementById("box-img-2-id")
const boxImg3 = document.getElementById("box-img-3-id")
const boxImg4 = document.getElementById("box-img-4-id")
const boxImg5 = document.getElementById("box-img-5-id")
const boxImg6 = document.getElementById("box-img-6-id")
const boxImg7 = document.getElementById("box-img-7-id")
const boxImg8 = document.getElementById("box-img-8-id")
const boxImg9 = document.getElementById("box-img-9-id")

const boxImgList = [boxImg1,boxImg2,boxImg3,boxImg4,boxImg5,boxImg6,boxImg7,boxImg8,boxImg9]

let screenWidth = screen.width
const smallerBoxTurn = 450

function btnHeightToBox() {
    let height = playButton.offsetHeight;

    if (screenWidth <= smallerBoxTurn) {

        if (height >= 300) {
            return;
        }

    } else {
        if (height >= 400) {
            return;
        }
    }

    height += 1;
    playButton.style.height = height + "px";
    setTimeout(btnHeightToBox,1);
}

function btnWidthToBox() {

    let width = playButton.offsetWidth;

    if (screenWidth <= smallerBoxTurn) {

        if (width >= 300) {
            return;
        }

    } else {
        if (width >= 400) {
            return;
        }
    }
    width += 1;
    playButton.style.width = width + "px";
    setTimeout(btnWidthToBox,1);
}

let currentOpacity = 0

function fadeInGameBox() {

    if (currentOpacity >= 1) {
        return
    }

    currentOpacity += 0.005
    gameBox.style.opacity = currentOpacity
    setTimeout(fadeInGameBox,1)
}

let btnTextOpacity = 1

function btnHideText() {
    if (btnTextOpacity <= 0) {
        return;
    }
    btnTextOpacity -= 0.007;

    playButton.style.color = "rgba(240,240,240,"+btnTextOpacity+")"
    setTimeout(btnHideText,1);
}

function btnClick() {
    playButton.disabled  = true

    screenWidth = screen.width

    btnHideText()
    btnHeightToBox()
    btnWidthToBox()
    playButton.classList.remove("play-btn")
    playButton.classList.add("play-btn-clicked")

    setTimeout(function() {
        playButton.style.display = "none"
    },
    1800)
    setTimeout(function() {
        gameBoxBorder.style.display = "block"
        gameBox.style.display = "block"
    },
    1800)
    setTimeout(function() {
        gameBoxBorder.style.display = "block"
        gameBox.style.display = "block"
    },
    1800)
    setTimeout(fadeInGameBox,2000)
}

playButton.onclick = btnClick

function boxClicked(boxNumber) {
    
    boxImgList[boxNumber].style.display = "block"

}

for (let i = 0; i < boxList.length; i++) {
    boxList[i].onclick = function() {boxClicked(i)}
  }


