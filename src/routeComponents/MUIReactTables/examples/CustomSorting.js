import React from "react";
import { Typography } from '@material-ui/core'

// Import React Table
import ReactTable from "react-table";
import 'react-table/react-table.css'

import { makeData } from "../common/utils";

import MUIReactTable from '../common/MUIReactTable'

export default class CustomSorting extends React.Component {
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
            <a href="https://react-table.js.org/#/story/custom-sorting" target="_blank"
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
                        Header: "First Name (Sorted by Length, A-Z)",
                        accessor: "firstName",
                        sortMethod: (a, b) => {
                          if (a.length === b.length) {
                            return a > b ? 1 : -1;
                          }
                          return a.length > b.length ? 1 : -1;
                        }
                      },
                      {
                        Header: "Last Name (Sorted in reverse, A-Z)",
                        id: "lastName",
                        accessor: d => d.lastName,
                        sortMethod: (a, b) => {
                          if (a === b) {
                            return 0;
                          }
                          const aReverse = a.split("").reverse().join("");
                          const bReverse = b.split("").reverse().join("");
                          return aReverse > bReverse ? 1 : -1;
                        }
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

