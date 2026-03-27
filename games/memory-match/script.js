const board = document.querySelector('#board');
const movesEl = document.querySelector('#moves');
const restartBtn = document.querySelector('#restart');
const messageEl = document.querySelector('#message');

const symbols = ['🍉', '🚀', '⭐', '🎸', '🐸', '🍕', '🧠', '🎮'];

let cards = [];
let flipped = [];
let lockBoard = false;
let moves = 0;

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function updateMoves() {
  movesEl.textContent = `Moves: ${moves}`;
}

function render() {
  board.innerHTML = '';
  cards.forEach(card => {
    const button = document.createElement('button');
    button.className = 'card';
    button.dataset.id = card.id;
    button.disabled = card.matched;

    if (card.flipped || card.matched) {
      button.textContent = card.symbol;
      button.classList.add(card.matched ? 'matched' : 'flipped');
    } else {
      button.textContent = '❔';
    }

    board.append(button);
  });
}

function resetGame() {
  const pairDeck = shuffle([...symbols, ...symbols]);
  cards = pairDeck.map((symbol, index) => ({
    id: index,
    symbol,
    flipped: false,
    matched: false,
  }));

  flipped = [];
  lockBoard = false;
  moves = 0;
  updateMoves();
  messageEl.textContent = 'Find all pairs to win.';
  render();
}

function checkWin() {
  const allMatched = cards.every(card => card.matched);
  if (allMatched) {
    messageEl.textContent = `You won in ${moves} moves!`;
  }
}

board.addEventListener('click', event => {
  const cardEl = event.target.closest('.card');
  if (!cardEl || lockBoard) {
    return;
  }

  const cardId = Number(cardEl.dataset.id);
  const card = cards[cardId];

  if (card.flipped || card.matched) {
    return;
  }

  card.flipped = true;
  flipped.push(card);
  render();

  if (flipped.length < 2) {
    return;
  }

  moves += 1;
  updateMoves();

  const [first, second] = flipped;
  if (first.symbol === second.symbol) {
    first.matched = true;
    second.matched = true;
    flipped = [];
    checkWin();
    render();
    return;
  }

  lockBoard = true;
  setTimeout(() => {
    first.flipped = false;
    second.flipped = false;
    flipped = [];
    lockBoard = false;
    render();
  }, 700);
});

restartBtn.addEventListener('click', resetGame);

resetGame();
