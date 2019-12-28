import React from 'react'
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
        Footer: () => <div style={{ textAlign: 'center' }}>First Name</div>,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        Footer: () => <div style={{ textAlign: 'center' }}>Last Name</div>,
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Age',
        accessor: 'age',
        Footer: () => <div style={{ textAlign: 'center' }}>Age</div>,
      },
    ],
  },
  {
    Header: 'Expand',
    columns: [
      {
        expander: true,
        Header: () => <strong>More</strong>,
        width: 65,
        Expander: ({ isExpanded, ...rest }) => (
          <div>
            {isExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}
          </div>
        ),
        style: {
          cursor: 'pointer',
          fontSize: 25,
          textAlign: 'center',
          userSelect: 'none',
        },
        Footer: () => <span>&hearts;</span>,
      },
    ],
  },
]

export default class CustomExpanderPosiotion extends React.Component {
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
          Custom Expander Posiotion
          <br />
          <Typography variant="body1">
            <a
              href="https://react-table.js.org/#/story/custom-expander-position"
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
              defaultPageSize={10}
              className={`-striped -highlight ${fontClass}`}
              SubComponent={() => <div style={{ padding: '10px' }}>Hello</div>}
            />
          )}
        </MUIReactTable>
      </div>
    )
  }
}
