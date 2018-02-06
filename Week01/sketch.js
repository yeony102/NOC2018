// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Modified by Yeonhee Lee, 30-01-2018

let walker;
let paw;

function preload() {
	paw = loadImage("images/footprint.png");
}

function setup() {
  createCanvas(1300, 930);
  frameRate(8);
  angleMode(DEGREES);
  imageMode(CENTER);
  walker = new Walker(paw);
  background(255);

}

function draw() {
//  for (let i = 0; i < 10; i++) {
  	walker.render();
  	walker.step();
//  }

//  noLoop();
}