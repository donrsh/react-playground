import React from "react";
import { Typography, Select, MenuItem } from '@material-ui/core'
import matchSorter from 'match-sorter'

// Import React Table
import ReactTable from "react-table";
import 'react-table/react-table.css'

import { makeData } from "../common/utils";

import MUIReactTable from '../common/MUIReactTable'
import MUIReactTableFilter from '../common/components/Filter'

const columns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName",
        filterMethod: (filter, row) =>
          row[filter.id].startsWith(filter.value) &&
          row[filter.id].endsWith(filter.value),
        Filter: (filterProps) => (
          <MUIReactTableFilter
            {...filterProps}
            MUIProps={{
              helperText: "* Filter by startsWith && endsWith"
            }}
          />
        )
      },
      {
        Header: "Last Name",
        id: "lastName",
        accessor: d => d.lastName,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["lastName"] }),
        filterAll: true,
        Filter: (filterProps) => (
          <MUIReactTableFilter
            {...filterProps}
            MUIProps={{
              helperText: "* Filtered by match-sorter"
            }}
          />
        )
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
        Header: "Over 21",
        accessor: "age",
        id: "over",
        Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true;
          }
          if (filter.value === "true") {
            return row[filter.id] >= 21;
          }
          return row[filter.id] < 21;
        },
        Filter: ({ filter, onChange }) =>
          <Select
            onChange={event => onChange(event.target.value)}
            value={filter ? filter.value : "all"}
            style={{ width: '100%' }}
          >
            <MenuItem value="all">Show All</MenuItem>
            <MenuItem value="true">Can Drink</MenuItem>
            <MenuItem value="false">Can't Drink</MenuItem>
          </Select>
      }
    ]
  }
]

export default class CustomFiltering extends React.Component {
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
          Custom Filtering
          <br />
          <Typography variant="body1">
            <a href="https://react-table.js.org/#/story/custom-filtering" target="_blank"
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
                filterable
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

