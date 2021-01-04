import { useEffect, useState } from "react";
import Square from "../../components/Square/Square";

import styles from "./Board.module.css";

const Board = () => {
  const [gameState, setGameState] = useState([]);
  const [playerTurn, setPlayerTurn] = useState("X");
  const [hasWon, setHasWon] = useState(false);

  // onMount / todo: when user resets board
  useEffect(() => {
    const initializeGame = () => setGameState(new Array(9).fill(""));
    setHasWon(false);
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

    if (isWinner()) {
      setHasWon(true);
    }
  }, [gameState, playerTurn]);

  const updateBoard = (squareIndex) => {
    setGameState((prevBoard) => {
      // handle previously set value, or game is over
      if (prevBoard[squareIndex] !== "" || hasWon) {
        return prevBoard;
      }
      // otherwise update the board
      let updatedBoard = [...prevBoard];
      updatedBoard[squareIndex] = playerTurn;
      return updatedBoard;
    });

    // update player turn
    setPlayerTurn((turn) => (turn === "X" ? "O" : "X"));
  };

  const DisplayState = () => {
    if (hasWon) {
      return <p>Winner: {playerTurn === "X" ? "O" : "X"}</p>;
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
