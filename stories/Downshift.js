import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '@storybook/react/demo'
import { withReadme } from 'storybook-readme'

import Basic from '../src/routeComponents/DownShiftExamples/Examples/Basic'
import Multiple from '../src/routeComponents/DownShiftExamples/Examples/Multiple'
import SingleAsync from '../src/routeComponents/DownShiftExamples/Examples/SingleAsync'

storiesOf('Downshift', module)
  .add(
    'Basic',
    withReadme(
      require('../storybook-readme/generated/Downshift/Basic.md'),
      () => <Basic />
    )
  )
  .add(
    'Multiple',
    withReadme(
      require('../storybook-readme/generated/Downshift/Multiple.md'),
      () => <Multiple />
    )
  )
  .add(
    'SingleAsync',
    withReadme(
      require('../storybook-readme/generated/Downshift/SingleAsync.md'),
      () => <SingleAsync />
    )
  )