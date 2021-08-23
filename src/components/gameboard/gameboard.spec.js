import React from "react";
import { render, screen } from "@testing-library/react";
import GameBoard from ".";

test.only("Renders the gameboard", () => {
  render(<GameBoard />);
  const board = screen.getByTestId("gameBoard");
  expect(board).toBeInTheDocument();
});

test("renders the grid items", () => {
  render(<GameBoard />);
  const gridItems = screen.getAllByTestId("gridItem");
  expect(gridItems.length).toBe(81);
});
