import * as React from 'react'

import SimpleExample from './examples/SimpleExample'
import SynchronousRecordLevelValidation from './examples/SynchronousRecordLevelValidation'
import SynchronousFieldLevelValidation from './examples/SynchronousFieldLevelValidation'

class FinalFormByConfig extends React.Component {
  render () {
    return (
      <React.Fragment>
        <SynchronousFieldLevelValidation />
        <SynchronousRecordLevelValidation />
        <SimpleExample />
      </React.Fragment>
    )
  }
}

export default FinalFormByConfig