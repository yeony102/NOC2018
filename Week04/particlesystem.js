// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Modified by Yeonhee Lee 20/Feb/2018

class ParticleSystem {


  constructor(x, y, r) {
    this.particles = [];
    // this.intact = true;
    let rows = 100;
    let cols = 100;
    for (let i = 0; i < rows * cols; i++) {
      this.addParticle(x + (i % cols) * r, y + (floor(i / rows)) * r, r);
    }
  }

  addParticle(x, y, r) {
    this.particles.push(new Particle(x, y, r));
  }

  display() {
    for (let particle of this.particles) {
      particle.display();
    }
  }


  // A function to apply a force to all Particles
  applyForce(f) {
    for(let particle of this.particles){
      particle.applyForce(f);
    }
  }

  applyRepeller(r) {
    for(let particle of this.particles){
      
      let force = r.repel(particle);
      particle.applyForce(force);
    }
  }
  
  applyRecover() {
    for(let particle of this.particles) {
      particle.recover();
    }
  }
  
  // applyAttractor() {
  //   for(let particle of this.particles) {
  //      particle.applyAttraction();
  //   }
  // }
      


  update() {
    for (let particle of this.particles) {
      particle.update();
    }
  }
}