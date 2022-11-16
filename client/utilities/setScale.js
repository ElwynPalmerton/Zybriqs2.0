function setScale(zenMode) {
  let scale;
  let wrapper = document.getElementById("canvasContainer");
  let cw = document.body.clientWidth;
  let ch = document.body.clientHeight;
  cw = cw - 250;

  if (cw > 1000) {
    cw = 1000;
  }

  if (cw < 800 && cw > 600) {
    cw = 700;
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
  return scale;
}

function setScale2() {
  let scale;

  let cw = document.body.clientWidth;
  let ch = document.body.clientHeight;

  if (cw / ch < 1.2) {
    scale = cw / initWidth;
  } else {
    scale = ch / initHeight;
  }
  return scale;
}

function setScale3() {
  let cw = document.body.clientWidth;
  let ch = document.body.clientHeight;

  let scale = 0.8;

  return scale;
}

function fullscreenScale() {
  let cw = document.body.clientWidth;
  let ch = document.body.clientHeight;

  let scale = screen.availHeight / initHeight;

  return scale;
}
