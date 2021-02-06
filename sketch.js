var bird,bgimage,bg,obstacleGroup,PLAY,END,gameState,score=0,birdImage,birdSound,gosound;
var crow,crowImage,crowGroup;
var crowcreated=0;
function preload(){
 
 bgimage = loadImage("background.jpg");
 birdImage= loadImage("bird2.png");
 pillarImage = loadImage("pillar2.png");
 crowImage = loadImage("crow.png")
 birdSound = loadSound("hit.mp3");
 gosound = loadSound("gameoversound.mp3");

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(width/2,height/2-500,20,20);
  bg.addImage(bgimage);
  bg.scale=2;
  bg.velocityX=-6;
  bird = createSprite(100,200,50,50);
  bird.addImage(birdImage);
  bird.scale=0.2;
  obstacleGroup = new Group();
  crowGroup = new Group();
PLAY = 1;
END=0;
gameState = PLAY;
}

function draw() {
  background(255,0,255);  
  if(bg.x<0){
    bg.x=bg.width/2;
    }
 
  
  if(gameState === PLAY){
  
  if(keyWentDown("UP_ARROW")){
      birdSound.play();
    //console.log("test");
    }
  
  if(keyDown("UP_ARROW")|| touches.length>0){
  bird.velocityY=-5;

  }
 
  bird.velocityY=bird.velocityY+0.2+Math.round(score/800);
  if (frameCount%5===0&&bird.y<400) {
    score = score+1;
    crowcreated=0;
    }
  spawnobstacles();
  spawnCrows();
  if( bird.isTouching(obstacleGroup)||bird.y>height||bird.isTouching(crowGroup)){
    gosound.play();
    gameState= END;
   }
  }
  else if(gameState===END){
    obstacleGroup.destroyEach();
    crowGroup.destroyEach();
    bird.y=-100;
    
  }
   if(keyDown("r")&&gameState===END){
    gameState=PLAY;
    bird.y=-100;
    bird.x=100;
    score=0;
  }
  drawSprites();
  if(gameState===END){
    textSize(20);
    text("GAME OVER",300,200);
    text("press 'r' to play again",300,250);
  }
  text("score:"+score,700,20);
}
function spawnobstacles(){
  if (World.frameCount %40===0) {
  var obstacle = createSprite(width,height/2+250,20,150);
  obstacle.addImage(pillarImage);
  obstacle.scale=0.5;
  var obstacle2 = createSprite(width,random(height/2-270,height/2-250),20,150);
  obstacle2.addImage(pillarImage);
  obstacle2.scale=0.5;
  obstacle.shapeColor=("brown");
  obstacle2.shapeColor=("brown");
  obstacle.velocityX= -6;
  obstacle2.velocityX= -7;
  obstacle.lifetime=500; 
  obstacle2.lifetime=500; 
  obstacleGroup.add(obstacle);
  obstacleGroup.add(obstacle2);
  obstacle.setCollider("rectangle",0,0,315,705);
  obstacle2.setCollider("rectangle",0,0,315,705);
  
  }
  }
  function spawnCrows(){
    
  if(score>=100 && score%20===0 && crowcreated===0){
    crow = createSprite(800,random (height/2-200,height/2+200),10,10);
    crow.addImage(crowImage);
    crow.scale=0.4;
    crow.velocityX=- (6 + 3*score/100);
    crow.lifetime=250;
    crowGroup.add(crow);
    crowcreated=1;
  }
  }
