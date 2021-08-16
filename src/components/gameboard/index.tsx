import React from 'react'
import GridItem from '../GridItem'

const GameBoard = () => (
  <div data-testid="gameBoard">
    {[...Array(81)].map((_, index) => <GridItem key={index} />)}
  </div>
)

export default GameBoard
