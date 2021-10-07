import { render, screen } from "@testing-library/react";
import GameBoard, { CellType } from ".";
import GridItem from '../GridItem'

const MOCK_GRID_ITEM: CellType = {
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


describe('GridItem', () => {
  it('doesnt display zeros', () => {
    render(
      <GridItem
        onSelect={() => { }}
        state={MOCK_GRID_ITEM}
      />
    )
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  })
})
