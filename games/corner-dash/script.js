const canvas = document.querySelector('#canvas');
const scoreEl = document.querySelector('#score');
const drawer = canvas.getContext('2d');

const state = {
  offset: 0,
  velocity: 1,
  score: 0,
};

const BOX_SIZE = 40;
const PADDING = 20;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(300, Math.floor(rect.width));
  canvas.height = Math.max(300, Math.floor(rect.height));
}

function drawBoxes(offset) {
  const xMax = canvas.width - BOX_SIZE - PADDING;
  const yMax = canvas.height - BOX_SIZE - PADDING;

  drawer.clearRect(0, 0, canvas.width, canvas.height);

  drawer.fillStyle = '#6e86ff';
  drawer.fillRect(PADDING + offset, PADDING + offset, BOX_SIZE, BOX_SIZE);
  drawer.fillRect(xMax - offset, PADDING + offset, BOX_SIZE, BOX_SIZE);

  drawer.fillStyle = '#54d48d';
  drawer.fillRect(PADDING + offset, yMax - offset, BOX_SIZE, BOX_SIZE);
  drawer.fillRect(xMax - offset, yMax - offset, BOX_SIZE, BOX_SIZE);

  drawer.fillStyle = '#ff8c6e';
  drawer.fillRect(canvas.width / 2 - BOX_SIZE / 2, canvas.height / 2 - BOX_SIZE / 2, BOX_SIZE, BOX_SIZE);
}

function frame() {
  const maxOffset = Math.min(canvas.width, canvas.height) / 2 - BOX_SIZE;

  state.offset += state.velocity;

  if (state.offset <= 0) {
    state.offset = 0;
    state.velocity = Math.max(1, state.velocity * 1.02);
  }

  if (state.offset >= maxOffset) {
    state.offset = maxOffset;
    state.velocity *= -1;
    state.score += 1;
    scoreEl.textContent = `Score: ${state.score}`;
  }

  drawBoxes(state.offset);
  requestAnimationFrame(frame);
}

window.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    event.preventDefault();
    state.velocity = -Math.abs(state.velocity) - 0.4;
  }
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
frame();
