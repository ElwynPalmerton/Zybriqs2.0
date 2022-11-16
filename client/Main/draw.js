function draw() {
  if (run) {
    if (mouseIsPressed) {
      readController();
      readPhysicsSliders();
    }

    backgroundArray[0].display();
    balls.forEach((ball) => {
      let wind = calculateWind();
      ball.applyForce(wind);

      //Calculate gravity.
      var gravity = createVector(0, gForce);
      gravity.mult(ball.mass);
      ball.applyForce(gravity);
      liquids.forEach((l) => {
        if (ball.isInside(l)) {
          ball.drag(l);
        }
      });
      reverseLiquids.forEach((rl) => {
        if (ball.isInside(rl)) {
          ball.drag(rl);
        }
      });

      blocks.forEach((block) => {
        ball.collides(block);
      });
      ball.update();
      ball.checkEdges(initWidth, initHeight);
      ball.display();
    });

    liquids.forEach((liquid, i) => {
      liquid.display();
    });
    reverseLiquids.forEach((reverseLiquid) => {
      reverseLiquid.display();
    });

    blocks.forEach((block) => {
      block.display();
    });
  }
}
