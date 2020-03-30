function showNumbers() {
  //drawElementsDuringSetup();
  liquids.forEach((l, i) => {
    l.displayNumber(i); //Liquid and reverseLiquid should be in the same array. See above?
  })
  //liquid.displayRemoveButton();
  reverseLiquids.forEach((r, i) => {
    r.displayNumber(i);
  })

  blocks.forEach((b, i) => {
    b.displayNumber(i);
  });

  balls.forEach((b, i) => {
    b.displayNumber(i);
  })
}