import React from 'react'
import * as R from 'ramda'
import { Typography } from '@material-ui/core'

// Import React Table
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { makeData } from '../common/utils'

import MUIReactTable from '../common/MUIReactTable'

export default class Footers extends React.Component {
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
          Footer
          <br />
          <Typography variant="body1">
            <a
              href="https://react-table.js.org/#/story/footers"
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
                      Footer: (
                        <span>
                          <strong>Popular:</strong>{' '}
                          {R.pipe(
                            R.groupBy(R.prop('firstName')),
                            R.map(R.length),
                            Object.entries,
                            R.sortBy(R.prop(1)),
                            R.last,
                            ([name, count]) => `${name} (${count})`,
                          )(data)}
                        </span>
                      ),
                    },
                    {
                      Header: 'Last Name',
                      id: 'lastName',
                      accessor: d => d.lastName,
                      Footer: (
                        <span>
                          <strong>Longest:</strong>{' '}
                          {R.pipe(
                            R.map(R.prop('lastName')),
                            R.sortBy(R.length),
                            R.last,
                          )(data)}
                        </span>
                      ),
                    },
                  ],
                },
                {
                  Header: 'Info',
                  columns: [
                    {
                      Header: 'Age',
                      accessor: 'age',
                      Footer: (
                        <span>
                          <strong>Average:</strong>{' '}
                          {Math.round(R.mean(R.map(d => d.age, data)))}
                        </span>
                      ),
                    },
                  ],
                },
              ]}
              defaultPageSize={10}
              className={`-striped -highlight ${fontClass}`}
            />
          )}
        </MUIReactTable>
      </div>
    )
  }
}
