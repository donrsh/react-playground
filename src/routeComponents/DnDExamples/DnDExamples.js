import * as React from 'react'

import NativeAPI from './Examples/NativeAPI'
import ReactDnDTutorial from './Examples/ReactDnDTutorial'

class DnDExamples extends React.Component {
  render () {
    return (
      <div>
        <NativeAPI />
        <ReactDnDTutorial />
      </div>
    )
  }
}

export default DnDExamples