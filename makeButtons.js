function makePlayButton() {
  let playButton = document.createElement("Button");
  playButton.textContent = "Pause";
  document.body.appendChild(playButton);

  //If the "Draw Block" button is pressed the listeners for drawing blocks
  // (And adding newly created Outline objects to the blocks array) is activated.
  //Creating btn and btn2 and adding the eventlisteners should be wrapped in a separate function.

  playButton.addEventListener("click", e => { //If the play/resume button is hit it plays.
    e.preventDefault();
    console.log("Liquids before removal", liquids)

    //Removes any overlapping duplicate liquid objects.
    for (let i = liquids.length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        if (liquids[i].start.x === liquids[j].start.x &&
          liquids[i].start.y === liquids[j].start.y) {
          liquids.splice(i, 1);
        }
      }
    }

    console.log("Liquids after removal", liquids)


    if (run === false) {
      run = true;
      playButton.innerHTML = "Pause";
      loop();
    } else {
      run = false;
      //It seems like this is working without the if statement to check "run" but I do use run elsewhere.
      playButton.innerHTML = "Resume";
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
    buttons.forEach(b => b.className = "notActive");
    drawBlockButton.elt.className = "active";
    if (drawButtonOn === false) {
      drawButtonOn = true;
      objectType = "Block"

      listeners();
    } else {
      drawButtonOn = false;
      //Instead of doing this this way, if the button target is the button div then turn it off.
      //If the target is this button, then turn it on.
      //That way, redundant mouse events will only have the same (correct) effect.
    }
  });
}

function makeDragButton() {
  let drawDragButton = createButton("Drag Area");
  buttons.push(drawDragButton.elt);
  drawDragButton.mouseClicked(() => {
    buttons.forEach(b => b.className = "notActive");
    drawDragButton.elt.className = "active";
    if (drawButtonOn === false) {
      drawButtonOn = true;
      objectType = "Drag";

      listeners();
    } else {
      drawButtonOn = false;
      //Instead of doing this this way, if the button target is the button div then turn it off.
      //If the target is this button, then turn it on.
    }
  });
}