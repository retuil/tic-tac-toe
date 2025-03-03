const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
const WIDTH = 10;
const HEIGHT = 10;

class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.resetAll();
    }

    get(row, col) {
        return this.board[row][col];
    }

    set(symbol, row, col) {
        this.board[row][col] = symbol;
    }

    resetAll() {
        let width = this.width;
        let height = this.height;
        this.board = Array.from({length: height}, _ => Array.from({length: width}, _ => EMPTY));
    }

    checkWin() {
        let t = this.checkWinBySymbol(CROSS) || this.checkWinBySymbol(ZERO);
        if (!t && this.board[0][0] !== EMPTY
            && this.board[0][1] !== EMPTY
            && this.board[0][2] !== EMPTY
            && this.board[1][0] !== EMPTY
            && this.board[1][1] !== EMPTY
            && this.board[1][2] !== EMPTY
            && this.board[2][0] !== EMPTY
            && this.board[2][1] !== EMPTY
            && this.board[2][2] !== EMPTY)
            return EMPTY;
        return t;
    }

    checkWinBySymbol(symbol) {
        if (this.board[0][0] === symbol) {
            if (this.board[0][1] === symbol) {
                if (this.board[0][2] === symbol) {
                    return {"a": symbol, "b": [{"x": 0, "y": 0}, {"x": 0, "y": 1}, {"x": 0, "y": 2}]};
                }
            }
            if (this.board[1][0] === symbol) {
                if (this.board[2][0] === symbol) {
                    return {"a": symbol, "b": [{"x": 0, "y": 0}, {"x": 1, "y": 0}, {"x": 2, "y": 0}]};
                }
            }
            if (this.board[1][1] === symbol) {
                if (this.board[2][2] === symbol) {
                    return {"a": symbol, "b": [{"x": 0, "y": 0}, {"x": 1, "y": 1}, {"x": 2, "y": 2}]};
                }
            }
        }
        if (this.board[2][2] === symbol) {
            if (this.board[2][1] === symbol) {
                if (this.board[2][0] === symbol) {
                    return {"a": symbol, "b": [{"x": 2, "y": 2}, {"x": 2, "y": 1}, {"x": 2, "y": 0}]};
                }
            }
            if (this.board[1][2] === symbol) {
                if (this.board[0][2] === symbol) {
                    return {"a": symbol, "b": [{"x": 2, "y": 2}, {"x": 1, "y": 2}, {"x": 0, "y": 2}]};
                }
            }
        }
        if (this.board[1][0] === symbol) {
            if (this.board[1][1] === symbol) {
                if (this.board[1][2] === symbol) {
                    return {"a": symbol, "b": [{"x": 1, "y": 0}, {"x": 1, "y": 1}, {"x": 1, "y": 2}]};
                }
            }
        }
        if (this.board[0][1] === symbol) {
            if (this.board[1][1] === symbol) {
                if (this.board[2][1] === symbol) {
                    return {"a": symbol, "b": [{"x": 0, "y": 1}, {"x": 1, "y": 1}, {"x": 2, "y": 1}]};
                }
            }
        }
        return null;
    }
}


let counter = 0;
let game = new Board(WIDTH, HEIGHT);
let hasWinner = false;


startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < HEIGHT; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < WIDTH; j++) {
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
    let symbol;
    if (game.get(row, col) === EMPTY && !hasWinner) {
        //console.log(counter);
        if (counter % 2 === 0) {
            symbol = CROSS;
        } else {
            symbol = ZERO;
        }

        game.set(symbol, row, col);
        renderSymbolInCell(symbol, row, col);
        counter++;
    }
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;

    let winner = game.checkWin();
    if (winner !== null) {
        let result;
        if (winner['a'] === ' ') {
            result = 'Победила дружба.';
        } else {
            result = winner['a'];
            changeColorWinner(winner['b'])
        }

        alert(result);
        hasWinner = true;
    }
}

function changeColorWinner(cells){
    for (let cell of cells){
        findCell(cell['x'], cell['y']).style.color = '#ff0000'
    }
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
    startGame();
    game.resetAll();
    hasWinner = false;
    counter = 0;
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


