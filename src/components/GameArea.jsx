import React, { useState, useEffect, useRef } from "react";
import { Typography as Font, Button } from "@material-ui/core";
function GameArea() {
  const [gen, setGen] = useState(1);
  const [size, setSize] = useState(300);
  const [speed, setSpeed] = useState(0.5);
  const [background, setBackground] = useState("grey");
  const [cellColor, setCellColor] = useState("cyan");
  const [grid, setGrid] = useState([[]]);
  const [play, setPlay] = useState(false);
  const canvas = useRef();

  const preset1 = useRef();
  const preset2 = useRef();
  const preset3 = useRef();
  const preset4 = useRef();

  useEffect(() => {
    setGrid(makeArray(size / 10));
    let paper = canvas.current.getContext("2d");
    paper.fillStyle = background;
    paper.fillRect(0, 0, 300, 300);

    //Preset 1
    paper = preset1.current.getContext("2d");

    let presetGrid = makeArray(100 / 10);
    const mid = 100 / 10 / 2;
    presetGrid[mid][mid] = 1;
    presetGrid[mid][mid - 1] = 1;
    presetGrid[mid - 1][mid] = 1;
    presetGrid[mid - 1][mid - 1] = 1;
    paper.fillStyle = background;
    paper.fillRect(0, 0, 100, 100);
    draw(preset1, presetGrid, 100 / 10);

    //Preset 2
    paper = preset2.current.getContext("2d");
    presetGrid = makeArray(100 / 10);
    presetGrid[mid][mid] = 1;
    presetGrid[mid + 1][mid] = 1;
    presetGrid[mid - 1][mid] = 1;
    paper.fillStyle = background;
    paper.fillRect(0, 0, 100, 100);
    draw(preset2, presetGrid, 100);
    //Preset 3
    paper = preset3.current.getContext("2d");
    presetGrid = makeArray(100 / 10);
    presetGrid[mid][mid] = 1;
    presetGrid[mid - 1][mid] = 1;
    presetGrid[mid + 1][mid] = 1;

    presetGrid[mid][mid + 1] = 1;
    presetGrid[mid - 1][mid + 1] = 1;
    presetGrid[mid - 2][mid + 1] = 1;
    paper.fillStyle = background;
    paper.fillRect(0, 0, 100, 100);
    draw(preset3, presetGrid, 100);

    //Preset 4
    paper = preset4.current.getContext("2d");
    presetGrid = makeArray(100 / 10);

    presetGrid[mid][mid] = 1;
    presetGrid[mid - 1][mid] = 1;
    presetGrid[mid + 1][mid] = 1;
    presetGrid[mid + 1][mid + 1] = 1;
    presetGrid[mid][mid + 2] = 1;

    paper.fillStyle = background;
    paper.fillRect(0, 0, 100, 100);
    draw(preset4, presetGrid, 100);
  }, []);

  const makeArray = () => {
    let arr = new Array(size);
    for (let i = 0; i < size; i++) {
      arr[i] = new Array(size);
    }
    for (let i = 0; i < size; i++) {
      for (let x = 0; x < size; x++) {
        arr[i][x] = 0;
      }
    }
    return arr;
  };

  const draw = (target, grid, size) => {
    const paper = target.current.getContext("2d");
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let x = i * 10;
        let y = j * 10;
        if (grid[i][j] === 1) {
          paper.fillStyle = cellColor;
          paper.fillRect(x, y, 10 - 1, 10 - 1);
        } else {
          paper.fillStyle = background;
          paper.fillRect(x, y, 10 - 1, 10 - 1);
        }
      }
    }
  };
  setTimeout(() => {
    if (!play) return;

    //Draws all cells that has ones to cyans, the rest to background color
    draw(canvas, grid, size / 10);

    let newGen = makeArray(size);
    setGen(gen + 1);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let state = grid[i][j];
        let neighbors = count(grid, i, j);

        if (state === 0 && neighbors === 3) {
          newGen[i][j] = 1;
        } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
          newGen[i][j] = 0;
        } else {
          newGen[i][j] = state;
        }
      }
    }

    setGrid(newGen);
  }, speed * 1000);

  const count = (grid, x, y) => {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + size) % size;
        let row = (y + j + size) % size;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  };

  const insert = (num) => {
    if (play) return;
    let newGrid = makeArray(size / 10);
    const mid = size / 10 / 2;
    //Square
    if (num === 1) {
      newGrid[mid][mid] = 1;
      newGrid[mid][mid - 1] = 1;
      newGrid[mid - 1][mid] = 1;
      newGrid[mid - 1][mid - 1] = 1;
    }
    //Line
    if (num === 2) {
      newGrid[mid][mid] = 1;
      newGrid[mid + 1][mid] = 1;
      newGrid[mid - 1][mid] = 1;
    }
    //DBL Line
    if (num === 3) {
      newGrid[mid][mid] = 1;
      newGrid[mid - 1][mid] = 1;
      newGrid[mid + 1][mid] = 1;

      newGrid[mid][mid + 1] = 1;
      newGrid[mid - 1][mid + 1] = 1;
      newGrid[mid - 2][mid + 1] = 1;
    }
    //Glider
    if (num === 4) {
      newGrid[mid][mid] = 1;
      newGrid[mid - 1][mid] = 1;
      newGrid[mid + 1][mid] = 1;
      newGrid[mid + 1][mid + 1] = 1;
      newGrid[mid][mid + 2] = 1;
    }
    setGrid(newGrid)
    draw(canvas, grid, size / 10);
  };

  const reset = () => {
    setGen(1)
    setGrid(makeArray(size / 10));
    draw(canvas, grid, size / 10);
  };
  return (
    <div>
      <Font variant="h3">Generation: {gen}</Font>
      <div style={styles.container}>
        <canvas ref={canvas} width={300} height={300} />
        <div>
          <div style={styles.presetContainer}>
            <canvas ref={preset1} width={100} height={100} />
            <Button variant="contained" onClick={() => insert(1)}>
              Insert
            </Button>
          </div>
          <div style={styles.presetContainer}>
            <canvas ref={preset2} width={100} height={100} />
            <Button variant="contained" onClick={() => insert(2)}>
              Insert
            </Button>
          </div>
          <div style={styles.presetContainer}>
            <canvas ref={preset3} width={100} height={100} />
            <Button variant="contained" onClick={() => insert(3)}>
              Insert
            </Button>
          </div>
          <div style={styles.presetContainer}>
            <canvas ref={preset4} width={100} height={100} />
            <Button variant="contained" onClick={() => insert(4)}>
              Insert
            </Button>
          </div>
        </div>
      </div>
      <div style={styles.btnContainer}>
        <Button variant="contained" onClick={reset}>
          Clear
        </Button>
        <Button variant="contained" onClick={() => setPlay(false)}>
          Stop
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setPlay(true);
          }}
        >
          Start
        </Button>
      </div>
    </div>
  );
}
const styles = {
  btnContainer: {
    width: "300px",
    display: "flex",
    justifyContent: "space-around",
  },
  container: {
    width: "500px",
    display: "flex",
    justifyContent: "space-between",
  },
  presetContainer: {
    display: "flex",
  },
};
export default GameArea;
