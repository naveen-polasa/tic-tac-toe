import { useState } from "react";

const Grid = () => {
  const [grid, setGrid] = useState(Array(7).fill(Array(7).fill(null)));
  const [players, setPlayers] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const checkIfWinner = (grid) => {
    const combinations = [];

    grid?.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          if (j < 3) {
            combinations.push([
              grid[i][j],
              grid[i][j + 1],
              grid[i][j + 2],
              grid[i][j + 3],
              grid[i][j + 4],
            ]);
          }
          if (i < 3) {
            combinations.push([
              grid[i][j],
              grid[i + 1][j],
              grid[i + 2][j],
              grid[i + 3][j],
              grid[i + 4][j],
            ]);
          }
          if (i < 3 && j < 3) {
            combinations.push([
              grid[i][j],
              grid[i + 1][j + 1],
              grid[i + 2][j + 2],
              grid[i + 3][j + 3],
              grid[i + 4][j + 4],
            ]);
          }
          if (i < 3 && j > 3) {
            combinations.push([
              grid[i][j],
              grid[i + 1][j - 1],
              grid[i + 2][j - 2],
              grid[i + 3][j - 3],
              grid[i + 4][j - 4],
            ]);
          }
        }
      });
    });

    const checkArray = (array) => {
      const unique = [...new Set(array)];
      if (unique.length === 1 && unique[0]) {
        return unique[0];
      }
    };

    for (let i = 0; i < combinations.length; i++) {
      const winner = checkArray(combinations[i]);
      if (winner) {
        setWinner(winner);
        setIsDraw(false);
        return winner;
      }
    }

    if (!grid.flat().includes(null)) {
      setIsDraw(true);
    }
  };

  return (
    <>
      <h3 className="text-center my-4">
        {winner
          ? `Player ${winner} wins! 🎉`
          : `Player ${currentPlayer}'s turn`}
      </h3>
      <div className="relative">
        {grid.map((row, i) => (
          <div key={i} className="flex justify-center">
            {row.map((cell, j) => (
              <button
                key={i + j}
                className="border border-black w-12 h-12 font-bold"
                onClick={() => {
                  if (cell || winner) return;
                  const newGrid = grid?.map((row, rowIndex) => {
                    if (rowIndex === i) {
                      return row.map((cell, cellIndex) => {
                        if (cellIndex === j) {
                          return currentPlayer;
                        }
                        return cell;
                      });
                    }
                    return row;
                  });
                  setGrid(newGrid);
                  checkIfWinner(newGrid);
                  setCurrentPlayer(
                    currentPlayer === players ? 1 : currentPlayer + 1
                  );
                }}
              >
                {cell === 1 && "X"}
                {cell === 2 && "O"}
                {cell === 3 && "△"}
              </button>
            ))}
          </div>
        ))}
        {(winner || isDraw) && (
          <div
            className="absolute top-[50%] left-[50%]
           transform -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-gray-300  mx-auto flex flex-col justify-center gap-3"
          >
            {winner && (
              <>
                <h3 className="text-center my-4 font-bold">
                  Player {winner} wins! 🎉
                </h3>
                <div className="mx-auto">
                  <button
                    className="border border-black w-24 h-12"
                    onClick={() => {
                      setGrid(Array(7).fill(Array(7).fill(null)));
                      setWinner(null);
                      setCurrentPlayer(1);
                    }}
                  >
                    Restart
                  </button>
                </div>
              </>
            )}
            {isDraw && (
              <>
                <h3 className="text-center my-4 font-bold">It's a draw!</h3>
                <div className="mx-auto">
                  <button
                    className="border border-black w-24 h-12"
                    onClick={() => {
                      setGrid(Array(7).fill(Array(7).fill(null)));
                      setWinner(null);
                      setIsDraw(false);
                      setCurrentPlayer(1);
                    }}
                  >
                    Restart
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <h3 className="text-center my-4">Place 5 in a row to win!</h3>
      <div className="flex justify-center my-4">
        <button
          className="border border-black w-24 h-12"
          onClick={() => {
            setGrid(Array(7).fill(Array(7).fill(null)));
            setWinner(null);
            setIsDraw(false);
            setCurrentPlayer(1);
          }}
        >
          Restart
        </button>
        <button
          className={`border border-black w-24 h-12 ${
            players === 3 ? "bg-gray-300" : ""
          }`}
          onClick={() => {
            setGrid(Array(7).fill(Array(7).fill(null)));
            setPlayers(3);
            setCurrentPlayer(1);
            setWinner(null);
            setIsDraw(false);
          }}
        >
          3 Players
        </button>
        <button
          className={`border border-black w-24 h-12 ${
            players === 2 ? "bg-gray-300" : ""
          }`}
          onClick={() => {
            setGrid(Array(7).fill(Array(7).fill(null)));
            setPlayers(2);
            setCurrentPlayer(1);
            setWinner(null);
            setIsDraw(false);
          }}
        >
          2 Players
        </button>
      </div>
    </>
  );
};
export default Grid;
