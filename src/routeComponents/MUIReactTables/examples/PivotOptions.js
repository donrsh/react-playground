import React from "react";
import * as R from 'ramda'
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
        accessor: "firstName",
        PivotValue: ({ value }) =>
          <span style={{ color: "darkred" }}>
            {value}
          </span>
      },
      {
        Header: "Last Name",
        id: "lastName",
        accessor: d => d.lastName,
        PivotValue: ({ value }) =>
          <span style={{ color: "darkblue" }}>
            {value}
          </span>,
        Footer: () =>
          <div style={{ textAlign: "center" }}>
            <strong>Pivot Column Footer</strong>
          </div>
      }
    ]
  },
  {
    Header: "Info",
    columns: [
      {
        Header: "Age",
        accessor: "age",
        aggregate: vals => {
          return Math.round(R.mean(vals));
        },
        Aggregated: row =>
          <span>
            {row.value} (avg)
          </span>
      },
      {
        Header: "Visits",
        accessor: "visits",
        aggregate: vals => R.sum(vals),
        filterable: false
      }
    ]
  },
  {
    pivot: true,
    Header: () =>
      <strong>Overridden Pivot Column Header Group</strong>
  },
  {
    expander: true
  }
]

export default class PivotOptions extends React.Component {
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
          Pivoting Options
          <br />
          <Typography variant="body1">
            <a href="https://react-table.js.org/#/story/pivoting-options" target="_blank"
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
                pivotBy={["firstName", "lastName"]}
                collapseOnSortingChange={false}
                filterable
                defaultSorted={[
                  { id: "firstName", desc: false },
                  { id: "lastName", desc: true }
                ]}
                ExpanderComponent={({ isExpanded, ...rest }) =>
                  isExpanded ? <span> &#10136; </span> : <span> &#10137; </span>}
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
                                id: "lastName"
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
                                Header: "Visits",
                                accessor: "visits"
                              }
                            ]
                          }
                        ]}
                        defaultPageSize={3}
                        showPagination={false}
                        SubComponent={row => {
                          return (
                            <div style={{ padding: "20px" }}>Sub Component!</div>
                          );
                        }}
                      />
                    </div>
                  );
                }}
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

