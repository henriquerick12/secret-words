/* eslint-disable react/prop-types */
import { useState, useRef } from "react";

import "./styles.css";

const Game = ({ ...state }) => {
  const [digitado, setDigitado] = useState("");

  const refInput = useRef(null);

  const handleFormInput = (e) => {
    e.preventDefault();

    setDigitado("");

    state.GameEnd(digitado);

    refInput.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {state.score}</span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{state.categorias}</span>
      </h3>
      <p>
        Você ainda tem <strong>{state.tentativas}</strong> tentativas
      </p>
      <div className="wordContainer">
        {state.resp.map((item, index) =>
          state.letrasadivinhadas.includes(item) ? (
            <span key={index} className="letter">
              {item}
            </span>
          ) : (
            <span key={index} className="blankSquare">
              ?
            </span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra</p>
        <form onSubmit={handleFormInput}>
          <input
            onChange={(e) => setDigitado(e.target.value)}
            value={digitado}
            type="text"
            name="letter"
            maxLength="1"
            required
            ref={refInput}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras ja utilizadas: </p>
        {state.letraserradas.map((item, index) => (
          <span key={index}>{item.toUpperCase()},</span>
        ))}
      </div>
    </div>
  );
};

export default Game;
