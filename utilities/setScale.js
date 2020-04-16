function setScale() {
  //1. Maybe calculate the actual curent scale based on the default height/width.
  //So that this still works even if I change the init size and aspect ratio.
  //
  //2.Subtract out the sliders or let those be placed first?
  //Subtract out the buttonDiv height or let those be placed?
  //The scale should be calculate on the space already alloted.
  //so...
  //3.The currentWidth and currentHeight should be passed into this.

  let scale;
  let wrapper = document.getElementById('canvasContainer');

  let cw = document.body.clientWidth - 260;
  let ch = document.documentElement.clientHeight - 100;

  if (cw / ch < 1.2) {
    scale = cw / initWidth;
  } else {
    scale = ch / initHeight;
  }

  //Calculate scale
  return scale;

}