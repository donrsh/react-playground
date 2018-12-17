import * as React from 'react'

import DragAround from './Examples/DragAround'
import NativeAPI from './Examples/NativeAPI'
import ReactDnDTutorial from './Examples/ReactDnDTutorial'

class DnDExamples extends React.Component {
  render() {
    return (
      <div>
        <NativeAPI />
        <DragAround />
        <ReactDnDTutorial />
      </div>
    )
  }
}

export default DnDExamples