const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartButton"); // Corrected capitalization

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""]; // Array to track player moves
let currentPlayer = "X"; // Starting player
let running = true; // Game state flag

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    updateStatusText(`${currentPlayer}'s turn`);
}

function cellClicked(event) {
    const index = event.target.getAttribute("cellIndex");
    if (options[index] === "" && running) {
        updateCell(event.target, index);
        checkWinner();
        changePlayer();
    }
}

function updateCell(cell, index) {
    cell.textContent = currentPlayer;
    options[index] = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatusText(`${currentPlayer}'s turn`);
}

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (options[a] !== "" && options[a] === options[b] && options[a] === options[c]) {
            updateStatusText(`${currentPlayer} wins!`);
            announceWinner(currentPlayer); // Call function to announce winner
            running = false;
            return;
        }
    }
    if (!options.includes("")) {
        updateStatusText("It's a draw!");
        running = false;
    }
}

function announceWinner(winner) {
    // Create a modal or use an alert to announce the winner
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>${winner} wins the game!</p>
        </div>
    `;
    
    // Append modal to the body
    document.body.appendChild(modal);
    
    // Close modal when clicking on the close button or outside the modal
    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close modal when clicking outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    });
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = true;
    cells.forEach(cell => {
        cell.textContent = "";
    });
    updateStatusText(`${currentPlayer}'s turn`);
}

function updateStatusText(message) {
    statusText.textContent = message;
}
