// This module exports two functions for setting a specified number of mines in a grid randomly.
// One function has English comments and the other has French comments.

// English version:
export function setRandomMinesEnglish(grid, count) {
    // Get the number of rows in the grid
    let rows = grid.length;
    // Get the number of columns in the grid
    let columns = grid[0].length;
    // Calculate the total number of squares in the grid
    let totalSquares = rows * columns;
    // Keep track of the squares that have already been selected
    let selected = [];
    // Loop through and set `count` mines in the grid
    for (let i = 0; i < count && selected.length < totalSquares; i++) {
        // Choose a random square that hasn't already been selected
        let randomIndex = Math.floor(Math.random() * (totalSquares - selected.length));
        let x = Math.floor(randomIndex / columns);
        let y = randomIndex % columns;
        while (selected.some(coord => coord.x === x && coord.y === y)) {
            randomIndex = (randomIndex + 1) % totalSquares;
            x = Math.floor(randomIndex / columns);
            y = randomIndex % columns;
        }
        // Set the chosen square as a mine
        grid[x][y].isMine = true;
        // Add the chosen square to the list of selected squares
        selected.push({ x, y });
    }
    // Return the updated grid
    return grid;
}

// French version:
export function generateMinesFrench(grid, count) {
    // Vérification que la grille est valide et que le nombre de mines est valide
    if (!grid || !grid.length || !grid[0].length || count < 1 || count > grid.length * grid[0].length) {
        return false;
    }

    // Tableau pour stocker les positions des mines générées
    let generatedMines = [];

    // Boucle pour générer les mines aléatoirement
    while (generatedMines.length < count) {
        let x = Math.floor(Math.random() * grid.length);
        let y = Math.floor(Math.random() * grid[0].length);
        let currentCell = grid[x][y];

        // Vérification que la case n'a pas déjà été marquée comme mine
        if (!generatedMines.find(mine => mine.x === x && mine.y === y)) {
            currentCell.isMine = true;
            generatedMines.push({ x, y });
        }
    }

    // Retourne la grille avec les mines générées
    return grid;
}


export const getNumber = (grid, x, y) => {
    // console.log('getNumber Function')
    // console.log(`grid:${JSON.stringify(grid)}`)
    // console.log(`x:${x}`)
    // console.log(`y:${y}`)
    // let theCount = grid[x][y].isMine ? 0 : 0;
    let theCount = 0;
    let square = [grid[x].slice(y - 1, y + 2)]
    theCount += grid[x].slice(y - 1, y + 2).filter((caze) => caze.isMine).length
    if (x > 0) {
        if (y != 0 || y < grid[x].length - 1) {
            theCount += grid[x - 1].slice(y - 1, y + 2).filter((caze) => caze.isMine).length
            square.push(grid[x - 1].slice(y - 1, y + 2))
        }
    }
    if (x < grid.length - 1) {
        if (y != 0 || y < grid[x].length - 1) {
            theCount += grid[x + 1].slice(y - 1, y + 2).filter((caze) => caze.isMine).length
            square.push(grid[x + 1].slice(y - 1, y + 2))
        }
    }
    // console.log(`squareOF: {x: ${x}, y: ${y}}`)
    // console.log(square)
    return theCount > 0 ? theCount : ""
}

