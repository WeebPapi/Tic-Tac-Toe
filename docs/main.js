let boardArray = JSON.parse(localStorage.getItem("boardArray") || '["","","","","","","","",""]');
let cellArray = [document.querySelector("#cell-0"), document.querySelector("#cell-1"), document.querySelector("#cell-2"), document.querySelector("#cell-3"), document.querySelector("#cell-4"), document.querySelector("#cell-5"), document.querySelector("#cell-6"), document.querySelector("#cell-7"), document.querySelector("#cell-8")];
let currentPlayer = localStorage.getItem("currentPlayer") || "X";
let displayPlayer = document.querySelector("#player");
let resetButton = document.querySelector("#reset");
let gameOver = JSON.parse(localStorage.getItem("gameOver") || "false");
displayPlayer.textContent = currentPlayer;
document.addEventListener("DOMContentLoaded", () => {
  cellArray.forEach((cell, index) => {
    cell.textContent = boardArray[index];
  });
  if (gameOver)
    window.alert("This game is finished");
});
const resetGame = () => {
  boardArray = ["", "", "", "", "", "", "", "", ""];
  cellArray.forEach((cell) => {
    cell.textContent = "";
  });
  currentPlayer = "X";
  displayPlayer.textContent = currentPlayer;
  gameOver = false;
  localStorage.clear();
};
const checkWin = () => {
  const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  winCombos.forEach((combo) => {
    if (boardArray[combo[0]] === boardArray[combo[1]] && boardArray[combo[1]] === boardArray[combo[2]] && boardArray[combo[0]] !== "") {
      window.alert(`Player ${boardArray[combo[0]]} wins!`);
      gameOver = true;
      localStorage.setItem("gameOver", JSON.stringify(gameOver));
    } else if (boardArray.every((cell) => cell !== "" && !gameOver)) {
      window.alert("Tie game!");
      gameOver = true;
      localStorage.setItem("gameOver", JSON.stringify(gameOver));
    }
  });
};
cellArray.forEach((cell, index) => {
  if (cell) {
    cell.addEventListener("mouseenter", () => {
      if (cell.textContent === "" && !gameOver) {
        let hoverIndicator = document.createElement("span");
        hoverIndicator.textContent = currentPlayer;
        hoverIndicator.classList.add("hover-indicator");
        cell.appendChild(hoverIndicator);
      }
    });
    cell.addEventListener("mouseleave", () => {
      if (cell.firstChild?.nodeName === "SPAN" && !gameOver) {
        cell.removeChild(cell.firstChild);
      }
    });
    cell.addEventListener("click", () => {
      if (boardArray[index] === "" && !gameOver) {
        boardArray[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        displayPlayer.textContent = currentPlayer;
        localStorage.setItem("currentPlayer", currentPlayer);
        localStorage.setItem("boardArray", JSON.stringify(boardArray));
        checkWin();
      }
    });
  }
});
resetButton.addEventListener("click", resetGame);
//# sourceMappingURL=main.js.map
