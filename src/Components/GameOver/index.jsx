/* eslint-disable react/prop-types */

import "./styles.css";

const GameOver = ({ ResetGame, score }) => {
  return (
    <div>
      <h1>GameOver</h1>
      <h2>Pontuação: {score}</h2>
      <button onClick={ResetGame}>Reiniciar Jogo</button>
    </div>
  );
};

export default GameOver;
