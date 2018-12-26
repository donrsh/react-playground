import React from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'

import SimpleTable from '../src/routeComponents/MUIReactTables/examples/SimpleTable'
import CellRenderers from '../src/routeComponents/MUIReactTables/examples/CellRenderers'

storiesOf('MUI ⨉ react-table', module)
  .add(
    'Simple Table',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/SimpleTable.md'),
      () => <SimpleTable />
    )
  )
  .add(
    'Cell Renderers',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/CellRenderers.md'),
      () => <CellRenderers />
    )
  )