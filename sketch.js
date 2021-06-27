//declaring variables-
var path, pathImg;
var player, playerAnimation, player_CollidedAnimation;

var diamond, diamondImg;
var coin, coinImg;

var jewellery, jewelleryImg;

var sword, swordImg, swordGroup;
var diamondGroup, coinGroup, jewelleryGroup;

var treasureCollection = 0;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;


//function to load Images, Animations, Sounds, etc.. - 
function preload(){
  //loading Images
  pathImg = loadImage("track.jpg");
  playerAnimation = loadAnimation("Img1.png", "Img2.png", "Img3.png", "Img4.png", "Img5.png", "Img6.png", "Img7.png", "Img8.png");
  player_CollidedAnimation = loadAnimation("Img2.png");
  diamondImg = loadImage("diamond.png");
  coinImg = loadImage("coin.png");
  jewelleryImg = loadImage("jewellery.png");
  swordImg = loadImage("sword.png");
}

//setUp function -
function setup(){
   
  //creating the canvas
  createCanvas(400,600);

  //creating the path
  path = createSprite(200,200);
  //adding image to path
  path.addImage(pathImg);
  //giving velocity to the path
  path.velocityY = 4;
  //scaling  it
  path.scale = 0.9;

  //creating the player
  player = createSprite(70,580,50,50);
  player.addAnimation("player",playerAnimation);
  player.scale = 0.9;

  //creating the groups -  
  diamondGroup = new Group();
  coinGroup = new Group();
  jewelleryGroup = new Group();
  swordGroup = new Group();
}

//draw function -
function draw(){
 //giving background Image or color
 background(0); 
 
 //creating edges and colliding the player with it.
 edges = createEdgeSprites();
 player.collide(edges);

 //gameState -
 if(gameState === PLAY){
   //giving movement to the player
    player.x = World.mouseX;

    //making infinite ground
      if(path.y > 400){
      path.y = height/2;
     }

//calling the functions -
createDiamond();
createCoins();
createJewellery();
createSword();

if (coinGroup.isTouching(player)) {
 coinGroup.destroyEach();
 treasureCollection = treasureCollection + 50;
}
else if (diamondGroup.isTouching(player)) {
 diamondGroup.destroyEach();
 treasureCollection = treasureCollection + 75;  
}
else if (jewelleryGroup.isTouching(player)) {
 jewelleryGroup.destroyEach();
 treasureCollection = treasureCollection + 100;  
 }
else{
  if(swordGroup.isTouching(player)){
    gameState = END;

    path.velocityY = 0;
    diamondGroup.destroyEach();
    diamondGroup.setVelocityYEach(0);
    coinGroup.destroyEach();
    coinGroup.setVelocityYEach(0);
    jewelleryGroup.destroyEach();
    jewelleryGroup.setVelocityYEach(0);
    swordGroup.destroyEach();
    swordGroup.setVelocityYEach(0);

    player.addAnimation("collided", player_CollidedAnimation);
  }
}
}

//drawing everything
 drawSprites();

 //showing text-
 textSize(15);
 fill("red");
 textFont("Seoge Script");
 text("Treasure: "+ treasureCollection,20,30);
}

//function to spawn diamonds -
function createDiamond(){
  if(World.frameCount % 200 === 0){
    diamond = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamond.velocityY = 3;
    diamond.lifetime = 200;
    diamond.addImage(diamondImg);
    diamond.scale = 0.4;
    diamondGroup.add(diamond);
  }
}

//function to spawn coins -
function createCoins(){
  if(World.frameCount % 320 === 0){
    coin = createSprite(Math.round(random(20, 350),40, 10, 10));
    coin.velocityY = 3;
    coin.lifetime = 200;
    coin.addImage(coinImg);
    coin.scale = 0.3;
    coinGroup.add(coin);
  }
}

//function to spawn jewellery -
function createJewellery(){
  if(World.frameCount % 410 === 0){
    jewellery = createSprite(Math.round(random(50, 350),40, 10, 10));
    jewellery.addImage(jewelleryImg);
    jewellery.scale = 0.32;
    jewellery.velocityY = 3;
    jewellery.lifetime = 200;
    jewellery.shapeColor = "pink";
    jewelleryGroup.add(jewellery);
  }
}

//function to spawn sword -
function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.31;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  sword.shapeColor = "white";
  }
}
