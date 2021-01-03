import React from "react";
import styles from "./Square.module.css";

const Square = ({ boardPosition, displayValue, updateBoard }) => {
  // halfway hardcoded because I am lazy, but not that lazy. To not be lazy I would pass board and determine positions, and dynamically set the hardcoded values you see below
  const isTopRow = [0, 1, 2].includes(boardPosition);
  const isBottomRow = [6, 7, 8].includes(boardPosition);
  const isLeftInnerBorder = [3].includes(boardPosition);
  const isRightInnerBorder = [5].includes(boardPosition);

  const squareClasses = () => {
    let classes = [styles.Square];

    if (isTopRow) {
      const isTopRightCorner = boardPosition === 2;
      const isTopLeftCorner = boardPosition === 0;
      if (isTopRightCorner) {
        console.log("wee");
        classes.push(styles.TopRightCornerBorder);
        classes.push(styles.TopCornersText);
      } else if (isTopLeftCorner) {
        classes.push(styles.TopLeftCornerBorder);
        classes.push(styles.TopCornersText);
      } else {
        classes.push(styles.TopRowBorder);
      }
    }

    if (isBottomRow) {
      const isBottomLeftCorner = boardPosition === 6;
      const isBottomRightCorner = boardPosition === 8;
      if (isBottomLeftCorner) {
        classes.push(styles.BottomLeftCornerBorder);
        classes.push(styles.BottomCornersText);
      } else if (isBottomRightCorner) {
        classes.push(styles.BottomRightCornerBorder);
        classes.push(styles.BottomCornersText);
      } else {
        classes.push(styles.BottomRowBorder);
      }
    }

    if (isLeftInnerBorder) classes.push(styles.LeftInnerBorder);
    if (isRightInnerBorder) classes.push(styles.RightInnerBorder);

    return classes.join(" ");
  };
  return (
    <div className={squareClasses()} onClick={() => updateBoard(boardPosition)}>
      <span>{displayValue}</span>
    </div>
  );
};

export default Square;
