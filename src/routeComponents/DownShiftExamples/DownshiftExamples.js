import * as React from 'react'

import Basic from './Examples/Basic'
import Multiple from './Examples/Multiple'
import SingleAsync from './Examples/SingleAsync'

class DownshiftExamples extends React.Component {
  render() {
    return (
      <div>
        <SingleAsync />
        <Multiple />
        <Basic />
      </div>
    )
  }
}

export default DownshiftExamples