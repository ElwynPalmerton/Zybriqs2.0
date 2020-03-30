class Outline { //Change name to Block.
  constructor(start, end) {
    //I think that this has to be before the assignments below.
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


    //this.drawStart = this.start;

  }


  update(end) {
    this.end = end; //|| this.start;

    this.width = Math.abs(this.start.x - this.end.x);
    this.height = Math.abs(this.start.y - this.end.y);

    // if (this.start.x > this.end.x) this.start.x = this.end.x;
    // if (this.start.y > this.end.y) this.start.y = this.end.y;
  }

  display(c, fColor) {
    //refactor to put all of the position stuff into the update function?
    //Make an if-then which does noFill() during setup and fill during run.
    stroke(c);
    strokeWeight(5);
    //fill(fColor);
    noFill();
    rect(this.start.x, this.start.y, this.width, this.height);
  }

  displayNumber(number) {
    textSize(16);
    text(number, this.start.x, this.start.y);
  }

  displayRemoveButton() {
    console.log('Displaying');
    const xBoxSize = 15;
    stroke(150);
    strokeWeight(2);
    noFill();
    rect(this.start.x, this.start.y, xBoxSize, xBoxSize);

  }
}