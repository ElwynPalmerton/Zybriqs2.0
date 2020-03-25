function makePlayButton() {
  let playButton = document.createElement("Button");
  playButton.textContent = "Start";
  document.body.appendChild(playButton);

  //If the "Draw Block" button is pressed the listeners for drawing blocks
  // (And adding newly created Outline objects to the blocks array) is activated.
  //Creating btn and btn2 and adding the eventlisteners should be wrapped in a separate function.

  playButton.addEventListener("click", e => { //If the play/resume button is hit it plays.
    e.preventDefault();
    if (run === false) {
      run = true;
      playButton.innerHTML = "Pause";
      loop();
    } else {
      run = false;
      playButton.innerHTML = "Resume";
      noLoop();
    }
  });
}


function makeBlockButton() {
  let drawBlockButton = createButton("Draw Block");
  drawBlockButton.mousePressed(() => {
    if (drawButtonOn === false) {
      drawButtonOn = true;
      listeners();
    } else {
      drawButtonOn = false;
    }
  });
}

//I need to add another two buttons for adding the liquid and reverse liquid boxes.
//ADD THE CODE ABOVE TO THE OTHER FILE (try to consolidate in a function first.)///