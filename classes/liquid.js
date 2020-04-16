class Liquid {

  constructor(start, end, c, color) {


    start.x = start.x / scl;
    start.y = start.y / scl;
    end.x = end.x / scl;
    end.y = end.y / scl;

    //Color variables.
    let assignColor = color || defaultColor;
    let thisColor = {};
    Object.assign(thisColor, assignColor);
    this.color = thisColor;

    // this.p5Color = color(this.color.h, this.color.s, this.color.l, this.color.a);

    //Coefficient of drag.
    this.c = c || 0.3;


    //positioning.
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


  displayDimmed() {
    let {
      h,
      s,
      l,
      a
    } = this.color;

    let p5Color = color(h, s - dimAmt, l, parseFloat(a));
    noStroke();
    fill(p5Color);
    rect(this.start.x * scl, this.start.y * scl, this.width * scl, this.height * scl);
  }



  display(c) {
    let {
      h,
      s,
      l,
      a
    } = this.color;

    let p5Color = color(h, s, l, parseFloat(a));
    noStroke();
    fill(p5Color);
    rect(this.start.x * scl, this.start.y * scl, this.width * scl, this.height * scl);
  }

  displayNumber(number) {
    textSize(16);
    fill(20);
    var insetX = 10;
    var insetY = 20;
    text(number, this.start.x * scl + insetX, this.start.y * scl + insetY);
  }

  displayRemoveButton() {
    const xBoxSize = 15;
    stroke(150);
    strokeWeight(2);
    noFill();

    rect(this.start.x * scl, this.start.y * scl, xBoxSize, xBoxSize);

  }

} //End liquid.