const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const winningMessage = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let isOTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isOTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = ''; // ✅ Clear the text
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessage.classList.add('hidden');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isOTurn ? 'o' : 'x';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isOTurn = !isOTurn;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "It's a Draw!";
  } else {
    winningMessageText.innerText = `${isOTurn ? "O" : "X"} Wins!`;
  }
  winningMessage.classList.remove('hidden');
}

function isDraw() {
  return [...cellElements].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
