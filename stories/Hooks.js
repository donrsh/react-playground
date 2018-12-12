import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '@storybook/react/demo'
import { withReadme } from 'storybook-readme'

import Toggler from '../src/routeComponents/HookExamples/examples/Toggler'
import AsyncJob from '../src/routeComponents/HookExamples/examples/AsyncJob'

storiesOf('React Hooks', module)
  .add(
    'useToggler',
    withReadme(
      require('../storybook-readme/generated/HookExamples/Toggler.md'),
      () => <Toggler />
    )
  )
  .add(
    'useAsyncJob',
    withReadme(
      require('../storybook-readme/generated/HookExamples/AsyncJob.md'),
      () => <AsyncJob />
    )
  )