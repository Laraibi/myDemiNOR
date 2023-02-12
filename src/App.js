import { useState, useEffect } from "react";
import "./App.css";
import { setRandomMinesEnglish, getNumber } from "./utils";
import Timer from "./components/timer";
import { GiBoltBomb } from "react-icons/gi";
function App() {
  const [state, setState] = useState({
    level: null,
    levels: [
      { name: "easy", mines: 10 },
      { name: "medium", mines: 15 },
      { name: "hard", mines: 20 },
    ],
    grid: [],
    msg: "play",
    start: false,
  });
  const buildGrid = (count) => {
    let arr = [];
    for (let i = 0; i < count; i++) {
      let row = [];
      for (let j = 0; j < count; j++) {
        // setState({...state,grid:[...grid]})
        row[j] = { off: { x: i, y: j }, isMine: false, isVisible: false };
      }
      arr.push(row);
    }
    setState({
      ...state,
      grid: setRandomMinesEnglish(arr, count),
      start: true,
    });
  };
  const handleClickCaze = (offX, OffY) => {
    let actualGrid = state.grid;
    // actualGrid[offX][OffY].isMine = !actualGrid[offX][OffY].isMine;
    actualGrid[offX][OffY].isVisible = true;
    setState({
      ...state,
      grid: [...actualGrid],
      msg: actualGrid[offX][OffY].isMine ? "boom" : "play",
    });
  };
  return (
    <div className="App">
      <div className="gridBox">
        {!state.grid.length ? (
          <>
            <div className="row">
              {state.levels.map((level) => (
                <button
                  className="btn btn-info"
                  onClick={() => buildGrid(level.mines)}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {state.grid.map((row) => (
              <p className="gridRow">
                {row.map((caze) => (
                  <span
                    className={
                      !caze.isVisible
                        ? "case"
                        : caze.isMine
                        ? "case cazeKO"
                        : "case caseOK"
                    }
                    onClick={() => handleClickCaze(caze.off.x, caze.off.y)}
                  >
                    {!caze.isVisible ? (
                      ""
                    ) : !caze.isMine ? (
                      getNumber(state.grid, caze.off.x, caze.off.y)
                    ) : (
                      <GiBoltBomb size="1.5em" />
                    )}
                  </span>
                ))}
              </p>
            ))}
          </>
        )}
      </div>

      <p className="boom">{state.msg}</p>
      {state.start ? <Timer /> : null}
    </div>
  );
}

export default App;
