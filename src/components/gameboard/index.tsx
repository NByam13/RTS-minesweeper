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

const GameBoard = () => {
  const [squaresState, setSquaresState] = useState(Array(81).fill(SOLID_STATE));

  const onSquareClick = (index: number) => {
    const COPY = [...squaresState];
    COPY[index] = NUMBER_STATE;
    console.log("being clicked", index);
    setSquaresState(COPY);
  };

  const assignMines = () => {
    const mines: number[] = [];

    while (mines.length < 11) {
      let num = Math.random() * 80;
      if (!mines.includes(num)) {
        mines.push(num);
      }
    }
    console.log(mines);
  };

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
