import { useState } from "react";
import styled from "styled-components";
import { getDefaultLibFileName } from "typescript";
import {
  SOLID_STATE,
  EMPTY_STATE,
  NUMBER_STATE,
  MINE_STATE,
  CellType,
} from "../Gameboard";

const StyledSquare = styled.button`
  width: 20px;
  height: 20px;
  background-color: gray;
`;
type GridItemProps = { onSelect: any; state: CellType };

const GridItem = ({ onSelect, state }: GridItemProps) => {
  let display;

  if (state.visibility === "covered") {
    display = "";
  } else if (state.value === NUMBER_STATE) {
    display = state.tacos;
  } else if (state.value === MINE_STATE) {
    display = "B";
  }

  return (
    <StyledSquare data-testid="gridItem" onClick={onSelect}>
      {display}
    </StyledSquare>
  );
};

export default GridItem;
