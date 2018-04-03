class Drawing {
  constructor(triangles_, x_, y_) {
    this.triangles = triangles_;
    this.x = x_;
    this.y = y_;
    this.score = 0;
  }
  
  display() {
    // console.log("# of vertices: ", this.triangles.num);
    for(let i=0; i<this.triangles.num; i++) {
      fill(this.triangles.h[i], 360, this.triangles.b[i], 50);
      //console.log(
      beginShape(TRIANGLES);
      	vertex(this.triangles.vertices[i].x, this.triangles.vertices[i].y);
      	vertex(this.triangles.vertices[i+1].x, this.triangles.vertices[i+1].y);
      	vertex(this.triangles.vertices[i+2].x, this.triangles.vertices[i+2].y);
      endShape();
    }
    
    textSize(11);
    fill(0, 360, 360);
    text("♥︎", d_width-(offset-5), offset/2);
    fill(0, 50, 50);
    text(this.score, d_width-(offset/2), offset/2);
  }
	
  isClicked() {
    if(mouseX > this.x && mouseX < (this.x+d_width) && mouseY > this.y && mouseY < (this.y + d_height)) {
      this.score++;
      nClick++;
      likes.html(nClick);
      // console.log("Score: ", this.score);
      // console.log("# of Clicks: ", nClick);
    }
  }
  
}
