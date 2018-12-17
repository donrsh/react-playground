import * as React from 'react'
import styled from 'styled-components'
import * as R from 'ramda'

import { Typography } from '@material-ui/core'

const Styc = {
  DropTargetRoot: styled.div.attrs({
    children: 'Drop here'
  })`
    width: 200px;
    height: 200px;
    border: 1px dashed grey;
    background-color: ${({ over }) => over ? 'lightgrey' : 'white'}
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `,

  DragSourceRoot: styled.div.attrs({
    draggable: true,
    children: 'Drag Me!'
  })`
    width: 100px;
    height: 100px;
    background-color: blanchedalmond;
    margin-right: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center
  `
}

class NativeAPI extends React.Component {
  state = {
    over: false,
    dropCount: 0
  }

  onDrag = (e) => {
    // console.log('onDrag', e.target)
  }

  onDragStart = (e) => {
    // console.log('onDragStart', e.target)
    e.persist()
    e.dataTransfer.dropEffect = "link"
    e.dataTransfer.setData("text/plain", "abcde")
    e.dataTransfer.setData("text/plain", "qqqqq")

    /*  
    const img = new Image()
    img.src = 'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/aa.svg'
    img.style = 'width:10px;height:10px;'
    e.dataTransfer.setDragImage(img, 0, 0)
    */

  }

  onDragEnd = (e) => {
    // console.log('onDragEnd', e.target)
  }

  onDragEnter = (e) => {
    // console.log('onDragEnter', e.target)
    this.setState(() => ({ over: true }))
  }

  onDragLeave = (e) => {
    // console.log('onDragLeave', e.target)
    this.setState(() => ({ over: false }))
  }

  onDragOver = (e) => {
    // console.log('onDragOver', e.target)
    e.stopPropagation()
    e.preventDefault()
    // e.persist()
    e.dataTransfer.dropEffect = "copy"
  }

  onDrop = (e) => {
    e.preventDefault()
    // console.log('onDrop', e.dataTransfer)
    this.setState(R.evolve({
      over: R.F,
      dropCount: R.add(1)
    }))

    window.alert('dropped!')
  }

  render() {
    const { over } = this.state

    return (
      <div style={{ marginTop: 100 }}>
        <Typography variant='headline'
          style={{ marginBottom: 20 }}
        >
          Native API
        </Typography>

        <Styc.DragSourceRoot
          onDrag={this.onDrag}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        />

        <Styc.DropTargetRoot
          over={over}
          onDragOver={this.onDragOver}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
        />

        <Typography variant='subheading'
          style={{ marginTop: 20 }}
        >
          Drop count: {this.state.dropCount}
        </Typography>
      </div>
    )
  }
}

export default NativeAPI