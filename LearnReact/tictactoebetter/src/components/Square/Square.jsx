import React from "react";
import styles from "./Square.module.css";

const Square = ({ boardPosition, displayValue, updateBoard, isCellActive }) => {
  // halfway hardcoded because I am lazy, but not that lazy. To not be lazy I would pass board and determine positions, and dynamically set the hardcoded values you see below
  const isTopRow = [0, 1, 2].includes(boardPosition);
  const isMiddleRow = [3, 4, 5].includes(boardPosition);
  const isBottomRow = [6, 7, 8].includes(boardPosition);
  const isLeftInnerBorder = [3].includes(boardPosition);
  const isRightInnerBorder = [5].includes(boardPosition);

  const squareClasses = () => {
    let classes = [styles.Square];

    if (isTopRow) {
      const isTopRightCorner = boardPosition === 2;
      const isTopLeftCorner = boardPosition === 0;
      if (isTopRightCorner) {
        classes.push(styles.TopRightCornerBorder);
      } else if (isTopLeftCorner) {
        classes.push(styles.TopLeftCornerBorder);
      } else {
        classes.push(styles.TopRowBorder);
      }
      classes.push(styles.TopRowText);
    }

    if (isBottomRow) {
      const isBottomLeftCorner = boardPosition === 6;
      const isBottomRightCorner = boardPosition === 8;
      if (isBottomLeftCorner) {
        classes.push(styles.BottomLeftCornerBorder);
      } else if (isBottomRightCorner) {
        classes.push(styles.BottomRightCornerBorder);
      } else {
        classes.push(styles.BottomRowBorder);
        classes.push(styles.BottomRowInnerSquare);
      }
      classes.push(styles.BottomRowText);
    }

    if (isMiddleRow) {
      classes.push(styles.MiddleRowInnerSquare);
    }

    if (isLeftInnerBorder) classes.push(styles.LeftInnerBorder);
    if (isRightInnerBorder) classes.push(styles.RightInnerBorder);

    if (isCellActive) {
      classes.push(styles.SquareHoverOverride);
    }

    return classes.join(" ");
  };
  return (
    <div className={squareClasses()} onClick={() => updateBoard(boardPosition)}>
      <span>{displayValue}</span>
    </div>
  );
};

export default Square;
