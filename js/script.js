// IPO

// Input Process Output

// 1) Define the inputs - Constants (Something that can't change) and State Variables (Something that can change)

const COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const KEY = {
  '1': 'X',
  '-1': 'O',
  null: ''
};

// Things that change - turn, winner, gameboard

let turn, winner, gameboard;

// We need to cache element references

const squares = document.querySelectorAll('.square');
const message = document.getElementById('message');

// Define our process

// Add event listeners
document.querySelector('#gameboard').addEventListener('click', handleClick);
document.querySelector('#reset').addEventListener('click', init);

// This is where we start or restart our game
init(); // Call the function to start the game
function init() {
  winner = false; // We don't have a winner - staring from zero
  turn = 1;
  gameboard = [null, null, null, null, null, null, null, null, null];
  render();
}

function handleClick(evt) {
  // Assign clicked sqaure to a variable
  const selectedIndex = parseInt(evt.target.dataset.index);
  if (gameboard[selectedIndex]) return;
  gameboard[selectedIndex] = turn;
  turn *= -1;
  winner = checkWinner();
  console.log(winner);
  render();
}

function checkWinner() {
  for (let i = 0; i < COMBOS.length; i++) {
    if (
      Math.abs(
        gameboard[COMBOS[i][0]] +
          gameboard[COMBOS[i][1]] +
          gameboard[COMBOS[i][2]]
      ) === 3
    )
      return gameboard[COMBOS[i][0]];
  }
  if (gameboard.includes(null)) return false;
  return 'T';
}

// Output

function render() {
  gameboard.forEach(function(elem, index) {
    squares[index].textContent = KEY[elem];
  });

  if (!winner) {
    message.textContent = `${KEY[turn]}'s Turn`;
  } else if (winner === 'T') {
    message.textContent = 'Tied Game';
  } else {
    message.textContent = `${KEY[winner]} won the game!`;
  }
}
render();
