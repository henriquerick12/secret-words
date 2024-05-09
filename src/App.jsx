import { useState, useEffect } from "react";

import StartGame from "./Components/StartGame";
import Game from "./Components/Game";
import GameOver from "./Components/GameOver";

import { wordsList } from "./data/words";
import "./App.css";

const stages = [
  { id: 1, name: "Start" },
  { id: 2, name: "Play" },
  { id: 3, name: "End" },
];

function App() {
  // Estados do Jogo
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [palavra, setPalavra] = useState("");
  const [category, setCategory] = useState([]);
  const [resp, setResp] = useState([]);

  // Estado do Jogador
  const [letrasadivinhadas, setLetrasAdivinhadas] = useState([]);
  const [letraserradas, setLetrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(3);
  const [score, setScore] = useState(0);

  // inicialização do game
  const PalavraAndFrase = () => {
    // Random Categoria
    const categorias = Object.keys(words);

    const ramdomCategory =
      categorias[Math.floor(Math.random() * categorias.length)];

    // Random Palavra
    const resposta =
      words[ramdomCategory][
        Math.floor(Math.random() * words[ramdomCategory].length)
      ];

    return { ramdomCategory, resposta };
  };

  // Funçoes para troca
  const Start = () => {
    const { ramdomCategory, resposta } = PalavraAndFrase();

    // Transformar em um array a resposta
    const arrayResp = resposta.split("");

    // Mapear cada letra e transformar em pequena
    const newResp = arrayResp.map((item) => item.toLowerCase());

    setGameStage(stages[1].name);

    setCategory(ramdomCategory);
    setResp(newResp);
    setPalavra(resposta);
  };

  const GameEnd = (palavra) => {
    // Padronizar letra recebida
    const newPalavra = palavra.toLowerCase();

    // Chegar se existe a palavra em algum lugar
    if (
      letrasadivinhadas.includes(newPalavra) ||
      letraserradas.includes(newPalavra)
    ) {
      return;
    }

    if (resp.includes(newPalavra)) {
      setLetrasAdivinhadas((adivinhadas) => [...adivinhadas, newPalavra]);
      setScore(score + 1);
    } else {
      setLetrasErradas((erradas) => [...erradas, newPalavra]);
      setTentativas(tentativas - 1);
    }
  };

  const ResetGame = () => {
    setGameStage(stages[0].name);
    setScore(0);
    setTentativas(3);
    setLetrasAdivinhadas([]);
    setLetrasErradas([]);
  };

  useEffect(() => {
    if (tentativas <= 0) {
      setGameStage(stages[2].name);
      setTentativas(3);
      setLetrasAdivinhadas([]);
      setLetrasErradas([]);
    }
  }, [tentativas]);

  useEffect(() => {
    const unicasLetras = [...new Set(resp)];

    if (
      letrasadivinhadas.length === unicasLetras.length &&
      letrasadivinhadas != ""
    ) {
      ResetGame();
    }
  }, [letrasadivinhadas]);

  return (
    <div className="App">
      {gameStage === stages[0].name && <StartGame Start={Start} />}
      {gameStage === stages[1].name && (
        <Game
          GameEnd={GameEnd}
          letrasadivinhadas={letrasadivinhadas}
          letraserradas={letraserradas}
          score={score}
          tentativas={tentativas}
          palavra={palavra}
          resp={resp}
          categorias={category}
        />
      )}
      {gameStage === stages[2].name && (
        <GameOver score={score} ResetGame={ResetGame} />
      )}
    </div>
  );
}

export default App;
