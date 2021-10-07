import { useState } from "react";
import styled from "styled-components";
import { getDefaultLibFileName } from "typescript";
import {
  NUMBER_STATE,
  MINE_STATE,
  CellType,
} from "../Gameboard";

const StyledSquare = styled.button<{ isCovered: boolean }>`
  width: 20px;
  height: 20px;
  background-color: ${props => props.isCovered ? 'gray' : 'darkgray'}
`;
type GridItemProps = { onSelect: any; state: CellType };

const GridItem = ({ onSelect, state }: GridItemProps) => {
  let display;

  if (state.visibility === "covered") {
    display = "";
  } else if (state.value === NUMBER_STATE) {
    display = state.nearbyMines !== 0 ? state.nearbyMines : "";
  } else if (state.value === MINE_STATE) {
    display = "B";
  }

  return (
    <StyledSquare
      data-number-of-mines-around={state.nearbyMines}
      data-testid="gridItem"
      onClick={onSelect}
      isCovered={state.visibility === 'covered'}
      disabled={state.clicked}
    >
      {display}
    </StyledSquare>
  );
};

export default GridItem;
