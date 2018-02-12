var num = 20;
var rc = false;
var cnt = 0;

let rose1, rose2, rose3;
let step;

let cvs;

function setup() { 
  cvs = createCanvas(900, 600);
  colorMode(HSB);
  
  let rad = 100;
  step = 0.01;
  
  rose1 = new Rose(1, 2, rad, step, 0, 0);
  rose2 = new Rose(6, 1, rad, step, 150, 0);
  rose3 = new Rose(2, 3, rad, step, 270, 1);
    
} 

function draw() { 
	background(0);
  
	push();
	  translate(width/4, height/4);
	  rose1.display();
	pop();
	  
	push();
	  translate(width*3/4, height/4);
	  rose2.display();
	pop();
	  
	push();
	  translate(width/2, height*3/4);
	  rose3.display();
	pop();
  
  
  // export frame images
  let maxCnt = ((num-rose1.n0)/step)*2+7;
  
  if(rc) {
    if((cnt<=0) && (rose1.n == rose1.n0)) {
      cnt=1;
    }
    if((cnt>0) && (cnt<=maxCnt)) {
      let fileName = "rose_" + nf(cnt, 4) + ".png";
    	saveCanvas(cvs, fileName, 'png');
      cnt++;
    } else if(cnt>maxCnt) {
      rc = false;
      cnt=0;
    }
  }
    
  
}

function keyTyped() {
	if(key=='p' || key =='P') rc = true;
}


