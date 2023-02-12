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
        row[j] = {
          off: { x: i, y: j },
          isMine: false,
          isVisible: false,
          content: function (actualGrid) {
            return this.isMine ? (
              <GiBoltBomb size="1.5em" />
            ) : (
              getNumber(actualGrid, this.off.x, this.off.y)
            );
          },
        };
      }
      arr.push(row);
    }
    setState({
      ...state,
      grid: setRandomMinesEnglish(arr, count),
      start: true,
    });
  };
  const handlePropagation = (startX, startY,step=1) => {
    console.log(`handlePropagation(startX:${startX}, startY:${startY})`);
    let theGrid = state.grid;
    let actualRow = state.grid[startX];
    let isEmpty = false;
    let [runerX, runerY] = [startX, startY + step];
    while (!isEmpty && runerX < theGrid.length && runerY < actualRow.length) {
      console.log("while");
      let theCaze = theGrid[runerX][runerY];
      console.log(`theCaze: ${theCaze}`);
      console.log(theCaze);
      if (!theCaze.isMine && !theCaze.isVisible) {
        theCaze.isVisible = true;
        handlePropagation(runerX, runerY);
        handlePropagation(runerX, runerY,-1);
      }
      isEmpty = theCaze.content(theGrid) == "" || theCaze.isMine;
      runerX += step;
      runerY += step;
      actualRow = state.grid[runerX];
    }
    setState({ ...state, grid: theGrid });
  };
  const handleClickCaze = (offX, OffY) => {
    let actualGrid = state.grid;
    // actualGrid[offX][OffY].isMine = !actualGrid[offX][OffY].isMine;
    actualGrid[offX][OffY].isVisible = true;
    // change visible to true for voisins with no content
    handlePropagation(offX, OffY);
    handlePropagation(offX, OffY,-1);
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
              {state.levels.map((level, index) => (
                <button
                  key={index}
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
            {state.grid.map((row, index) => (
              <>
                {index == 0 ? (
                  <>
                    <p key={index} className="gridRow">
                    <span className="case gridAXES">#</span>
                      {row.map((caze, cazeIndex) => (
                        <span className="case gridAXES">{cazeIndex}</span>
                      ))}
                    </p>
                  </>
                ) : null}

                <p key={index} className="gridRow">
                  <span className="case gridAXES">{index}</span>
                  {row.map((caze, cazeIndex) => (
                    <span
                      key={cazeIndex}
                      className={
                        !caze.isVisible
                          ? "case"
                          : caze.isMine
                          ? "case cazeKO"
                          : "case caseOK"
                      }
                      onClick={() => handleClickCaze(caze.off.x, caze.off.y)}
                    >
                      {!caze.isVisible ? "" : caze.content(state.grid)}
                    </span>
                  ))}
                </p>
              </>
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
