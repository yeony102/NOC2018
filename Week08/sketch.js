let d_width, d_height, offset;

let tri_min, tri_max;

let population;

let nClick, maxClick;

let gen, likes;

function setup() {
  createCanvas(640, 640);
  
  colorMode(HSB, 360);
	noStroke();  

  //drawing.display();
  
  d_width = 180;
  d_height = 180;
  offset = 40;
  
  tri_min = 5;
  tri_max = 20;
  
  nClick = 0;
  maxClick = 9;
  
  let mutationRate = 0.1;
  let popNum = 9;
  
  population = new Population(mutationRate, popNum);
  
  gen = select("#gen");
  likes = select("#currentLikes");

  //   background(330);
  // population.display();
  
}

function draw() {
  
  background(330);
  population.display();

}

function mouseReleased() {
  
	population.checkClick(); 
  //console.log(nClick);
  if(nClick >= maxClick) {
    
    //nextGeneration();    
    population.reproduce();
    nClick = 0;
    likes.html(nClick);
    
//       background(330);
//   		population.display();
  }
  
}





