import { useEffect, useState } from "react";
import GridItem from "../GridItem";
import styled from "styled-components";

const GameBoardGrid = styled.div`
  margin-left: 20px;
  width: 180px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

// write tests for next session

// squares
export const NUMBER_STATE = "number";
export const MINE_STATE = "mine";

export type CellType = {
  visibility: "covered" | "uncovered";
  value: typeof NUMBER_STATE | typeof MINE_STATE;
  nearbyMines: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  clicked: boolean;
};

const GameBoard = () => {
  const [squaresState, setSquaresState] = useState<CellType[]>(
    Array.from({ length: 81 }, () => ({
      visibility: "covered",
      value: "number",
      nearbyMines: 2,
      clicked: false,
    }))
  );

  const onSquareClick = (index: number) => {
    const COPY = [...squaresState];
    COPY[index].visibility = "uncovered";
    COPY[index].value =
      COPY[index].value === MINE_STATE ? MINE_STATE : NUMBER_STATE;
    COPY[index].clicked = true;
    setSquaresState(COPY);
  };

  const assignMines = () => {
    const mines: number[] = [];

    while (mines.length < 10) {
      let num = Math.floor(Math.random() * 80);
      if (!mines.includes(num)) {
        mines.push(num);
      }
    }
    const COPY = [...squaresState];
    mines.forEach((val) => {
      COPY[val].value = MINE_STATE;
    });
    setSquaresState(COPY);
  };

  const calculateNearbyMinesForSquare = (index: number) => {
    const touchingCells: number[] = [];

    if (index < 9) {
      if (index === 0) {
        touchingCells.push(1, 9, 10);
      } else if (index === 8) {
        touchingCells.push(7, 16, 17);
      } else {
        touchingCells.push(
          index - 1,
          index + 1,
          index + 9,
          index + 8,
          index + 10
        );
      }
    } else if (index < 81 && index >= 72) {
      if (index === 72) {
        touchingCells.push(index - 9, index - 8, index + 1);
      } else if (index === 80) {
        touchingCells.push(index - 1, index - 9, index - 10);
      } else {
        touchingCells.push(
          index + 1,
          index - 1,
          index - 9,
          index - 8,
          index - 10
        );
      }
    } else {
      if (index % 9 === 0) {
        touchingCells.push(
          index - 9,
          index - 8,
          index + 1,
          index + 9,
          index + 10
        );
      } else if (index % 9 === 8) {
        touchingCells.push(
          index - 1,
          index - 9,
          index - 10,
          index + 8,
          index + 9
        );
      } else {
        touchingCells.push(
          index - 1,
          index - 8,
          index - 9,
          index - 10,
          index + 1,
          index + 8,
          index + 9,
          index + 10
        );
      }
    }

    return touchingCells.filter((cellNumber) => {
      return squaresState[cellNumber].value === MINE_STATE;
    }).length;
  };

  const assignNearbyMines = () => {
    const newState = squaresState.map((square, index) => {
      return {
        ...square,
        nearbyMines: calculateNearbyMinesForSquare(index),
      } as CellType;
    });

    setSquaresState(newState);
  };

  useEffect(() => {
    assignMines();
    assignNearbyMines();
  }, []);

  return (
    <GameBoardGrid data-testid="gameBoard">
      {[...Array(81)].map((_, index) => (
        <GridItem
          key={index}
          onSelect={() => onSquareClick(index)}
          state={squaresState[index]}
        />
      ))}
    </GameBoardGrid>
  );
};

export default GameBoard;
