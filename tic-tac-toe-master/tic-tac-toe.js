document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("#board div");
    const statusDisplay = document.getElementById("status");
    const newGameButton = document.querySelector(".btn");
    let currentPlayer = "X";
    let gameState = Array(9).fill(null);
    let gameActive = true;
  
    squares.forEach((square, index) => {
      square.classList.add("square");
      square.addEventListener("click", () => handleSquareClick(square, index));
      square.addEventListener("mouseenter", () => handleMouseEnter(square));
      square.addEventListener("mouseleave", () => handleMouseLeave(square));
    });
  
    newGameButton.addEventListener("click", resetGame);
  
    function handleSquareClick(square, index) {
      if (square.textContent || !gameActive) return;
  
      square.textContent = currentPlayer;
      square.classList.add(currentPlayer);
      gameState[index] = currentPlayer;
  
      if (checkWin()) {
        statusDisplay.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
        statusDisplay.classList.add("you-won");
        gameActive = false;
      } else if (!gameState.includes(null)) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  
    function handleMouseEnter(square) {
      if (!square.textContent && gameActive) {
        square.classList.add("hover");
      }
    }
  
    function handleMouseLeave(square) {
      square.classList.remove("hover");
    }
  
    function checkWin() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]           
      ];
  
      return winPatterns.some(pattern => {
        return pattern.every(index => gameState[index] === currentPlayer);
      });
    }
  
    function resetGame() {
      gameState.fill(null);
      gameActive = true;
      currentPlayer = "X";
      statusDisplay.textContent = "Move your mouse over a square and click to play an X or an O.";
      statusDisplay.classList.remove("you-won");
  
      squares.forEach(square => {
        square.textContent = "";
        square.classList.remove("X", "O");
      });
    }
  });
  