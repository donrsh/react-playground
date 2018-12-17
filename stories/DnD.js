import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '@storybook/react/demo'
import { withReadme } from 'storybook-readme'

import NativeAPI from '../src/routeComponents/DnDExamples/Examples/NativeAPI'
import DragAround from '../src/routeComponents/DnDExamples/Examples/DragAround'
import ReactDnDTutorial from '../src/routeComponents/DnDExamples/Examples/ReactDnDTutorial'


storiesOf('Drag and Drop', module)
  .add(
    'Native API',
    withReadme(
      require('../storybook-readme/generated/DnD/NativeAPI.md'),
      () => <NativeAPI />
    )
  )
  .add(
    'Drag Around',
    withReadme(
      require('../storybook-readme/generated/DnD/DragAround.md'),
      () => <DragAround />
    )
  )
  .add(
    'RactDnD Tutorial',
    withReadme(
      require('../storybook-readme/generated/DnD/ReactDnDTutorial.md'),
      () => <ReactDnDTutorial />
    )
  )