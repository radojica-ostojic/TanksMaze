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

// canvas creation

function init() {
  hiding();
  var canvas = document.getElementById("canvas");
  var gamescreen = canvas.getContext("2d");
  window.document.addEventListener('keydown', moveit, true);
  canvas.width = 650;
  canvas.height = 650;


  var playerright= new Image();
  playerright.src= 'pictures/playerright.png';
  var playerdown= new Image();
  playerdown.src= 'pictures/playerdown.png';
  var playerleft= new Image();
  playerleft.src= 'pictures/playerleft.png';
  var playerup= new Image();
  playerup.src= 'pictures/palyerup.png';
  
  var enemyright= new Image();
  enemyright.src= 'pictures/enemyright.png';
  var enemydown= new Image();
  enemydown.src= 'pictures/enemydown.png';
  var enemyleft= new Image();
  enemyleft.src= 'pictures/enemyleft.png';
  var enemyup= new Image();
  enemyup.src= 'pictures/enemyup.png';


  gamescreen.clearRect(0, 0, canvas.width, canvas.height);

  var apperance = document.getElementById('pitcurestyle');
  apperance.style.visibility = 'visible';
  

  
  canvas.style.display = "block";
  gamescreen.drawImage(playerright, 0, 0, TANKWIDTH, TANKHEIGHT);
  gamescreen.drawImage(enemyleft, 350, 350, TANKWIDTH, TANKHEIGHT);
  

  var playerPosX = 0;
  var playerPosY = 0;
  var playerPosition = 1;
  var enemyPosition = 1;
  var enemyPosX = 350;
  var enemyPosY = 350;


//   function for moving tank

  function moveit(e){
    //   player movement after click on down arrow
    if(e.keyCode == ARROWDOWN){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);

        if(playerPosY+30 < canvas.height){
            playerPosY += 10;
            gamescreen.drawImage(playerdown, playerPosX, playerPosY, TANKWIDTH, TANKHEIGHT);        
            console.log("player down");
        }
        else{
            gamescreen.drawImage(playerdown, playerPosX, playerPosY, TANKWIDTH, TANKHEIGHT);        
            console.log("player rotate down");
        }   
        playerPosition = 2;
    }
    // player movement after click on right arrow
    if(e.keyCode == ARROWLEFT){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);
        
        if(playerPosX-10 >= 0){   
            playerPosX -= 10;
            gamescreen.drawImage(playerleft, playerPosX, playerPosY, TANKWIDTH, TANKHEIGHT);
            console.log("player left");
        }
        else{
            gamescreen.drawImage(playerleft, playerPosX, playerPosY, TANKWIDTH, TANKHEIGHT);
            console.log("player rotate left");
        }
        playerPosition = 3;
    }
    // player movement after click on up arrow
    if(e.keyCode == ARROWUP){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);
            
        if(playerPosY-10 >= 0){
            // put it in front of IF so that tank would rotate if it is in the top
            // igra.clearRect(0, 0, canvas.width, canvas.height);
            playerPosY -= 10;
            gamescreen.drawImage(playerup, playerPosX, playerPosY, TANKWIDTH, TANKHEIGHT);
            console.log("player up");
        }
        else{
            gamescreen.drawImage(playerup, playerPosX, playerPosY, TANKWIDTH, TANKHEIGHT);
            console.log("player rotate up");
        }
        playerPosition = 4;
    }
    // player movement after click on right arrow
    if(e.keyCode == ARROWRIGHT){
        gamescreen.clearRect(0, 0, canvas.width, canvas.height);

        if(playerPosX+30 < canvas.width){
            playerPosX += 10;
            gamescreen.drawImage(playerright, playerPosX, playerPosY, TANKWIDTH, TANKHEIGHT);
            console.log("player right");
        }
        else{
            gamescreen.drawImage(playerright, playerPosX, playerPosY, TANKWIDTH, TANKHEIGHT);
            console.log("player rotate right");
        }
        playerPosition = 1;
    }
    redrawEnemy();
}
    gamescreen.drawImage(enemyright, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
    setInterval(enemyMovement, 600);
    function enemyMovement() {
        enemyPosition = Math.floor(Math.random()*4)+1;
        


        // enemy movement using only if
        // if(enemyPosition == 1){
        //     gamescreen.clearRect(0, 0, canvas.width, canvas.height);
        //     enemyPosX += 10;
        //     gamescreen.drawImage(enemyright, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
        //     console.log("enemy right");
        // }
        // else if(enemyPosition == 2){
        //     gamescreen.clearRect(0, 0, canvas.width, canvas.height);
        //     enemyPosY += 10;
        //     gamescreen.drawImage(enemydown, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
        //     console.log("enemy down");
        // }
        // else if(enemyPosition == 3){
        //     gamescreen.clearRect(0, 0, canvas.width, canvas.height);
        //     enemyPosX -= 10;
        //     gamescreen.drawImage(enemyleft, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
        //     console.log("enemy left");
        // }
        // else if(enemyPosition == 4){
        //     gamescreen.clearRect(0, 0, canvas.width, canvas.height);
        //     enemyPosY -= 10;
        //     gamescreen.drawImage(enemyup, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
        //     console.log("enemy up");
        // }  

        // enemy movement using switch with if
        switch (enemyPosition) {
            // enemy movement or rotation right
            case 1:
                gamescreen.clearRect(0, 0, canvas.width, canvas.height);

                if(enemyPosX+30 < canvas.width){
                    enemyPosX += 10;
                    gamescreen.drawImage(enemyright, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy right");
                }
                else{
                    gamescreen.drawImage(enemyright, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy rotate right");
                }
                break;
            // enemy movement or rotation down
            case 2:
                gamescreen.clearRect(0, 0, canvas.width, canvas.height);

                if(enemyPosY+30 < canvas.height){
                    enemyPosY += 10;
                    gamescreen.drawImage(enemydown, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy down");
                }
                else{
                    gamescreen.drawImage(enemydown, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy rotate down");
                }                
                break;
            // enemy movement or rotation left
            case 3:
                gamescreen.clearRect(0, 0, canvas.width, canvas.height);

                if(enemyPosX-10 >= 0){
                    enemyPosX -= 10;
                    gamescreen.drawImage(enemyleft, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy left");
                }
                else{
                    gamescreen.drawImage(enemyleft, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy rotate left");
                }
                break;
            //  enemy movement or rotation up
            case 4:
                gamescreen.clearRect(0, 0, canvas.width, canvas.height);
                if(enemyPosY-10 >= 0){
                    enemyPosY -= 10;
                    gamescreen.drawImage(enemyup, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy up");
                }
                else{
                    gamescreen.drawImage(enemyup, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
                    console.log("enemy rotate up");
                }
                break;
                                
        }
        
        redrawPlayer();
                                              
    }

    function redrawEnemy(){
    if(enemyPosition == 1)
        gamescreen.drawImage(enemyright, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
    else if(enemyPosition == 2)
        gamescreen.drawImage(enemydown, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
    else if(enemyPosition == 3)
        gamescreen.drawImage(enemyleft, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
    else if(enemyPosition == 4)
        gamescreen.drawImage(enemyup, enemyPosX, enemyPosY, TANKWIDTH, TANKHEIGHT);
    }
    
    function redrawPlayer(){
        if(playerPosition == 1)
            gamescreen.drawImage(playerright, playerPosX, playerPosY, TANKWIDTH, TANKHEIGHT);
        else if(playerPosition == 2)
            gamescreen.drawImage(playerdown, playerPosX, playerPosY, TANKWIDTH, TANKHEIGHT);
        else if(playerPosition == 3)
            gamescreen.drawImage(playerleft, playerPosX, playerPosY, TANKWIDTH, TANKHEIGHT);
        else if(playerPosition == 4)
            gamescreen.drawImage(playerup, playerPosX, playerPosY, TANKWIDTH, TANKHEIGHT);
    }


}
  

  

