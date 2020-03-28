function clearDuplicates() {



}



function makePlayButton() {
  let playButton = document.createElement("Button");
  playButton.textContent = "Pause";
  document.body.appendChild(playButton);

  //If the "Draw Block" button is pressed the listeners for drawing blocks
  // (And adding newly created Outline objects to the blocks array) is activated.
  //Creating btn and btn2 and adding the eventlisteners should be wrapped in a separate function.

  playButton.addEventListener("click", e => {
    //If the play/resume button is hit it plays.
    e.preventDefault();

    buttons.forEach(b => (b.className = "notActive"));



    //Make this a separate function.
    //Add these for reverseLiquid also.
    console.log("Liquids before removal", liquids);
    //Removes any overlapping duplicate liquid objects.
    //Also need to remove overlapping blocks and reverseLiquids.
    //Put this in a separate function.
    for (let i = liquids.length - 1; i >= 1; i--) {
      if (
        liquids[i].start.x === liquids[i - 1].start.x &&
        liquids[i].start.y === liquids[i - 1].start.y
      ) {
        liquids.splice(i, 1);
      }
    }
    console.log("Liquids after removal", liquids);
    // Make this a separate function.

    if (run === false) {
      run = true;
      playButton.innerHTML = "Pause";
      playButton.className = "notActive";

      loop();
    } else {
      run = false;
      //It seems like this is working without the if statement to check "run" but I do use run elsewhere.
      playButton.innerHTML = "Resume";
      playButton.className = "paused";
      console.log("Balls", balls);
      console.log("Blocks", blocks);
      console.log("Liquids", liquids);
      console.log("Reverse Liquids", reverseLiquids);
      // balls.forEach(ball => {
      //   console.log(ball.isInside(liquids[0]));
      // });
      drawElementsDuringSetup(); //This function is in the listeners.js file.
      noLoop();
    }
  });
}

function makeBlockButton() {
  let drawBlockButton = createButton("Draw Block");
  buttons.push(drawBlockButton.elt);

  drawBlockButton.mouseClicked(() => {
    buttons.forEach(b => (b.className = "notActive"));
    drawBlockButton.elt.className = "active";

    drawButtonOn = true;
    objectType = "Block";

    listeners();
  });
}

function makeDragButton() {
  let drawDragButton = createButton("Drag Area");
  buttons.push(drawDragButton.elt);
  drawDragButton.mouseClicked(() => {
    buttons.forEach(b => (b.className = "notActive"));
    drawDragButton.elt.className = "active";

    drawButtonOn = true;
    objectType = "Drag";

    listeners();
  });
}

function makeReverseDragButton() {
  let drawReverseDragButton = createButton("Draw Accelerator");
  buttons.push(drawReverseDragButton.elt);

  drawReverseDragButton.mouseClicked(() => {
    buttons.forEach(b => (b.className = "notActive"));
    drawReverseDragButton.elt.className = "active";

    drawButtonOn = true;
    objectType = "Reverse Drag";

    listeners();
  });
}