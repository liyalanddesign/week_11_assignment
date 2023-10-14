// 1. Create function which will check Winner.
// 2. Create function which will check if there is a draw.
// 3. Create function which will reset board.
// 4. Create function which will show alert about winner.
// 5. Create function which starts on user's click.

let currentPlayer = "X";

// 1. -- Check the Winner

function checkWinner() {
  const rows = document.querySelectorAll(".board tr");

  // Here we check if there is a winner in row (3 rows).
  // We check every row's cells and if all of
  // them are filled with the same player's sign, we
  // return TRUE and function will stop
  for (let row of rows) {
    const cells = row.querySelectorAll("td");
    if (
      cells[0].innerText === currentPlayer &&
      cells[1].innerText === currentPlayer &&
      cells[2].innerText === currentPlayer
    ) {
      return true;
    }
  }

  // Here We check if there is a winner who filled diagonal cells
  if (
    // top left to bottom right
    rows[0].children[0].innerText === currentPlayer &&
    rows[1].children[1].innerText === currentPlayer &&
    rows[2].children[2].innerText === currentPlayer
  ) {
    return true;
  }

  if (
    // top right to bottom left
    rows[0].children[2].innerText === currentPlayer &&
    rows[1].children[1].innerText === currentPlayer &&
    rows[2].children[0].innerText === currentPlayer
  ) {
    return true;
  }

  // Here We check if there is a winner who filled vertical cells
  for (let i = 0; i < 3; i++) {
    if (
      rows[0].children[i].innerText === currentPlayer &&
      rows[1].children[i].innerText === currentPlayer &&
      rows[2].children[i].innerText === currentPlayer
    ) {
      return true;
    }
  }

  return false;
}

// 2. -- Check if there is a draw.
function checkDraw() {
  // Function checks every cell in the board.
  // If every cell is filled, it means that there is a draw and function will return TRUE
  // Otherwise, function will return FALSE
  // !!! -> "Draw" is possible when all cells are filled and there is no winner
  $(".board td").each((i, cell) => {
    if (!cell.innerText) {
      return false;
    }
    return true;
  });
}

// 3. -- Reset board
function resetBoard() {
  // This function resets board.
  // Clean all cells and set first player to "X"
  const cells = $(".board td");
  for (let cell of cells) {
    cell.innerText = "";
  }
  currentPlayer = "X";
  $("#playerTurn").innerText = "X's turn";
}

// 4. -- Show alert about winner
function showAlert(message) {
  // This function shows alert about winner.
  // It creates div with bootstrap modal and appends it to body.
  const alertDiv = document.createElement("div");
  alertDiv.innerHTML = `<div class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header text-center">
        <h5 class="modal-title text-center">Congratulations!</h5>
      </div>
      <div class="modal-body">
        <p class="text-center">${message}</p>
      </div>
    </div>
  </div>
</div>`;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    document.body.removeChild(alertDiv);
  }, 3000);
}

// 5. -- Start on user's first click
function makeMove(cell) {
  // This function starts on user's click.
  // It checks if clicked cell is not empty or if there is a winner.
  // If one of these conditions is true, function will stop.
  if (cell.innerText !== "" || checkWinner()) {
    return;
  }
  // if cell is empty, function will fill it with current player's sign
  cell.innerText = currentPlayer;

  // After filling cell, function will check if there is a winner or draw.
  if (checkWinner()) {
    // if there is a winner, function will show alert about winner
    setTimeout(() => {
      showAlert(`${currentPlayer} wins!`);
    }, 50);
    return;
  }

  if (checkDraw()) {
    // if there is a draw, function will show alert about draw
    setTimeout(() => {
      showAlert(`It's a draw!`);
    }, 50);
    return;
  }

  // if there is no winner or draw, function will change current player and keep going
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  // by changing text in #playerTurn element.
  document.getElementById("playerTurn").innerText = `${currentPlayer}'s turn`;
}

// THANKS FOR READING! :)
