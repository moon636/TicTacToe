const clickBoxSound = new Audio("sounds/ClickBoxSound.mp3")
const pingClick = new Audio("sounds/PingClick.mp3")
const winSound = new Audio("sounds/WinSound.mp3")
const loseSound = new Audio("sounds/LoseSound.mp3")

winSound.volume = 0.6
clickBoxSound.volume = 0.3

const playButton = document.getElementById("play-btn-id")
const centerGameBox = document.getElementById("center-game-box-id")
const gameBox = document.getElementById("game-box-id")
const gameBoxBorder = document.getElementById("game-box-border-id")

const textStuff = document.getElementById("text-stuff-id")
const winsElement = document.getElementById("wins-id")
const drawsElement = document.getElementById("draws-id")
const lossesElement = document.getElementById("losses-id")

const winLine1 = document.getElementById("win-line-1-id")
const winLine2 = document.getElementById("win-line-2-id")
const winLine3 = document.getElementById("win-line-3-id")
const winLine4 = document.getElementById("win-line-4-id")
const winLine5 = document.getElementById("win-line-5-id")
const winLine6 = document.getElementById("win-line-6-id")
const winLine7 = document.getElementById("win-line-7-id")
const winLine8 = document.getElementById("win-line-8-id")

const winLineList = [winLine1,winLine2,winLine3,winLine4,winLine5,winLine6,winLine7,winLine8]

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

let ticTacToeTable = [0, 0, 0,
                      0, 0, 0,
                      0, 0, 0]

let moveNumber = 0

let debounce = false

let gameWonDebounce = false

let wins = Number(localStorage.getItem("wins"))

if (!wins) {
    wins = 0
}

let draws = Number(localStorage.getItem("draws"))

if (!draws) {
    draws = 0
}

let losses = Number(localStorage.getItem("losses"))

if (!losses) {
    losses = 0
}

winsElement.textContent = wins
drawsElement.textContent = draws
lossesElement.textContent = losses

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

let imgOpacity = 0

function fadeInImg(img,doCompChoose) {
    if (imgOpacity >= 1) {
        imgOpacity = 0
        if ((moveNumber < 5) && (doCompChoose)) {
            compChoose()
        } else {
            debounce = false
        }
        return;
    }
    imgOpacity += 0.01;

    img.style.opacity = `${imgOpacity}`
    setTimeout(fadeInImg,1,img,doCompChoose);
}


let imgOutOpacity = 1

function fadeOutImgs() {
    console.log(imgOutOpacity)
    if (imgOutOpacity <= 0) {
        imgOutOpacity = 1
        debounce = false
        gameWonDebounce = false
        return
    }

    imgOutOpacity -= 0.01

    for (let i = 0; i < boxImgList.length; i++) {
        if (boxImgList[i].style.opacity > 0) {
            boxImgList[i].style.opacity = `${imgOutOpacity}`
        }
    }

    setTimeout(fadeOutImgs,1)
}

function compChoose() {
    if (gameWonDebounce === false) {

        let chosenNumber = null
        let allowedNumber = false
        do {
            chosenNumber = Math.floor(Math.random() * 9)
            for (let i = 0; i < ticTacToeTable.length; i++) {
                if (ticTacToeTable[chosenNumber] === 0) {
                    allowedNumber = true
                }
            }
        } while (allowedNumber === false)
        boxImgList[chosenNumber].src = "images/circle.png"
        ticTacToeTable[chosenNumber] = 2
        fadeInImg(boxImgList[chosenNumber],false)
        clickBoxSound.play()
        clickBoxSound.currentTime=0

        checkBoardResults = checkBoard()
        if (checkBoardResults[0] === "circles") {
            gameWonDebounce = true

            const winLine = winLineList[checkBoardResults[1]-1]
            
            winLine.style.display = "block"
            winLine.style.backgroundColor = "rgb(255, 20, 20)"
            setTimeout(fadeline,500,winLine)
            setTimeout(colourBorderRed,75)
            setTimeout(function() {
                loseSound.play()
                loseSound.currentTime = 0
            },400)
            setTimeout(function() {
                resetBoard()
            },2500)
            losses += 1
            localStorage.setItem("losses",losses)
            lossesElement.textContent = losses
        } else if (checkBoardResults === "draw"){
            gameWonDebounce = true
            setTimeout(colourBorderBlue,75)
            setTimeout(function() {
                loseSound.play()
                loseSound.currentTime = 0
            },400)
            setTimeout(function() {
                resetBoard()
            },2500)
            draws += 1
            localStorage.setItem("draws",draws)
            drawsElement.textContent = draws
        }

    }
}

lineOpacity = 0

function fadeline(element) {
    if (lineOpacity >= 0.7) {
        lineOpacity = 0
        return;
    }

    lineOpacity += 0.0075;

    element.style.opacity = lineOpacity.toString()

    setTimeout(fadeline,1,element);
}

borderColorTemp = 240

function colourBorderGreen() {
    if (borderColorTemp <= 20) {
        borderColorTemp = 240
        return;
    }

    borderColorTemp -= 1;

    gameBoxBorder.style.borderColor = "rgb("+borderColorTemp+",240,"+borderColorTemp+")"

    setTimeout(colourBorderGreen,1);
}


function colourBorderRed() {
    if (borderColorTemp <= 20) {
        borderColorTemp = 240
        return;
    }

    borderColorTemp -= 1;


    gameBoxBorder.style.borderColor = "rgb(240,"+borderColorTemp+","+borderColorTemp+")"

    setTimeout(colourBorderRed,1);
}

function colourBorderBlue() {
    if (borderColorTemp <= 20) {
        borderColorTemp = 240
        return;
    }

    borderColorTemp -= 1;

    gameBoxBorder.style.borderColor = "rgb("+borderColorTemp+","+borderColorTemp+",240)"

    setTimeout(colourBorderBlue,1);
}


bodyPaddingTemp = 0

function bodyPadding() {
    if (bodyPaddingTemp >= 17) {
        return;
    }

    bodyPaddingTemp += 0.2;

    document.body.style.paddingBottom = `${bodyPaddingTemp}vh`

    setTimeout(bodyPadding,1);
}

cgbHeightTemp = 92

function cgbHeight() {
    if (cgbHeightTemp <= 75) {
        return;
    }

    cgbHeightTemp -= 0.2;

    centerGameBox.style.height = `${cgbHeightTemp}vh`

    setTimeout(cgbHeight,1);
}

bottomTemp = 20

function textStuffBottom() {
    if (bottomTemp <= 16) {
        return;
    }

    bottomTemp -= 0.05;

    textStuff.style.bottom = `${bottomTemp}%`

    setTimeout(textStuffBottom,1);
}

tempTextStuffOpacity = 0

function textStuffOpacity() {
    if (tempTextStuffOpacity >=1) {
        return;
    }

    tempTextStuffOpacity += 0.0075;

    textStuff.style.opacity = `${tempTextStuffOpacity}`

    setTimeout(textStuffOpacity,1);

}

function textStuffIncome() {
    cgbHeight()
    bodyPadding()
    textStuffBottom()
    textStuffOpacity()
}

function playBtnClick() {

    pingClick.play()
    pingClick.currentTime = 0

    playButton.disabled  = true

    screenWidth = screen.width

    btnHideText()
    btnHeightToBox()
    btnWidthToBox()
    playButton.classList.remove("play-btn")
    playButton.classList.add("play-btn-clicked")

    setTimeout(function() {
        playButton.style.display = "none"

        gameBoxBorder.style.display = "block"
        gameBox.style.display = "block"        
    },
    1800)

    setTimeout(fadeInGameBox,2000)
    setTimeout(textStuffIncome,2000)
}

function checkBoard() {
    console.log("checking")

    let isdraw = true

    for (let i = 0; i < ticTacToeTable.length; i++) {
        if (ticTacToeTable[i] === 0) {
            isdraw = false
        }
    }

    //////////////////////////////////////////////////////////////////////////////////


    if ((ticTacToeTable[0]===1) && (ticTacToeTable[1]===1) && (ticTacToeTable[2]===1)) {
        return ["crosses",1]
    } else if ((ticTacToeTable[3]===1) && (ticTacToeTable[4]===1) && (ticTacToeTable[5]===1)) {
        return ["crosses",2]
    } else if ((ticTacToeTable[6]===1) && (ticTacToeTable[7]===1) && (ticTacToeTable[8]===1)) {
        return ["crosses",3]
    }
    
    else if ((ticTacToeTable[0]===1) && (ticTacToeTable[3]===1) && (ticTacToeTable[6]===1)) {
        return ["crosses",4]
    } else if ((ticTacToeTable[1]===1) && (ticTacToeTable[4]===1) && (ticTacToeTable[7]===1)) {
        return ["crosses",5]
    } else if ((ticTacToeTable[2]===1) && (ticTacToeTable[5]===1) && (ticTacToeTable[8]===1)) {
        return ["crosses",6]
    } 
    
    
    else if ((ticTacToeTable[0]===1) && (ticTacToeTable[4]===1) && (ticTacToeTable[8]===1)) {
        return ["crosses",7]
    } else if ((ticTacToeTable[2]===1) && (ticTacToeTable[4]===1) && (ticTacToeTable[6]===1)) {
        return ["crosses",8]
    }

    //////////////////////////////////////////////////////////////////////////////////

    else if ((ticTacToeTable[0]===2) && (ticTacToeTable[1]===2) && (ticTacToeTable[2]===2)) {
        return ["circles",1]
    } else if ((ticTacToeTable[3]===2) && (ticTacToeTable[4]===2) && (ticTacToeTable[5]===2)) {
        return ["circles",2]
    } else if ((ticTacToeTable[6]===2) && (ticTacToeTable[7]===2) && (ticTacToeTable[8]===2)) {
        return ["circles",3]
    }
    
    else if ((ticTacToeTable[0]===2) && (ticTacToeTable[3]===2) && (ticTacToeTable[6]===2)) {
        return ["circles",4]
    } else if ((ticTacToeTable[1]===2) && (ticTacToeTable[4]===2) && (ticTacToeTable[7]===2)) {
        return ["circles",5]
    } else if ((ticTacToeTable[2]===2) && (ticTacToeTable[5]===2) && (ticTacToeTable[8]===2)) {
        return ["circles",6]
    } 
    
    
    else if ((ticTacToeTable[0]===2) && (ticTacToeTable[4]===2) && (ticTacToeTable[8]===2)) {
        return ["circles",7]
    } else if ((ticTacToeTable[2]===2) && (ticTacToeTable[4]===2) && (ticTacToeTable[6]===2)) {
        return ["circles",8]
    }   

    //////////////////////////////////////////////////////////////////////////////////

    else if (isdraw === true) {
        console.log("draw")
        return "draw"
    }

    //////////////////////////////////////////////////////////////////////////////////

    else return "none"

}

function resetBoard() {
    console.log("reset started")
    ticTacToeTable = 
       [0, 0, 0,
        0, 0, 0,
        0, 0, 0]

    moveNumber = 0

    fadeOutImgs()

    gameBoxBorder.style.borderColor = "rgb(240,240,240)"

    for (let i = 0; i < winLineList.length; i++) {
        winLineList[i].style.display = "none"
        winLineList[i].style.opacity = 0
        winLineList[i].style.backgroundColor = "rgba(245,245,245,.7)"
    }

}

playButton.onclick = playBtnClick

function boxClicked(boxNumber) {
    if ((ticTacToeTable[boxNumber] === 0) && (debounce === false) && (gameWonDebounce === false)) {
        debounce = true
        clickBoxSound.play()
        clickBoxSound.currentTime=0
        boxImgList[boxNumber].src = "images/cross.png"
        ticTacToeTable[boxNumber] = 1
        moveNumber = moveNumber + 1
        fadeInImg(boxImgList[boxNumber],true)

        checkBoardResults = checkBoard()
        if (checkBoardResults[0] === "crosses") {
            gameWonDebounce = true

            const winLine = winLineList[checkBoardResults[1]-1]
            
            winLine.style.display = "block"
            winLine.style.backgroundColor = "rgb(20, 255, 20)"
            setTimeout(fadeline,500,winLine)
            setTimeout(colourBorderGreen,75)
            setTimeout(function() {
                winSound.play()
                winSound.currentTime = 0
            },150)
            setTimeout(function() {
                resetBoard()
            },2500)
            wins += 1
            localStorage.setItem("wins",wins)
            winsElement.textContent = wins
        } else if (checkBoardResults === "draw"){
            gameWonDebounce = true
            setTimeout(colourBorderBlue,75)
            setTimeout(function() {
                loseSound.play()
                loseSound.currentTime = 0
            },400)
            setTimeout(function() {
                resetBoard()
            },2500)
            draws += 1
            localStorage.setItem("draws",draws)
            drawsElement.textContent = draws
        }
    }
}

for (let i = 0; i < boxList.length; i++) {
    boxList[i].onclick = function() {boxClicked(i)}
}
