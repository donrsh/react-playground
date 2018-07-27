import * as React from 'react'

import Basic from './Examples/Basic'
import Muitiple from './Examples/Muitiple'
import SingleAsync from './Examples/SingleAsync'

class DownshiftExamples extends React.Component {
  render () {
    return (
      <div>
        <SingleAsync />
        <Muitiple />
        <Basic />
      </div>
    )
  }
}

export default DownshiftExamples