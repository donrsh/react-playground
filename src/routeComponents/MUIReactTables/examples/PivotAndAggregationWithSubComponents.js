import React from 'react'
import * as R from 'ramda'
import { Typography } from '@material-ui/core'

// Import React Table
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { makeData } from '../common/utils'

import MUIReactTable from '../common/MUIReactTable'

const columns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        id: 'lastName',
        accessor: d => d.lastName,
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Age',
        accessor: 'age',
        aggregate: vals => Math.round(R.mean(vals)),
        Aggregated: row => {
          return <span>{row.value} (avg)</span>
        },
        filterMethod: (filter, row) =>
          filter.value === `${row[filter.id]} (avg)`,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        aggregate: vals => R.sum(vals),
        filterable: false,
      },
    ],
  },
]

export default class PivotAndAggregationWithSubComponents extends React.Component {
  constructor() {
    super()
    this.state = {
      data: makeData(),
    }
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <Typography variant="h4" style={{ margin: 20, textAlign: 'center' }}>
          Pivot & Aggregation with Sub Components
          <br />
          <Typography variant="body1">
            <a
              href="https://react-table.js.org/#/story/pivoting-aggregation-w-sub-components"
              target="_blank"
              rel="noopener noreferrer"
            >
              See here
            </a>
          </Typography>
        </Typography>

        <MUIReactTable>
          {({ ReactTableProps, subcomponentClasses, fontClass }) => (
            <ReactTable
              {...ReactTableProps}
              data={data}
              columns={columns}
              pivotBy={['firstName', 'lastName']}
              filterable
              SubComponent={row => {
                return (
                  <div style={{ padding: '20px' }}>
                    <em>
                      You can put any component you want here, even another
                      React Table!
                    </em>
                    <br />
                    <br />
                    <ReactTable
                      data={data}
                      columns={columns}
                      defaultPageSize={3}
                      showPagination={false}
                      SubComponent={row => {
                        return (
                          <div style={{ padding: '20px' }}>Sub Component!</div>
                        )
                      }}
                    />
                  </div>
                )
              }}
              defaultPageSize={10}
              className={`-striped -highlight ${fontClass}`}
            />
          )}
        </MUIReactTable>
      </div>
    )
  }
}
