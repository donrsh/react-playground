import * as React from 'react'

import NativeAPI from './Examples/NativeAPI'
import RactDnDTutorial from './Examples/RactDnDTutorial'

class DnDExamples extends React.Component {
  render () {
    return (
      <div>
        <NativeAPI />
        <RactDnDTutorial />
      </div>
    )
  }
}

export default DnDExamples