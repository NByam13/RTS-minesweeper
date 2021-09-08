import React, { useEffect, useState } from "react";
import GridItem from "../GridItem";
import styled from "styled-components";

const GameBoardGrid = styled.div`
  margin-left: 20px;
  width: 180px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". . . . . . . . ."
    ". . . . . . . . ."
    ". . . . . . . . ."
    ". . . . . . . . ."
    ". . . . . . . . ."
    ". . . . . . . . ."
    ". . . . . . . . ."
    ". . . . . . . . ."
    ". . . . . . . . .";
`;

// squares
export const SOLID_STATE = "solid";
export const EMPTY_STATE = "empty";
export const NUMBER_STATE = "number";
export const MINE_STATE = "mine";

export type CellType = {
  visibility: "covered" | "uncovered";
  value: typeof NUMBER_STATE | typeof MINE_STATE;
  tacos: 1 | 2 | 3;
};

const GameBoard = () => {
  const [squaresState, setSquaresState] = useState<CellType[]>(
    Array.from({ length: 81 }, () => ({
      visibility: "covered",
      value: "number",
      tacos: 2,
    }))
  );

  const onSquareClick = (index: number) => {
    const COPY = [...squaresState];
    COPY[index].visibility = "uncovered";
    COPY[index].value =
      COPY[index].value === MINE_STATE ? MINE_STATE : NUMBER_STATE;
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

  useEffect(() => {
    assignMines();
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
