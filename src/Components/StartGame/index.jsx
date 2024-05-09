/* eslint-disable react/prop-types */
import "./styles.css";

const StartGame = ({ Start }) => {
  return (
    <div className="start">
      <h1>Secret Word</h1>
      <p>Clique no botão para começar a jogar</p>
      <button onClick={Start} className="button">
        Play
      </button>
    </div>
  );
};

export default StartGame;
