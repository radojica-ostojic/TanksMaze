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
var bulletPosX;
var bulletPosY;
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
var shootTimer;

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

function moveit(e){
    var now = new Date().getTime();
    if(e.keyCode == PLAYERSHOOT){
        if(tanks[0].shootFlag){ return;}
        bullet();
    }
    if((now - prevTime) < SPEED)
        return; 
    
    prevTime = now;

    //   player movement after click on down arrow
    if(e.keyCode == ARROWDOWN){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);

        if((gameContext[tanks[0].tankPositionX+1][tanks[0].tankPositionY]) == 0){
            gameContext[tanks[0].tankPositionX][tanks[0].tankPositionY] = 0;
            tanks[0].tankPositionX++;
            gameContext[tanks[0].tankPositionX][tanks[0].tankPositionY] = 1;
            gamescreen.drawImage(playerdown, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player down");
            console.log(" vrednost x: ", tanks[0].tankPositionX, "  Vredonst y: ", tanks[0].tankPositionY);
        }
        else{
            gamescreen.drawImage(playerdown, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player rotate down");
        }   
        tanks[0].position = DOWN;
    }
    // player movement after click on left arrow
    if(e.keyCode == ARROWLEFT){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);
        
        if((gameContext[tanks[0].tankPositionX][tanks[0].tankPositionY-1]) == 0){
            gameContext[tanks[0].tankPositionX][tanks[0].tankPositionY] = 0;
            tanks[0].tankPositionY--;
            gameContext[tanks[0].tankPositionX][tanks[0].tankPositionY] = 1;
            gamescreen.drawImage(playerleft, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player left");
            console.log(" vrednost x: ", tanks[0].tankPositionX, "  Vredonst y: ", tanks[0].tankPositionY);
        }
        else{
            gamescreen.drawImage(playerleft, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player rotate left");
        } 


        tanks[0].position = LEFT;
    }
    // player movement after click on up arrow
    if(e.keyCode == ARROWUP){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);
            
        if((gameContext[tanks[0].tankPositionX-1][tanks[0].tankPositionY]) == 0){
            gameContext[tanks[0].tankPositionX][tanks[0].tankPositionY] = 0;
            tanks[0].tankPositionX--;
            gameContext[tanks[0].tankPositionX][tanks[0].tankPositionY] = 1;
            gamescreen.drawImage(playerup, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player up");
            console.log(" vrednost x: ", tanks[0].tankPositionX, "  Vredonst y: ", tanks[0].tankPositionY);
        }
        else{
            gamescreen.drawImage(playerup, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player rotate up");
        } 
        tanks[0].position = UP;
    }
    // player movement after click on right arrow
    if(e.keyCode == ARROWRIGHT){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);
    
        if((gameContext[tanks[0].tankPositionX][tanks[0].tankPositionY+1]) == 0){
            gameContext[tanks[0].tankPositionX][tanks[0].tankPositionY] = 0;
            tanks[0].tankPositionY++;
            gameContext[tanks[0].tankPositionX][tanks[0].tankPositionY] = 1;
            gamescreen.drawImage(playerright, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player right");
            console.log(" vrednost x: ", tanks[0].tankPositionX, "  Vredonst y: ", tanks[0].tankPositionY);
        }
        else{
            gamescreen.drawImage(playerright, tanks[0].tankPositionY*30, tanks[0].tankPositionX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player rotate right");
        } 
        tanks[0].position = RIGHT;
    }
    
    redrawEnemy();
    obstacleDrawing();
    if(tanks[0].shootFlag){
        bullet();
    }
}






// canvas creation

function init() {
  hiding();
  dataInit();
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
  setTimeout(() => {
      tanks[0].aliveFlag = false;
    //   tanks[1].aliveFlag = false;
    //   tanks[2].aliveFlag = false;
    //   tanks[3].aliveFlag = false;
      gameRefresh();
  }, 1500);

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
tempoTimeVariable = setInterval(enemyMovement, SPEED*2);
}
  

function redrawPlayer(){
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
        for (let index = 2; index < 5; index++) {   
            if(tanks[index-1].aliveFlag){
                enemyPosition = Math.floor(Math.random()*4)+1;
                // enemy movement using switch with if
                switch (enemyPosition) {
                    // enemy movement or rotation right
                    case RIGHT:
                        gamescreen.clearRect(0, 0, canvas.width, canvas.height);

                        if((gameContext[tanks[index-1].tankPositionX][tanks[index-1].tankPositionY+1]) == 0){
                            gameContext[tanks[index-1].tankPositionX][tanks[index-1].tankPositionY] = 0;
                            tanks[index-1].tankPositionY++;
                            gameContext[tanks[index-1].tankPositionX][tanks[index-1].tankPositionY] = index;
                            gamescreen.drawImage(enemyright, tanks[index-1].tankPositionY*30, tanks[index-1].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
                            console.log("enemy right");
                        }
                        else{
                            gamescreen.drawImage(enemyright, tanks[index-1].tankPositionY*30, tanks[index-1].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
                            console.log("enemy rotate right");
                        }
                        break;
                    // enemy movement or rotation down
                    case DOWN:
                        gamescreen.clearRect(0, 0, canvas.width, canvas.height);

                        if((gameContext[tanks[index-1].tankPositionX+1][tanks[index-1].tankPositionY]) == 0){
                            gameContext[tanks[index-1].tankPositionX][tanks[index-1].tankPositionY] = 0;
                            tanks[index-1].tankPositionX++;
                            gameContext[tanks[index-1].tankPositionX][tanks[index-1].tankPositionY] = index;
                            gamescreen.drawImage(enemydown, tanks[index-1].tankPositionY*30, tanks[index-1].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
                            console.log("enemy down");
                        }
                        else{
                            gamescreen.drawImage(enemydown, tanks[index-1].tankPositionY*30, tanks[index-1].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
                            console.log("enemy rotate down");
                        }                
                        break;
                    // enemy movement or rotation left
                    case LEFT:
                        gamescreen.clearRect(0, 0, canvas.width, canvas.height);

                        if((gameContext[tanks[index-1].tankPositionX][tanks[index-1].tankPositionY-1]) == 0){
                            gameContext[tanks[index-1].tankPositionX][tanks[index-1].tankPositionY] = 0;
                            tanks[index-1].tankPositionY--;
                            gameContext[tanks[index-1].tankPositionX][tanks[index-1].tankPositionY] = index;
                            gamescreen.drawImage(enemyleft, tanks[index-1].tankPositionY*30, tanks[index-1].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
                            console.log("enemy left");
                        }
                        else{
                            gamescreen.drawImage(enemyleft, tanks[index-1].tankPositionY*30, tanks[index-1].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
                            console.log("enemy rotate left");
                        }
                        break;
                    //  enemy movement or rotation up
                    case UP:
                        gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                
                        if((gameContext[tanks[index-1].tankPositionX-1][tanks[index-1].tankPositionY]) == 0){
                            gameContext[tanks[index-1].tankPositionX][tanks[index-1].tankPositionY] = 0;
                            tanks[index-1].tankPositionX--;
                            gameContext[tanks[index-1].tankPositionX][tanks[index-1].tankPositionY] = index;
                            gamescreen.drawImage(enemyup, tanks[index-1].tankPositionY*30, tanks[index-1].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
                            console.log("enemy up");
                        }
                        else{
                            gamescreen.drawImage(enemyup, tanks[index-1].tankPositionY*30, tanks[index-1].tankPositionX*30, TANKWIDTH, TANKHEIGHT);
                            console.log("enemy rotate up");
                        }
                        break;   
                }
                if(tanks[0].shootFlag){
                    bullet();
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
function bullet(){
    if(tanks[0].shootFlag == 0){
        switch (tanks[0].position) {
            case 1:
                bulletPosY = tanks[0].tankPositionY + 1;
                bulletPosX = tanks[0].tankPositionX;
                shootTimer = setInterval(() => {
                    gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                    if(gameContext[bulletPosX][bulletPosY] == 2 || gameContext[bulletPosX][bulletPosY] == 3 || gameContext[bulletPosX][bulletPosY] == 4){
                        tanks[0].shootFlag = 0;
                        clearInterval(shootTimer); 
                        gameContext[bulletPosX][bulletPosY] = 0;
                        gameRefresh();
                    }
                    else if(gameContext[bulletPosX][bulletPosY] != -1){
                        tanks[0].shootFlag++;
                        if(gameContext[bulletPosX][bulletPosY-1] == 5){
                        gameContext[bulletPosX][bulletPosY-1] = 0;}
                        gameContext[bulletPosX][bulletPosY] = 5;
                        // gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                        bulletDrawing(bulletPosX, bulletPosY);
                        gamescreen.fill();
                        console.log("shoot right");
                    }
                     
                    else{
                        console.log("bullet hit wall on the right");
                        gameContext[bulletPosX][bulletPosY-1] = 0;
                        clearInterval(shootTimer); 
                        tanks[0].shootFlag = 0;
                        // gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    bulletPosY++;
                    redrawEnemy();
                    obstacleDrawing();
                    redrawPlayer();
                }, SPEED);
                break;
            case 2:
                bulletPosY = tanks[0].tankPositionY;
                bulletPosX = tanks[0].tankPositionX + 1;
                shootTimer = setInterval(() => {
                    gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                    if(gameContext[bulletPosX][bulletPosY] == 2 || gameContext[bulletPosX][bulletPosY] == 3 || gameContext[bulletPosX][bulletPosY] == 4){
                        tanks[0].shootFlag = 0;
                        clearInterval(shootTimer); 
                        gameContext[bulletPosX][bulletPosY] = 0;
                        gameRefresh();
                    }
                    else if(gameContext[bulletPosX][bulletPosY] != -1){
                        tanks[0].shootFlag++;
                        if(gameContext[bulletPosX-1][bulletPosY] == 5){
                            gameContext[bulletPosX-1][bulletPosY] = 0;
                        }
                        gameContext[bulletPosX][bulletPosY] = 5;
                        // gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                        bulletDrawing(bulletPosX, bulletPosY);
                        gamescreen.fill();
                        console.log("shoot down");
                    }
                     
                    else{
                        console.log("bullet hit wall on the bottom");
                        gameContext[bulletPosX-1][bulletPosY] = 0;
                        clearInterval(shootTimer); 
                        tanks[0].shootFlag = 0;
                        // gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    bulletPosX++;
                    redrawEnemy();
                    obstacleDrawing();
                    redrawPlayer();
                }, SPEED);
                break;
            case 3:
                bulletPosY = tanks[0].tankPositionY - 1;
                bulletPosX = tanks[0].tankPositionX;
                shootTimer = setInterval(() => {
                    gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                    if(gameContext[bulletPosX][bulletPosY] == 2 || gameContext[bulletPosX][bulletPosY] == 3 || gameContext[bulletPosX][bulletPosY] == 4){
                        tanks[0].shootFlag = 0;
                        clearInterval(shootTimer); 
                        gameContext[bulletPosX][bulletPosY] = 0;
                        gameRefresh();
                    }
                    else if(gameContext[bulletPosX][bulletPosY] != -1){
                        tanks[0].shootFlag++;
                        if(gameContext[bulletPosX][bulletPosY+1] == 5){
                            gameContext[bulletPosX][bulletPosY+1] = 0;}
                        gameContext[bulletPosX][bulletPosY] = 5;
                        // gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                        bulletDrawing(bulletPosX, bulletPosY);
                        gamescreen.fill();
                        console.log("shoot left");
                    }
                     
                    else{
                        console.log("bullet hit wall on the left");
                        gameContext[bulletPosX][bulletPosY+1] = 0;
                        clearInterval(shootTimer); 
                        tanks[0].shootFlag = 0;
                        // gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    bulletPosY--;
                    redrawEnemy();
                    obstacleDrawing();
                    redrawPlayer();
                }, SPEED);
                break;
            case 4:
                bulletPosY = tanks[0].tankPositionY;
                bulletPosX = tanks[0].tankPositionX - 1;
                shootTimer = setInterval(() => {
                    gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                    if(gameContext[bulletPosX][bulletPosY] == 2 || gameContext[bulletPosX][bulletPosY] == 3 || gameContext[bulletPosX][bulletPosY] == 4){
                        tanks[0].shootFlag = 0;
                        clearInterval(shootTimer); 
                        gameContext[bulletPosX][bulletPosY] = 0;
                        gameRefresh();
                    }
                    else if(gameContext[bulletPosX][bulletPosY] != -1){
                        tanks[0].shootFlag++;
                        if(gameContext[bulletPosX+1][bulletPosY] == 5){
                            gameContext[bulletPosX+1][bulletPosY] = 0;}
                        gameContext[bulletPosX][bulletPosY] = 5;
                        // gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                        bulletDrawing(bulletPosX, bulletPosY);
                        console.log("shoot up");
                    }
                     
                    else{
                        console.log("bullet hit up wall");
                        clearInterval(shootTimer);
                        gameContext[bulletPosX+1][bulletPosY] = 0;
                        tanks[0].shootFlag = 0;
                        // gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    bulletPosX--;
                    redrawEnemy();
                    obstacleDrawing();
                    redrawPlayer();
                }, SPEED);
                break;
            default:
                break;
        } 
    }
    // redrawing bullet if it's not going to be on wall
    else {
        if(gameContext[bulletPosX][bulletPosY] != -1){
            bulletDrawing(bulletPosX, bulletPosY);
        }
    }
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
        tanks.pop({...tank});
        tanks.pop({...tank});
        tanks.pop({...tank});
        tanks.pop({...tank});
        window.document.removeEventListener('keydown', moveit);
        clearInterval(tempoTimeVariable);
        canvas.style.display = 'none';
        document.getElementById('lost').style.display = 'block';
        // if (confirm("Player lost.\n\n RELOAD???")) {
        //     init();
        //   } else {
        //     window.location.reload(true);
        //   }
    }
    else if(!tanks[1].aliveFlag && !tanks[2].aliveFlag && !tanks[3].aliveFlag ){
        tanks.pop({...tank});
        tanks.pop({...tank});
        tanks.pop({...tank});
        tanks.pop({...tank});
        window.document.removeEventListener("keydown", moveit, true);
        clearInterval(tempoTimeVariable);
        canvas.style.display = 'none';
        document.getElementById('won').style.display = 'block';
        // if (confirm("Player won.\n\n RELOAD???")) {
        //     init();
        //   } else {
        //     window.location.reload(true);
        //   }
    }
}
function gameRefresh(){
    for (let noOfTank = 1; noOfTank < 5; noOfTank++) {
        let counter = 0;
        for (let indexI = 0; indexI < gameContext.length; indexI++) {
            var gameBorder = gameContext[indexI];
            for (let indexJ = 0; indexJ < gameBorder.length; indexJ++) {
                if(gameContext[indexI][indexJ] === noOfTank){
                   counter++;
                }    
            }
        }
        if(!counter){
            tanks[noOfTank-1].aliveFlag = false;
            console.log("hit tank number: ", noOfTank);
            clearInterval(shootTimer);
        }
    }
    gameFinished();
}
