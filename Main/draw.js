function draw() {
  if (run) {
    if (mouseIsPressed) {
      readController();
    }

    backgroundArray[0].display();


    for (let i = 0; i < qty; i++) {
      //Calculate wind.
      //---The first three lines which calculate wind speed do not (necessaril?) need to be in the loop.
      xOff += 0.01;
      var windSpeed = map(noise(xOff), 0, 1, -windC, windC);
      var wind = createVector(windSpeed, 0.0);
      balls[i].applyForce(wind);

      //Calculate gravity.
      var gravity = createVector(0, gForce); //This can be a global variable (unless it can be user modified?
      gravity.mult(balls[i].mass);
      balls[i].applyForce(gravity);

      //Calculate drag if it's in the liquid.   //Create Liquid and Reverse liquid in the same array.
      //It is only checking the first liquid, not the array.
      liquids.forEach((l) => {
        if (balls[i].isInside(l)) {
          balls[i].drag(l);
        }
      });

      //Calculate reverse drag
      //if it is in the reverseLiquid. //See above.
      reverseLiquids.forEach((rl) => {
        if (balls[i].isInside(rl)) {
          balls[i].drag(rl);
        }
      });

      //Check collides.
      for (let j = 0; j < blocks.length; j++) {
        balls[i].collides(blocks[j]);
      }

      //Update balls.
      balls[i].update();
      balls[i].checkEdges(initWidth, initHeight);

      //Display the balls, liquid, and reverseLiquid.
      balls[i].display(); //Create an array of ballCols and pass in ballCols[x[.]
    } //End for loop.

    //Color is just passed in to reverseLiquid so I can just create another set of sliders.
    //   // SO NICE that I refactored it so that I can do this!!!!

    liquids.forEach((liquid, i) => {
      liquid.display(); //Liquid and reverseLiquid should be in the same array. See above?
    });
    reverseLiquids.forEach((reverseLiquid) => {
      reverseLiquid.display();
    });

    for (let i = 0; i < blocks.length; i++) {
      blocks[i].display();
    }
  } //end of if (run) loop.
} //End of draw loop.

//REMOVED from draw();
// //if (balls[i].isInside(liquid));
// if (mouseIsPressed) {
//   //Replace this with if (isInside) - after I make isInside.
//   balls[i].friction();
// }