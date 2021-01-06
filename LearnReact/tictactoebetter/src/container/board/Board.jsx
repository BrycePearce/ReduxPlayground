import { useEffect, useState } from "react";
import Square from "../../components/Square/Square";
import History from "../History";
import styles from "./Board.module.css";

const Board = () => {
  const [gameState, setGameState] = useState(new Array(9).fill(""));
  const [history, setHistory] = useState([]);
  const [playerTurn, setPlayerTurn] = useState("X");
  const [outcome, setOutcome] = useState({
    hasWon: false,
    hasTied: false,
  });

  const initializeGame = () => {
    setHistory([]);
    setOutcome({ hasWon: false, hasTied: false });
    setGameState(new Array(9).fill(""));
    setPlayerTurn("X");
  };

  // board update events/actions
  useEffect(() => {
    setHistory((prev) => {
      return [...prev, gameState];
    });

    const isGameStart = () => gameState.every((cell) => cell === "");
    if (isGameStart()) return;

    const isWinner = () => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
          gameState[a] &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        ) {
          return true;
        }
      }
      return false;
    };

    const isDraw = () => gameState.every((cell) => cell !== "");

    if (isWinner()) {
      setOutcome((oldState) => ({ ...oldState, hasWon: true }));
    } else if (isDraw()) {
      setOutcome((oldState) => ({ ...oldState, hasTied: true }));
    } else {
      // update player turn
      setPlayerTurn((turn) => (turn === "X" ? "O" : "X"));
    }
  }, [gameState]);

  const updateBoard = (squareIndex) => {
    if (!outcome.hasWon) {
      setGameState((prevBoard) => {
        // handle previously set value
        if (prevBoard[squareIndex] !== "") {
          return prevBoard;
        }
        // otherwise update the board
        let updatedBoard = [...prevBoard];
        updatedBoard[squareIndex] = playerTurn;

        return updatedBoard;
      });
    }
  };

  const updateHistory = (index) => {
    setHistory(history.slice(0, index + 1));
    setOutcome({ hasWon: false, hasTied: false });
  };

  const DisplayState = () => {
    console.log(outcome);
    if (outcome.hasWon) {
      return <p>Winner: {playerTurn}</p>;
    } else if (outcome.hasTied) {
      return <p>Draw ¯\_(ツ)_/¯</p>;
    } else {
      return <p>Next: {playerTurn}</p>;
    }
  };

  const RenderGameBoard = () => {
    return gameState.map((cell, position) => (
      <Square
        boardPosition={position}
        displayValue={cell}
        updateBoard={updateBoard}
        key={position}
      />
    ));
  };

  return (
    <>
      <main className={styles.board}>
        <RenderGameBoard />
      </main>
      <div>
        <DisplayState />
      </div>
      <History
        history={history}
        setGameState={setGameState}
        updateHistory={updateHistory}
      />
      <button onClick={() => initializeGame()}>Restart</button>
    </>
  );
};

export default Board;
