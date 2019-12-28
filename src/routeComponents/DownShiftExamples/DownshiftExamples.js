import * as React from 'react'

import Basic from './Examples/Basic'
import Multiple from './Examples/Multiple'
import MultipleAndEditable from './Examples/MultipleAndEditable'
import MultipleAndEditable2 from './Examples/MultipleAndEditable2'
import SingleAsync from './Examples/SingleAsync'

class DownshiftExamples extends React.Component {
  render() {
    return (
      <div>
        <MultipleAndEditable2 />
        <MultipleAndEditable />
        <SingleAsync />
        <Multiple />
        <Basic />
      </div>
    )
  }
}

export default DownshiftExamples
