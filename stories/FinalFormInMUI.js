import React from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'

import SimpleExample from '../src/routeComponents/FinalFormByConfig/examples/SimpleExample'
import CustomValidationEngine from '../src/routeComponents/FinalFormByConfig/examples/CustomValidationEngine'
import ParseAndFormat from '../src/routeComponents/FinalFormByConfig/examples/ParseAndFormat'
import WizardForm from '../src/routeComponents/FinalFormByConfig/examples/WizardForm'
import CalculatedFields from '../src/routeComponents/FinalFormByConfig/examples/CalculatedFields'
import SubmissionErrors from '../src/routeComponents/FinalFormByConfig/examples/SubmissionErrors'
import HybridSyncAsyncRecordLevelValidation from '../src/routeComponents/FinalFormByConfig/examples/HybridSyncAsyncRecordLevelValidation'
import SynchronousFieldLevelValidation from '../src/routeComponents/FinalFormByConfig/examples/SynchronousFieldLevelValidation'
import SynchronousRecordLevelValidation from '../src/routeComponents/FinalFormByConfig/examples/SynchronousRecordLevelValidation'
import ArrayFields from '../src/routeComponents/FinalFormByConfig/examples/ArrayFields'

storiesOf('Final Form with MUI', module)
  .addParameters({ options: { addonPanelInRight: true } })
  .add(
    'Simple Example',
    withReadme(
      require('../storybook-readme/generated/FinalFormInMUI/SimpleExample.md'),
      () => (
        <SimpleExample defaultOpen />
      )
    )
  )
  .add(
    'Synchronous Field Level Validation',
    withReadme(
      require('../storybook-readme/generated/FinalFormInMUI/SynchronousFieldLevelValidation.md'),
      () => (
        <SynchronousFieldLevelValidation defaultOpen />
      )
    )
  )
  .add(
    'Synchronous Record Level Validation',
    withReadme(
      require('../storybook-readme/generated/FinalFormInMUI/SynchronousRecordLevelValidation.md'),
      () => (
        <SynchronousRecordLevelValidation defaultOpen />
      )
    )
  )
  .add(
    'Hybrid Sync Async Record Level Validation',
    withReadme(
      require('../storybook-readme/generated/FinalFormInMUI/HybridSyncAsyncRecordLevelValidation.md'),
      () => (
        <HybridSyncAsyncRecordLevelValidation defaultOpen />
      )
    )
  )
  .add(
    'Submission Errors',
    withReadme(
      require('../storybook-readme/generated/FinalFormInMUI/SubmissionErrors.md'),
      () => (
        <SubmissionErrors defaultOpen />
      )
    )
  )
  .add(
    'Array Fields',
    withReadme(
      require('../storybook-readme/generated/FinalFormInMUI/ArrayFields.md'),
      () => (
        <ArrayFields defaultOpen />
      )
    )
  )
  .add(
    'Custom Validation Engine',
    withReadme(
      require('../storybook-readme/generated/FinalFormInMUI/CustomValidationEngine.md'),
      () => (
        <CustomValidationEngine defaultOpen />
      )
    )
  )
  .add(
    'ParseAndFormat',
    withReadme(
      require('../storybook-readme/generated/FinalFormInMUI/ParseAndFormat.md'),
      () => (
        <ParseAndFormat defaultOpen />
      )
    )
  )
  .add(
    'WizardForm',
    withReadme(
      require('../storybook-readme/generated/FinalFormInMUI/WizardForm.md'),
      () => (
        <WizardForm defaultOpen />
      )
    )
  )
