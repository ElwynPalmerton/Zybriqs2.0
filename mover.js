class Mover {

  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0); //p5.Vector.random2D().mult(3);
    this.size = 50;
    this.acceleration = createVector(0, 0);
    this.acceleration.mult(.02);
    this.topSpeed = 10;
    this.mass = random(0.5, 2);
    this.size = this.size * this.mass;
  }

  update() {
    // let mouse = createVector(mouseX, mouseY);
    // mouse.sub(this.location);
    // mouse.setMag(.1);
    // this.acceleration = mouse;



    this.velocity = this.velocity.add(this.acceleration);

    this.location = this.location.add(this.velocity);


    this.velocity.limit(20);

    this.acceleration.mult(0);


  }

  checkEdges(width, height) {


    if (this.location.x >= width - this.size / 2) {
      this.velocity.x = this.velocity.x * -1;
      this.location.x = width - this.size / 2;
    } else if (this.location.x - this.size / 2 <= 0) {
      this.velocity.x = this.velocity.x * -1;
      this.location.x = this.size / 2;
    }
    if (this.location.y >= height - this.size / 2) {
      this.velocity.y = this.velocity.y * -1;
      this.location.y = height - this.size / 2;
    } else if (this.location.y + this.size / 2 <= 0) {
      this.velocity.y = this.velocity.y * -1;
      this.location.y = 0 + this.size / 2;
    }
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  display() {
    //console.log(this.location);
    noStroke(250, 60, 60, 1);
    strokeWeight(2);
    fill(250, 100, 50, 1);
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }


}