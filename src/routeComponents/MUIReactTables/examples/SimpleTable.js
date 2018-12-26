import React from "react";
import { withProps } from 'recompose'
import { Typography, CircularProgress, Button } from '@material-ui/core'

// Import React Table
import ReactTable from "react-table";
import 'react-table/react-table.css'

import tableStyles from '../common/styles'
import tableComponents from '../common/components'
import { makeData } from "../common/utils";

const TableButton = withProps({
  color: 'primary',
  variant: 'contained'
})(Button)

export default class SimpleTable extends React.Component {
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
        <Typography variant="h4" style={{ marginBottom: 20, textAlign: 'center' }}>
          Simple Table
        </Typography>
        <ReactTable
          data={data}
          // loading
          // loadingText={<CircularProgress style={{ fontSize: 20 }} />}
          PaginationComponent={tableComponents.Pagination}
          getTheadGroupTrProps={() => ({ className: tableStyles.TheadGroupTr.root })}
          getTheadGroupThProps={() => ({ className: tableStyles.TheadGroupTh.root })}
          getTheadTrProps={() => ({ className: tableStyles.TheadTr.root })}
          getTheadThProps={() => ({ className: tableStyles.TheadTh.root })}
          getTheadFilterTrProps={() => ({ className: tableStyles.TheadFilterTr.root })}
          getTheadFilterThProps={() => ({ className: tableStyles.TheadFilterTh.root })}
          getTrProps={() => ({ className: tableStyles.Tr.root })}
          getThProps={() => ({ className: tableStyles.Th.root })}
          getTdProps={() => ({ className: tableStyles.Td.root })}
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
          className="-striped -highlight"
        />
      </div>
    );
  }
}

