const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let counter = 0;
let game = Board();

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (game.get(row, col) === EMPTY) {
        renderSymbolInCell(CROSS, row, col);
    }

    aiMove();
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}

class Board {
    constructor() {
        this.board = [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
        ]
    }

    get(row, col) {
        return this.board[row][col];
    }

    set(symbol, row, col) {
        this.board[row][col] = symbol;
    }

    resetAll() {
        this.board = [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
        ]
    }

    checkWin() {
        if (this.board[0][0] !== EMPTY
            && this.board[0][1] !== EMPTY
            && this.board[0][2] !== EMPTY
            && this.board[1][0] !== EMPTY
            && this.board[1][1] !== EMPTY
            && this.board[1][2] !== EMPTY
            && this.board[2][0] !== EMPTY
            && this.board[2][1] !== EMPTY
            && this.board[2][2] !== EMPTY)
            return EMPTY;
        return this.checkWinBySymbol(CROSS) || this.checkWinBySymbol(ZERO);
    }

    checkWinBySymbol(symbol) {
        if (this.board[0][0] === symbol) {
            if (this.board[0][1] === symbol) {
                if (this.board[0][2] === symbol) {
                    return symbol;
                }
            }
            if (this.board[1][0] === symbol) {
                if (this.board[2][0] === symbol) {
                    return symbol;
                }
            }
            if (this.board[1][1] === symbol) {
                if (this.board[2][2] === symbol) {
                    return symbol;
                }
            }
        }
        if (this.board[2][2] === symbol) {
            if (this.board[2][1] === symbol) {
                if (this.board[2][0] === symbol) {
                    return symbol;
                }
            }
            if (this.board[1][2] === symbol) {
                if (this.board[0][2] === symbol) {
                    return symbol;
                }
            }
        }
        if (this.board[1][0] === symbol) {
            if (this.board[1][1] === symbol) {
                if (this.board[1][2] === symbol) {
                    return symbol;
                }
            }
        }
        if (this.board[0][1] === symbol) {
            if (this.board[1][1] === symbol) {
                if (this.board[2][1] === symbol) {
                    return symbol;
                }
            }
        }
        return null;
    }
}

function aiMove(){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (game.get(i, j) === EMPTY) {
                game.set(ZERO, i, j);
                if (game.checkWin() === ZERO) {
                    return;
                }
                game.set(EMPTY, i, j);
            }
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (game.get(i, j) === EMPTY) {
                    game.set(CROSS, i, j);
                    if (game.checkWin() === CROSS) {
                        game.set(ZERO, i, j);
                        return;
                    }
                    game.set(EMPTY, i, j);
                }
            }
        }

        let availableMoves = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (game.get(i, j) === EMPTY) {
                    availableMoves.push({ i, j });
                }
            }
        }
        let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        game.set(ZERO, randomMove.i, randomMove.j);
    }
}