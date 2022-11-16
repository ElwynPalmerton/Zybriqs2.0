class Mover {
  constructor(x, y, color) {
    let assignColor = color || defaultColor;
    let thisColor = {};
    Object.assign(thisColor, assignColor);
    this.color = thisColor;

    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.size = 50;
    this.acceleration = createVector(0, 0);
    this.acceleration.mult(0.02);
    this.topSpeed = 10;
    this.mass = random(minMass, maxMass);
    this.size = this.size * this.mass;
  }

  update() {
    this.velocity = this.velocity.add(this.acceleration);
    this.location = this.location.add(this.velocity);
    this.velocity.limit(20);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  friction() {
    friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-1);
    c = 0.1;
    friction.mult(c);
    this.applyForce(friction);
  }

  drag(l) {
    let speed = this.velocity.mag();
    let dragMagnitude = l.c * speed * speed;

    let drg = this.velocity.copy();
    drg.normalize();
    drg.mult(-1);
    drg.mult(dragMagnitude);

    this.applyForce(drg);
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
    } else if (this.location.y - this.size / 2 <= 0) {
      this.velocity.y = this.velocity.y * -1;
      this.location.y = 0 + this.size / 2;
    }
  }

  isInside(l) {
    if (
      this.location.x > l.start.x &&
      this.location.x < l.start.x + l.width &&
      this.location.y > l.start.y &&
      this.location.y < l.start.y + l.width
    ) {
      return true;
    } else {
      return false;
    }
  }

  collides(b) {
    var clearance = 1;
    if (this.location.x < b.start.x) {
      if (
        this.location.y >= b.start.y &&
        this.location.y <= b.start.y + b.height &&
        b.start.x - this.location.x <= this.size / 2
      ) {
        this.velocity.x *= -1;
        this.location.x = b.start.x - this.size / 2 - clearance;
      }
    } else if (this.location.x > b.start.x + b.width) {
      if (
        this.location.y >= b.start.y &&
        this.location.y <= b.start.y + b.height &&
        this.location.x - this.size / 2 <= b.start.x + b.width
      ) {
        this.velocity.x *= -1;
        this.location.x = b.start.x + b.width + this.size / 2 + clearance;
      }
    }

    //TOP EDGE
    if (this.location.y < b.start.y) {
      if (
        this.location.x > b.start.x &&
        this.location.x < b.start.x + b.width &&
        b.start.y - this.location.y <= this.size / 2
      ) {
        this.velocity.y *= -1;
        this.location.y = b.start.y - this.size / 2 - clearance;
      }

      //BOTTOM EDGE
    } else if (this.location.y > b.start.y + b.height) {
      if (
        this.location.x >= b.start.x &&
        this.location.x <= b.start.x + b.width &&
        this.location.y - this.size / 2 <= b.start.y + b.height ///this.size / 2)
      ) {
        this.velocity.y *= -1;
        this.location.y = b.start.y + b.height + this.size / 2 + clearance;
      }
    }

    if (
      dist(this.location.x, this.location.y, b.start.x, b.start.y) <=
      this.size / 2
    ) {
      this.velocity.x = Math.abs(this.velocity.x) * -1;
      this.velocity.y = Math.abs(this.velocity.y) * -1;
      //Top-right corner.
    } else if (
      dist(this.location.x, this.location.y, b.start.x + b.width, b.start.y) <=
      this.size / 2
    ) {
      this.velocity.x = Math.abs(this.velocity.x);
      this.velocity.y = Math.abs(this.velocity.y) * -1;
      //Bottom-left corner.
    } else if (
      dist(this.location.x, this.location.y, b.start.x, b.start.y + b.height) <=
      this.size / 2
    ) {
      this.velocity.x = Math.abs(this.velocity.x) * -1;
      this.velocity.y = Math.abs(this.velocity.y);
      //Bottom-right corner.
    } else if (
      dist(
        this.location.x,
        this.location.y,
        b.start.x + b.width,
        b.start.y + b.height
      ) <=
      this.size / 2
    ) {
      this.velocity.x = Math.abs(this.velocity.x);
      this.velocity.y = Math.abs(this.velocity.y);
    }
    //if the distance from the circle center to each corner is less than the size, reverse the x and wide velocities.
  }

  displayDimmed() {
    let { h, s, l, a } = this.color;

    let p5Color = color(h, s - dimAmt, l, parseFloat(a));
    noStroke(250, 60, 60, 1);
    strokeWeight(2);
    fill(p5Color);
    ellipse(
      this.location.x * scl,
      this.location.y * scl,
      this.size * scl,
      this.size * scl
    );
  }

  displayNumber(number) {
    textSize(16);
    var inset = 5;
    text(number, this.location.x - inset, this.location.y - inset);
  }

  display(c) {
    let { h, s, l, a } = this.color;

    let p5Color = color(h, s, l, parseFloat(a));
    noStroke(250, 60, 60, 1);
    strokeWeight(2);
    fill(p5Color);
    ellipse(
      this.location.x * scl,
      this.location.y * scl,
      this.size * scl,
      this.size * scl
    );
  }

  displayNumber(number) {
    textSize(16);
    var inset = 5;
    text(number, this.location.x * scl - inset, this.location.y * scl - inset);
  }
}
