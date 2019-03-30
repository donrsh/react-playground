import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '@storybook/react/demo'
import { withReadme } from 'storybook-readme'

import Toggler from '../src/routeComponents/HookExamples/examples/Toggler'
import AsyncJob from '../src/routeComponents/HookExamples/examples/AsyncJob'
import Geometry from '../src/routeComponents/HookExamples/examples/Geometry'

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
  .add(
    'useGeometryOf',
    withReadme(
      require('../storybook-readme/generated/HookExamples/Geometry.md'),
      () => <Geometry />
    )
  )
