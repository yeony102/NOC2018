let den = [1, 2, 4, 5, 8, 10];
let denIdx = 2;
let img;
let ps;
let repeller;

//let particles = [];

function preload() {
 img = loadImage('test.png');
}

function setup() {
  createCanvas(680, 520);
  pixelDensity(1);
  
  
  image(img, 0, 0);
  
  ps = new ParticleSystem(den[denIdx]);
  repeller = new Repeller(width, height);

}

function draw() {
  background(255);

  ps.applyRepeller(repeller);
  ps.applyRecover();
  
  repeller.update();
  
  ps.display();
  ps.update();
                       
                       
}

function keyPressed() {
  

  
  if(keyCode == UP_ARROW) {
//    console.log(key);
    if(denIdx > 0) {
      denIdx--;
    	ps = [];
    	image(img, 0, 0);
      ps = new ParticleSystem(den[denIdx]);
    }
  } else if(keyCode == DOWN_ARROW) {
//      console.log(key);
    if(denIdx < den.length-1) {
      denIdx++;
      ps = [];
      image(img, 0, 0);
      ps = new ParticleSystem(den[denIdx]);
    }
  }
    
}


