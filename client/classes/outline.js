class Outline { //Change name to Block.
  constructor(start, end, color) {
    //Color variables.
    //Color variables.

    start.x = start.x / scl;
    start.y = start.y / scl;
    end.x = end.x / scl;
    end.y = end.y / scl;
    let assignColor = color || defaultColor;
    let thisColor = {};
    Object.assign(thisColor, assignColor);
    this.color = thisColor;


    //I think that this has to be before the assignments below.
    this.start = start; //Vector.
    this.end = end; //Vector.

    this.width = Math.abs(this.start.x - this.end.x);
    this.height = Math.abs(this.start.y - this.end.y);

    //This is weird, rewrite this:
    if (this.start.x < this.end.x) {
      if (this.start.y < this.end.y) {
        //Bottom-right - do nothing.
      } else {
        //top-right
        //this.start.x = this.start.x
        let tempY = this.start.y;
        this.start.y = this.end.y
        this.end.y = tempY;
      }
    } else {
      //left-side
      if (this.start.y < this.end.y) {
        //bottom-left
        let tempX = this.start.x;
        this.start.x = this.end.x;
        this.end.x = tempX;
      } else {
        //top-left
        let tempX = this.start.x;
        let tempY = this.start.y;

        this.start.x = this.end.x;
        this.start.y = this.end.y;

        this.end.x = tempX;
        this.end.y = tempY;
      }
    }


    //this.drawStart = this.start;

  }


  update(end) {
    this.end = end; //|| this.start;

    this.width = Math.abs(this.start.x - this.end.x);
    this.height = Math.abs(this.start.y - this.end.y);

    // if (this.start.x > this.end.x) this.start.x = this.end.x;
    // if (this.start.y > this.end.y) this.start.y = this.end.y;
  }

  displayDimmed(c, fColor) {
    //refactor to put all of the position stuff into the update function?
    //Make an if-then which does noFill() during setup and fill during run.
    let {
      h,
      s,
      l,
      a
    } = this.color;



    let p5Color = color(h, s - dimAmt, l, parseFloat(a));
    stroke(p5Color);
    strokeWeight(5);
    //fill(fColor);
    noFill();
    rect(this.start.x * scl, this.start.y * scl, this.width * scl, this.height * scl);
  }

  // display(c, fColor) {
  display() {
    //refactor to put all of the position stuff into the update function?
    //Make an if-then which does noFill() during setup and fill during run.
    let {
      h,
      s,
      l,
      a
    } = this.color;

    let p5Color = color(h, s, l, parseFloat(a));
    stroke(p5Color);
    strokeWeight(5);
    //fill(fColor);
    noFill();
    rect(this.start.x * scl, this.start.y * scl, this.width * scl, this.height * scl);
  }

  displayNumber(number) {
    textSize(16);
    text(number, this.start.x * scl, this.start.y * scl);
  }

  displayRemoveButton() {

    const xBoxSize = 15;
    stroke(150);
    strokeWeight(2);
    noFill();
    rect(this.start.x * scl, this.start.y * scl, xBoxSize, xBoxSize);

  }
}