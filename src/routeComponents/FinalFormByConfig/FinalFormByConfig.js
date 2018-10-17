import * as React from 'react'

import SimpleExample from './examples/SimpleExample'
import SynchronousRecordLevelValidation from './examples/SynchronousRecordLevelValidation'
import SynchronousFieldLevelValidation from './examples/SynchronousFieldLevelValidation'
import HybridSyncAsyncRecordLevelValidation from './examples/HybridSyncAsyncRecordLevelValidation'
import SubmissionErrors from './examples/SubmissionErrors'
import ArrayFields from './examples/ArrayFields'
import CalculatedFields from './examples/CalculatedFields'
import WizardForm from './examples/WizardForm'
import ParseAndFormat from './examples/ParseAndFormat'
import CustomValidationEngine from './examples/CustomValidationEngine'

class FinalFormByConfig extends React.Component {
  render () {
    return (
      <React.Fragment>
        <CustomValidationEngine />
        <ParseAndFormat/>
        <WizardForm/>
        <CalculatedFields />
        <ArrayFields />
        <SubmissionErrors />
        <HybridSyncAsyncRecordLevelValidation />
        <SynchronousFieldLevelValidation />
        <SynchronousRecordLevelValidation />
        <SimpleExample />
      </React.Fragment>
    )
  }
}

export default FinalFormByConfig