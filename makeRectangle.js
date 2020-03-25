function makeRectangle(start, end) {

  stroke(60, 240, 170);
  strokeWeight(5);
  noFill();
  //let drawStart = createVector(0, 0);

  let height, width;

  width = Math.abs(start.x - end.x);
  height = Math.abs(start.y - end.y);

  if (start.x < end.x) {
    if (start.y < end.y) {
      rect(start.x, start.y, width, height);
    } else {
      rect(start.x, end.y, width, height);
    }
  } else {
    if (start.y < end.y) {
      rect(end.x, start.y, width, height);
    } else {
      rect(end.x, end.y, width, height);
    }
  }
};