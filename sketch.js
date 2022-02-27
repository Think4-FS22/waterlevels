let img;

let p;
let v;
let step = 5;
let samples = 10;

let n = 10000;
let drops = [];

function preload() {
  img = loadImage("heightmap.png");
}

function setup() {
  let ratio = img.width / img.height;
  createCanvas(800, 800 / ratio);

  console.log(img.width, img.height);
  // p = createVector(width / 2, height / 2);
  // v = createVector(0, step);

  for (let i = 0; i < n; i++) {
    let d = new Drop(random(0, width), random(0, height));
    drops.push(d);
  }

  frameRate(10);
  background(250);
  // image(img, 0, 0, width, height);
}

function draw() {
  // let theta = 260 / samples;
  // let minVal = 1000;
  // let minPos = null;
  // for (let i = 0; i < samples; i++) {
  //   let p2 = p5.Vector.add(p, v);
  //   let lookupX = map(p2.x, 0, width, 0, img.width);
  //   let lookupY = map(p2.y, 0, height, 0, img.height);
  //   let col = img.get(lookupX, lookupY);
  //   // console.log(col);
  //   let r = red(col);
  //   if (r < minVal) {
  //     minVal = r;
  //     minPos = p2;
  //   }
  //   v.rotate(radians(theta));
  //   // console.log(r);
  // }

  for (let i = 0; i < drops.length; i++) {
    drops[i].update();
  }

  for (let i = 0; i < drops.length; i++) {
    fill("red");
    stroke(0, 0, 0, 20);
    let d = drops[i];
    line(d.position.x, d.position.y, d.prevPos.x, d.prevPos.y);
    // ellipse(drops[i].position.x, drops[i].position.y, 3, 3);
  }
  // noStroke();
  // fill("red");
  // ellipse(p.x, p.y, 5, 5);
  // fill("green");
  // ellipse(minPos.x, minPos.y, 5, 5);

  // p = minPos;

  // noLoop();
}

// function mouseClicked() {
//   console.log("mouseClicked");
//   p.set(mouseX, mouseY);
// }

class Drop {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.prevPos = this.position.copy();
    this.velocity = createVector(0, 3);
  }

  update() {
    let samples = 10;
    let theta = 360 / samples;
    let minVal = 1000;
    let minPos = null;
    for (let i = 0; i < samples; i++) {
      let p2 = p5.Vector.add(this.position, this.velocity);
      let lookupX = map(p2.x, 0, width, 0, img.width);
      let lookupY = map(p2.y, 0, height, 0, img.height);
      let col = img.get(lookupX, lookupY);
      // console.log(col);
      let r = red(col);
      if (r < minVal) {
        minVal = r;
        minPos = p2;
      }
      this.velocity.rotate(radians(theta));
      // console.log(r);
    }
    this.prevPos = this.position.copy();
    this.position = minPos;
  }
}
