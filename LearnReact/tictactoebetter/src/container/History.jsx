import styles from "./History.module.css";

const History = ({ history, setGameState, updateHistory }) => {
  const editableHistory = history.filter(
    (_, index) => index !== 0 && index !== history.length - 1
  );
  return (
    <ul className={styles.HistoryList}>
      {editableHistory.map((state, i) => (
        <li key={i}>
          <button
            onClick={() => {
              setGameState(state);
              updateHistory(i);
            }}
          >
            Revert to Step: {i + 1}
          </button>
        </li>
      ))}
    </ul>
  );
};
export default History;
