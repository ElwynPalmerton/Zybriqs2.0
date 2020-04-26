function draw() {
  if (run) {
    if (mouseIsPressed) {
      readController();
      readPhysicsSliders()
    }

    backgroundArray[0].display();


    balls.forEach(ball => {
      //Calculate wind.
      //---The first three lines which calculate wind speed do not (necessaril?) need to be in the loop.
      //

      let wind = calculateWind();
      // xOff += 0.01;
      // var windSpeed = map(noise(xOff), 0, 1, -windC, windC);
      // var wind = createVector(windSpeed, 0.0);

      //Make  function which just returns the wind value.
      ball.applyForce(wind);

      //Calculate gravity.
      var gravity = createVector(0, gForce); //This can be a global variable (unless it can be user modified?
      gravity.mult(ball.mass);
      ball.applyForce(gravity);

      //Calculate drag if it's in the liquid.   //Create Liquid and Reverse liquid in the same array.
      //It is only checking the first liquid, not the array.
      liquids.forEach((l) => {
        if (ball.isInside(l)) {
          ball.drag(l);
        }
      });

      //Calculate reverse drag
      //if it is in the reverseLiquid. //See above.
      reverseLiquids.forEach((rl) => {
        if (ball.isInside(rl)) {
          ball.drag(rl);
        }
      });

      //Check collides.

      blocks.forEach(block => {
        ball.collides(block);
      })


      //Update balls.
      ball.update();
      ball.checkEdges(initWidth, initHeight);

      //Display the balls, liquid, and reverseLiquid.
      ball.display(); //Create an array of ballCols and pass in ballCols[x[.]
    }) //End for loop.

    //Color is just passed in to reverseLiquid so I can just create another set of sliders.
    //   // SO NICE that I refactored it so that I can do this!!!!

    liquids.forEach((liquid, i) => {
      liquid.display(); //Liquid and reverseLiquid should be in the same array. See above?
    });
    reverseLiquids.forEach((reverseLiquid) => {
      reverseLiquid.display();
    });

    blocks.forEach(block => {
      block.display();
    })


  } //end of if (run) loop.
} //End of draw loop.