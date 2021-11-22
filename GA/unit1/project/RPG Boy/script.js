// INITIALIZING  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const canvas = document.getElementById('canvas')
const context = canvas.getContext("2d")
let gameStartTrigger = false
let gameOverTrigger = false
const gameOver = {img:null, width:500, height:500, currentframe:0, totalframes:1}
gameOver.img = new Image()
gameOver.img.src = "assets/game-over.png"
// ---------------------------------------------------

// HERO VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const pk1Timer = null;
let heroPosX = 0 //limit = 688
let heroPosY = 0 //limit = 344
let directionChecker = 'right'
const pk1 = {img:null, width:32, height:32, currentframe:0, totalframes:5}
pk1.img = new Image()
pk1.img.src = "assets/char.png"

let heroStats = {
    health: 100,
}
// ---------------------------------------------------

window.onload = function() {
    setInterval(startGame,25)
  };

function startGame () {
  context.clearRect(0,0,canvas.width, canvas.height);
  context.drawImage(pk1.img, pk1.currentframe * 32 , 0 , 32 , 32 , heroPosX ,heroPosY , 32 * 2, 32 * 2) // Draws Hero on canvas at heroPosX and heroPosY coordinates.
  if(pk1.currentframe>=pk1.totalframes){
    pk1.currentframe = 0
  }
}





















window.addEventListener("keydown", function(e) {
  // console.log(`You pressed button ${e.key}.`)
  if(e.key === 'Enter'){
    const startLogo = document.getElementById('startLogo')
    startLogo.remove()
    gameStartTrigger = true
  }
  if ((gameOverTrigger === false) && (gameStartTrigger === true)){
    if(((e.key === 'ArrowUp') || (e.key === 'w')) && (heroPosY > 0)){ 
        heroPosY-=8
        pk1.currentframe++;
        if(directionChecker === 'atk-right'){
            pk1.img.src = "assets/char.png"
            directionChecker = 'right'
        }
        if(directionChecker === 'atk-left'){
            pk1.img.src = "assets/reverse_char.png"
            directionChecker = 'left'
        } 
    }
    if (((e.key === 'ArrowDown') || (e.key === 's')) && (heroPosY < 752)){
        heroPosY+=8
        pk1.currentframe++;
        if(directionChecker === 'atk-right'){
            pk1.img.src = "assets/char.png"
            directionChecker = 'right'
        }
        if(directionChecker === 'atk-left'){
            pk1.img.src = "assets/reverse_char.png"
            directionChecker = 'left'
        } 

    }
    if(((e.key === 'ArrowLeft') || (e.key === 'a')) && (heroPosX > 0)){
        // myAudio.play();
        heroPosX-=8
        pk1.currentframe++;
        if ( directionChecker !== 'left'){
            pk1.img.src = "assets/reverse_char.png"
            directionChecker = 'left'
        }
    }
    if (((e.key === 'ArrowRight') || (e.key === 'd')) && (heroPosX < 1408)){
        heroPosX+=8
        pk1.currentframe++;
        if ( directionChecker !== 'right'){
            console.log
            pk1.img.src = "assets/char.png"
            directionChecker = 'right'
        }
    }
    if ((e.key === ' ') && ((directionChecker === 'right') || (directionChecker === 'atk-right'))){
        if ((pk1.img.src === "assets/atk-advanced.png") === false){
            pk1.img.src = "assets/atk-advanced.png"
            pk1.currentframe++;
            directionChecker = 'atk-right'
            const atkDiv = document.createElement('div')
            atkDiv.setAttribute('id','damage')
            canvas.append(atkDiv)

            // if ((((randomNum1 - 55) < heroPosX ) && (heroPosX < (randomNum1 + 5))) && (((randomNum2 - 70) < heroPosY ) && (heroPosY < (randomNum2 + 70))) && (monsterStats.health > (0))) {
            //     monsterStats.health -= 1
            //     console.log(`Health remaining: ${monsterStats.health}`)
            // } // Checks if within range. If so, minus health from monster.
        } else {
            pk1.currentframe++;
        }

        }
    if ((e.key === ' ') && ((directionChecker === 'left') || (directionChecker === 'atk-left'))){
        if ((pk1.img.src === "assets/atk-advanced-reversed.png") === false){
            pk1.img.src = "assets/atk-advanced-reversed.png"
            pk1.currentframe++;
            directionChecker = 'atk-left'
        } else {
            pk1.currentframe++;
        }
}

    }

// If 'SPACE' is pressed, and heroPosX/Y coincides with EnemyPosX/y, deal damage. else if heroPosX/Y coincides with EnemyPosX/y receive damage.
// posX += 8
// console.log(`You pressed button ${e.key}.`)

}
);

/*
When windows.onload, press Enter to run startGame()
startGame() should: 

context.clearRect(0,0,canvas.width, canvas.height); << To remove all previous frame animation

<<
context.drawImage(pk1.img, pk1.currentframe * pk1.width , 0 , pk1.width , pk1.height , heroPosX ,heroPosY , pk1.width * 2, pk1.height * 2)

  if(pk1.currentframe>=pk1.totalframes){
    pk1.currentframe = 0
  }
>>
This is to draw in the hero and keep him continuously moving. If we keep all the characters same sized, the only thing that should be dynamic is the .img. and heroPosX. heroPosY.

*/