let matrix = [['','',''],['','',''],['','','']];

const grid = document.querySelector('.grid');
const message = document.querySelector('#message');
let player = 'X';
let computer = 'O';
let playerTurn = 'O';
let gameOver = false;
let isGameDrawn = false;

function populateMatrix() {
    grid.innerHTML = '';
    if(gameOver) {
        message.innerHTML = `Player ${playerTurn} wins!`;
    } else if(isGameDrawn) {
        message.innerHTML = `Match Drawn`;
    } else {
        message.innerHTML = `Player ${playerTurn === 'X' ? 'O': 'X'}'s turn`;
    }
    playerTurn = playerTurn === 'X' ? 'O': 'X';
    matrix.forEach((row, rowIndex) => {
        row.forEach((column, colIndex) => {
            const cell = document.createElement('div');
            if(column === 'X') {
                const icon = document.createElement('i');
                icon.classList.add('fas', 'fa-times');
                cell.appendChild(icon);
            } else if(column === 'O'){
                const icon = document.createElement('i');
                icon.classList.add('far', 'fa-circle');
                cell.appendChild(icon);
            } else {
                if(!gameOver){
                    cell.addEventListener('click', ()=>{
                        matrix[rowIndex][colIndex] = playerTurn;
                        isGameOver();
                        populateMatrix();
                    });
                }
            }
            cell.classList.add('cell');
            grid.appendChild(cell);
        });
    });
}

populateMatrix();

function isGameOver() {
    isGameDrawn = true;
    for(let row of matrix) {
        gameOver = row.every(value => value === playerTurn);
        if(gameOver) break;
    }
    if(!gameOver) {
        for(let i=0; i<matrix.length;i++){
            let isOver = true;
            for(let j=0;j<matrix.length;j++) {
                if(matrix[j][i] !== playerTurn){
                    isOver = false;
                    break;
                }
            }
            if(isOver){
                gameOver = isOver;
                break;
            }
        }
    }
    if(!gameOver) {
        outer:
        for(let i=0;i<matrix.length;){
            gameOver = true;
            for(let j=0;j<matrix.length;){
                if(matrix[i][j]!== playerTurn){
                    gameOver = false;
                    break outer;
                } else {
                    i++;
                    j++;
                }
            }
        }
        if(!gameOver){
            outer:
            for(let i=0;i<matrix.length;){
                gameOver = true;
                for(let j=matrix.length-1;j>=0;){
                    if(matrix[i][j]!== playerTurn){
                        gameOver = false;
                        break outer;
                    } else {
                        i++;
                        j--;
                    }
                }
            }
        }
        
    }
    if(!gameOver) {
        outer:
        for(let row of matrix){
            for(let column of row){
                if(column===''){
                    isGameDrawn = false;
                    break outer;
                } 
            }
        }
    }
    return gameOver;
}

function resetMatrix(){
    matrix = [['','',''],['','',''],['','','']];
    message.innerHTML = '';
    player = 'X';
    computer = 'O';
    playerTurn = 'O';
    gameOver = false;
    isGameDrawn = false;
    populateMatrix();
}


