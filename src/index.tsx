import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/**
 * The props object required by Square
 *
 * @param value - Value to be displayed in the Square
 * @param onClick - Function to be called when Square is clicked
 */
interface SquareProps {
  value: string;
  onClick: () => void;
}

/**
 * A square on the board
 */
function Square(props: SquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/**
 * The props passed to the Board
 *
 * @param squares - Data to be rendered by Squares
 * @param onClick - Click handler to be passed to Square
 */
interface BoardProps {
  squares: string[];
  onClick: (i: number) => void;
}

/**
 * The game board
 */
class Board extends React.Component<BoardProps> {
  /**
   * Render a Square on the board
   *
   * @param i - Index of the square to be rendered
   */
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  /**
   * Render the game board
   *
   * @remarks
   * 9 squares (3x3) are drawn on the board
   */
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

/**
 * The state maintained by the Game
 *
 * @remarks
 * Keeps history of moves, where each move is an array of 9 strings.
 * TypeScript does not have a fixed-length array type, so it is possible
 * to get unexpected results if the array length is not kept precisely 9.
 */
interface GameState {
  history: { squares: string[] }[];
  xIsNext: boolean;
}

/**
 * The game itself, modeled as an object
 */
class Game extends React.Component<{}, GameState> {
  /**
   * Default state of the Board
   *
   * @remarks
   * In the initial state, the squares are empty.
   * The first player is X, and O is next, alternating at each turn.
   */
  state: GameState = {
    history: [{ squares: Array(9).fill("") }],
    xIsNext: true,
  };

  /**
   * Render the game on the page
   */
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner != "") {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }

  /**
   * Handle clicks on Square
   *
   * @remarks
   * Because handleClick() is implemented in the Board,
   * "this" refers to the Board, not the Square.
   *
   * If the square is already filled, or if a winner has been determined,
   * further clicks are ignored.
   */
  handleClick(i: number) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i] != "" || calculateWinner(squares) != "") {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext,
    });
  }
}

/**
 * Returns "X" or "O" if a winner can be determined, or an empty string otherwise
 *
 * @params squares - State of squares, from which the winner is determined
 */
function calculateWinner(squares: string[]) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; ++i) {
    const [a, b, c] = winningLines[i];
    if (
      squares[a] != "" &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return "";
}

// Basic boilerplate to draw the game on the page

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Game />);
