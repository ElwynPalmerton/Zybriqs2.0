class Liquid {

  constructor(x, y, w, h, c) {
    //If I calculate vectors for all four corners I can refactor .collides???
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c || 0.3;
  }


  display(c) {
    noStroke();
    fill(c);
    rect(this.x, this.y, this.w, this.h)
  }
} //End liquid.