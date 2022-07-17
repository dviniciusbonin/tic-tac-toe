import "./styles.css";
import { Square } from "../Square";
import { useEffect, useState } from "react";

enum Player {
  x = "X",
  O = "O",
}

export function Board() {
  const [player, setPlayer] = useState<Player>(Player.x);
  const [squares, setSquares] = useState(Array(9));
  const [hasWinner, setHasWinner] = useState(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const result = calculateWinner(squares);
    setHasWinner(result);

    if (result) setStatus(`Parabéns o jogador ${result} venceu!`);

    if (!result) setStatus(`Vez do jogador ${player}`);
  }, [squares]);

  function resetGame() {
    setSquares(new Array(9));
    setHasWinner(false);
    setStatus("");
    setPlayer(Player.x);
  }

  function calculateWinner(squares: Array<any>) {
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
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const handleClick = (i: number): void => {
    const newSquares = squares.slice();
    if (newSquares[i] == undefined) {
      newSquares[i] = player;

      setSquares(newSquares);
      player == "X" ? setPlayer(Player.O) : setPlayer(Player.x);
    }
  };
  const renderSquare = (i: number) => (
    <Square
      value={squares[i]}
      onClick={() => {
        handleClick(i);
      }}
      disabled={Boolean(hasWinner)}
    />
  );

  return (
    <div className="container-board">
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>

      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>

      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <div className="footer">{hasWinner && <button onClick={resetGame}>Jogar denovo</button>}</div>
    </div>
  );
}
