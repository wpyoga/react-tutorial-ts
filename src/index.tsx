import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/**
 * The props object required by Square
 *
 * @param value - Value to be displayed in the Square
 */
interface SquareProps {
  value: number;
}

/**
 * The state maintained by the Square
 */
interface SquareState {
  value: string;
}

/**
 * A square on the board
 */
class Square extends React.Component<SquareProps, SquareState> {
  /**
   * Default state of the Square
   *
   * @remarks
   * The Square is initially empty
   */
  state: SquareState = {
    value: "",
  };

  /**
   * Render an individual square on the board
   */
  render() {
    return (
      <button className="square" onClick={() => this.setState({ value: "X" })}>
        {this.state.value}
      </button>
    );
  }
}

/**
 * The game board
 */
class Board extends React.Component {
  /**
   * Render a Square on the board
   *
   * @param i - Index of the square to be rendered
   */
  renderSquare(i: number) {
    return <Square value={i} />;
  }

  /**
   * Render the game board
   *
   * @remarks
   * 9 squares (3x3) are drawn on the board
   */
  render() {
    const status = "Next player: X";

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
