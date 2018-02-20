// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Modified by Yeonhee Lee 20/Feb/2018

let ps;

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  ps = new ParticleSystem(width/2-50, height/2-50, 1);
  repeller = new Repeller(width, height);
}

function draw() {
  background(0);
  
  ps.applyRepeller(repeller);
  ps.applyRecover();
//  ps.applyAttractor();
  
  repeller.update();  // update repeller's position following the mouse cursor

  ps.display();
  ps.update();
}

