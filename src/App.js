import { Fragment, useCallback, useRef, useState } from "react";
import SimulateGame from "./SimulateGame";

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
  const [speed, setSpeed] = useState(200);

  const runningRef = useRef();
  runningRef.current = running;
  const speedRef = useRef();
  speedRef.current = speed;

  const run = useCallback(() => { 
    if (!runningRef.current) return;
    
    setGrid(g => {

      // Copy nested array
      let gridCopy = g.map(arr => {
        return arr.slice();
      });

      return (
        SimulateGame(gridCopy, tRows, tCols, operations)
      )
    });

    setTimeout(run, speedRef.current);
  }, []);

  const toggle = () => {
    setRunning((prevState) => !prevState);
    runningRef.current = true;
    run();
  };

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
        <label>Speed:</label>
        <input type='number' value={speed} onChange={(e) => {
            if(e.target.value >= 20)
              setSpeed(e.target.value)
          }} 
          name="speed" />
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
