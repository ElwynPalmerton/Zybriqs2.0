class Liquid {

  constructor(start, end, c) {
    //Liquid constructor is called from setup or from listeners.
    //Make a default hsla color object. Set this equal to a default value.
    //Create a p5 color object.
    //Use the p5 color object in display.
    //Call the constructor with a value from the initDragColors array.
 
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

  displayNumber(number) {
    textSize(16);
    fill(20);
    var insetX = 10;
    var insetY = 20;
    text(number, this.start.x + insetX, this.start.y + insetY);
  }

  displayRemoveButton() {
    console.log('Displaying');
    const xBoxSize = 15;
    stroke(150);
    strokeWeight(2);
    noFill();

    rect(this.start.x, this.start.y, xBoxSize, xBoxSize);

  }

} //End liquid.