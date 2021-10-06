import { render, screen } from "@testing-library/react";
import GameBoard from ".";
import GridItem from '../GridItem'

const MOCK_GRID_ITEM = {
  visibility: "uncovered",
  value: "number",
  tacos: 0,
}

it("Renders the gameboard", () => {
  render(<GameBoard />);
  const board = screen.getByTestId("gameBoard");
  expect(board).toBeInTheDocument();
});

it("renders the grid items", () => {
  render(<GameBoard />);
  const gridItems = screen.getAllByTestId("gridItem");
  expect(gridItems.length).toBe(81);
});


it("does not show zeros", () => {
  render(<GameBoard />);
  const gridItems = screen.getAllByRole("button")
    .filter((button) => {
      return Array.from(button.attributes)['data-number-of-mines-around'] === "0"
    });
  expect(gridItems.length).toBe(81);
});

describe('GridItem', () => {
  fit('doesnt display zeros', () => {
    render(
      <GridItem
        onSelect={() => {}}
        state={MOCK_GRID_ITEM}
      />
    )
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  })
})
