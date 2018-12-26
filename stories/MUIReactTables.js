import React from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'

import SimpleTable from '../src/routeComponents/MUIReactTables/examples/SimpleTable'
import CellRenderers from '../src/routeComponents/MUIReactTables/examples/CellRenderers'
import DefaultSorting from '../src/routeComponents/MUIReactTables/examples/DefaultSorting'
import CustomSorting from '../src/routeComponents/MUIReactTables/examples/CustomSorting'
import CustomColumnWidth from '../src/routeComponents/MUIReactTables/examples/CustomColumnWidth'

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
  .add(
    'Default Sorting',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/DefaultSorting.md'),
      () => <DefaultSorting />
    )
  )
  .add(
    'Custom Sorting',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/CustomSorting.md'),
      () => <CustomSorting />
    )
  )
  .add(
    'Custom Column Width',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/CustomColumnWidth.md'),
      () => <CustomColumnWidth />
    )
  )