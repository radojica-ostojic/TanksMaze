const ARROWLEFT = 37;
const ARROWUP = 38;
const ARROWRIGHT = 39;
const ARROWDOWN = 40;
const TANKWIDTH = 30;
const TANKHEIGHT = 30;



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
var playerPosX = 1;
var playerPosY = 1;
var playerPosition = 1;
var enemyPosition = 1;
var enemyPosX = 18;
var enemyPosY = 6;
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
var gameBorders = [[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
                    [-1, 1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, -1],
                    [-1, 0, -1, -1, -1, -1, -1, 0, -1, -1, -1, 0, -1, -1, -1, -1, 0, -1, -1, -1, 0, -1], 
                    [-1, 0, 0, 0, -1, 0, -1, 0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, -1],
                    [-1, 0, -1, 0, -1, 0, 0, 0, 0, -1, -1, 0, -1, 0, -1, -1, -1, -1, -1, 0, 0, -1],
                    [-1, 0, -1, 0, -1, 0, -1, -1, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, -1], 
                    [-1, 0, -1, 0, -1, 0, -1, 0, 0, -1, 0, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1],
                    [-1, 0, -1, 0, 0, 0, -1, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1],
                    [-1, 0, 0, 0, 0, -1, -1, 0, -1, 0, 0, 0, 0, -1, -1, -1, -1, 0, -1, 0, 0, -1], 
                    [-1, -1, 0, -1, 0, -1, 0, 0, 0, 0, -1, -1, 0, -1, 0, 0, -1, 0, -1, -1, 0, -1],
                    [-1, 0, 0, -1, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, -1, -1, 0, 0, 0, -1, 0, -1],
                    [-1, 0, 0, -1, 0, -1, 0, -1, 0, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, -1, 0, -1], 
                    [-1, 0, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, 0, -1, -1, 0, 0, 0, -1],
                    [-1, 0, -1, 0, 0, 0, -1, 0, 0, -1, -1, -1, -1, -1, 0, 0, -1, 0, 0, -1, 0, -1],
                    [-1, 0, -1, 0, -1, 0, -1, 0, -1, -1, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, -1], 
                    [-1, 0, -1, 0, -1, 0, -1, 0, -1, 0, 0, -1, -1, -1, 0, 0, -1, 0, 0, -1, 0, -1],
                    [-1, 0, 0, 0, -1, 0, 0, 0, 0, 0, -1, -1, 0, -1, -1, 0, -1, 0, -1, -1, 0, -1],
                    [-1, 0, -1, 0, -1, -1, -1, -1, -1, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, -1], 
                    [-1, 0, -1, 0, -1, 0, 2, 0, -1, -1, -1, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1],
                    [-1, 0, 0, 0, -1, 0, -1, -1, -1, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1, 0, 0, -1],
                    [-1, 0, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1], 
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]];

function moveit(e){
    var now = new Date().getTime();

    if((now - prevTime) < 200)
        return; 
    
    prevTime = now;

    //   player movement after click on down arrow
    if(e.keyCode == ARROWDOWN){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);

        if((gameBorders[playerPosX+1][playerPosY]) != -1){
            gameBorders[playerPosX][playerPosY] = 0;
            playerPosX++;
            gameBorders[playerPosX][playerPosY] = 1;
            gamescreen.drawImage(playerdown, playerPosY*30, playerPosX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player down");
            console.log(" vrednost x: ", playerPosX, "  Vredonst y: ", playerPosY);
        }
        else{
            gamescreen.drawImage(playerdown, playerPosY*30, playerPosX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player rotate down");
        }   
        playerPosition = 2;
    }
    // player movement after click on left arrow
    if(e.keyCode == ARROWLEFT){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);
        
        if((gameBorders[playerPosX][playerPosY-1]) != -1){
            gameBorders[playerPosX][playerPosY] = 0;
            playerPosY--;
            gameBorders[playerPosX][playerPosY] = 1;
            gamescreen.drawImage(playerleft, playerPosY*30, playerPosX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player left");
            console.log(" vrednost x: ", playerPosX, "  Vredonst y: ", playerPosY);
        }
        else{
            gamescreen.drawImage(playerleft, playerPosY*30, playerPosX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player rotate left");
        } 


        playerPosition = 3;
    }
    // player movement after click on up arrow
    if(e.keyCode == ARROWUP){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);
            
        if((gameBorders[playerPosX-1][playerPosY]) != -1){
            gameBorders[playerPosX][playerPosY] = 0;
            playerPosX--;
            gameBorders[playerPosX][playerPosY] = 1;
            gamescreen.drawImage(playerup, playerPosY*30, playerPosX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player up");
            console.log(" vrednost x: ", playerPosX, "  Vredonst y: ", playerPosY);
        }
        else{
            gamescreen.drawImage(playerup, playerPosY*30, playerPosX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player rotate up");
        } 
        playerPosition = 4;
    }
    // player movement after click on right arrow
    if(e.keyCode == ARROWRIGHT){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);

        if((gameBorders[playerPosX][playerPosY+1]) != -1){
            gameBorders[playerPosX][playerPosY] = 0;
            playerPosY++;
            gameBorders[playerPosX][playerPosY] = 1;
            gamescreen.drawImage(playerright, playerPosY*30, playerPosX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player right");
            console.log(" vrednost x: ", playerPosX, "  Vredonst y: ", playerPosY);
        }
        else{
            gamescreen.drawImage(playerright, playerPosY*30, playerPosX*30, TANKWIDTH, TANKHEIGHT);        
            console.log("player rotate right");
        } 
        playerPosition = 1;
    }
    redrawEnemy();
    obstacleDrawing();
}






// canvas creation

function init() {
  hiding();
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
  gamescreen.drawImage(playerright, playerPosX*30, playerPosY*30, TANKWIDTH, TANKHEIGHT);
  gamescreen.drawImage(enemyleft, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
  obstacleDrawing();

//   function for moving enemy tank    
  setInterval(enemyMovement, 300);
}
  

function redrawPlayer(){
    if(playerPosition == 1)
        this.gamescreen.drawImage(playerright, playerPosY*30, playerPosX*30, TANKWIDTH, TANKHEIGHT);
    else if(playerPosition == 2)
        this.gamescreen.drawImage(playerdown, playerPosY*30, playerPosX*30, TANKWIDTH, TANKHEIGHT);
    else if(playerPosition == 3)
        this.gamescreen.drawImage(playerleft, playerPosY*30, playerPosX*30, TANKWIDTH, TANKHEIGHT);
    else if(playerPosition == 4)
        this.gamescreen.drawImage(playerup, playerPosY*30, playerPosX*30, TANKWIDTH, TANKHEIGHT);
}

function redrawEnemy(){
    if(enemyPosition == 1)
        gamescreen.drawImage(enemyright, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
    else if(enemyPosition == 2)
        gamescreen.drawImage(enemydown, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
    else if(enemyPosition == 3)
        gamescreen.drawImage(enemyleft, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
    else if(enemyPosition == 4)
        gamescreen.drawImage(enemyup, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
    }

    function enemyMovement() {
        enemyPosition = Math.floor(Math.random()*4)+1;
        // enemy movement using switch with if
        switch (enemyPosition) {
            // enemy movement or rotation right
            case 1:
                gamescreen.clearRect(0, 0, canvas.width, canvas.height);

                if((gameBorders[enemyPosX][enemyPosY+1]) != -1){
                    gameBorders[enemyPosX][enemyPosY] = 0;
                    enemyPosY++;
                    gameBorders[enemyPosX][enemyPosY] = 2;
                    gamescreen.drawImage(enemyright, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy right");
                }
                else{
                    gamescreen.drawImage(enemyright, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy rotate right");
                }
                break;
            // enemy movement or rotation down
            case 2:
                gamescreen.clearRect(0, 0, canvas.width, canvas.height);

                if((gameBorders[enemyPosX+1][enemyPosY]) !=-1){
                    gameBorders[enemyPosX][enemyPosY] = 0;
                    enemyPosX++;
                    gameBorders[enemyPosX][enemyPosY] = 2;
                    gamescreen.drawImage(enemydown, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy down");
                }
                else{
                    gamescreen.drawImage(enemydown, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy rotate down");
                }                
                break;
            // enemy movement or rotation left
            case 3:
                gamescreen.clearRect(0, 0, canvas.width, canvas.height);

                if((gameBorders[enemyPosX][enemyPosY-1]) != -1){
                    gameBorders[enemyPosX][enemyPosY] = 0;
                    enemyPosY--;
                    gameBorders[enemyPosX][enemyPosY] = 2;
                    gamescreen.drawImage(enemyleft, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy left");
                }
                else{
                    gamescreen.drawImage(enemyleft, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy rotate left");
                }
                break;
            //  enemy movement or rotation up
            case 4:
                gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                
                if((gameBorders[enemyPosX-1][enemyPosY]) != -1){
                    gameBorders[enemyPosX][enemyPosY] = 0;
                    enemyPosX--;
                    gameBorders[enemyPosX][enemyPosY] = 2;
                    gamescreen.drawImage(enemyup, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy up");
                }
                else{
                    gamescreen.drawImage(enemyup, enemyPosY*30, enemyPosX*30, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy rotate up");
                }
                break;   
        }
        
        redrawPlayer();
        obstacleDrawing();
                                              
    }
function obstacleDrawing(){
    for (let indexI = 0; indexI < gameBorders.length; indexI++) {
        var gameBorder = gameBorders[indexI];
        for (let indexJ = 0; indexJ < gameBorder.length; indexJ++) {
            if(gameBorders[indexI][indexJ] === -1){
                let arrayWidth = indexI * 30;
                let arrayHeight = indexJ * 30;
                gamescreen.fillStyle = "#804000";
                gamescreen.fillRect(arrayHeight, arrayWidth, TANKHEIGHT, TANKWIDTH);
            }
                
        }
    }
}