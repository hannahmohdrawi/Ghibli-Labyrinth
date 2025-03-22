const mazeMap = document.getElementById("maze");
const numRows = 10;
const numCols = 10;
let playerPosition = {row: 0, col: 0};

//Creating Grid
const grid = [];
for(let row=0; row < numRows; row++){
    const rowArr = [];
    for(let col=0; col < numCols; col++){
        rowArr.push(Math.random() < 0.3 ? 'wall' : 'path'); //Random walls
    }
    grid.push(rowArr);
}

//Adding player
grid[0][0] = 'player';
grid[numRows - 1][numCols - 1] = 'path'; //End at bottom right

//Generating Maze in HTML
function generateMaze(){
    mazeMap.innerHTML = '';

    for(let row=0; row < numRows; row++){
        for(let col=0; col < numCols; col++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if(grid[row][col] === 'wall'){
                cell.classList.add('wall');
            }else if (grid[row][col] === 'player'){
                cell.classList.add('player');
            }
            mazeMap.appendChild(cell);
        }
    }
}


//Handling player position
function movePlayer(direction) {
    let newRow = playerPosition.row;
    let newCol = playerPosition.col;

    if (direction === 'left' && newCol > 0) newCol--;
    if (direction === 'right' && newCol < numCols - 1) newCol++;
    if (direction === 'up' && newRow > 0) newRow--;
    if (direction === 'down' && newRow < numRows - 1) newRow++;

    // Prevent movement into walls
    if (grid[newRow][newCol] !== 'wall') {
        grid[playerPosition.row][playerPosition.col] = 'path'; // Clear old position
        playerPosition.row = newRow;
        playerPosition.col = newCol;
        grid[playerPosition.row][playerPosition.col] = 'player'; // Set new position
        generateMaze();
    }
}



//Initialising Maze
generateMaze();

//Checking for arrow key movement by user
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp'){
        movePlayer('up');
    }else if (e.key === 'ArrowDown'){
        movePlayer('down');
    }else if (e.key === 'ArrowLeft'){
        movePlayer('left');
    }else if (e.key === 'ArrowRight'){
        movePlayer('right');
    }
});

//Create new Maze
function newMap(){
    location.reload();
}


//Ghibli Characters from API