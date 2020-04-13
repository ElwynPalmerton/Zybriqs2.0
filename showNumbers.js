function showNumbers() {
  //drawElementsDuringSetup();
  liquids.forEach((l, i) => {
    l.displayNumber(i + 1); //Liquid and reverseLiquid should be in the same array. See above?
  })
  //liquid.displayRemoveButton();
  reverseLiquids.forEach((r, i) => {
    r.displayNumber(i + 1);
  })

  blocks.forEach((b, i) => {
    b.displayNumber(i + 1);
  });

  balls.forEach((b, i) => {
    b.displayNumber(i + 1);
  })
}