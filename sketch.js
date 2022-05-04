var fruit_image, background_image, rabbit_image, rabbit_chorando, rabbit_comendo;
var Rabbit, botao, mute;
var background_sound, eat_sound, cut_rope_sound, air_sound, sad_sound;
var bexiga;
var ismobile, w, h;

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope, rope2;
var fruit;
var fruit_con, fruit_con2;

function preload (){

  fruit_image = loadImage ("melon.png")
  background_image = loadImage ("background.png")
  rabbit_image = loadImage ("Rabbit-01.png")
  rabbit_chorando = loadAnimation ("sad_2.png", "sad_3.png")
  rabbit_comendo = loadAnimation ("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
  background_sound = loadSound ("sound1.mp3")
  eat_sound = loadSound ("eating_sound.mp3")
  cut_rope_sound = loadSound ("rope_cut.mp3")
  air_sound = loadSound ("air.wav")
  sad_sound = loadSound ("sad.wav")

}

function setup() 
{
  var ismobile = /iPhone|iPad|iPod|Android/i.test (navigator.userAgent)

  if (ismobile){
    w = displayWidth
    h = displayHeight
    createCanvas(w, h);
  }

  else {
    w = windowWidth
    h = windowHeight
    createCanvas (w, h);
  }

  
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground (200,690,600,20);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  rope = new Rope (7, {x:245, y:30})

  var options_fruit = {
    friction: 1
  }

  fruit = Bodies.circle (300, 300, 20, options_fruit)
  Matter.Composite.add (rope.body, fruit)

  fruit_con = new Links (rope, fruit)
  

  Rabbit = createSprite (250, 620)
  Rabbit.addImage (rabbit_image)
  Rabbit.scale = 0.25
  Rabbit.addAnimation ("chorando", rabbit_chorando)
  Rabbit.addAnimation ("comendo", rabbit_comendo)

  botao = createImg ("cut_btn.png")
  botao.position (220, 30)
  botao.size (50, 50)
  botao.mouseClicked (cut)

  bexiga = createImg ("balloon.png")
  bexiga.position (15, 270)
  bexiga.size (150, 100)
  bexiga.mouseClicked (soprador)

  background_sound.play ()

  mute = createImg ("mute.png")
  mute. position (450, 20)
  mute.size (50, 50)
  mute.mouseClicked (mutar)
  
}

function draw() {
  background(background_image);
  ground.show();
  
  Engine.update(engine);

  if (collide (fruit, ground.body, 300) == true){
    Rabbit.changeAnimation ("chorando")
    console.log ("hewhyfuyfuy")
}

  if (collide (fruit, Rabbit, 60) == true){
    Rabbit.changeAnimation ("comendo")
    eat_sound.play ()
    World.remove (engine.world, fruit)
    fruit = null
  }
  
  rope.show ()
  
 // ellipse (fruit.position.x, fruit.position.y, 30, 30)

  drawSprites();
  imageMode (CENTER)

  if (fruit!= null){
  image (fruit_image, fruit.position.x, fruit.position.y, 70, 70)
  }
}

function cut (){
  rope. break ()
  fruit_con.detach ()
  fruit_con = null
}

function cut2 (){
  rope2. break ()
  fruit_con2.detach ()
  fruit_con2 = null
}

function collide (fruta, coelho, distancia){
  if (fruta!= null){
    var d = dist (fruta.position.x, fruta.position.y, coelho.position.x, coelho.position.y)
    
    if (d < distancia){
      //console.log ("colidiu")
      
      return true
    }

    else {
      return false
    }

  }
}

function soprador (){
  if (collide (fruit, ground.body, 300) == false){
  Matter.Body.applyForce (fruit, {x:0, y:0}, {x:0.05, y: 0})
  air_sound.play ()
}
}
function mutar (){
  if (background_sound.isPlaying ()){
    background_sound.stop ()
  }

  else {
    background_sound.play ()
  }
}
