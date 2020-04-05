class Mover {
  constructor(x, y, color) {

    //Colors:
    let assignColor = color || defaultColor;
    let thisColor = {};
    Object.assign(thisColor, assignColor);
    this.color = thisColor;



    //Location variables.
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.size = 50;
    this.acceleration = createVector(0, 0);
    this.acceleration.mult(0.02); //This isn't doing anything is it? Just take it out?
    this.topSpeed = 10; //This is being used as a constant below, fix this.
    this.mass = random(0.5, 2);
    this.size = this.size * this.mass;
    //this.c = c; //This isn't ever used except that it is re-assigned to c in this.fricton. I think that it is creating an uninitialized variable which is why it works.
    //But it should be this.c below and passed in as an argument so that it can be user modified.
    //This is the coeffecient of friction, should be called coeffecientOfFriction.
    //There is a different .c (l.c) from the liquid class which is used below.
    //This one should definitely be different.
  }

  update() {
    //ACCELERATION TOWARDS THE MOUSE.
    //This still works if it is uncommented but it breaks the "P" function.
    //   // But why????? - not sure why.
    // let mouse = createVector(mouseX, mouseY);
    // mouse.sub(this.location);
    // mouse.setMag(.1);
    // this.acceleration = mouse;

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
    friction = this.velocity.copy(); //This should probably be a property on the Mover class.
    friction.normalize();
    friction.mult(-1);
    c = 0.1; //This should be constant in the mover class???
    friction.mult(c);
    this.applyForce(friction);
  }

  drag(l) {
    //The force's magnitude.
    let speed = this.velocity.mag();
    let dragMagnitude = l.c * speed * speed;

    //The force's direction: -1 * velocity.
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

  display(c) {
    let {
      h,
      s,
      l,
      a
    } = this.color;

    let p5Color = color(h, s, l, parseFloat(a));
    noStroke(250, 60, 60, 1);
    strokeWeight(2);
    fill(p5Color);
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  displayNumber(number) {
    textSize(16);
    var inset = 5;
    text(number, this.location.x - inset, this.location.y - inset);
  }
}