class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {  // DNA
  constructor(p1, p2, b, w) {
    this.p1 = p1;
    this.p2 = p2;
    this.b = b;
    this.w = w;
  }

  display() {
    stroke(this.b);
    strokeWeight(this.w);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}