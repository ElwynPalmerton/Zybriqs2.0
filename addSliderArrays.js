  //Watch out for this if I change the way that the thing is loaded with defaults.
  // let bSel = document.getElementById('BlockSelect');
  // bSel.removeChild(bSel.lastChild);

  const defaultColor = {
    //Green
    h: 150,
    s: 50,
    l: 50,
    a: 1
  };

  const defaultAccelColor = {
    //Aquamarine
    h: 180,
    s: 50,
    l: 50,
    a: 1
  };

  let defaultDragColor = {
    h: 0,
    s: 62,
    l: 80,
    a: 0.5
  };

  let ballColorsArray = [];
  let dragColorsArray = [];
  let blockColorsArray = [];

  let initDragColors = [{
    h: 0,
    s: 62,
    l: 80,
    a: 0.5
  }];


  let initAccelColors = [{
    h: 180,
    s: 50,
    l: 50,
    a: 0.5
  }];

  const initBlockColors = [{
    h: 90,
    s: 100,
    l: 50,
    a: 1
  }];


  let initBallColors = [{
      h: 100,
      s: 35,
      l: 100,
      a: 0.5
    },
    {
      h: 200,
      s: 35,
      l: 100,
      a: 0.5
    },
    {
      h: 300,
      s: 35,
      l: 100,
      a: 0.5
    }
  ];


  // function addColorSliders() {

  // }

  // function modifySliders(newColor) {
  //   //How do I select an element which is inside another element.
  //   //Also, I can put the colorSliders function in a different file since it is a freestanding function.
  //   //How do I change the value when the Option is selcted.
  //   let hSlider = document.getElementsByClassName(".BallDiv .hSlider");
  //   let sSlider = document.getElementsByClassName(".BallDiv .sSlider");
  //   let lSlider = document.getElementsByClassName(".BallDiv .lSlider");
  //   let aSlider = document.getElementsByClassName(".BallDiv .aSlider");

  //   hSlider.value = newColor.h;
  //   sSlider.value = newColor.s;
  //   lSlider.value = newColor.l;
  //   aSlider.value = newColor.a;
  // }


  // function readColorSliders(selection, hslaArray, colorsArray, slideSelector) {

  //   //Needs the hsla array and the color array as arguments.
  //   selection.addEventListener("change", () => {

  //     modifySliders(initBallColors[selection.value]);


  //     let hSlider = document.querySelector(slideSelector + " .hSlider");
  //     console.log(hSlider);

  //     hSlider.addEventListener("input", () => {
  //       hslaArray[selection.value].h = hSlider.value;
  //       let c = hslaArray[selection.value];
  //       newColor = color(c.h, c.s, c.l, c.a);
  //       colorsArray[selection.value] = newColor;
  //     });

  //     let sSlider = document.querySelector(slideSelector + " .sSlider");
  //     sSlider.addEventListener("input", () => {
  //       hslaArray[selection.value].s = sSlider.value;
  //       let c = hslaArray[selection.value];
  //       newColor = color(c.h, c.s, c.l, c.a);
  //       colorsArray[selection.value] = newColor;
  //     });

  //     let lSlider = document.querySelector(slideSelector + " .lSlider");
  //     lSlider.addEventListener("input", () => {
  //       hslaArray[selection.value].l = lSlider.value;
  //       let c = hslaArray[selection.value];
  //       newColor = color(c.h, c.s, c.l, c.a);
  //       colorsArray[selection.value] = newColor;
  //     });

  //     let aSlider = document.querySelector(slideSelector + " .aSlider");
  //     aSlider.addEventListener("input", () => {
  //       hslaArray[selection.value].a = aSlider.value;
  //       let c = hslaArray[selection.value];

  //       let aNum = parseFloat(c.a);
  //       //I don't know why c.a is returning a string right here.
  //       //Maybe something to do with how I'm using step.
  //       //But using parseFloat seems like
  //       //an acceptable work-around for now.
  //       newColor = color(c.h, c.s, c.l, aNum);
  //       colorsArray[selection.value] = newColor;

  //     });


  //   });

  // }


  // function readAllSliders() {

  //   // let sel = document.getElementById("BallSelect"); //!!!!!!!!!!!!!!!!
  //   // readColorSliders(sel, initBallColors, ballColorsArray, ".BallSliders");

  //   // let blockSel = document.getElementById("BlockSelect"); //!!!!!!!!!!!!!!!!
  //   // readColorSliders(blockSel, initBlockColors, blockColorsArray, ".BlockSliders");

  // }