function makeRectangle(start, end) {
  let c = {
    h: 35,
    s: 100,
    l: 80,
    a: 1,
  };

  let rCol = color(c.h, c.s, c.l, c.a);

  stroke(rCol);
  strokeWeight(5);
  noFill();

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
}
