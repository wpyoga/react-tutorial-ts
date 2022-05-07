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
 * The state maintained by the Board
 *
 * @remarks
 * Make sure squares is an array of 9 strings.
 * TypeScript does not have a fixed-length array type, so it is possible
 * to get unexpected results if the array length is not kept precisely 9.
 */
interface BoardState {
  squares: string[];
  xIsNext: boolean;
}

/**
 * The game board
 */
class Board extends React.Component<{}, BoardState> {
  /**
   * Default state of the Board
   *
   * @remarks
   * The squares are initially empty.
   * The first player is X, and O is next, alternating at each turn.
   */
  state: BoardState = {
    squares: Array(9).fill(""),
    xIsNext: true,
  };

  /**
   * Render a Square on the board
   *
   * @param i - Index of the square to be rendered
   */
  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
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
    const status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;

    return (
      <div>
        <div className="status">{status}</div>
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

  /**
   * Handle clicks on Square
   *
   * @remarks
   * Because handleClick() is implemented in the Board,
   * "this" refers to the Board, not the Square
   */
  handleClick(i: number) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
}

/**
 * The game itself, modeled as an object
 */
class Game extends React.Component {
  /**
   * Render the game on the page
   */
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">{/* TODO */}</div>
      </div>
    );
  }
}

// Basic boilerplate to draw the game on the page

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Game />);
