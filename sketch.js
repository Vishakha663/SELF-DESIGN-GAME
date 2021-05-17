const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var background1Img,background1,Niko;
var invisibleGround,CoinImg,MonsterImg,NikoImg,GiftboxImg,FlyingMonsterImg;
var CoinGroup,MonsterGroup,GiftboxGroup,FlyingMonsterGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var gameOver,gameOverImg,restart,restartImg;
var jumpSound,dieSound,giftRecievedSound;


function preload(){

   backgroundImg = loadImage("images/background.jpg");
   CoinImg = loadImage("images/coin.png");
   NikoImg = loadImage("images/Niko.png");
   MonsterImg = loadImage("images/monster.png");
   gameOverImg = loadImage("images/gameover.png");
   restartImg = loadImage("images/restart.png");
   GiftboxImg = loadImage("images/Giftbox.png");   
   FlyingMonsterImg = loadImage("images/monster2.png");             
   jumpSound = loadSound("Jump.mp3");
   dieSound = loadSound("Die.mp3");
   giftRecievedSound = loadSound("twinkle.mp3");
   
}

function setup() {

  engine = Engine.create();
  world = engine.world;

  createCanvas(displayWidth,displayHeight);

  background1 = createSprite(1400,400,900,800);
  background1.addImage(backgroundImg);
  
  Niko = createSprite(60,610,50,50);
  Niko.scale = 0.5;
  Niko.addImage(NikoImg);
  

  invisibleGround = createSprite(700,610,1400,30);
  invisibleGround.visible = false;

  gameOver = createSprite(700,400);
  gameOver.scale = 0.3;
  gameOver.addImage(gameOverImg);
  

  restart = createSprite(700,550);
  restart.addImage(restartImg);
  restart.scale = 0.2;

  CoinGroup = new Group();
  MonsterGroup = new Group();
  GiftboxGroup = new Group();
  FlyingMonsterGroup = new Group();

}

function draw() {

  
  background("white");
  background1.velocityX = -7;
  text("Score: "+ score, 1300,150);
  
  

  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    if(CoinGroup.isTouching(Niko)){
      CoinGroup.destroyEach();
      score = score+10;
    }

    if(GiftboxGroup.isTouching(Niko)){
      GiftboxGroup.destroyEach();
      giftRecievedSound.play();
      score = score+300;
    }
    
    if(background1.x < 0){
      background1.x = background1.width/2;
    }
    
    if(keyDown("space")&& Niko.y >= 400) {
        Niko.velocityY = -12;
        jumpSound.play();
    }
    
    Niko.velocityY = Niko.velocityY + 0.8
  
    spawnCoin();

    spawnMonster(); 

    spawnGiftbox();

    spawnFlyingMonster();
    
    if(MonsterGroup.isTouching(Niko)){
    
    gameState = END;
      dieSound.play();  

    }

    if(FlyingMonsterGroup.isTouching(Niko)){

      gameState = END;
      dieSound.play();

    }
  }

  else if(gameState === END){

    gameOver.visible = true;
    restart.visible = true;
    
    background1.velocityX = 0;
    Niko.velocityY = 0
      
     CoinGroup.setLifetimeEach(-1);
     MonsterGroup.setLifetimeEach(-1);
     GiftboxGroup.setLifetimeEach(-1);
     FlyingMonsterGroup.setLifetimeEach(-1);
     
     CoinGroup.setVelocityXEach(0);
     MonsterGroup.setVelocityXEach(0);  
     GiftboxGroup.setVelocityXEach(0);
     FlyingMonsterGroup.setVelocityXEach(0);

     
     
     Niko.velocityX  = 0;

     if(mousePressedOver(restart)){
       reset();
     }

  }
  
 Engine.update(engine);

  Niko.display();
  invisibleGround.display();
 
  
  drawSprites();

 Niko.collide(invisibleGround);

  
}

 function spawnCoin(){

        if(frameCount%20 === 0){
          var coin = createSprite(1400,350,10,40);
          coin.velocityX = -6;
          coin.addImage(CoinImg);
          coin.scale = 0.1;
          coin.lifetime = 245;
          coin.depth  =  gameOver.depth-1;
          CoinGroup.add(coin);
        }
       
}


function spawnMonster(){
            
      if(frameCount%70 === 0){
        var Monster = createSprite(1400,570,10,40);
        Monster.velocityX = -8;
        Monster.addImage(MonsterImg);
        Monster.scale = 0.2;
        Monster.lifetime = 170;
        Monster.depth  =  restart.depth-1;
        MonsterGroup.add(Monster);
      }

  
} 

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  CoinGroup.destroyEach();
  MonsterGroup.destroyEach();
  GiftboxGroup.destroyEach();
  FlyingMonsterGroup.destroyEach();
  score = 0;
  
}

function spawnGiftbox(){
  if(frameCount%600 === 0){
    var Giftbox = createSprite(1400,330,10,40)
    Giftbox.velocityX = -6;
    Giftbox.addImage(GiftboxImg);
    Giftbox.scale = 0.2;
    Giftbox.lifetime = 245;
    GiftboxGroup.add(Giftbox);
  }
}

function spawnFlyingMonster(){
  if(frameCount%500 === 0){
    var FlyingMonster = createSprite(1400,330,10,40);
    FlyingMonster.velocityX = -4;
    FlyingMonster.addImage(FlyingMonsterImg);
    FlyingMonster.scale = 0.3;
    FlyingMonster.lifetime = 305;
    FlyingMonsterGroup.add(FlyingMonster);
  }
}

