import React from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'

import SimpleTable from '../src/routeComponents/MUIReactTables/examples/SimpleTable'

storiesOf('MUI ⨉ react-table', module)
  .add(
    'Simple Table',
    withReadme(
      require('../storybook-readme/generated/MUIReactTable/SimpleTable.md'),
      () => <SimpleTable />
    )
  )