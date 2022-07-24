const ARROWLEFT = 37;
const ARROWUP = 38;
const ARROWRIGHT = 39;
const ARROWDOWN = 40;
const PLAYERSHOOT = 32;
const TANKWIDTH = 30;
const TANKHEIGHT = 30;
const SPEED = 200;
const LEFT = 3;
const UP = 4;
const RIGHT = 1;
const DOWN = 2;


var pitcurestyle = document.getElementById("pitcurestyle"); 
// hiding starting page
function hiding() {
  var x = document.getElementById("btn");
  var y = document.getElementById("info");
  var z = document.getElementById("gameTitle");
  var j = document.getElementById("mainPage");
  j.style.display = "none";
  x.style.display = "none";
  y.style.display = "none";
  z.style.display = "none";
}
//global varible declaration
var enemyPosition = 1;
var tempoTimeVariable;
var bulletPosX = [];
var bulletPosY = [];
var canvas;
var gamescreen;
var playerright = new Image();
var playerdown = new Image();
var playerleft = new Image();
var playerup = new Image();
var enemyright = new Image();
var enemydown = new Image();
var enemyleft = new Image();
var enemyup = new Image();
var prevTime = new Date().getTime();
var gameContext = [];
var shootTimer = [];
var grid;
var currDistance;
var nextDistance;
var music = document.getElementById('track');
var counter;

const tank = {
    tankId : 0,
    tankPositionX : 0,
    tankPositionY : 0,
    position : RIGHT,
    prevPosition : RIGHT,
    aliveFlag : true,
    shootFlag : false
}
var tanks = [];


function soundtrack(){
    music.pause();
    music.currentTime = 0;
    music = document.getElementById('track');
    music.loop = true;
    music.autoplay = true;
    music.load();
    music.play();
}

function moveit(e){
    var now = new Date().getTime();
    
    if((now - prevTime) < SPEED)
        return; 
    
    prevTime = now;
    
    if(e.keyCode == PLAYERSHOOT){
        if(tanks[0].shootFlag){ return;}
        bullet(0);
    }
    //   player movement after click on down arrow
    if(e.keyCode == ARROWDOWN){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);
        // function call
        tankMovement(0, DOWN, playerdown);
    }
    // player movement after click on left arrow
    if(e.keyCode == ARROWLEFT){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);
        // function call
        tankMovement(0, LEFT, playerleft);
    }
    // player movement after click on up arrow
    if(e.keyCode == ARROWUP){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);
        // function call
        tankMovement(0, UP, playerup);       
    }
    // player movement after click on right arrow
    if(e.keyCode == ARROWRIGHT){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);
        // function call
        tankMovement(0, RIGHT, playerright); 
    }
    
    redrawEnemy();
    obstacleDrawing();
    if(tanks[0].shootFlag){
        bullet(0);
    }
    for(let id = 0; id < 4; id++){
        if(tanks[id].shootFlag){
            bulletRedraw(id);
        }
    }
}

// canvas creation
function init() {
  hiding();
  dataInit();
  soundtrack();
  canvas = document.getElementById("canvas");
  gamescreen = canvas.getContext("2d");
  window.document.addEventListener('keydown', moveit, true);
  canvas.width = 660;
  canvas.height = 660;



  playerright.src = 'pictures/playerright.png';
  playerdown.src = 'pictures/playerdown.png';
  playerleft.src = 'pictures/playerleft.png';
  playerup.src = 'pictures/palyerup.png';

  enemyright.src = 'pictures/enemyright.png';
  enemydown.src = 'pictures/enemydown.png';
  enemyleft.src = 'pictures/enemyleft.png';
  enemyup.src = 'pictures/enemyup.png';

  gamescreen.clearRect(0, 0, canvas.width, canvas.height);

  var apperance = document.getElementById('pitcurestyle');
  apperance.style.visibility = 'visible';
  
  canvas.style.display = "block";
  obstacleDrawing();
  gamescreen.drawImage(playerright, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
  for (let index = 2; index < 5; index++) {
      gamescreen.drawImage(enemyright, tanks[index-1].tankPositionY*30, tanks[index-1].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
  }
  

//   function for moving enemy tank    
tempoTimeVariable = setInterval(enemyMovement, SPEED*1.5);
}
  

function redrawPlayer(){
    gameContext[tanks[0].tankPositionX][tanks[0].tankPositionY] = 1;
    if(tanks[0].position == RIGHT)
        this.gamescreen.drawImage(playerright, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
    else if(tanks[0].position == DOWN)
        this.gamescreen.drawImage(playerdown, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
    else if(tanks[0].position == LEFT)
        this.gamescreen.drawImage(playerleft, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
    else if(tanks[0].position == UP)
        this.gamescreen.drawImage(playerup, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
}


function redrawEnemy(){
    for (let index = 1; index < 4; index++) {
        if(tanks[index].aliveFlag){
            enemyPosition = tanks[index].position;
            if(enemyPosition == RIGHT)
                gamescreen.drawImage(enemyright, tanks[index].tankPositionY*30, tanks[index].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
            else if(enemyPosition == DOWN)
                gamescreen.drawImage(enemydown, tanks[index].tankPositionY*30, tanks[index].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
            else if(enemyPosition == LEFT)
                gamescreen.drawImage(enemyleft, tanks[index].tankPositionY*30, tanks[index].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
            else if(enemyPosition == UP)
                gamescreen.drawImage(enemyup, tanks[index].tankPositionY*30, tanks[index].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
        }
    }
}
    function enemyMovement() {
        for (let index = 1; index < 4; index++) {    
            if(tanks[index].aliveFlag){
                grid = gameContext;
                if(shooting(index)){
                    if(tanks[index].shootFlag){
                        return;
                    }
                    bullet(index);
                }
                else{
                    enemyPosition = calculatingMove(index);
                    // enemy movement using switch with if
                    switch (enemyPosition) {
                    // enemy movement right
                        case RIGHT:
                            gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                            tankMovement(index, RIGHT, enemyright);            
                            break;
                    // enemy movement down
                        case DOWN:
                            gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                            tankMovement(index, DOWN, enemydown);            
                            break;
                    // enemy movement left
                        case LEFT:
                            gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                            tankMovement(index, LEFT, enemyleft);
                            break;
                    //  enemy movement up
                        case UP:
                            gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                            tankMovement(index, UP, enemyup);
                            break; 
                        default:
                            gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                            let pos = lastStepRotation(index);
                            tanks[index].position = pos;
                            console.log("odradio funkciju");
                            break;  
                    }
                }
                
                for(let id = 0; id < 4; id++){
                    if(tanks[id].shootFlag){
                        bulletRedraw(id);
                    }
                }

                redrawPlayer();
                redrawEnemy();
                obstacleDrawing();
                // console.log(tanks);
            }
        }                      
    }
function obstacleDrawing(){
    for (let indexI = 0; indexI < gameContext.length; indexI++) {
        var gameBorder = gameContext[indexI];
        for (let indexJ = 0; indexJ < gameBorder.length; indexJ++) {
            if(gameContext[indexI][indexJ] === -1){
                let arrayWidth = indexI * 30;
                let arrayHeight = indexJ * 30;
                gamescreen.fillStyle = "#804000";
                gamescreen.fillRect(arrayHeight, arrayWidth, TANKHEIGHT, TANKWIDTH);
            }
                
        }
    }
}
function bullet(id){
    if(tanks[id].shootFlag == 0){
        switch (tanks[id].position) {
            case RIGHT:
                bulletPosY[id] = tanks[id].tankPositionY + 1;
                bulletPosX[id] = tanks[id].tankPositionX;
                shootTimer[id] = setInterval(() => {
                    gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                    if(gameContext[bulletPosX[id]][bulletPosY[id]] == 1 || gameContext[bulletPosX[id]][bulletPosY[id]] == 2 || gameContext[bulletPosX[id]][bulletPosY[id]] == 3 || gameContext[bulletPosX[id]][bulletPosY[id]] == 4){
                        tanks[id].shootFlag = 0;
                        clearInterval(shootTimer[id]);
                        if(gameContext[bulletPosX[id]][bulletPosY[id]-1] == 5){
                            gameContext[bulletPosX[id]][bulletPosY[id]-1] = 0;
                        }
                        gameContext[bulletPosX[id]][bulletPosY[id]] = 0;
                        gameRefresh();
                    }
                    else if(gameContext[bulletPosX[id]][bulletPosY[id]] != -1){
                        tanks[id].shootFlag++;
                        if(gameContext[bulletPosX[id]][bulletPosY[id]-1] == 5){
                        gameContext[bulletPosX[id]][bulletPosY[id]-1] = 0;
                    }
                        gameContext[bulletPosX[id]][bulletPosY[id]] = 5;
                        bulletDrawing(bulletPosX[id], bulletPosY[id]);
                        gamescreen.fill();
                        console.log("shoot right");
                    }
                     
                    else{
                        console.log("bullet hit wall on the right");
                        gameContext[bulletPosX[id]][bulletPosY[id]-1] = 0;
                        clearInterval(shootTimer[id]); 
                        tanks[id].shootFlag = 0;
                    }
                    bulletPosY[id]++;
                    redrawEnemy();
                    obstacleDrawing();
                    redrawPlayer();
                }, SPEED);
                break;
            case DOWN:
                bulletPosY[id] = tanks[id].tankPositionY;
                bulletPosX[id] = tanks[id].tankPositionX + 1;
                shootTimer[id] = setInterval(() => {
                    gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                    if(gameContext[bulletPosX[id]][bulletPosY[id]] == 1 || gameContext[bulletPosX[id]][bulletPosY[id]] == 2 || gameContext[bulletPosX[id]][bulletPosY[id]] == 3 || gameContext[bulletPosX[id]][bulletPosY[id]] == 4){
                        tanks[id].shootFlag = 0;
                        clearInterval(shootTimer[id]);
                        if(gameContext[bulletPosX[id]-1][bulletPosY[id]] == 5){
                            gameContext[bulletPosX[id]-1][bulletPosY[id]] = 0;
                        }
                        gameContext[bulletPosX[id]][bulletPosY[id]] = 0;
                        gameRefresh();
                    }
                    else if(gameContext[bulletPosX[id]][bulletPosY[id]] != -1){
                        tanks[id].shootFlag++;
                        if(gameContext[bulletPosX[id]-1][bulletPosY[id]] == 5){
                            gameContext[bulletPosX[id]-1][bulletPosY[id]] = 0;
                        }
                        gameContext[bulletPosX[id]][bulletPosY[id]] = 5;
                        bulletDrawing(bulletPosX[id], bulletPosY[id]);
                        gamescreen.fill();
                        console.log("shoot down");
                    }
                    else{
                        console.log("bullet hit wall on the bottom");
                        gameContext[bulletPosX[id]-1][bulletPosY[id]] = 0;
                        clearInterval(shootTimer[id]); 
                        tanks[id].shootFlag = 0;
                    }
                    bulletPosX[id]++;
                    redrawEnemy();
                    obstacleDrawing();
                    redrawPlayer();
                }, SPEED);
                break;
            case LEFT:
                bulletPosY[id] = tanks[id].tankPositionY - 1;
                bulletPosX[id] = tanks[id].tankPositionX;
                shootTimer[id] = setInterval(() => {
                    gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                    if(gameContext[bulletPosX[id]][bulletPosY[id]] == 1 || gameContext[bulletPosX[id]][bulletPosY[id]] == 2 || gameContext[bulletPosX[id]][bulletPosY[id]] == 3 || gameContext[bulletPosX[id]][bulletPosY[id]] == 4){
                        tanks[id].shootFlag = 0;
                        clearInterval(shootTimer[id]); 
                        if(gameContext[bulletPosX[id]][bulletPosY[id]+1] == 5){
                            gameContext[bulletPosX[id]][bulletPosY[id]+1] = 0;
                        }
                        gameContext[bulletPosX[id]][bulletPosY[id]] = 0;
                        gameRefresh();
                    }
                    else if(gameContext[bulletPosX[id]][bulletPosY[id]] != -1){
                        tanks[id].shootFlag++;
                        if(gameContext[bulletPosX[id]][bulletPosY[id]+1] == 5){
                            gameContext[bulletPosX[id]][bulletPosY[id]+1] = 0;
                        }
                        gameContext[bulletPosX[id]][bulletPosY[id]] = 5;
                        bulletDrawing(bulletPosX[id], bulletPosY[id]);
                        gamescreen.fill();
                        console.log("shoot left");
                    }
                    else{
                        console.log("bullet hit wall on the left");
                        gameContext[bulletPosX[id]][bulletPosY[id]+1] = 0;
                        clearInterval(shootTimer[id]); 
                        tanks[id].shootFlag = 0;
                    }
                    bulletPosY[id]--;
                    redrawEnemy();
                    obstacleDrawing();
                    redrawPlayer();
                }, SPEED);
                break;
            case UP:
                bulletPosY[id] = tanks[id].tankPositionY;
                bulletPosX[id] = tanks[id].tankPositionX - 1;
                shootTimer[id] = setInterval(() => {
                    gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                    if(gameContext[bulletPosX[id]][bulletPosY[id]] == 1 || gameContext[bulletPosX[id]][bulletPosY[id]] == 2 || gameContext[bulletPosX[id]][bulletPosY[id]] == 3 || gameContext[bulletPosX[id]][bulletPosY[id]] == 4){
                        tanks[id].shootFlag = 0;
                        clearInterval(shootTimer[id]); 
                        if(gameContext[bulletPosX[id]+1][bulletPosY[id]] == 5){
                            gameContext[bulletPosX[id]+1][bulletPosY[id]] = 0;
                        }
                        gameContext[bulletPosX[id]][bulletPosY[id]] = 0;
                        gameRefresh();
                    }
                    else if(gameContext[bulletPosX[id]][bulletPosY[id]] != -1){
                        tanks[id].shootFlag++;
                        if(gameContext[bulletPosX[id]+1][bulletPosY[id]] == 5){
                            gameContext[bulletPosX[id]+1][bulletPosY[id]] = 0;
                        }
                        gameContext[bulletPosX[id]][bulletPosY[id]] = 5;
                        bulletDrawing(bulletPosX[id], bulletPosY[id]);
                        console.log("shoot up");
                    }
                     
                    else{
                        console.log("bullet hit up wall");
                        clearInterval(shootTimer[id]);
                        gameContext[bulletPosX[id]+1][bulletPosY[id]] = 0;
                        tanks[id].shootFlag = 0;
                    }
                    bulletPosX[id]--;
                    redrawEnemy();
                    obstacleDrawing();
                    redrawPlayer();
                }, SPEED);
                break;
            default:
                break;
        } 
    }
}
function bulletRedraw(id){
    // redrawing bullet if it's not going to be on wall or hit anyone
        bulletDrawing(bulletPosX[id], bulletPosY[id]);
}
function bulletDrawing(bulletPosX, bulletPosY){
    gamescreen.fillStyle = "#ffffff";
    gamescreen.beginPath();
    gamescreen.arc(bulletPosY*30+15, bulletPosX*30+15, 5, 0, 2 * Math.PI);
    gamescreen.fill();
}



// initialization of matrix and tanks starting locations
function dataInit(){
    gameContext = [[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
                  [-1, 1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, -1],
                  [-1, 0, -1, -1, -1, -1, -1, 0, -1, -1, -1, 0, -1, -1, -1, -1, 0, -1, -1, -1, 0, -1], 
                  [-1, 0, 0, 0, -1, 0, -1, 0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, -1],
                  [-1, 0, -1, 0, -1, 0, 0, 0, 0, -1, -1, 0, -1, 0, -1, -1, -1, -1, -1, 0, 0, -1],
                  [-1, 0, -1, 0, -1, 0, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, -1], 
                  [-1, 0, -1, 0, -1, 0, -1, 0, 0, -1, 3, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1],
                  [-1, 0, -1, 0, 0, 0, -1, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1],
                  [-1, 0, 0, 0, 0, -1, -1, 0, -1, 0, 0, 0, 0, -1, -1, -1, -1, 0, -1, 0, 0, -1], 
                  [-1, -1, 0, -1, 0, -1, 0, 0, 0, 0, -1, -1, 0, -1, 0, 0, -1, 0, -1, -1, 0, -1],
                  [-1, 0, 0, -1, 0, 0, 0, -1, 0, 0, -1, 0, 4, -1, -1, -1, 0, 0, 0, -1, 0, -1],
                  [-1, 0, 0, -1, 0, -1, 0, -1, 0, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, -1, 0, -1], 
                  [-1, 0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, 0, -1, -1, 0, 0, 0, -1],
                  [-1, 0, -1, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, 0, 0, -1, 0, 0, -1, 0, -1],
                  [-1, 0, -1, 0, -1, 0, -1, 0, -1, -1, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, -1], 
                  [-1, 0, -1, 0, -1, 0, -1, 0, -1, 0, 0, -1, -1, -1, 0, 0, -1, 0, 0, -1, 0, -1],
                  [-1, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, -1, 0, -1, -1, 0, -1, 0, -1, -1, 0, -1],
                  [-1, 0, -1, 0, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, -1], 
                  [-1, 0, -1, 0, -1, 0, 0, 2, -1, -1, -1, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1],
                  [-1, 0, 0, 0, -1, 0, -1, -1, -1, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, 0, 0, -1],
                  [-1, 0, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1], 
                  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]];
    
    for (let noOfTank = 1; noOfTank < 5; noOfTank++) {
        for (let indexI = 0; indexI < gameContext.length; indexI++) {
            var gameBorder = gameContext[indexI];
            for (let indexJ = 0; indexJ < gameBorder.length; indexJ++) {
                if(gameContext[indexI][indexJ] === noOfTank){
                    tank.tankId = noOfTank-1;
                    tank.tankPositionX = indexI;
                    tank.tankPositionY = indexJ;
                    tank.position = RIGHT;
                    tank.prevPosition = RIGHT;
                    tank.aliveFlag = true;
                    tank.shootFlag = false;
                    tanks.push({...tank});
                    console.log(tanks);
                    console.log("inside for loop",tanks);
                }    
            }
        }
    }
    console.log("after for loop");
    console.log(tanks);
}

function gameFinished(){
    if(!tanks[0].aliveFlag){
        window.document.removeEventListener('keydown', moveit);
        clearInterval(tempoTimeVariable);
        canvas.style.display = 'none';
        document.getElementById('lost').style.display = 'block';
        music.pause();
        music = document.getElementById('gameLost');
        music.play();
    }
    else if(!tanks[1].aliveFlag && !tanks[2].aliveFlag && !tanks[3].aliveFlag ){
        window.document.removeEventListener("keydown", moveit, true);
        clearInterval(tempoTimeVariable);
        canvas.style.display = 'none';
        document.getElementById('won').style.display = 'block';
        music.pause();
        music = document.getElementById('gameWon');
        music.play();
    }
}
function gameRefresh(){
    for (let noOfTank = 0; noOfTank < 4; noOfTank++) {
        let counter = 0;
        for (let indexI = 0; indexI < gameContext.length; indexI++) {
            var gameBorder = gameContext[indexI];
            for (let indexJ = 0; indexJ < gameBorder.length; indexJ++) {
                if(gameContext[indexI][indexJ] === noOfTank+1){
                   counter++;
                }    
            }
        }
        if(!counter){
            tanks[noOfTank].aliveFlag = false;
            console.log("hit tank number: ", noOfTank);
            clearInterval(shootTimer);
        }
    }
    gameFinished();
}
function popTanks(){
    tanks.pop({...tank});
    tanks.pop({...tank});
    tanks.pop({...tank});
    tanks.pop({...tank});
}

function tankMovement(tankIndex, rotation, pitcure){
    switch (rotation) {
        case DOWN:
            tanks[tankIndex].position = DOWN;
            if(tanks[tankIndex].position != tanks[tankIndex].prevPosition){
                gamescreen.drawImage(pitcure, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
                // console.log("tank rotate down",tankIndex);
                tanks[tankIndex].prevPosition = tanks[tankIndex].position;
            }
            else if((gameContext[tanks[tankIndex].tankPositionX+1][tanks[tankIndex].tankPositionY]) == 0){
                gameContext[tanks[tankIndex].tankPositionX][tanks[tankIndex].tankPositionY] = 0;
                tanks[tankIndex].tankPositionX++;
                gameContext[tanks[tankIndex].tankPositionX][tanks[tankIndex].tankPositionY] = tankIndex+1;
                gamescreen.drawImage(pitcure, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
                // console.log("tank down",tankIndex);
            }
            else{
                gamescreen.drawImage(pitcure, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
                // console.log("tank rotate down",tankIndex);
            }
            break;
        case LEFT:
            tanks[tankIndex].position = LEFT;
            if(tanks[tankIndex].position != tanks[tankIndex].prevPosition){
                gamescreen.drawImage(pitcure, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
                console.log("tank rotate left",tankIndex);
                tanks[tankIndex].prevPosition = tanks[tankIndex].position;
            }
            else if((gameContext[tanks[tankIndex].tankPositionX][tanks[tankIndex].tankPositionY-1]) == 0){
                gameContext[tanks[tankIndex].tankPositionX][tanks[tankIndex].tankPositionY] = 0;
                tanks[tankIndex].tankPositionY--;
                gameContext[tanks[tankIndex].tankPositionX][tanks[tankIndex].tankPositionY] = tankIndex+1;
                gamescreen.drawImage(pitcure, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
                console.log("tank left",tankIndex);
            }
            else{
                gamescreen.drawImage(pitcure, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
                console.log("tank rotate left",tankIndex);
            } 
        break;
        case RIGHT:
            tanks[tankIndex].position = RIGHT;
            if(tanks[tankIndex].position != tanks[tankIndex].prevPosition){
                gamescreen.drawImage(pitcure, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
                // console.log("tank rotate right",tankIndex);
                tanks[tankIndex].prevPosition = tanks[tankIndex].position;
            }    
            else if((gameContext[tanks[tankIndex].tankPositionX][tanks[tankIndex].tankPositionY+1]) == 0){
                gameContext[tanks[tankIndex].tankPositionX][tanks[tankIndex].tankPositionY] = 0;
                tanks[tankIndex].tankPositionY++;
                gameContext[tanks[tankIndex].tankPositionX][tanks[tankIndex].tankPositionY] = tankIndex+1;
                gamescreen.drawImage(pitcure, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
                // console.log("tank right",tankIndex);
            }
            else{
                gamescreen.drawImage(pitcure, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
                // console.log("tank rotate right",tankIndex);
            } 
        break;
        case UP:
            tanks[tankIndex].position = UP;
            if(tanks[tankIndex].position != tanks[tankIndex].prevPosition){
                gamescreen.drawImage(pitcure, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
                // console.log("tank rotate up",tankIndex);
                tanks[tankIndex].prevPosition = tanks[tankIndex].position;
            }
            else if((gameContext[tanks[tankIndex].tankPositionX-1][tanks[tankIndex].tankPositionY]) == 0){
                gameContext[tanks[tankIndex].tankPositionX][tanks[tankIndex].tankPositionY] = 0;
                tanks[tankIndex].tankPositionX--;
                gameContext[tanks[tankIndex].tankPositionX][tanks[tankIndex].tankPositionY] = tankIndex+1;
                gamescreen.drawImage(pitcure, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
                // console.log("tank up",tankIndex);
            }
            else{
                gamescreen.drawImage(pitcure, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
                // console.log("tank rotate up",tankIndex);
            } 
        break;
        default:
            break;
    }
     
}

function movementCalculation(grid, numberOfTnk){
// Javascript Code implementation for above problem
var N = 22;
var M = 22;
 
// QItem for current location and distance
// from source location
class QItem {
     
    constructor(x, y, w)
    {
        this.row = x;
        this.col = y;
        this.dist = w;
    }
};
 
function minDistance(grid)
{
    var source = new QItem(0, 0, 0);
 
    // To keep track of visited QItems. Marking
    // blocked cells as visited.
    var visited = Array.from(Array(N), ()=>Array(M).fill(0));
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < M; j++)
        {
            if (grid[i][j] == '-1' || grid[i][j] == '2' || grid[i][j] == '3' || grid[i][j] == '4')
                visited[i][j] = true;
            else
                visited[i][j] = false;
 
            // Finding source
            if (grid[i][j] == numberOfTnk+1)
            {
               source.row = i;
               source.col = j;
            }
        }
    }
 
    // applying BFS on matrix cells starting from source
    var q = [];
    q.push(source);
    visited[source.row][source.col] = true;
    while (q.length!=0) {
        var p = q[0];
        q.shift();
 
        // Destination found;
        if (grid[p.row][p.col] == '1'){
            return p.dist;
        }
        // moving up
        if (p.row - 1 >= 0 &&
            visited[p.row - 1][p.col] == false) {
            q.push(new QItem(p.row - 1, p.col, p.dist + 1));
            visited[p.row - 1][p.col] = true;
        }
 
        // moving down
        if (p.row + 1 < N &&
            visited[p.row + 1][p.col] == false) {
            q.push(new QItem(p.row + 1, p.col, p.dist + 1));
            visited[p.row + 1][p.col] = true;
        }
 
        // moving left
        if (p.col - 1 >= 0 &&
            visited[p.row][p.col - 1] == false) {
            q.push(new QItem(p.row, p.col - 1, p.dist + 1));
            visited[p.row][p.col - 1] = true;
        }
 
         // moving right
        if (p.col + 1 < M &&
            visited[p.row][p.col + 1] == false) {
            q.push(new QItem(p.row, p.col + 1, p.dist + 1));
            visited[p.row][p.col + 1] = true;
        }
    }
    
    return -1;
}
 
// Driver code
// grid = gameContext;
console.log("udaljenost tenka ", numberOfTnk," je ", minDistance(grid));
return minDistance(grid);
// This code is contributed by rrrtnx.
}
function calculatingMove(numberOfTank){
    var distance = 1000;
    var returnValue = 0;
    var tanksCopy = tanks;
    for (let index = 1; index < 5; index++) {
        grid = gameContext;
        switch (index) {
            case RIGHT:
                tanksCopy[numberOfTank].tankPositionY++;
                if(grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] == 0 || grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] == 1){
                    grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY-1] = 0;
                    grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] = numberOfTank + 1;
                    if(movementCalculation(grid, numberOfTank) < distance){
                        distance = movementCalculation(grid, numberOfTank);
                        returnValue = RIGHT;
                    }
                    grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] = 0;
                    grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY-1] = numberOfTank + 1;
                }
                tanksCopy[numberOfTank].tankPositionY--;
                break;
            // enemy movement down
            case DOWN:
                tanksCopy[numberOfTank].tankPositionX++;
                if(grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] == 0  || grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] == 1){
                    grid[tanksCopy[numberOfTank].tankPositionX-1][tanksCopy[numberOfTank].tankPositionY] = 0;
                    grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] = numberOfTank + 1;
                    if(movementCalculation(grid, numberOfTank) < distance){
                        distance = movementCalculation(grid, numberOfTank);
                        returnValue = DOWN;
                    }
                    grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] = 0;
                    grid[tanksCopy[numberOfTank].tankPositionX-1][tanksCopy[numberOfTank].tankPositionY] = numberOfTank + 1;
                }
                tanksCopy[numberOfTank].tankPositionX--;
                break;
            // enemy movement left
            case LEFT:
                tanksCopy[numberOfTank].tankPositionY--;
                if(grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] == 0 || grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] == 1){
                    grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY+1] = 0;
                    grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] = numberOfTank + 1;
                    if(movementCalculation(grid, numberOfTank) < distance){
                        distance = movementCalculation(grid, numberOfTank);
                        returnValue = LEFT;
                    }
                    grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] = 0;
                    grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY+1] = numberOfTank + 1;
                }
                tanksCopy[numberOfTank].tankPositionY++;
                break;
            //  enemy movement up
            case UP:
                tanksCopy[numberOfTank].tankPositionX--;
                if(grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] == 0 || grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] == 1){
                    grid[tanksCopy[numberOfTank].tankPositionX+1][tanksCopy[numberOfTank].tankPositionY] = 0;
                    grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] = numberOfTank + 1;
                    if(movementCalculation(grid, numberOfTank) < distance){
                        distance = movementCalculation(grid, numberOfTank);
                        returnValue = UP;
                    }
                    grid[tanksCopy[numberOfTank].tankPositionX][tanksCopy[numberOfTank].tankPositionY] = 0;
                    grid[tanksCopy[numberOfTank].tankPositionX+1][tanksCopy[numberOfTank].tankPositionY] = numberOfTank + 1;

                }
                tanksCopy[numberOfTank].tankPositionX++;
                break;   
        }
    }
    // console.log("tank number", numberOfTank, "have value",returnValue);
    if(distance == 0){
        return 0;
    }
    return returnValue;
}
function shooting(currTank){
    counter = 0;
    // this checks if player tank is below or above enemy tank and if enemy tank is rotated down or up so it can shoot
    if(tanks[0].tankPositionY == tanks[currTank].tankPositionY){
        if(tanks[0].tankPositionX > tanks[currTank].tankPositionX && tanks[currTank].position == DOWN){
            for (let index = tanks[currTank].tankPositionX+1; index < tanks[0].tankPositionX; index++) {
                if(gameContext[index][tanks[currTank].tankPositionY] != 0){
                    return 0;
                }
                counter++;
            }
            if((gameContext[tanks[currTank].tankPositionX+1][tanks[currTank].tankPositionY]) == 1){
                counter++;
            }
        }
        if(tanks[0].tankPositionX < tanks[currTank].tankPositionX && tanks[currTank].position == UP){
            for (let index = tanks[0].tankPositionX+1; index < tanks[currTank].tankPositionX; index++) {
                if(gameContext[index][tanks[currTank].tankPositionY] != 0){
                    return 0;
                }
                counter++;
            }
            if((gameContext[tanks[currTank].tankPositionX-1][tanks[currTank].tankPositionY]) == 1){
                counter++;
            }
        }
    }
    // this checks if player tank is left or right of enemy tank and if enemy tank is rotated left or right so it can shoot
    if(tanks[0].tankPositionX == tanks[currTank].tankPositionX){
        if(tanks[0].tankPositionY > tanks[currTank].tankPositionY && tanks[currTank].position == RIGHT){
            for (let index = tanks[currTank].tankPositionY+1; index < tanks[0].tankPositionY; index++) {
                if(gameContext[tanks[currTank].tankPositionX][index] != 0){
                    return 0;
                }
                counter++;
            }
            if((gameContext[tanks[currTank].tankPositionX][tanks[currTank].tankPositionY+1]) == 1){
                counter++;
            }
        }
        if(tanks[0].tankPositionY < tanks[currTank].tankPositionY && tanks[currTank].position == LEFT){
            for (let index = tanks[0].tankPositionY+1; index < tanks[currTank].tankPositionY; index++) {
                if(gameContext[tanks[currTank].tankPositionX][index] != 0){
                    return 0;
                }
                counter++;
            }
            if((gameContext[tanks[currTank].tankPositionX][tanks[currTank].tankPositionY-1]) == 1){
                counter++;
            }
        }  
    }
    if(counter)
        return 1;
}


function lastStepRotation(tankIndex){
    // this checks if player tank is below or above enemy tank and if enemy tank is rotated down or up so it can rotate
    if(tanks[0].tankPositionX > tanks[tankIndex].tankPositionX){
        gamescreen.drawImage(enemydown, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
        return DOWN;
    }
    if(tanks[0].tankPositionX < tanks[tankIndex].tankPositionX){
        gamescreen.drawImage(enemyup, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
        return UP;
    }

    // this checks if player tank is left or right of enemy tank and if enemy tank is rotated left or right so it can rotate
    if(tanks[0].tankPositionY > tanks[tankIndex].tankPositionY){
        gamescreen.drawImage(enemyright, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
        return RIGHT;
    }
    if(tanks[0].tankPositionY < tanks[tankIndex].tankPositionY){
        gamescreen.drawImage(enemyleft, tanks[tankIndex].tankPositionY*30, tanks[tankIndex].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
        return LEFT;
    }
}