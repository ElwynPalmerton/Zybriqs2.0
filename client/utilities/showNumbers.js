function showNumbers() {
  liquids.forEach((l, i) => {
    l.displayNumber(i + 1);
  });
  reverseLiquids.forEach((r, i) => {
    r.displayNumber(i + 1);
  });

  blocks.forEach((b, i) => {
    b.displayNumber(i + 1);
  });

  balls.forEach((b, i) => {
    b.displayNumber(i + 1);
  });
}
