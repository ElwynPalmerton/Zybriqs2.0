//Example from P. 52 of NOC.
//Mover with acceleration.
//Tutorial 1.5 Acceleration - The Nature of Code.

var ball;
var balls = [];
const qty = 100;

function setup() {
  createCanvas(640, 480);

  for (let i = 0; i < qty; i++) {
    ball = new Mover(random(width), random(height));
    balls.push(ball);
  }

  background(127);
  noStroke();
  fill(155);

  // let pos = createVector(12, 13);
  // console.log(pos);
  // pos.x = pos.x + 1
  // pos.y = pos.y + 1

  // console.log(pos);
  // let one = createVector(1, 1);
  // console.log(one);

  // pos = pos.add(one);

  // console.log(pos);
  colorMode(HSB, 360, 100, 100, 1.0);
  background(270, 50, 50, 0.5);
}

function draw() {
  //background(200);
  background(200, 90, 20, 0.5);

  for (let i = 0; i < qty; i++) {
    balls[i].update();
    balls[i].checkEdges();
    balls[i].display();
  }
}