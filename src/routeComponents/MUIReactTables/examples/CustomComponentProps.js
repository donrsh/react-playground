import React from "react";
import { Typography } from '@material-ui/core'

// Import React Table
import ReactTable from "react-table";
import 'react-table/react-table.css'

import { makeData } from "../common/utils";

import MUIReactTable from '../common/MUIReactTable'

export default class CustomComponentProps extends React.Component {
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
          Custom Component Props
          <br />
          <Typography variant="body1">
            <a href="https://react-table.js.org/#/story/custom-component-props" target="_blank"
              rel="noopener noreferrer"
            >
              See here
            </a>
          </Typography>

          <Typography variant="body1"
            style={{ marginTop: 20 }}
          >
            <em>* Click on the table cell to see the column info ^^</em>
          </Typography>
        </Typography>

        <MUIReactTable>
          {
            ({ ReactTableProps, subcomponentClasses, fontClass }) => (
              <ReactTable {...ReactTableProps}
                data={data}
                columns={[
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
                ]}
                getTdProps={
                  (state, rowInfo, column, instance) => ({
                    className: subcomponentClasses.Td.root,
                    style: { cursor: 'pointer' },
                    onClick: (e) => alert(JSON.stringify(column))
                  })
                }
                defaultPageSize={10}
                className={`-striped -highlight ${fontClass}`}
              />
            )
          }
        </MUIReactTable>
      </div>
    );
  }
}

