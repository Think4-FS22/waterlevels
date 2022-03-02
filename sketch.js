let img;
let cellsize = 5;
let xsteps;
let ysteps;

let slider;
let minHeight = 397;
let maxHeight = 3220;
let waterlevel = 433;

function preload() {
  img = loadImage("heightmapper_397_3220.png");
}

function setup() {
  let ratio = img.width / img.height;
  createCanvas(1100, 1100 / ratio);

  console.log(img.width, img.height);

  xsteps = width / cellsize;
  ysteps = height / cellsize;

  slider = createSlider(minHeight, maxHeight, waterlevel, 1);
  slider.position(10, 10);

  slider.changed(updateWaterLevel);
}

function draw() {
  background(255);

  image(img, 0, 0, width, height);

  for (let i = 0; i < xsteps; i++) {
    for (let j = 0; j < ysteps; j++) {
      let x = i * cellsize;
      let y = j * cellsize;
      let lookupX = map(x, 0, width, 0, img.width);
      let lookupY = map(y, 0, height, 0, img.height);

      let col = img.get(lookupX, lookupY);
      let r = red(col);

      let level = map(r, 0, 255, 397, 3220);

      if (level < waterlevel) {
        fill(173, 216, 230, 200);
        noStroke();
        rect(x, y, cellsize, cellsize);
      }
    }
  }
  noStroke();
  fill(255);
  text("Water Level: " + waterlevel + " m ü. M.", 20, 50);

  noLoop();
}

function updateWaterLevel() {
  waterlevel = slider.value();
  console.log("water level", waterlevel);
  redraw();
}
