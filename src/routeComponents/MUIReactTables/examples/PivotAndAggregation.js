import React from 'react'
import * as R from 'ramda'
import { Typography } from '@material-ui/core'

// Import React Table
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { makeData } from '../common/utils'

import MUIReactTable from '../common/MUIReactTable'

export default class PivotAndAggregation extends React.Component {
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
          Pivot & Aggregation
          <br />
          <Typography variant="body1">
            <a
              href="https://react-table.js.org/#/story/pivoting-aggregation"
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
              columns={[
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
                    },
                    {
                      Header: 'Visits',
                      accessor: 'visits',
                      aggregate: vals => R.sum(vals),
                    },
                  ],
                },
              ]}
              pivotBy={['firstName', 'lastName']}
              defaultPageSize={10}
              className={`-striped -highlight ${fontClass}`}
            />
          )}
        </MUIReactTable>
      </div>
    )
  }
}
