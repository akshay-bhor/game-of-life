const SimulateGame = (grid, tRows, tCols, operations) => {
    // Copy grid
    let gridCopy = grid.map(arr => {
      return arr.slice();
    });
    
    for(let i = 0; i < tRows; i++) {
      for(let j = 0; j < tCols; j++) {
        let neighbors = 0;
        operations.forEach(([x, y]) => {
          const nI = i + x;
          const nJ = j + y;
          
          if(nI >= 0 && nI < tRows && nJ >= 0 && nJ < tCols) {
            neighbors += grid[nI][nJ];
          }
        })       
        
        
        if(neighbors < 2 || neighbors > 3) { 
          gridCopy[i][j] = 0;
        }
        if(grid[i][j] == 0 && neighbors == 3) { 
          gridCopy[i][j] = 1;
        }
      }
    }

    return gridCopy;
}

export default SimulateGame;