import { useEffect, useState } from "react";
import Square from "../../components/Square/Square";

import styles from "./Board.module.css";
const Board = () => {
  const [gameState, setGameState] = useState([]);
  const [playerTurn, setPlayerTurn] = useState("X");

  useEffect(() => {
    const initializeGame = () => setGameState(new Array(9).fill(""));
    initializeGame();
  }, [setGameState]);

  const updateBoard = (squareIndex) => {
    setGameState((prevBoard) => {
      let updatedBoard = [...prevBoard];
      updatedBoard[squareIndex] = playerTurn;
      return updatedBoard;
    });

    // update player turn
    setPlayerTurn((turn) => (turn === "X" ? "O" : "X"));
  };

  return (
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
  );
};

export default Board;
