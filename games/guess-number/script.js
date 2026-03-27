const form = document.querySelector('#guess-form');
const input = document.querySelector('#guess-input');
const resetBtn = document.querySelector('#reset-btn');
const statusEl = document.querySelector('#status');
const attemptsEl = document.querySelector('#attempts');

let target = randomTarget();
let attempts = 0;
let solved = false;

function randomTarget() {
  return Math.floor(Math.random() * 100) + 1;
}

function updateAttempts() {
  attemptsEl.textContent = `Attempts: ${attempts}`;
}

function resetGame() {
  target = randomTarget();
  attempts = 0;
  solved = false;
  statusEl.classList.remove('success');
  statusEl.textContent = 'Game restarted! Guess the new number.';
  input.value = '';
  updateAttempts();
  input.focus();
}

form.addEventListener('submit', event => {
  event.preventDefault();

  if (solved) {
    statusEl.textContent = 'You already won — hit Reset to play again.';
    return;
  }

  const guess = Number(input.value);
  if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
    statusEl.textContent = 'Please enter a whole number from 1 to 100.';
    return;
  }

  attempts += 1;
  updateAttempts();

  if (guess === target) {
    solved = true;
    statusEl.classList.add('success');
    statusEl.textContent = `Perfect! ${guess} is correct. You solved it in ${attempts} tries.`;
    return;
  }

  const hint = guess > target ? 'Too high.' : 'Too low.';
  const temperature = Math.abs(guess - target) <= 10 ? 'You are very close!' : 'Keep going.';
  statusEl.textContent = `${hint} ${temperature}`;
});

resetBtn.addEventListener('click', resetGame);
