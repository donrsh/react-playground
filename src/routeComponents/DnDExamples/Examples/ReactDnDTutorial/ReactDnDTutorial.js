import * as React from 'react'
import styled from 'styled-components'
import { DragDropContext, DragSource, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import * as R from 'ramda'

import { Typography } from '@material-ui/core'
import { OpenInNew } from '@material-ui/icons/'

import { initKnightPosition, observe, moveKnight, canMoveKnight } from './Game'
import { ItemTypes } from './constants'

const Styc = {
  Root: styled.div`
    margin: 100px auto;
    width: 300px;
    height: 300px;
  `,

  KnightRoot: styled.div`
    opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
    font-size: 25;
    font-weight: 'bold';
    cursor: move;
  `,

  SquareRoot: styled.div`
    background-color: ${({ black }) => (black ? 'black' : 'white')};
    color: ${({ black }) => (black ? 'white' : 'black')};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  SquareOverlay: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    opacity: 0.5;
    background: ${R.prop('color')};
  `,

  BoardRoot: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  `,
}

const knightSource = {
  beginDrag(props) {
    return {}
  },
}

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

const squareTarget = {
  drop(props) {
    moveKnight(props.x, props.y)
  },

  canDrop(props) {
    return canMoveKnight(props.x, props.y)
  },
}

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

class RactDnDTutorial extends React.Component {
  state = { knightPosition: [0, 5] }

  renderPiece = (x, y, knightPosition) => {
    const { Sub } = this

    const [knightX, knightY] = knightPosition
    if (x === knightX && y === knightY) {
      return <Sub.Knight />
    }
  }

  renderSquare = (i, knightPosition) => {
    const { Sub, renderPiece } = this

    const x = i % 8
    const y = Math.floor(i / 8)

    return (
      <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
        <Sub.BoardSquare x={x} y={y}>
          {renderPiece(x, y, knightPosition)}
        </Sub.BoardSquare>
      </div>
    )
  }

  Sub = {
    Knight: DragSource(
      ItemTypes.KNIGHT,
      knightSource,
      sourceCollect,
    )(({ connectDragSource, isDragging }) => {
      return (
        <Styc.KnightRoot
          isDragging
          innerRef={instance => connectDragSource(instance)}
        >
          ♘
        </Styc.KnightRoot>
      )
    }),

    BoardSquare: DropTarget(
      ItemTypes.KNIGHT,
      squareTarget,
      targetCollect,
    )(({ x, y, children, connectDropTarget, isOver, canDrop }) => {
      const black = (x + y) % 2 === 1

      return (
        <div
          ref={connectDropTarget}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <Styc.SquareRoot black={black}>{children}</Styc.SquareRoot>

          {isOver && !canDrop && <Styc.SquareOverlay color="red" />}
          {!isOver && canDrop && <Styc.SquareOverlay color="yellow" />}
          {isOver && canDrop && <Styc.SquareOverlay color="green" />}
        </div>
      )
    }),

    Board: ({ knightPosition }) => {
      const { renderSquare } = this

      return (
        <Styc.BoardRoot>
          {R.range(0, 63).map(i => renderSquare(i, knightPosition))}
        </Styc.BoardRoot>
      )
    },
  }

  handleSquareClick = (toX, toY) => {
    if (canMoveKnight(toX, toY)) {
      moveKnight(toX, toY)
    }
  }

  componentDidMount() {
    initKnightPosition(this.state.knightPosition)
    this.unobserve = observe(knightPosition =>
      this.setState({ knightPosition }),
    )
  }

  componentWillUnmount() {
    this.unobserve()
  }

  render() {
    const { Sub } = this
    const { knightPosition } = this.state
    return (
      <Styc.Root>
        <Typography variant="headline" style={{ marginBottom: 20 }}>
          React-Dnd Tutorial
        </Typography>

        <Typography variant="body1" style={{ marginBottom: 20 }}>
          <OpenInNew />{' '}
          <a
            href="http://react-dnd.github.io/react-dnd/docs-tutorial.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            See here
          </a>
        </Typography>

        <Sub.Board knightPosition={knightPosition} />
      </Styc.Root>
    )
  }
}

const enhancer = DragDropContext(HTML5Backend)

export default enhancer(RactDnDTutorial)
