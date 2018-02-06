let springs = [];
let plane;
let updatingIdx = -1;

let slider;

function setup() { 
  createCanvas(600, 600);
	
	angleMode(DEGREES);
  colorMode(HSB);
	
	let t = 36;
	for(let i=0; i<10; i++, t+=36) {
		let x = width/2 - 100*sin(t);
		let y = height/2 - 100*cos(t);
		let c = createVector(x, y);
		springs.push(new Spring(createVector(x, y), c));
	}
  
  plane = new Plane(0.001);
  
  let div = createDiv('');
  let span = createSpan('&nbsp Drag Coeffient &nbsp');
  span.style('font-family', 'Helvetica');
  span.style('color', 'grey');
  slider = createSlider(0, 100, 0);
  
}

function draw() { 
  background(240);
	  
  let c = slider.value();
  c = map(c, 0, 100, 0.001, 0.1);
  plane.setCoef(c);
  
  plane.display();
  
	for(let i=0; i<springs.length; i++) {
		springs[i].display();	
    if(springs[i].isOn) {
      springs[i].update();
      springs[i].applyElasticForce();
      let df = plane.calDrag(springs[i]);
      springs[i].applyDragForce(df);
    }
	}
  
	
}

function mousePressed() {
	for(let i=0; i<springs.length; i++) {
		if(springs[i].isCatched()) {
			springs[i].isOn = false; 
			updatingIdx = i;
		}
	}
}

function mouseDragged() {
	if(updatingIdx >=0) {
		springs[updatingIdx].dragging(mouseX, mouseY);	
	}
}

function mouseReleased() {
	if(updatingIdx >=0) {
		springs[updatingIdx].isOn = true;
		updatingIdx = -1;
	}
}