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
    stop: false,
    resetTime: false,
    scores: [],
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
      stop: false,
      msg: "play",
      resetTime: true,
      level: state.levels.find((level) => level.mines == count),
    });
  };
  const handlePropagation = (startX, startY, step = 1) => {
    // console.log(`handlePropagation(startX:${startX}, startY:${startY})`);
    let theGrid = state.grid;
    let actualRow = state.grid[startX];
    let isEmpty = false;
    let [runerX, runerY] = [startX, startY + step];
    while (!isEmpty && runerX < theGrid.length && runerY < actualRow.length) {
      // console.log("while");
      let theCaze = theGrid[runerX][runerY];
      // console.log(`theCaze: ${theCaze}`);
      // console.log(theCaze);
      if (!theCaze.isMine && !theCaze.isVisible) {
        theCaze.isVisible = true;
        handlePropagation(runerX, runerY);
        handlePropagation(runerX, runerY, -1);
      }
      isEmpty = theCaze.content(theGrid) == "" || theCaze.isMine;
      runerX += step;
      runerY += step;
      actualRow = state.grid[runerX];
    }
    setState({ ...state, grid: theGrid });
  };
  const handleClickCaze = (offX, OffY) => {
    if (!state.stop) {
      let actualGrid = state.grid;
      let clickedCaze = actualGrid[offX][OffY];
      clickedCaze.isVisible = true;
      setState({
        ...state,
        msg: clickedCaze.isMine ? "Booom" : "play",
        stop: clickedCaze.isMine,
        resetTime: false,
        grid: [...actualGrid],
      });
      // actualGrid[offX][OffY].isMine = !actualGrid[offX][OffY].isMine;
      // state.stop && return false;
      if (!clickedCaze.isMine) {
        // change visible to true for voisins with no content
        handlePropagation(offX, OffY);
        handlePropagation(offX, OffY, -1);
      }
    }
  };
  const handleUpdateScores = (seconds) => {
    console.log(
      state.grid.flat()
      // .filter((caze) => caze.isMine)
    );
    setState({
      ...state,
      scores: [
        ...state.scores,
        {
          level: state.level,
          openedCount: state.grid.flat().filter((caze) => caze.isVisible).length,
          seconds,
          isWin: state.grid.flat()
            .filter((caze) => caze.isMine)
            .every((caze) => !caze.isVisible) ? "yes":"no",
        },
      ],
    });
  };
  return (
    <div className="App">
      <>
        {state.stop || !state.start ? (
          <div className="gridBox">
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
          </div>
        ) : null}
        {state.grid.length ? (
          <div className="gridBox">
            {state.grid.map((row, index) => (
              <>
                {index == 0 ? (
                  <>
                    <p key={index} className="gridRow">
                      <span className="case gridAXES">#</span>
                      {row.map((caze, cazeIndex) => (
                        <span key={cazeIndex} className="case gridAXES">
                          {cazeIndex}
                        </span>
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
          </div>
        ) : null}
      </>

      <p className={state.stop ? "msg boomStop" : "msg boomPlay"}>
        {state.msg}
      </p>
      {state.start ? (
        <Timer stop={state.stop} updateScores={handleUpdateScores} />
      ) : null}

      <table>
        <thead>
          <tr>
            <th>level</th>
            <th>openedCount</th>
            <th>seconds</th>
            <th>isWin</th>
          </tr>
        </thead>
        <tbody>
          {state.scores.map((score, index) => (
            <tr key={index}>
              <th>{score.level.name}</th>
              <td>{score.openedCount}</td>
              <td>{score.seconds}</td>
              <td>{score.isWin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
