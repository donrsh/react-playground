import React from "react";
import { Typography } from '@material-ui/core'

// Import React Table
import ReactTable from "react-table";
import 'react-table/react-table.css'

import { makeData } from "../common/utils";

import MUIReactTable from '../common/MUIReactTable'

const columns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        id: "lastName",
        accessor: d => d.lastName
      }
    ]
  },
  {
    Header: "Info",
    columns: [
      {
        Header: "Age",
        accessor: "age"
      },
      {
        Header: "Status",
        accessor: "status"
      }
    ]
  },
  {
    Header: "Stats",
    columns: [
      {
        Header: "Visits",
        accessor: "visits"
      }
    ]
  }
]

export default class SubComponents extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Typography variant="h4" style={{ margin: 20, textAlign: 'center' }}>
          Simple Table
          <br />
          <Typography variant="body1">
            <a href="https://react-table.js.org/#/story/sub-components" target="_blank"
              rel="noopener noreferrer"
            >
              See here
            </a>
          </Typography>
        </Typography>

        <MUIReactTable>
          {
            ({ ReactTableProps, subcomponentClasses, fontClass }) => (
              <ReactTable {...ReactTableProps}
                data={data}
                columns={columns}
                defaultPageSize={10}
                className={`-striped -highlight ${fontClass}`}
                SubComponent={row => {
                  return (
                    <div style={{ padding: "20px" }}>
                      <em>
                        You can put any component you want here, even another React
                        Table!
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
                            <div style={{ padding: "20px" }}>
                              Another Sub Component!
                            </div>
                          );
                        }}
                      />
                    </div>
                  );
                }}
              />
            )
          }
        </MUIReactTable>
      </div>
    );
  }
}

