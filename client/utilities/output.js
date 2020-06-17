function outputJSON() {
  stateText = (JSON.stringify(state));
  stateText.split('"').join("");

  let colorState = stateText.replace(/\"/g, "");

  let colorStateJSON = JSON.parse(stateText);

  // console.log(colorState);

  let balls = [];
  let accel = [];
  let drag = [];
  let backgroundColor = [];
  let blocks = [];

  balls = colorStateJSON.balls;

  colorStateJSON.accel.forEach((a, i) => {
    accel[i] = a.color;
  });


  colorStateJSON.drag.forEach((d, i) => {
    drag[i] = d.color;
  })

  colorStateJSON.blocks.forEach((b, i) => {
    blocks[i] = b.color;
  });

  // backgroundColor[i] = ColorStateJSON.background[i];

  let colorArray = {};

  colorArray.balls = balls;
  colorArray.accel = accel;
  colorArray.drag = drag;
  colorArray.blocks = blocks;
  colorArray.backgroundColor = colorStateJSON.backgroundColor;

  colorArray = JSON.stringify(colorArray);
  let colorArrayString = colorArray.replace(/\"/g, "");

  console.log(colorArrayString);
}



function outputStateJSON() {
  stateText = (JSON.stringify(state));
  stateText.split('"').join("");
  let colorState = stateText.replace(/\"/g, "");

  console.log(colorState);

}