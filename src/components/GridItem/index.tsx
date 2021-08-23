import { useState } from "react";
import styled from "styled-components";
import {
  SOLID_STATE,
  EMPTY_STATE,
  NUMBER_STATE,
  MINE_STATE,
} from "../Gameboard";

const StyledSquare = styled.button`
  width: 20px;
  height: 20px;
  background-color: gray;
`;
type GridItemProps = { onSelect: any; state: string };

const GridItem = ({ onSelect, state }: GridItemProps) => {
  const display = state === NUMBER_STATE ? "1" : "";

  return (
    <StyledSquare data-testid="gridItem" onClick={onSelect}>
      {display}
    </StyledSquare>
  );
};

export default GridItem;
