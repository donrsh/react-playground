import * as React from 'react'
import styled from 'styled-components'
import * as R from 'ramda'

import { useState, useRef } from 'react'

import { Typography } from '@material-ui/core'

const getPxNum = R.pipe(
  R.replace('px', ''),
  Number
)

const getPxStr = n => `${n}px`

const Styc = {
  Container: styled.div`
    position: relative;
    background-color: #ddd;
    height: 300px;
  `,

  Draggable: styled.div.attrs({
    children: 'Drag Me Around!'
  })`
    position: absolute;
    left: calc(50% - 100px);
    top: calc(150px - 25px);
    width: 200px;
    height: 50px;
    cursor: ${({ dragging }) => dragging ? 'grabbing' : 'grab'};
    background-color: aquamarine;
    display: inline-flex;
    align-items: center;
    justify-content: center
  `
}

function DragAroundViaDragEvents() {
  const [dragging, setDragging] = useState(false)
  const startEvent = useRef()
  const draggableEl = useRef()

  const onDragStart = (e) => {
    setDragging(true)

    e.persist()
    startEvent.current = e
    e.dataTransfer.dropEffect = "none"
    e.dataTransfer.effectAllowed = "none"
    e.dataTransfer.setData("text/plain", "") // must setData!
  }

  const onDragEnd = (e) => {
    e.preventDefault()

    const [dx, dy] = [
      e.clientX - startEvent.current.clientX,
      e.clientY - startEvent.current.clientY,
    ]

    const [startLeft, startTop] = [
      getPxNum(getComputedStyle(draggableEl.current).left),
      getPxNum(getComputedStyle(draggableEl.current).top)
    ]

    draggableEl.current.style.left = getPxStr(startLeft + dx)
    draggableEl.current.style.top = getPxStr(startTop + dy)

    setDragging(false)
    startEvent.current = null
  }

  return (
    <div style={{ marginTop: 100 }}>
      <Typography variant='headline'
        style={{ marginBottom: 20 }}
      >
        Drag Around (via <code>onDragStart, onDragEnd</code>)
      </Typography>

      <Styc.Container>
        <Styc.Draggable
          draggable
          dragging={dragging}
          innerRef={draggableEl}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      </Styc.Container>
    </div>
  )
}

function DragAroundViaMouseEvents() {
  const [dragging, setDragging] = useState(false)
  const startEvent = useRef()
  const draggableEl = useRef()
  const { current: onMousemove } = useRef((e) => {
    if (!startEvent.current) return

    const [dx, dy] = [
      e.clientX - startEvent.current.clientX,
      e.clientY - startEvent.current.clientY,
    ]

    const [startLeft, startTop] = [
      getPxNum(getComputedStyle(draggableEl.current).left),
      getPxNum(getComputedStyle(draggableEl.current).top)
    ]

    draggableEl.current.style.left = getPxStr(startLeft + dx)
    draggableEl.current.style.top = getPxStr(startTop + dy)

    startEvent.current = e
  })

  const { current: onMouseup } = useRef((e) => {
    setDragging(false)
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mousemove', onMouseup)

    startEvent.current = null
  })

  const onMouseDown = (e) => {
    setDragging(true)
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)

    e.persist()
    startEvent.current = e
  }

  return (
    <div style={{ marginTop: 100 }}>
      <Typography variant='headline'
        style={{ marginBottom: 20 }}
      >
        Drag Around (via mouse events)
      </Typography>

      <Styc.Container>
        <Styc.Draggable
          dragging={dragging}
          innerRef={draggableEl}
          onMouseDown={onMouseDown}
        />
      </Styc.Container>
    </div>
  )
}

export default () => (
  <>
    <DragAroundViaDragEvents />
    <DragAroundViaMouseEvents />
  </>
)