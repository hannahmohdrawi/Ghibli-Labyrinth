const mazeMap = document.getElementById("maze");
const numRows = 10;
const numCols = 10;

//Creating Grid
const grid = [];
for(let row=0; row < numRows; row++){
    const rowArr = [];
    for(let col=0; col < numCols; col++){
        rowArr.push(Math.random() 0.3 ? 'wall' : 'path'); //Random walls
    }
    grid.push(rowArr);
}

//Adding player
grid[0][0] = 'player';
grid[numRows-1][numCols-1] = 'path'; //End at bottom right

//Generating Maze in HTML
function generateMaze(){
    mazeMap.innerHTML = '';

    for(let row=0; row < numRows; row++){
        for(let col=0; col < numCols; col++){
            const cell = document.createElement('div');
        }
    }
}