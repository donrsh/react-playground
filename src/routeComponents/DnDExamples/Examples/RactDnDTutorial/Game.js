let knightPosition = [0, 0];
let observer = null;

function emitChange() {
  observer(knightPosition);
}

export function initKnightPosition (x) {
  if (initKnightPosition.called) {
    throw new Error(`initKnightPosition cannot be called once`)
  }

  knightPosition = x
  initKnightPosition.called = true
}
initKnightPosition.called = false

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;

  const unobserve = () => { 
    observer = null 
    initKnightPosition.called = false
  }
  return unobserve
}

export function moveKnight(toX, toY) {
  knightPosition = [toX, toY];
  emitChange();
}

export function canMoveKnight(toX, toY) {
  const [x, y] = knightPosition;
  const dx = toX - x;
  const dy = toY - y;

  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}