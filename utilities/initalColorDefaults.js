//Watch out for this if I change the way that the thing is loaded with defaults.
// let bSel = document.getElementById('BlockSelect');
// bSel.removeChild(bSel.lastChild);

const defaultColor = {
  //Green
  h: 150,
  s: 50,
  l: 50,
  a: 1,
};

let defaultAccelColor = {
  //Aquamarine
  h: 200,
  s: 40,
  l: 40,
  a: 0.5,
};

let defaultDragColor = {
  h: 0,
  s: 62,
  l: 80,
  a: 0.4,
};


let initDragColors = [{
  h: 330,
  s: 35,
  l: 60,
  a: 0.4,
}, ];

let initAccelColors = [{
  h: 300,
  s: 55,
  l: 70,
  a: 0.6,
}, ];

const initBlockColors = [{
  h: 160,
  s: 70,
  l: 70,
  a: 1,
}, ];

let initBallColors = [{
    h: 180,
    s: 35,
    l: 75,
    a: 0.5,
  },
  {
    h: 220,
    s: 35,
    l: 75,
    a: 0.5,
  },
  {
    h: 260,
    s: 35,
    l: 100,
    a: 0.5,
  },
];