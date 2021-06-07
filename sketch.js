var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
  obstacle1Img = loadImage("images/obstacle1.png");
  obstacle2Img = loadImage("images/obstacle2.png");
  obstacle3Img = loadImage("images/obstacle3.png");
}

function setup(){
  
createCanvas(displayWidth, displayHeight);
// Moving background
path=createSprite(displayWidth/2, displayHeight/2);
path.addImage(pathImg);
path.velocityX = -2;

//creating boy running
mainCyclist  = createSprite(70,displayHeight/2);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
mainCyclist.setCollider("circle",0, 0, 250);
mainCyclist.debug = true;
  
gameOver = createSprite(displayWidth/2+70, displayWidth/2+30);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
obstaclesGroup = new Group();
}

function draw() {
  background(0);
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + distance/150);
  
   mainCyclist.y = World.mouseY;
   camera.position.x = mainCyclist.x;
  // camera.position.y = mainCyclist.y;
  //mainCyclist.velocityX = 2;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < displayWidth/2){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var appearance = Math.round(random(1,3));
  
  if (frameCount % 70 === 0) {
    switch(appearance){
      case 1: pinkCyclists();
        break;
        case 2:redCyclists();
        break;
        case 3: yellowCyclists();
        break;
        default: break;
    }
  }
    if (frameCount%80===0){
      obstacles();
    }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    if (obstaclesGroup.isTouching(mainCyclist)){
      gameState=END;
      obstacle.velocityX =0;
    }
}
  else if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", displayWidth/2+100,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    if(keyDown("up")) {
      reset();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,camera.position.x+340);
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,camera.position.x+390);
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,camera.position.x + 290);
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  obstaclesGroup.destroyEach();
  
  distance = 0;
}
function obstacles(){
  obstacle = createSprite(520,camera.position.x+490, 30,30);
  obstacle.scale= 0.08;
  obstacle.velocityX = -5;
  obstacle.velocityX = -(5 + 2*distance/100);
  obstacle.lifetime = 115;
  var position = Math.round(random(1,3));
  switch(position){
    case 1: obstacle.addImage(obstacle1Img);
      break;
      case 2: obstacle.addImage(obstacle2Img);
      break;
      case 3: obstacle.addImage(obstacle3Img);
      break;
      default : break;
  }
  
  obstaclesGroup.add(obstacle);
}