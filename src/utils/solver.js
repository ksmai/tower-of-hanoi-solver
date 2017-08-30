export default function *solve(moveCount, from = 0, to = 1) {
  if (moveCount < 2) {
    yield { from, to };
  } else {
    const target = 3 - from - to;
    yield *solve(moveCount - 1, from, target);
    yield { from, to };
    yield *solve(moveCount - 1, target, to);
  }
}
