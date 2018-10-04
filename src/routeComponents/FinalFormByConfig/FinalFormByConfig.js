import * as React from 'react'

import SimpleExample from './examples/SimpleExample'
import SynchronousRecordLevelValidation from './examples/SynchronousRecordLevelValidation'
import SynchronousFieldLevelValidation from './examples/SynchronousFieldLevelValidation'
import HybridSyncAsyncRecordLevelValidation from './examples/HybridSyncAsyncRecordLevelValidation'

class FinalFormByConfig extends React.Component {
  render () {
    return (
      <React.Fragment>
        <HybridSyncAsyncRecordLevelValidation />
        <SynchronousFieldLevelValidation />
        <SynchronousRecordLevelValidation />
        <SimpleExample />
      </React.Fragment>
    )
  }
}

export default FinalFormByConfig