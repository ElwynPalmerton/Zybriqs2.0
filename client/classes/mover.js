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
    //see p. 84 of The Nature of Code.
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
    //Checks to see if the mover ("ball[i]) has collided with the element b.
    //Outline paramenters:
    //  this.start
    //  this.end
    //  this.width
    //  this.height
    //Mover has:
    // this.location
    // this.size (diameter);
    //
    //

    //Write one and then see if it works.
    //LEFT EDGE
    if (this.location.x < b.start.x) {
      //Cicle is left of the left edge.  LEFT EDGE IS WORKING.
      if (
        this.location.y >= b.start.y && // Circle CENTER is BELOW the TOP edge.
        this.location.y <= b.start.y + b.height && //Circle CENTER is ABOVE the BOTTOM edge.
        b.start.x - this.location.x <= this.size / 2
      ) {
        //Distance form circle CENTER to LEFT edge is LESS than its RADIUS.
        //console.log("Collides!");
        this.velocity.x *= -1;
        this.location.x = b.start.x - this.size / 2 - clearance;
      }
      //RIGHT EDGE
    } else if (this.location.x > b.start.x + b.width) {
      //Circle is right of the right edge.
      if (
        this.location.y >= b.start.y && //Circle center is below the top edge.
        this.location.y <= b.start.y + b.height && //Circle center is above the bottom edge.
        this.location.x - this.size / 2 <= b.start.x + b.width ///THIS!!!???
      ) {
        //Distance of the circle center from the RIGHT edge.
        //console.log("Collides!");
        this.velocity.x *= -1;
        this.location.x = b.start.x + b.width + this.size / 2 + clearance;
      }
    }
    //TOP EDGE
    if (this.location.y < b.start.y) {
      // Circle is above the top edge. TOP EDGE IS WORKING
      if (
        this.location.x > b.start.x &&
        this.location.x < b.start.x + b.width &&
        b.start.y - this.location.y <= this.size / 2
      ) {
        //console.log("Collides!");
        this.velocity.y *= -1;
        this.location.y = b.start.y - this.size / 2 - clearance;
      }
      //BOTTOM EDGE
    } else if (this.location.y > b.start.y + b.height) {
      //Circle is below the bottom edge.
      if (
        this.location.x >= b.start.x &&
        this.location.x <= b.start.x + b.width &&
        this.location.y - this.size / 2 <= b.start.y + b.height ///this.size / 2)
      ) {
        //console.log("Collides!");
        this.velocity.y *= -1;
        this.location.y = b.start.y + b.height + this.size / 2 + clearance;
      }
    }

    //Top-left corner
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
  } //End of collides.

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
