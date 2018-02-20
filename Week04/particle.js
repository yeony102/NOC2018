// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Modified by Yeonhee Lee 20/Feb/2018

class Particle {

  constructor(x, y, r) {
    this.acceleration = createVector();
    this.velocity = createVector()
    this.velocity.mult(0.5);
    this.position = createVector(x, y);
    this.origin = createVector(x, y);
    this.r = r;
    this.c = random(200,255);
  }


  applyForce(force) {
    this.acceleration.add(force);
  }
  
  applyAttraction() {
    let f = this.attractor.attract(this.position);
    this.applyForce(f);
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0.95);
//    this.lifespan -= 2.0;
  }

  // Method to display
  display() {
//    stroke(0);
    noStroke();		// drawing stroke makes the sketch much slower
//    stroke(255, 255, 0);	
    fill(255, 255, 0);
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.r, this.r);
  }
  
  recover() {
    let dir = p5.Vector.sub(this.origin, this.position);
    let d = dir.mag();
    
    if(d>2) {
      dir.normalize();
//      d = constrain(d, 0, 10);
      dir.mult(2);
      this.position.add(dir);
    }
    else {
 //     this.velocity.mult(0);
      this.position = this.origin.copy();
    }
  }

  // Is the particle still useful?
  // isDead() {
  //   if (this.lifespan < 0.0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}