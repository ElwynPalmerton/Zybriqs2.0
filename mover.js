class Mover {

  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0); //p5.Vector.random2D().mult(3);
    this.size = 24;
    this.acceleration = p5.Vector.random2D();
    this.acceleration.mult(.02);
    this.topSpeed = 10;
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    mouse.sub(this.location);
    mouse.setMag(.1);
    this.acceleration = mouse;



    this.velocity = this.velocity.add(this.acceleration);

    this.location = this.location.add(this.velocity);


    this.velocity.limit(5);

  }

  checkEdges() {
    if (this.location.x > width) {
      this.velocity.x = this.velocity.x * -1;
    } else if (this.location.x < 0) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.y > height) {
      this.velocity.y = this.velocity.y * -1;
    } else if (this.location.y < 0) {
      this.velocity.y = this.velocity.y * -1;
    }
  }

  display() {
    //console.log(this.location);
    stroke(330, 60, 60, 1);
    strokeWeight(2);
    fill(310, 100, 50, 1);
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }


}