let currentPlayer = "X";
let gameBoard = Array(9).fill("");
let gameActive = true;

const startGameButton = document.getElementById("start-game");
const boardDiv = document.getElementById("gameboard");
const restartButton = document.getElementById("restart");
const gameContainer = document.getElementById("game-container");

startGameButton.addEventListener("click",() => {
    startGameButton.classList.add("fade-out");
    
    setTimeout(() => {
        startGameButton.style.display = "none";
        gameContainer.classList.remove("hidden");
        gameContainer.classList.add("fade-in");

        renderBoard();
        setupEventListeners();
    }, 500);
})

const renderBoard = () => {
    boardDiv.innerHTML = "";

    gameBoard.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", index);

        value && (cell.textContent = value);
        value && cell.classList.add(value.toLowerCase());

        boardDiv.appendChild(cell);
    });
};

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute("data-index"));

    gameBoard[cellIndex] || !gameActive || updateCell(clickedCell, cellIndex);
};

const updateCell = (cell, index) => {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    setTimeout(() => {
        checkWin() && endGame(`Player ${currentPlayer} wins!`);
        
        !gameBoard.includes('') && !checkWin() && endGame("Game ended in a draw!");
        
        gameActive && (currentPlayer = currentPlayer === 'X' ? 'O' : 'X');
    }, 50); // Small delay to ensure UI updates first
};

const endGame = (message) => {
    gameActive = false;
    alert(message);
}

const checkWin = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => gameBoard[index] === currentPlayer)
    );
};


const restartGame = () => {
    currentPlayer = "X";
    gameBoard = Array(9).fill("");
    gameActive = true;
    renderBoard();
};

const setupEventListeners = () => {
    boardDiv.addEventListener("click", (e) => {
        e.target.classList.contains("cell") && handleCellClick(e);
    });

    restartButton.addEventListener("click", restartGame);
};