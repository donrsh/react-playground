import React from 'react'
import { Typography } from '@material-ui/core'

// Import React Table
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { makeData } from '../common/utils'

import MUIReactTable from '../common/MUIReactTable'

export default class CellRenderers extends React.Component {
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
          Cell Renderers
          <br />
          <Typography variant="body1">
            <a
              href="https://react-table.js.org/#/story/cell-renderers-custom-components"
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
                      Header: 'Profile Progress',
                      accessor: 'progress',
                      Cell: row => (
                        <div
                          style={{
                            width: '100%',
                            height: '50%',
                            backgroundColor: '#dadada',
                            borderRadius: '2px',
                          }}
                        >
                          <div
                            style={{
                              width: `${row.value}%`,
                              height: '100%',
                              backgroundColor:
                                row.value > 66
                                  ? '#85cc00'
                                  : row.value > 33
                                  ? '#ffbf00'
                                  : '#ff2e00',
                              borderRadius: '2px',
                              transition: 'all .2s ease-out',
                            }}
                          />
                        </div>
                      ),
                    },
                    {
                      Header: 'Status',
                      accessor: 'status',
                      Cell: row => (
                        <span>
                          <span
                            style={{
                              color:
                                row.value === 'relationship'
                                  ? '#ff2e00'
                                  : row.value === 'complicated'
                                  ? '#ffbf00'
                                  : '#57d500',
                              transition: 'all .3s ease',
                            }}
                          >
                            &#x25cf;
                          </span>
                          {row.value === 'relationship'
                            ? 'In a relationship'
                            : row.value === 'complicated'
                            ? `It's complicated`
                            : 'Single'}
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
