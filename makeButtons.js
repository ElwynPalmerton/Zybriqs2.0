function makeButtons() {
  makePlayButton();
  makeBlockButton();
  makeDragButton();
  makeReverseDragButton();
  makeRemoveButton();
  makeAddBallsButton();
  makeRemoveBallsButton();
  //makeResetButtons();
  makeNumbersButtons();
  makeZenModeButtons()
  //makeFullscreenButtons()
}

function lastActive() {
  return buttons.some((btn) => btn.className === "active");
}

/////PPP/////////
function keyPressed(e) {
  if (keyCode === 80) {
    e.preventDefault();
    //"P" - Makes all the balls move spasstically updward.
    console.log("pressed");
    let bounce = createVector(0, -1);

    for (let i = 0; i < qty; i++) {
      bounce.mult(balls[i].mass);
      balls[i].applyForce(bounce);
    }
  }

}


// function keyPressed(e) {
//   if (key = " ") {
//     e.preventDefault();
//     pausePlay();
//   }
// }

let playButton = document.createElement("Button");

function play() {
  run = true;
  playButton.innerHTML = "Pause";
  playButton.className = "notActive";
  clearDuplicates();
  loop();
}

function pause() {
  run = false;
  playButton.innerHTML = "Resume";
  playButton.className = "paused";
  //createRemoveButtons();
  drawElementsDuringSetup(); //This function is in the listeners.js file.
  noLoop();
}

function pausePlay() {
  buttons.forEach(b => (b.className = "notActive"));

  clearDuplicates(); //Clears any identical duplicate objects.

  if (run === false) {
    play();
  } else {
    //It seems like this is working without the if statement to check "run" but I do use run elsewhere.
    pause();
  }
}



function makePlayButton() {

  playButton.textContent = "Pause";

  let buttonContainer = document.getElementById('buttonContainer');
  buttonContainer.appendChild(playButton);
  //If the "Draw Block" button is pressed the listeners for drawing blocks
  // (And adding newly created Outline objects to the blocks array) is activated.
  //Creating btn and btn2 and adding the eventlisteners should be wrapped in a separate function.
  playButton.addEventListener("click", e => {
    //If the play/resume button is hit it plays.
    //Also add stopPropagation.
    e.preventDefault();
    e.stopPropagation();
    pausePlay();
  });
}

function makeBlockButton() {
  let drawBlockButton = createButton("Block");
  buttonContainer.appendChild(drawBlockButton.elt);
  buttons.push(drawBlockButton.elt);

  drawBlockButton.mouseClicked((e) => {
    e.stopPropagation();

    let current = drawBlockButton.elt.className === "active";
    let lastActive = buttons.some((btn) => btn.className === "active");

    buttons.forEach(b => (b.className = "notActive"));
    if (run === true) {
      pause();
      drawBlockButton.elt.className = "active";
    } else if (lastActive && !current && run === false) {
      drawBlockButton.elt.className = "active";
    } else if (current && run === false) {
      play();
    } else {
      drawBlockButton.elt.className = "active";
    }

    drawButtonOn = true;
    removeButtonOn = false;
    objectType = "Block";
    listeners();
  });
}

function makeDragButton() {
  let drawDragButton = createButton("Drag");
  buttonContainer.appendChild(drawDragButton.elt);
  buttons.push(drawDragButton.elt);


  drawDragButton.mouseClicked((e) => {
    let current = drawDragButton.elt.className === "active";
    let lastActive = buttons.some((btn) => btn.className === "active");

    buttons.forEach(b => (b.className = "notActive"));
    e.stopPropagation();
    //buttons.forEach(b => (b.className = "notActive"));
    if (run === true) {
      pause();
      drawDragButton.elt.className = "active";
    } else if (lastActive && !current && run === false) {
      drawDragButton.elt.className = "active";
    } else if (current && run === false) {
      play();
    } else {
      drawDragButton.elt.className = "active";
    }
    drawButtonOn = true;
    removeButtonOn = false;
    objectType = "Drag";
    listeners();
  });
}

function makeReverseDragButton() {
  let drawReverseDragButton = createButton("Accelerator");
  buttonContainer.appendChild(drawReverseDragButton.elt);
  buttons.push(drawReverseDragButton.elt);
  drawReverseDragButton.mouseClicked((e) => {

    let current = drawReverseDragButton.elt.className === "active";
    let lastActive = buttons.some((btn) => btn.className === "active");

    e.stopPropagation();
    resetButtons();
    //buttons.forEach(b => (b.className = "notActive")); //Clear function
    if (run === true) {
      pause();
      drawReverseDragButton.elt.className = "active";
    } else if (lastActive && !current && run === false) {
      drawReverseDragButton.elt.className = "active";
    } else if (current && run === false) {
      play();
    } else {
      drawReverseDragButton.elt.className = "active";
    }
    drawButtonOn = true;
    //removeButtonOn = false; //Clear function.
    objectType = "Reverse Drag";
    listeners();
  });
}

function makeRemoveButton() {
  let removeButton = createButton("Remove");
  buttonContainer.appendChild(removeButton.elt);
  buttons.push(removeButton.elt);
  removeButton.mouseClicked((e) => {

    let current = removeButton.elt.className === "active";
    let lastActive = buttons.some((btn) => btn.className === "active");
    buttons.forEach(b => (b.className = "notActive"));
    e.stopPropagation();
    resetButtons();

    if (run === true) {
      pause();
      removeButton.elt.className = "active";
    } else if (lastActive && !current && run === false) {
      removeButton.elt.className = "active";
    } else if (current && run === false) {
      play();
    } else {
      removeButton.elt.className = "active";
    }



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
  addBallsButton.mouseClicked((e) => {
    e.stopPropagation();
    //addBallsButton.elt.className = "active";
    resetButtons();
    //addBallsButton.elt.className = "active";
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



  removeBallsButton.mouseClicked((e) => {

    //removeBallsButton.elt.className = "active";
    if (qty > 0) {
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
  resetButton.mouseClicked((e) => {
    e.stopPropagation();
    resetButton.elt.className = "active";
    removeAll();
    blocks.splice(0);
    liquids.splice(0);
    reverseLiquids.splice(0);
    balls.splice(0);
    //
    qty = 0;
    listeners();
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}


function makeNumbersButtons() {
  let numbersButton = createButton("Numbers");
  buttonContainer.appendChild(numbersButton.elt);
  buttons.push(numbersButton.elt);
  numbersButton.mouseClicked((e) => {

    let current = numbersButton.elt.className === "active";
    let lastActive = buttons.some((btn) => btn.className === "active");

    e.stopPropagation();
    resetButtons();

    if (run === true) {
      pause();
      numbersButton.elt.className = "active";
    } else if (lastActive && !current && run === false) {
      numbersButton.elt.className = "active";
    } else if (current && run === false) {
      play();
    } else {
      numbersButton.elt.className = "active";
    }
    numbersButton.elt.className = "active";
    if (run === true) {
      numbersButton.elt.className = "notActive";
    }

    drawElementsDuringSetup()
    showNumbers();
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}

function makeZenModeButtons() {
  let zenButton = createButton("Zen Mode");
  buttonContainer.appendChild(zenButton.elt);
  buttons.push(zenButton.elt);

  zenButton.mouseClicked((e) => {
    e.stopPropagation();
    let elem = document.querySelector('body');
    resetButtons();
    zenButton.elt.className = "active";


    openFullScreen();

    function openFullScreen() {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }
    //I don't need this line for this function: objectType = "Reverse Drag";
  });
}


// function makeFullscreenButtons() {
//   let fullscreenButton = createButton("Fullscreen");
//   buttonContainer.appendChild(fullscreenButton.elt);
//   buttons.push(fullscreenButton.elt);

//   zenButton.mouseClicked((e) => {
//     e.stopPropagation();
//     let elem = document.querySelector('body');

//     openFullScreen();

//     function openFullScreen() {
//       if (elem.requestFullscreen) {
//         elem.requestFullscreen();
//       } else if (elem.mozRequestFullScreen) {
//         /* Firefox */
//         elem.mozRequestFullScreen();
//       } else if (elem.webkitRequestFullscreen) {
//         /* Chrome, Safari & Opera */
//         elem.webkitRequestFullscreen();
//       } else if (elem.msRequestFullscreen) {
//         /* IE/Edge */
//         elem.msRequestFullscreen();
//       }
//     }
//     //I don't need this line for this function: objectType = "Reverse Drag";
//   });
// }

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
      updateSliders();
      //removeDragBoxSelector();
    }
  }

  for (let i = reverseLiquids.length - 1; i >= 1; i--) {
    if (
      reverseLiquids[i].start.x === reverseLiquids[i - 1].start.x &&
      reverseLiquids[i].start.y === reverseLiquids[i - 1].start.y
    ) {
      reverseLiquids.splice(i, 1);
      updateSliders()
      //removeAccelBoxSelector();
    }
  }

  for (let i = blocks.length - 1; i >= 1; i--) {
    if (
      blocks[i].start.x === blocks[i - 1].start.x &&
      blocks[i].start.y === blocks[i - 1].start.y
    ) {
      blocks.splice(i, 1);
      createController();
      updateSliders();
      //removeBlocks();
    }
  }
} //End of clearDuplicates();