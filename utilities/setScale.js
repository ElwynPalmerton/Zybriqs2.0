function setScale(zenMode) {
  //1. Maybe calculate the actual curent scale based on the default height/width.
  //So that this still works even if I change the init size and aspect ratio.
  //
  //2.Subtract out the sliders or let those be placed first?
  //Subtract out the buttonDiv height or let those be placed?
  //The scale should be calculate on the space already alloted.
  //so...
  //3.The currentWidth and currentHeight should be passed into this.
  console.log(zenMode);

  let scale;
  let wrapper = document.getElementById('canvasContainer');

  let cw = document.body.clientWidth;
  let ch = document.body.clientHeight;

  // let ch = document.documentElement.clientHeight - 100;
  cw = cw - 250;

  console.log(cw);

  if (cw > 1000) {
    cw = 1000;
  }

  if (cw < 800 && cw > 600) {
    cw = 700;
    //Once it goes into ths range it should use ch to calc scale.
  }

  if (cw < 500) {
    cw = 500;
  }



  scale = cw / initWidth;
  if ((screen.availHeight || screen.height - 30) <= window.innerHeight) {
    ch = ch - 100;
    if (fullScreen === true) ch = ch + 100;
    scale = ch / initHeight;
  }



  //Calculate scale
  return scale;

}

function setScale2() {

  let scale;

  let cw = document.body.clientWidth;
  let ch = document.body.clientHeight;

  // let ch = document.documentElement.clientHeight - 100;



  if (cw / ch < 1.2) {
    scale = cw / initWidth;
  } else {
    scale = ch / initHeight;
  }


  //Calculate scale
  return scale;
}