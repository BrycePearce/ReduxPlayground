import { useEffect, useState } from "react";
import Square from "../../components/Square/Square";

import styles from "./Board.module.css";

const Board = () => {
  const [gameState, setGameState] = useState([]);
  const [playerTurn, setPlayerTurn] = useState("X");
  const [outcome, setOutcome] = useState({
    hasWon: false,
    hasTied: false,
  });

  // onMount / todo: when user resets board
  useEffect(() => {
    const initializeGame = () => setGameState(new Array(9).fill(""));
    setOutcome({ hasWon: false, hasTied: false });
    initializeGame();
  }, []);

  // board update events/actions
  useEffect(() => {
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
    console.log(isDraw(), isWinner());
    if (isWinner()) {
      setOutcome((oldState) => ({ ...oldState, hasWon: true }));
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

  const DisplayState = () => {
    if (outcome.hasWon) {
      return <p>Winner: {playerTurn}</p>;
    } else if (outcome.isDraw) {
      <p>Draw ¯\_(ツ)_/¯</p>;
    } else {
      return <p>Next: {playerTurn}</p>;
    }
  };

  return (
    <>
      <main className={styles.board}>
        {gameState.map((cell, position) => (
          <Square
            boardPosition={position}
            displayValue={cell}
            updateBoard={updateBoard}
            key={position}
          />
        ))}
      </main>
      <div>
        <DisplayState />
      </div>
    </>
  );
};

export default Board;
