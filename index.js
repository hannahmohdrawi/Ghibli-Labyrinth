//Setting Background dependent on maze selected
const body = document.body;
let currentTheme = null; // Track which theme is currently active ('SA', 'Tortoro', or 'HMC')

// Function to set background image
function setBackgroundImage(imagePath) {
    body.style.backgroundImage = `url('${imagePath}')`;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundColor = "transparent";
}

// Function to randomly select and set a background from the current theme
function setRandomBackgroundFromTheme() {
    if (!currentTheme) return;
    
    const randomNum = Math.floor(Math.random() * 5) + 1; // Random number 1-5
    let imagePath = '';
    
    if (currentTheme === 'SA') {
        imagePath = `images/Spirited%20Away/SA${randomNum}.jpg`;
    } else if (currentTheme === 'Tortoro') {
        imagePath = `images/Tortoro/T${randomNum}.jpg`;
    } else if (currentTheme === 'HMC') {
        imagePath = `images/Howl/HC${randomNum}.jpg`;
    }
    
    if (imagePath) {
        setBackgroundImage(imagePath);
    }
}

function changeBackgroundForSA(){
    currentTheme = 'SA';
    setRandomBackgroundFromTheme();
}

function changeBackgroundForTortoro(){
    currentTheme = 'Tortoro';
    setRandomBackgroundFromTheme();
}

function changeBackgroundForHMC(){
    currentTheme = 'HMC';
    setRandomBackgroundFromTheme();
}

/* Set up event listeners for different buttons 
* For background change 
* For dynamic movie info display
*/
const spiritedAwayBtn = document.getElementById("spiritedAwayBtn");
const movingCastleBtn = document.getElementById("movingCastleBtn");
const totoroBtn = document.getElementById("totoroBtn");

if (spiritedAwayBtn) {
    spiritedAwayBtn.addEventListener("click", function() {
        changeBackgroundForSA(); 
    });
} else if (movingCastleBtn){
    movingCastleBtn.addEventListener("click", function() {
        changeBackgroundForHMC(); 
    });
} else if (totoroBtn){
    totoroBtn.addEventListener("click", function() {
        changeBackgroundForTortoro(); 
    });
}


const mazeMap = document.getElementById("maze");
const numRows = 10;
const numCols = 10;
let playerPosition = {row: 0, col: 0};

// Creating Grid
const grid = [];
for(let row=0; row < numRows; row++){
    const rowArr = [];
    for(let col=0; col < numCols; col++){
        rowArr.push(Math.random() < 0.3 ? 'wall' : 'path'); //Random walls
    }
    grid.push(rowArr);
}

// Adding player
grid[0][0] = 'player';
grid[numRows - 1][numCols - 1] = 'path'; //End at bottom right

// Generating Maze in HTML
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


// Handling player position
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

// Initialising Maze
generateMaze();

// Set default background on page load (Spirited Away theme)
changeBackgroundForSA();

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

// Create new Maze
function newMap(){
    // Regenerate the grid
    grid.length = 0; // Clear existing grid
    for(let row=0; row < numRows; row++){
        const rowArr = [];
        for(let col=0; col < numCols; col++){
            rowArr.push(Math.random() < 0.3 ? 'wall' : 'path'); //Random walls
        }
        grid.push(rowArr);
    }
    
    // Reset player position
    playerPosition = {row: 0, col: 0};
    grid[0][0] = 'player';
    grid[numRows - 1][numCols - 1] = 'path'; //End at bottom right
    
    // Regenerate the maze display
    generateMaze();
    
    // Change to a random background from the current theme if one was selected
    if (currentTheme) {
        setRandomBackgroundFromTheme();
    }
}


// Ghibli Character Selection
const characterData = {
    'Totoro': [
        {name:'Totoro', image:'images/Icons/Totoro.webp'},
        {name:'Satsuki', image:'images/Icons/Satsuki_Kusakabe.webp'},
        {name:'Mei', image:'images/Icons/Mei_Kusakabe.webp'},
        {name:'Catbus', image:'images/Icons/Catbus.jpg'},
    ],
    'Howl': [
        {name:'Howl', image:'images/Icons/Howl.webp'},
        {name:'Sophie', image:'images/Icons/Sophie_Hatter.webp'},
        {name:'Calcifer', image:'images/Icons/Calcifer.jpg'},
        {name:'Turnip Head', image:'images/Icons/Turnip_Head.webp'},
        {name:'Markl', image:'images/Icons/Markl.webp'},
        {name:'Honey', image:'images/Icons/Honey_Hatter.webp'},
    ],
    'Spirited Away': [
        {name:'Chihiro', image:'images/Icons/Chihiro_Ogino.webp'},
        {name:'Haku', image:'images/Icons/Haku.webp'},
        {name:'Zeniba', image:'images/Icons/Zeniba.webp'},
        {name:'No-Face', image:'images/Icons/No-Face.webp'},
        {name:'Kamaji', image:'images/Icons/Kamaji.webp'},
    ]
}
// Populate character selection container with characters
function populateCharacterSelectionContainer(){
    const characterSelectionContainer = document.getElementById("characterSelectionContainer");
    if (!characterContainer || !currentTheme) return;

    // Clear existing characters
    characterSelectionContainer.innerHTML = '';

    // Get characters for selected theme 
    const characters = characterData[currentTheme] || [];

    // Creating character cards
    characters.forEach(character, index) => {
        const characterCard = document.createElement('card');
        characterCard.classList.add('pixel-border', 'bg-dark', 'text-white');
        characterCard.innerHTML = `
            <img src="${character.image}" alt="${character.name}" class="img-fluid">
            <h5>${character.name}</h5>
        `;
        characterCard.style.cursor = 'pointer';
        characterSelectionContainer.appendChild(characterCard);

        characterButton.addEventListener('click', function() {
            selectCharacter(character, index);
        });
    };
}

// Character Selection Logic TODO