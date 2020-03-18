//Example from P. 52 of NOC.
//Mover with acceleration.
//Tutorial 1.5 Acceleration - The Nature of Code.

var ball;
var balls = [];
const qty = 1;

function setup() {
  createCanvas(640, 480);

  for (let i = 0; i < qty; i++) {
    ball = new Mover(random(width), random(height));
    balls.push(ball);
  }

  background(127);
  noStroke();
  fill(155);

  colorMode(HSB);
  // background(270, 50, 50, 0.5);
}

function draw() {
  background(111, 10, 99, 1.0);

  for (let i = 0; i < qty; i++) {
    balls[i].update();
    balls[i].checkEdges();
    balls[i].display();
  }
}