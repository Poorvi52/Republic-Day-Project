var terrorist, terrorist1Image, terrorist2Image, terrorist3Image;
var blast,blastImage,battleGround,battleGroundImage;
var gun,gunImage, laserImage;
var shoot = 0;
var score = 0;
var laser,terroristGroup,laserGroup;
var explosionSound,laserSound,explosionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
function preload() {
  battleGroundImage = loadImage("battleground.jpg");
  terrorist1Image= loadImage("terrorist 1.png");
  terrorist2Image= loadImage("terrorist 2.png");
  terrorist3Image= loadImage("terrorist 3.png");
  gunImage = loadImage("gun.png");
  laserImage = loadImage("bullet.png");
  blastImage = loadImage("blast.png");
  explosionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser sound.mp3");
}

function setup() {  
  canvas = createCanvas(1000,700);
  space = createSprite(250,350,30,20);
  battleGround.addImage(battleGroundImage);
  battleGround.velocityY = (5 + score/10);

  gun = createSprite(250,600);
  gun.addImage(gunImage);
  gun.scale = 0.6;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;


  terroristGroup = new Group();
  laserGroup = new Group();
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    // console.log(frameCount);
    
    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;

    if(keyDown("battleground") && shoot < 460) {
      laser = createSprite(gun.x,gun.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && gun.x < 1000) {
      gun.x = gun.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && gun.x > 50) {
      gun.x = gun.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(terroristGroup.isTouching(p2) || terroristGroup.isTouching(p1)) {
      terroristGroup.destroyEach();
      var blast = createSprite(gun.x,gun.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      gun.destroy();
      gameState = end;
    }
    
    if(terroristGroup.isTouching(laserGroup)) {
      terroristGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }

    terrorists();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60)
    
    if(terroristGroup.isTouching(endline)) {
      terroristGroup.destroyEach();
      gameState = end;
    }
  }
  else if(gameState === end) {
    space.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(30);
    text("GAME OVER !",canvas.width/2-400,canvas.height/2);
    text("The terrorists have won. You fought bravely today! Good luck next time. Jai Hind",canvas.width/2-400,canvas.height/2+100);
    text("Your final score : "+score,canvas.width/2-400,canvas.height/2+200);

    
  }

  if(score == 50){
    gameState = end;

    background(255);
    stroke("black");
    fill("black");
    textSize(40);
    text("You protected everyone and have won! You fought very bravely. Jai Hind.",canvas.width/2-350,canvas.height/2);
    text("You Won !!!",canvas.width/2-70,canvas.height/2+60);

  }

  if(gameState === instruction) {
    stroke("gold");
    fill("gold");
    textFont("trebuchetMS")
    textSize(40);
    text("------KILL THE TERRORISTS------",canvas.width/2-300,canvas.height/2-300);
    text("ENJOY THE GAME!",canvas.width/2-300,canvas.height/2+170);
    stroke(255);
    fill(255);
    textSize(25);
    textFont("Helvetica");
    text(" Happy Republic Day.....",canvas.width/2-300,canvas.height/2-250);
    text(" The terrorists are attacking India's  residents.",canvas.width/2-300, canvas.height/2 - 210);
    text(" You are a brave soilder who is on the borders of India.",canvas.width/2-300,canvas.height/2-170);
    text(" Help and save the residents of India.",canvas.width/2-300,canvas.height/2-130);
    text(" Press 's' to start game.",canvas.width/2-300,canvas.height/2+50);
    text(" Use right and left arrow keys to move.",canvas.width/2-300,canvas.height/2-50);
    text(" Press 'space' to shoot.",canvas.width/2-300,canvas.height/2-90);
    text(" Shoot 50 germs to protect the Earth and its residents.",canvas.width/2-300,canvas.height-350);
    
    
    if(keyDown("s")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
  }
}
  

function  terrorists() {
  if(frameCount % 60 === 0) {
  
    var  terrorist = createSprite(Math.round(random(50,1000)),-20);
    terrorist.velocityY = (6 + score/10);
    terrorist.lifetime = 200;
    terrorist.scale = random(0.1,0.3);
    // terrorist.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: terrorist.addImage(terrorist1Image);
              terrorist.setCollider("circle",-80,10,160);
              break;
      case 2: germ.addImage(terrorist2Image);
              terrorist.setCollider("circle",50,0,150);
              break;
      case 3: terrorist.addImage(terrorist3Image);
              terrorist.setCollider("circle",0,0,170);
              default: break;
    }
    
    //console.log(terrorist.x);
    terroristGroup.add(terrorist);
  }
}