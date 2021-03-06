import React from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'

import SimpleTable from '../src/routeComponents/MUIReactTables/examples/SimpleTable'
import CellRenderers from '../src/routeComponents/MUIReactTables/examples/CellRenderers'
import DefaultSorting from '../src/routeComponents/MUIReactTables/examples/DefaultSorting'
import CustomSorting from '../src/routeComponents/MUIReactTables/examples/CustomSorting'
import CustomColumnWidth from '../src/routeComponents/MUIReactTables/examples/CustomColumnWidth'
import CustomComponentProps from '../src/routeComponents/MUIReactTables/examples/CustomComponentProps'
import SubComponents from '../src/routeComponents/MUIReactTables/examples/SubComponents'
import PivotAndAggregation from '../src/routeComponents/MUIReactTables/examples/PivotAndAggregation'
import PivotAndAggregationWithSubComponents from '../src/routeComponents/MUIReactTables/examples/PivotAndAggregationWithSubComponents'
import PivotOptions from '../src/routeComponents/MUIReactTables/examples/PivotOptions'
import CustomExpanderPosiotion from '../src/routeComponents/MUIReactTables/examples/CustomExpanderPosiotion'
import CustomNoDataText from '../src/routeComponents/MUIReactTables/examples/CustomNoDataText'
import Footers from '../src/routeComponents/MUIReactTables/examples/Footers'
import CustomFiltering from '../src/routeComponents/MUIReactTables/examples/CustomFiltering'


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
  .add(
    'Custom Component Props',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/CustomComponentProps.md'),
      () => <CustomComponentProps />
    )
  )
  .add(
    'Sub Components',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/SubComponents.md'),
      () => <SubComponents />
    )
  )
  .add(
    'Pivot & Aggregation',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/PivotAndAggregation.md'),
      () => <PivotAndAggregation />
    )
  )
  .add(
    'Pivot & Aggregation w/ Sub Components',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/PivotAndAggregationWithSubComponents.md'),
      () => <PivotAndAggregationWithSubComponents />
    )
  )
  .add(
    'Pivoting Options',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/PivotOptions.md'),
      () => <PivotOptions />
    )
  )
  .add(
    'Custom Expander Posiotion',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/CustomExpanderPosiotion.md'),
      () => <CustomExpanderPosiotion />
    )
  )
  .add(
    'Custom No Data Text',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/CustomNoDataText.md'),
      () => <CustomNoDataText />
    )
  )
  .add(
    'Footers',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/Footers.md'),
      () => <Footers />
    )
  )
  .add(
    'Custom Filtering',
    withReadme(
      require('../storybook-readme/generated/MUIReactTables/CustomFiltering.md'),
      () => <CustomFiltering />
    )
  )