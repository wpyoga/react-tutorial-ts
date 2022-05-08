import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/**
 * The props object required by Square
 *
 * @param value - Value to be displayed in the Square
 * @param onClick - Function to be called when Square is clicked
 * @param isHighlighted - Controls whether the Square is highlighted
 */
interface SquareProps {
  value: string;
  onClick: () => void;
  isHighlighted: boolean;
}

/**
 * A square on the board
 */
function Square(props: SquareProps) {
  const buttonStyle: React.CSSProperties = props.isHighlighted
    ? { backgroundColor: "lightgray" }
    : {};

  return (
    <button className="square" onClick={props.onClick} style={buttonStyle}>
      {props.value}
    </button>
  );
}

/**
 * The props passed to the Board
 *
 * @param squares - Data to be rendered by Squares
 * @param onClick - Click handler to be passed to Square
 * @param highlightedSquare - The Square to be highlighted
 */
interface BoardProps {
  squares: string[];
  onClick: (i: number) => void;
  highlightedSquares: number[];
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
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isHighlighted={this.props.highlightedSquares.includes(i)}
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
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => this.renderSquare(row * 3 + col))}
          </div>
        ))}
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
 *
 * When a historical move is selected, its number is kept in the state,
 * so that the button can be shown in bold.
 */
interface GameState {
  history: { squares: string[]; col: number; row: number; player: string }[];
  sortAscending: boolean;
  stepNumber: number;
  selectedMove: number;
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
    history: [{ squares: Array(9).fill(""), col: -1, row: -1, player: "" }],
    sortAscending: true,
    stepNumber: 0,
    selectedMove: -1,
    xIsNext: true,
  };

  /**
   * Render the game on the page
   *
   * @remarks
   * The currently selected item in the move list is shown in bold.
   *
   * Passing this.reverseSortOrder() as an arrow function ensures that
   * "this" is the Game object.
   */
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, winningLine } = calculateWinner(current.squares);

    let status;
    if (winner != "") {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    let moves = history.map((snapshot, move) => {
      let desc;
      if (move === 0) {
        desc = "Go to game start";
      } else {
        desc =
          `Go to move #${move}: ` +
          `${snapshot.player} (${snapshot.col},${snapshot.row})`;
      }

      let buttonStyle: React.CSSProperties = {};
      if (move === this.state.selectedMove) {
        buttonStyle = { fontWeight: "bold" };
      }

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} style={buttonStyle}>
            {desc}
          </button>
        </li>
      );
    });

    if (!this.state.sortAscending) {
      moves = moves.reverse();
    }

    let highlightedSquares = Array<number>();
    if (winner != "") {
      highlightedSquares = winningLine;
    } else if (this.state.selectedMove >= 0) {
      const selectedHistory = history[this.state.selectedMove];
      highlightedSquares = [selectedHistory.col + selectedHistory.row * 3];
    }

    const sortButtonLabel = this.state.sortAscending
      ? "Sort descending"
      : "Sort ascending";

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            highlightedSquares={highlightedSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.reverseSortOrder()}>
            {sortButtonLabel}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  /**
   * Reverse sort order
   */
  reverseSortOrder() {
    this.setState({
      sortAscending: !this.state.sortAscending,
    });
  }

  /**
   * Go back to a point in history
   */
  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      selectedMove: step,
      xIsNext: step % 2 === 0,
    });
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
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i] != "" || calculateWinner(squares).winner != "") {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          col: i % 3,
          row: Math.floor(i / 3),
          player: squares[i],
        },
      ]),
      stepNumber: history.length,
      selectedMove: -1,
      xIsNext: !this.state.xIsNext,
    });
  }
}

/**
 * Returns "X" or "O" if a winner can be determined, or an empty string otherwise
 *
 * @params squares - State of squares, from which the winner is determined
 *
 * @returns An object containing winner, either "X" or "O" if there is a winner;
 * and winningLine, an array of the winning square numbers if there is a winner
 */
function calculateWinner(squares: string[]): {
  winner: string;
  winningLine: number[];
} {
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
      return { winner: squares[a] + "", winningLine: winningLines[i].slice() };
    }
  }

  return { winner: "", winningLine: [-1, -1, -1] };
}

// Basic boilerplate to draw the game on the page

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Game />);
