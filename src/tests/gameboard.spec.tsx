import { render, screen } from "@testing-library/react";
import GameBoard, { CellType } from "../components/Gameboard";
import GridItem from '../components/GridItem'

const MOCK_GRID_ITEM: CellType = {
  visibility: "uncovered",
  value: "number",
  nearbyMines: 0,
  clicked: false
}

describe('GameBoard', () => {
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
})


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
