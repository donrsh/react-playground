import React from "react";
import { Typography } from '@material-ui/core'

// Import React Table
import ReactTable from "react-table";
import 'react-table/react-table.css'

import { makeData } from "../common/utils";

import MUIReactTable from '../common/MUIReactTable'

export default class DefaultSorting extends React.Component {
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
          Default Sorting
          <br />
          <Typography variant="body1">
            <a href="https://react-table.js.org/#/story/default-sorting" target="_blank"
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
                        accessor: "lastName"
                      }
                    ]
                  },
                  {
                    Header: "Info",
                    columns: [
                      {
                        Header: "Age",
                        accessor: "age"
                      }
                    ]
                  }
                ]}
                defaultSorted={[
                  {
                    id: "age",
                    desc: true
                  }
                ]}
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

