let img;
let cellsize = 5;
let xsteps;
let ysteps;

let slider; 
let waterlevel = 0.5;

function preload() {
  img = loadImage("heightmap.png");
}

function setup() {
  let ratio = img.width / img.height;
  createCanvas(800, 800 / ratio);

  console.log(img.width, img.height);

  xsteps = width/cellsize;
  ysteps = height/cellsize;

  slider = createSlider(0,255,waterlevel,1);
  slider.position(10, 10);
 // waterlevel = slider.value();
  slider.changed(function(){
    waterlevel = slider.value();
    console.log('slider input',waterlevel);
    redraw();
  });


}

function draw() {
  background(255);

  // image(img, 0, 0, width, height);

  for(let i=0; i<xsteps; i++){
    for(let j=0; j<ysteps; j++){
      let x = i*cellsize;
      let y = j*cellsize;
      let lookupX = map(x,0,width,0,img.width);
      let lookupY = map(y,0,height,0,img.height);

      let col = img.get(lookupX,lookupY);
      let r = red(col);

      if(r<waterlevel){
        fill('steelblue');
        noStroke();
        rect(x,y,cellsize,cellsize);
      }

    }
  }


  noLoop();
}


