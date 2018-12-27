import React from "react";
import { Typography } from '@material-ui/core'

// Import React Table
import ReactTable from "react-table";
import 'react-table/react-table.css'

import MUIReactTable from '../common/MUIReactTable'

export default class CustomNoDataText extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="h4" style={{ margin: 20, textAlign: 'center' }}>
          Custom No Data Text
          <br />
          <Typography variant="body1">
            <a href="https://react-table.js.org/#/story/custom-no-data-text" target="_blank"
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
                data={[]}
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
                    Header: 'Stats',
                    columns: [
                      {
                        Header: "Visits",
                        accessor: "visits"
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

