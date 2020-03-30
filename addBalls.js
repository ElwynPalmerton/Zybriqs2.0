function addBalls() {
  let ball = new Mover(random(width), height / 5);
  balls.push(ball);
  qty++;
}

function removeBalls() {
  balls.pop();
  qty--;
}