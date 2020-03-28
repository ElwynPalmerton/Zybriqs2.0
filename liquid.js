class Liquid {

  constructor(start, end, c) {
    //If I calculate vectors for all four corners I can refactor .collides???
    // this.x = x;
    // this.y = y;
    // this.w = w;
    // this.h = h;
    this.c = c || 0.3;

    this.start = start; //Vector.
    this.end = end; //Vector.

    this.width = Math.abs(this.start.x - this.end.x);
    this.height = Math.abs(this.start.y - this.end.y);

    //This is weird, rewrite this:
    if (this.start.x < this.end.x) {
      if (this.start.y < this.end.y) {
        //rect(this.start.x, this.start.y, this.width, this.height);
      } else {
        this.start.x = this.start.x
        //idk?
        this.start.y = this.end.y
        //rect(this.start.x, this.end.y, this.width, this.height);
      }
    } else {
      if (this.start.y < this.end.y) {
        this.start.x = this.end.x;
        //rect(this.end.x, this.start.y, this.width, this.height);
      } else {
        this.start.x = this.end.x;
        this.start.y = this.end.y;
        //rect(this.end.x, this.end.y, this.width, this.height);
      }
    }


  } //End constructor


  display(c) {
    noStroke();
    fill(c);
    rect(this.start.x, this.start.y, this.width, this.height)
  }
} //End liquid.