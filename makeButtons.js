function makeButtons() {
  makePlayButton();
  makeBlockButton();
  makeDragButton();
  makeReverseDragButton();
  makeRemoveButton();
  makeAddBallsButton();
  makeRemoveBallsButton();
  makeResetButtons();
  makeNumbersButtons();
}


function makePlayButton() {
  let playButton = document.createElement("Button");
  playButton.textContent = "Pause";

  let buttonContainer = document.getElementById('buttonContainer');
  buttonContainer.appendChild(playButton);


  //If the "Draw Block" button is pressed the listeners for drawing blocks
  // (And adding newly created Outline objects to the blocks array) is activated.
  //Creating btn and btn2 and adding the eventlisteners should be wrapped in a separate function.

  playButton.addEventListener("click", e => {
    //If the play/resume button is hit it plays.
    e.preventDefault();

    buttons.forEach(b => (b.className = "notActive"));

    clearDuplicates(); //Clears any identical duplicate objects.

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
      //createRemoveButtons();
      drawElementsDuringSetup(); //This function is in the listeners.js file.

      noLoop();
    }
  });
}

function makeBlockButton() {
  let drawBlockButton = createButton("Draw Block");
  buttonContainer.appendChild(drawBlockButton.elt);
  buttons.push(drawBlockButton.elt);
  drawBlockButton.mouseClicked(() => {
    buttons.forEach(b => (b.className = "notActive"));
    drawBlockButton.elt.className = "active";
    drawButtonOn = true;
    removeButtonOn = false;
    objectType = "Block";
    listeners();
  });
}

function makeDragButton() {
  let drawDragButton = createButton("drawDragButton");
  buttonContainer.appendChild(drawDragButton.elt);
  buttons.push(drawDragButton.elt);
  drawDragButton.mouseClicked(() => {
    buttons.forEach(b => (b.className = "notActive"));
    drawDragButton.elt.className = "active";
    drawButtonOn = true;
    removeButtonOn = false;
    objectType = "Drag";
    listeners();
  });
}

function makeReverseDragButton() {
  let drawReverseDragButton = createButton("Draw Accelerator");
  buttonContainer.appendChild(drawReverseDragButton.elt);
  buttons.push(drawReverseDragButton.elt);
  drawReverseDragButton.mouseClicked(() => {
    //buttons.forEach(b => (b.className = "notActive")); //Clear function
    drawReverseDragButton.elt.className = "active";
    drawButtonOn = true;
    //removeButtonOn = false; //Clear function.
    objectType = "Reverse Drag";
    listeners();
  });
}

function makeRemoveButton() {
  let removeButton = createButton("Remove elements");
  buttonContainer.appendChild(removeButton.elt);
  buttons.push(removeButton.elt);
  removeButton.mouseClicked(() => {
    buttons.forEach(b => (b.className = "notActive"));
    removeButton.elt.className = "active";
    drawButtonOn = false; //Clear function.
    removeButtonOn = true;

    //I don't need this line for this function: objectType = "Reverse Drag";
    showRemoveButtons();
  });
}

function makeAddBallsButton() {
  let addBallsButton = createButton("Add Ball");
  buttonContainer.appendChild(addBallsButton.elt);
  buttons.push(addBallsButton.elt);
  resetButtons();
  addBallsButton.mouseClicked(() => {
    addBallsButton.elt.className = "active";
    addBalls();
    drawElementsDuringSetup();
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}

function makeRemoveBallsButton() {
  let removeBallsButton = createButton("Remove Ball");
  buttonContainer.appendChild(removeBallsButton.elt);
  buttons.push(removeBallsButton.elt);
  resetButtons();
  removeBallsButton.mouseClicked(() => {
    removeBallsButton.elt.className = "active";
    if (qty >= 1) {
      removeBalls();
    } else {
      console.log('There are no balls to remove.');
    }
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}


function makeResetButtons() {
  let resetButton = createButton("Reset");
  buttonContainer.appendChild(resetButton.elt);
  buttons.push(resetButton.elt);
  resetButtons();
  resetButton.mouseClicked(() => {
    resetButton.elt.className = "active";
    blocks.splice(0);
    liquids.splice(0);
    reverseLiquids.splice(0);
    balls.splice(0);
    qty = 0;
    listeners();
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}


function makeNumbersButtons() {
  let numbersButton = createButton("Show Numbers");
  buttonContainer.appendChild(numbersButton.elt);
  buttons.push(numbersButton.elt);
  resetButtons();
  numbersButton.mouseClicked(() => {
    numbersButton.elt.className = "active";
    showNumbers();
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}


function resetButtons() { //Change name to clearButtons();
  drawButtonOn = false; //Clear function.
  removeButtonOn = false; //Clear function.
  buttons.forEach(b => (b.className = "notActive")); //Clear function
}

//Make an "addAllButtons" function so that these don't all need to be referenced in setup();
//Also, that function can add them to the correct div and create the line-break.


function clearDuplicates() {
  //Removes any overlapping duplicate liquid objects.
  //For some reason, the event handlers sometimes register multiple clicks simultaneously and 
  //create multiple identical objects. I couldn't fix the event handlers so I put this in the clear
  //out the overlapping duplicatesl

  for (let i = liquids.length - 1; i >= 1; i--) {
    if (
      liquids[i].start.x === liquids[i - 1].start.x &&
      liquids[i].start.y === liquids[i - 1].start.y
    ) {
      liquids.splice(i, 1);
      removeDragBox();
    }
  }

  for (let i = reverseLiquids.length - 1; i >= 1; i--) {
    if (
      reverseLiquids[i].start.x === reverseLiquids[i - 1].start.x &&
      reverseLiquids[i].start.y === reverseLiquids[i - 1].start.y
    ) {
      reverseLiquids.splice(i, 1);
    }
  }

  for (let i = blocks.length - 1; i >= 1; i--) {
    if (
      blocks[i].start.x === blocks[i - 1].start.x &&
      blocks[i].start.y === blocks[i - 1].start.y
    ) {
      blocks.splice(i, 1);
      removeBlocks();
    }
  }
} //End of clearDuplicates();