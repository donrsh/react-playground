import * as React from 'react'
import * as R from 'ramda'

import { TextField } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'

export default function Filter(props) {
  const { /* column, */ filter, onChange, MUIProps } = props
  const filterValue = R.propOr('', 'value', filter)

  return (
    <TextField
      InputProps={{
        startAdornment: <FilterListIcon />,
      }}
      {...MUIProps}
      value={filterValue}
      onChange={e => onChange(e.target.value)}
    />
  )
}
