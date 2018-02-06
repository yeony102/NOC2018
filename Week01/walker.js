class Walker {
  constructor(paw) {
    this.x = width / 2;
    this.y = height / 2;

    this.ang = 0;
    this.foot = 40;
    this.paw = paw;
    //this.b = 200;

    
    // this.pos = createVector(width/2,height/2);
  }

  render() {
    console.log("angle: " + this.ang);
    console.log("x: " + this.x + ", y: " + this.y);

    push();
    translate(this.x, this.y);
    rotate(this.ang);
    // noStroke();
    // fill(this.b, this.b, this.b, 100);
    // triangle(-10,0,0,-40,10,0);
    image(this.paw, 0, 0);
    pop();

 //   this.b -=20;
  }

  step() {

    let direction = [this.ang-50, this.ang-25, this.ang, this.ang+25, this.ang+50];
    let choice = floor(random(5));
    this.ang = direction[choice];

    let dx = sin(this.ang) * this.foot;
    let dy = -cos(this.ang) * this.foot;

    this.x += dx;
    this.y += dy;

    if(this.x < this.foot || this.x > width-this.foot || this.y < this.foot || this.y > height-this.foot) {
      this.x = constrain(this.x, this.foot, width-this.foot);
      this.y = constrain(this.y, this.foot, height-this.foot);

      let turn = floor(random(2));
      if(turn==0) this.ang += 120;
      else if(turn==1) this.ang -= 120;

      if(this.ang >= 360) this.ang = 360-this.ang;
      if(this.ang <= -360) this.ang = 360+this.ang;
    }


    
    

  }
}