import { Fragment, useCallback, useRef, useState } from "react";

const tRows = 52;
const tCols = 125;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < tRows; i++) {
      rows.push(Array(tCols).fill(0));
    }

    return rows;
  });
  const [running, setRunning] = useState(false);

  const runningRef = useRef();
  const gridRef = useRef();
  runningRef.current = running;
  gridRef.current = grid;

  const toggle = () => {
    setRunning((prevState) => !prevState);
    runningRef.current = true;
    run();
  };

  const run = useCallback(() => { 
    if (!runningRef.current) return;
    
    // Copy grid
    let gridCopy = [...gridRef.current];
    
    for(let i = 0; i < tRows; i++) {
      for(let j = 0; j < tCols; j++) {
        let neighbors = 0;
        operations.forEach(([x, y]) => {
          const nI = i + x;
          const nJ = j + y;

          if(nI >= 0 && nI < tRows && nJ >= 0 && nJ < tCols) {
            neighbors += gridRef.current[nI][nJ];
          }
        });
        
        if(neighbors < 2 || neighbors > 3) { 
          gridCopy[i][j] = 0;
        }
        else if(gridRef.current[i][j] == 0 && neighbors == 3) { 
          gridCopy[i][j] = 1;
        }
      }
    }
   
    setGrid(gridCopy);

    setTimeout(run, 200);
  }, []);

  const random = () => {
    const rows = [];
    for (let i = 0; i < tRows; i++) {
      rows.push(Array.from(Array(tCols), () => (Math.random() > 0.8 ? 1 : 0)));
    }

    setGrid(rows);
  };

  const reset = () => {
    const rows = [];
    for (let i = 0; i < tRows; i++) {
      rows.push(Array(tCols).fill(0));
    }
    setRunning(false);
    setGrid(rows);
  };

  const select = (i, j) => {
    let tmp = [...grid];
    tmp = tmp.map((rows, index) => {
      return rows.map((cols, jendex) => {
        if (i == index && j == jendex) return 1;
        else return grid[index][jendex];
      });
    });

    setGrid(tmp);
  };
  
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        <button onClick={toggle}>{running ? "Stop" : "Start"}</button>
        <button onClick={random}>Random</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${tCols}, 12px)`,
          gridTemplateRows: `repeat(${tRows}, 12px)`,
        }}
      >
        {grid.map((rows, i) => {
          return rows.map((cols, j) => {
            return (
              <div
                key={`${i}${j}`}
                onClick={() => select(i, j)}
                style={{
                  width: 12,
                  height: 12,
                  border: "1px solid #ccc",
                  backgroundColor: grid[i][j] ? "black" : undefined,
                }}
              ></div>
            );
          });
        })}
      </div>
    </Fragment>
  );
}

export default App;
