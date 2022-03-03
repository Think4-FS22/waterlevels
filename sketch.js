let img;

let cellsize = 10;
let xsteps;
let ysteps;

let waterlevel = 434;

let slider;

function preload() {
  img = loadImage("heightmapper_397_3220.png");
}

function setup() {
  let ratio = img.width / img.height;
  createCanvas(1100, 1100 / ratio);

  slider = createSlider(397, 1000, waterlevel, 1);
  slider.position(10, 10);
  slider.changed(updateWaterLevel);

  xsteps = width / cellsize;
  ysteps = height / cellsize;

  noLoop();
}

function draw() {
  background(250);

  for (let i = 0; i < xsteps; i++) {
    for (let j = 0; j < ysteps; j++) {
      let x = i * cellsize;
      let y = j * cellsize;

      let lookupX = map(x, 0, width, 0, img.width);
      let lookupY = map(y, 0, height, 0, img.height);

      let col = img.get(lookupX, lookupY);
      let r = red(col);

      let m = map(r, 0, 255, 397, 3220);

      if (m < waterlevel) {
        fill("steelblue");
        noStroke();
        ellipse(x, y, 0.7 * cellsize, 0.7 * cellsize);
      }
      if (m >= waterlevel && m < waterlevel + 100) {
        fill("tomato");
        noStroke();
        ellipse(x, y, 0.7 * cellsize, 0.7 * cellsize);
      }
      if (m >= waterlevel + 100 && m < waterlevel + 200) {
        fill("darkseagreen");
        noStroke();
        ellipse(x, y, 0.7 * cellsize, 0.7 * cellsize);
      }
    }
  }
}

function updateWaterLevel() {
  waterlevel = slider.value();
  console.log("updateWaterLevel", waterlevel);
  redraw();
}
