// All variables to be reset after GameOver or Replay >>>>>>>>>>>>>>>>>>>>>
let heroPosX = 0 //limit = 688
let heroPosY = 0 //limit = 344
let directionChecker = 'right'
let NUMBER_OF_MONSTERS = 1
let heroRange = 65
let heroStats = {
  maxHealth: 100,
  currentHealth: 100
}

let monList = [];
let graveStoneList = []
let gameStartTrigger = false
let gameOverTrigger = false
let gameWinTrigger = false
let playerScore = 0
let timer = 30
// HERO VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const pk1Timer = null;

const pk1 = {img:null, width:32, height:32, currentframe:0, totalframes:5}
pk1.img = new Image()
pk1.img.src = "assets/char.png"
let Herosize = 2;
let heroHealthBar = document.getElementById("health")
function drawHero () {
  context.drawImage(pk1.img, pk1.currentframe * 32 , 0 , 32 , 32 , heroPosX ,heroPosY , 32 * Herosize, 32 * Herosize) // Draws Hero on canvas at heroPosX and heroPosY coordinates.
  if(pk1.currentframe>=pk1.totalframes){
    pk1.currentframe = 0
  }
}

function getDamage (){
  let touchedMonster = null;
  for (let i = 0; i < monList.length; i++){ // => For every object in monList
    touchedMonster = monList[i];
    if((heroPosX < touchedMonster.position.x + 40) && (heroPosX > touchedMonster.position.x - 40) && (heroPosY < touchedMonster.position.y + 40) && (heroPosY > touchedMonster.position.y - 40) && (gameStartTrigger === true)){
      if(touchedMonster.status === 'alive'){
        if(heroStats.currentHealth > 0){
        heroStats.currentHealth --
      } else {
        gameOverTrigger = true
        pk1.img.src = 'assets/tombstone_sprite.png'
        pk1.currentframe++;
      }}

  }
    }
  // }
}



window.addEventListener("keydown", function(e) {
  // console.log(`You pressed button ${e.key}.`)
  if(e.key === 'Enter'){
    const startLogo = document.getElementById('startImage')
    if (gameStartTrigger === false){
    startLogo.style.visibility = 'hidden'
    gameStartTrigger = true
    bGAudio.play();}
    else {
    gameStartTrigger = false;
    startLogo.style.visibility = 'visible'
    bGAudio.pause();
    }
  }

  if((gameOverTrigger === true) || (gameWinTrigger === true)){
    if(e.key === 'Enter'){
      gameReset()
    }
  }

  if ((gameOverTrigger === false) && (gameStartTrigger === true)){
    if(((e.key === 'ArrowUp') || (e.key === 'w'))){ 
        heroPosY-=12
        if(heroPosY < -48){
          heroPosY = 824
        }
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
    if (((e.key === 'ArrowDown') || (e.key === 's'))){
        heroPosY+=12
        if(heroPosY > 824){
          heroPosY = -48
        }
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
    if(((e.key === 'ArrowLeft') || (e.key === 'a'))){
        // myAudio.play();
        heroPosX-=12
        if(heroPosX < -48){
          heroPosX = 1464
        }

        pk1.currentframe++;
        if ( directionChecker !== 'left'){
            pk1.img.src = "assets/reverse_char.png"
            directionChecker = 'left'
        }
    }
    if (((e.key === 'ArrowRight') || (e.key === 'd'))){
        heroPosX+=12
        if(heroPosX > 1464){
          heroPosX = -48
        }
        pk1.currentframe++;
        if ( directionChecker !== 'right'){
            pk1.img.src = "assets/char.png"
            directionChecker = 'right'
        }
    }
    if ((e.key === ' ') && ((directionChecker === 'right') || (directionChecker === 'atk-right'))){
        if ((pk1.img.src === "assets/atk-advanced.png") === false){
            pk1.img.src = "assets/atk-advanced.png"
            pk1.currentframe++;
            directionChecker = 'atk-right'
        }
        }
    if ((e.key === ' ') && ((directionChecker === 'left') || (directionChecker === 'atk-left'))){
        if ((pk1.img.src === "assets/atk-advanced-reversed.png") === false){
            pk1.img.src = "assets/atk-advanced-reversed.png"
            pk1.currentframe++;
            directionChecker = 'atk-left'
        }
      }
    if (e.key === ' '){
      punchAudio.play();
      let monster = null;
      for (let i = 0; i < monList.length; i++){ // => For every object in monList
        monster = monList[i];
        if((heroPosX < monster.position.x + heroRange) && (heroPosX > monster.position.x - heroRange) && (heroPosY < monster.position.y + heroRange) && (heroPosY > monster.position.y - heroRange) && (gameStartTrigger === true)){
          if(monster.health > 0){
            monster.health -=1
            // console.log(`This monster has ${monster.health} hp left!`)
          }else {
            monster.status = 'dead'
            monsterAudio.play();
            playerScore += 1
            timer += 1
            heroStats.currentHealth += 5
            graveStoneList.push([monster.position.x,monster.position.y])
            monster.position.x = 9999
            monster.position.y = 9999
          }
        }
      }
    }
  }
}
);

// ---------------------------------------------------

// MONSTER VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const monsterTimer = null;
const monster = {img:null, width:32, height:32, currentframe:0, totalframes:5}
monster.img = new Image()
monster.img.src = "assets/enemy_walk_jellyfish.png"
const graveStoneObj = {img:null, width:32, height:32, currentframe:0, totalframes:5}
graveStoneObj.img = new Image()
graveStoneObj.img.src = "assets/skulls.png"


function produceMonsterLocationX () {
  return Math.round(Math.random() * 1300)
}
function produceMonsterLocationY () {
  return Math.round(Math.random() * 500)
}
function produceRandomVelocity(){
  let num = Math.round(Math.random()*1) + 1; // get random number
  num *= Math.round(Math.random()) ? 1 : -1; // it will either return it as it is, or turn it negative bcos of -1
  return num
}

function makeMonster (){ // creates an object with position, velocity and health. But wont show up on canvas as it hasnt been drawn yet.
  for (let i = 0; i < NUMBER_OF_MONSTERS; i++){
  monList.push({
    position: {
      x: produceMonsterLocationX(),
      y: produceMonsterLocationY()
      },
      velocity: {
      x: produceRandomVelocity(),
      y: produceRandomVelocity()
      },
      health: 20,
      status: 'alive'
    }
  )}
} // Number of objects created is limited to variable NUMBER_OF_MONSTERS.

function drawMonster (item) { // Actually draws the monster out, using coordinates from makeMonster()
  context.drawImage(monster.img, monster.currentframe * 32 , 0 , 32 , 32 , item.position.x ,item.position.y , 32 * 2, 32 * 2) // Draws Monster on canvas at monsterPosX and monsterPosY coordinates.
  if(monster.currentframe>=monster.totalframes){
    monster.currentframe = 0
  }
}

function drawMonsterS(){ // Draws all the monsters out, according to the number of objects in monList.
  let item;
  for (let i = 0; i < monList.length;i++){
    item = monList[i]
    drawMonster(item)
  }
}

function moveMonster(){
  let item;
  for (let i =0; i < monList.length; i++){ // => For every object in monList
    item = monList[i];
    if(item.status === 'alive') // To make the monsters reappear once they go off screen.
      {item.position.x += item.velocity.x;
      if (item.position.x > 1400){
        item.position.x = -16;
      } else if (item.position.x < -16){
        item.position.x = 1400
      }
      item.position.y += item.velocity.y
      if (item.position.y > 780){
        item.position.y = -16;
      } else if (item.position.y < -16){
        item.position.y = 780
      }
    
    // console.log(`${item.position.x}, ${item.position.y}`)
   }
  }
}
function deadMonster(){
  let graveStone;
  for (let i = 0; i < graveStoneList.length; i++){
    graveStone = graveStoneList[i]
    context.drawImage(graveStoneObj.img, graveStoneObj.currentframe * 32 , 0 , 32 , 32 , graveStone[0] ,graveStone[1] , 32 * 2, 32 * 2)
   }
  }

// ---------------------------------------------------

// INITIALIZING  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const ANIMATION_INTERVAL = 25
const canvas = document.getElementById('canvas')
const context = canvas.getContext("2d")
let displayScore = document.getElementById('your-score')
let displayHiScore = document.getElementById('highscore')
const bGAudio = new Audio('assets/bg_music.mp3');
const monsterAudio = new Audio('assets/monsterDead-one.mp3')
const punchAudio = new Audio('assets/punch-fast.mp3')
const gameOverAudio = new Audio('assets/losingSound.mp3')
const winAudio = new Audio('assets/winAudio.mp3')

window.onload = function() {
  displayScore.innerText = `Your Score: ${playerScore}`
  displayHiScore.innerHTML = `High Score: ${highScore}`
  setInterval(renderAll,ANIMATION_INTERVAL)
  setInterval(getDamage,ANIMATION_INTERVAL)
  setInterval(secTimer30,1000)
  // getRealHS()
};

function renderAll (){ // Clears the canvas, then draws everything every 25miliseconds.
if(gameStartTrigger === true){
  context.clearRect(0,0,canvas.width, canvas.height);
  heroHealthBar.value = heroStats.currentHealth
  heroHealthBar.max = heroStats.maxHealth
  document.getElementById('timer').value = timer
  drawMonsterS()
  moveMonster()
  monster.currentframe++;
  deadMonster()
  drawHero()
  gameOverState()
  gameWon ()
  document.getElementById('heart').style.left  = (((1355 * heroHealthBar.value) / 100) + 70)+"px";
  document.getElementById('hourglass').style.top  = (((840 * timer) / 30) - 70)+"px";
  if(playerScore > highScore){
    localStorage.setItem("HighScore", playerScore);
  }
  displayScore.innerText = `Your Score: ${playerScore}`
  displayHiScore.innerHTML = `High Score: ${highScore}`
  // console.log(`This is the element: ${displayHiScore.innerText}`)
  // console.log(`This is the HiScore: ${highScore}`)

  // if(highScore === null){
  //   highScore = 'No Players Yet!'
  // }
  displayHiScore.innerText = `High Score: ${getRealHS()}`
  }
}
makeMonster()

function secTimer30 (){
  if(gameStartTrigger === true){
    timer--
    if(timer === -1){
      gameOverTrigger = true
    }
  }
}

function getRealHS (){
  const getHs = localStorage.getItem('HighScore')
  return getHs
}

// ---------------------------------------------------

// >>>> GAME STATES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let highScore = localStorage.getItem("HighScore")
document.getElementById('timer').value = timer
const gameOver = {img:null, width:500, height:500, currentframe:0, totalframes:1}
gameOver.img = new Image()
gameOver.img.src = "assets/game-over.png"
const gameWin = {img:null, width:500, height:500, currentframe:0, totalframes:1}
gameWin.img = new Image()
gameWin.img.src = "assets/you-win.png"

function gameOverState (){
  if(gameOverTrigger === true){
    context.drawImage(gameOver.img, 5 , 10 , 600 , 500 , 500 , 150 , 700, 600)
    gameStartTrigger = false;
    bGAudio.pause();
    gameOverAudio.play()
  }
}

function gameWon (){
  if(graveStoneList.length === NUMBER_OF_MONSTERS){
    context.drawImage(gameWin.img, 5 , 10 , 1411 , 501 , 450 , 250 , 600, 400)
    gameStartTrigger = false;
    gameWinTrigger = true;
    winAudio.play()
    bGAudio.pause()
  }
  
}

function gameReset(){
bGAudio.load();
context.clearRect(0,0,canvas.width, canvas.height);
heroPosX = 0 //limit = 688
heroPosY = 0 //limit = 344
directionChecker = 'right'
NUMBER_OF_MONSTERS = 20
heroRange = 65
heroStats = {
  maxHealth: 100,
  currentHealth: 100
}

monList = [];
graveStoneList = []
gameStartTrigger = false
gameOverTrigger = false
gameWinTrigger = false
playerScore = 0
timer = 30
pk1.img.src = "assets/char.png"
console.log('Game reset!')
makeMonster()

if(playerScore > highScore){
  localStorage.setItem("HighScore", playerScore);
}

}

// ---------------------------------------------------